from typing import Any, Optional

from sqlalchemy import delete as sql_delete, func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from exceptions import DuplicateEntryError


class DBSession:
    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    def _apply_filters(self, statement, model, filters: dict):
        for field, value in (filters or {}).items():
            statement = statement.where(getattr(model, field) == value)
        return statement

    def _apply_conditions(self, statement, conditions: list):
        for condition in (conditions or []):
            statement = statement.where(condition)
        return statement

    async def get_one(self, model, filters: dict) -> Optional[Any]:
        statement = self._apply_filters(select(model), model, filters)
        result = await self._session.execute(statement)
        return result.scalar_one_or_none()

    async def get_paginated(
        self,
        model,
        filters: dict = None,
        order_by: tuple[str, str] = None,
        page: int = 1,
        page_size: int = 10,
    ) -> list[Any]:
        statement = self._apply_filters(select(model), model, filters)
        if order_by:
            col = getattr(model, order_by[0])
            statement = statement.order_by(col.desc() if order_by[1] == "desc" else col)
        statement = statement.offset((page - 1) * page_size).limit(page_size)
        result = await self._session.execute(statement)
        return result.scalars().all()

    async def get_paginated_with_total(
        self,
        model,
        filters: dict = None,
        order_by: tuple[str, str] = None,
        page: int = 1,
        page_size: int = 10,
        extra_conditions: list = None,
    ) -> tuple[list[Any], int]:
        count_statement = self._apply_filters(select(func.count()).select_from(model), model, filters)
        count_statement = self._apply_conditions(count_statement, extra_conditions)
        total = (await self._session.execute(count_statement)).scalar_one()

        if not total:
            return [], 0

        statement = self._apply_filters(select(model), model, filters)
        statement = self._apply_conditions(statement, extra_conditions)
        if order_by:
            col = getattr(model, order_by[0])
            statement = statement.order_by(col.desc() if order_by[1] == "desc" else col)
        statement = statement.offset((page - 1) * page_size).limit(page_size)
        items = (await self._session.execute(statement)).scalars().all()
        return list(items), total

    async def add(self, instance: Any) -> Any:
        try:
            self._session.add(instance)
            await self._session.commit()
            await self._session.refresh(instance)
            return instance
        except IntegrityError:
            await self._session.rollback()
            raise DuplicateEntryError()

    async def delete_instance(self, instance: Any) -> None:
        await self._session.delete(instance)
        await self._session.commit()

    async def delete_where(self, model, filters: dict) -> None:
        statement = self._apply_filters(sql_delete(model), model, filters)
        await self._session.execute(statement)
        await self._session.commit()

    async def search_full_text(
        self,
        model,
        query: str,
        text_fields: list[str],
        page: int,
        page_size: int,
        extra_conditions: list = None,
    ) -> tuple[list[tuple[Any, int]], int]:
        if not query.strip():
            items, total = await self.get_paginated_with_total(
                model, order_by=("id", "asc"), page=page, page_size=page_size,
                extra_conditions=extra_conditions,
            )
            return [(item, 0) for item in items], total

        searchable_text = getattr(model, text_fields[0])
        for field in text_fields[1:]:
            searchable_text = searchable_text + " " + func.coalesce(getattr(model, field), "")

        text_search_query = func.plainto_tsquery("english", query)
        text_search_vector = func.to_tsvector("english", searchable_text)
        relevance_score = func.ts_rank(text_search_vector, text_search_query).label("relevance_score")
        text_match_condition = text_search_vector.op("@@")(text_search_query)
        total_count = func.count().over().label("total_count")

        statement = (
            select(model, relevance_score, total_count)
            .where(text_match_condition)
            .order_by(relevance_score.desc())
        )
        statement = self._apply_conditions(statement, extra_conditions)
        statement = statement.offset((page - 1) * page_size).limit(page_size)
        results = (await self._session.execute(statement)).all()
        if not results:
            return [], 0
        total = results[0][2]
        return [(result[0], result[1]) for result in results], total

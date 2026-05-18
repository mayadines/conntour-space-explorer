from typing import List, Tuple

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from db.models import SourceModel
from modules.sources.schemas import SearchResult, Source


class SourceRepository:
    def __init__(self, session: AsyncSession):
        self._session = session

    async def get_all(self) -> List[Source]:
        result = await self._session.execute(select(SourceModel))
        return [Source.model_validate(row) for row in result.scalars().all()]

    async def search(self, query: str, page: int, page_size: int) -> Tuple[List[SearchResult], int]:
        if not query.strip():
            count_stmt = select(func.count()).select_from(SourceModel)
            total = (await self._session.execute(count_stmt)).scalar_one()
            stmt = (
                select(SourceModel)
                .order_by(SourceModel.id)
                .offset((page - 1) * page_size)
                .limit(page_size)
            )
            rows = (await self._session.execute(stmt)).scalars().all()
            items = [SearchResult(source=Source.model_validate(row), score=0) for row in rows]
            return items, total

        ts_query = func.plainto_tsquery("english", query)
        ts_vector = func.to_tsvector(
            "english",
            SourceModel.name + " " + func.coalesce(SourceModel.description, ""),
        )
        rank = func.ts_rank(ts_vector, ts_query).label("score")
        match_filter = ts_vector.op("@@")(ts_query)

        count_stmt = select(func.count()).select_from(SourceModel).where(match_filter)
        total = (await self._session.execute(count_stmt)).scalar_one()

        stmt = (
            select(SourceModel, rank)
            .where(match_filter)
            .order_by(rank.desc())
            .offset((page - 1) * page_size)
            .limit(page_size)
        )
        rows = (await self._session.execute(stmt)).all()
        items = [
            SearchResult(source=Source.model_validate(row), score=round(score * 1000))
            for row, score in rows
        ]
        return items, total

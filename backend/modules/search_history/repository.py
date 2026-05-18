from typing import Tuple

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from db.models import SearchHistoryModel
from modules.search_history.schemas import SearchHistory, SearchHistoryCreate


class SearchHistoryRepository:
    def __init__(self, session: AsyncSession):
        self._session = session

    async def get_by_user_id(self, user_id: int, page: int, page_size: int) -> Tuple[list[SearchHistory], int]:
        total = (
            await self._session.execute(
                select(func.count()).select_from(SearchHistoryModel).where(SearchHistoryModel.user_id == user_id)
            )
        ).scalar_one()

        result = await self._session.execute(
            select(SearchHistoryModel)
            .where(SearchHistoryModel.user_id == user_id)
            .order_by(SearchHistoryModel.id.desc())
            .offset((page - 1) * page_size)
            .limit(page_size)
        )
        items = [SearchHistory.model_validate(row) for row in result.scalars().all()]
        return items, total

    async def create(self, user_id: int, data: SearchHistoryCreate) -> SearchHistory:
        entry = SearchHistoryModel(user_id=user_id, search_query=data.search_query)
        self._session.add(entry)
        await self._session.commit()
        await self._session.refresh(entry)
        return SearchHistory.model_validate(entry)

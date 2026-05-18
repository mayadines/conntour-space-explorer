from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from db.models import SearchHistoryModel
from modules.search_history.schemas import SearchHistory, SearchHistoryCreate


class SearchHistoryRepository:
    def __init__(self, session: AsyncSession):
        self._session = session

    async def get_by_user_id(self, user_id: int) -> list[SearchHistory]:
        result = await self._session.execute(
            select(SearchHistoryModel).where(SearchHistoryModel.user_id == user_id)
        )
        return [SearchHistory.model_validate(row) for row in result.scalars().all()]

    async def create(self, user_id: int, data: SearchHistoryCreate) -> SearchHistory:
        entry = SearchHistoryModel(user_id=user_id, search_query=data.search_query)
        self._session.add(entry)
        await self._session.commit()
        await self._session.refresh(entry)
        return SearchHistory.model_validate(entry)

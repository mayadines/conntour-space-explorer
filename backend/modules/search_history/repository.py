from typing import Tuple

from repository import BaseRepository
from db.models import SearchHistoryModel
from modules.search_history.schemas import SearchHistory, SearchHistoryCreate


class SearchHistoryRepository(BaseRepository):
    async def get_by_user_id(self, user_id: int, page: int, page_size: int) -> Tuple[list[SearchHistory], int]:
        history_records, total = await self._db_session.get_paginated_with_total(
            SearchHistoryModel,
            filters={"user_id": user_id},
            order_by=("id", "desc"),
            page=page,
            page_size=page_size,
        )
        return [SearchHistory.model_validate(record) for record in history_records], total

    async def delete(self, user_id: int, history_id: int) -> None:
        history_to_delete = await self._db_session.get_one(SearchHistoryModel, {"id": history_id, "user_id": user_id})
        if history_to_delete:
            await self._db_session.delete_instance(history_to_delete)

    async def clear(self, user_id: int) -> None:
        await self._db_session.delete_where(SearchHistoryModel, {"user_id": user_id})

    async def create(self, user_id: int, data: SearchHistoryCreate) -> SearchHistory:
        new_history = SearchHistoryModel(user_id=user_id, search_query=data.search_query)
        saved_history = await self._db_session.add(new_history)
        return SearchHistory.model_validate(saved_history)

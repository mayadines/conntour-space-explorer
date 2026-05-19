from typing import List, Tuple

from repository import BaseRepository
from db.models import SourceModel
from modules.sources.schemas import SearchResult, Source


class SourceRepository(BaseRepository):
    async def search(self, query: str, page: int, page_size: int) -> Tuple[List[SearchResult], int]:
        search_results, total = await self._db_session.search_full_text(
            SourceModel,
            query=query,
            text_fields=["name", "description"],
            page=page,
            page_size=page_size,
        )
        items = [
            SearchResult(source=Source.model_validate(source_record), score=round(score * 1000))
            for source_record, score in search_results
        ]
        return items, total

from typing import List

from pydantic import BaseModel, ConfigDict


class SearchHistoryCreate(BaseModel):
    search_query: str


class SearchHistory(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    search_query: str


class SearchHistoryPage(BaseModel):
    items: List[SearchHistory]
    total: int
    page: int
    page_size: int

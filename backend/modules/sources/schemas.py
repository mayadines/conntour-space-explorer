from typing import List, Optional

from pydantic import BaseModel, ConfigDict


class Source(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    type: str
    launch_date: str
    description: str = ""
    image_url: Optional[str] = None
    status: str


class SearchResult(BaseModel):
    source: Source
    score: int


class SearchResponse(BaseModel):
    items: List[SearchResult]
    total: int
    page: int
    page_size: int
    pages: int

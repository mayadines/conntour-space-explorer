import math
from typing import List

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from db import get_db
from repositories.source import SourceRepository
from schemas.source import SearchResponse, Source

router = APIRouter(prefix="/api/sources", tags=["sources"])


def get_repository(session: AsyncSession = Depends(get_db)) -> SourceRepository:
    return SourceRepository(session)


@router.get("", response_model=List[Source])
async def get_sources(
    repository: SourceRepository = Depends(get_repository),
) -> List[Source]:
    return await repository.get_all()


@router.get("/search", response_model=SearchResponse)
async def search_sources(
    q: str,
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    repository: SourceRepository = Depends(get_repository),
) -> SearchResponse:
    items, total = await repository.search(q, page, page_size)
    pages = math.ceil(total / page_size) if total else 0
    return SearchResponse(items=items, total=total, page=page, page_size=page_size, pages=pages)

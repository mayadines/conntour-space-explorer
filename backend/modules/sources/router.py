import math

from fastapi import APIRouter, Depends, HTTPException, Query

from db import DBSession, get_db
from filters import parse_filters
from modules.auth.security import get_current_user
from modules.sources.repository import SourceRepository
from modules.sources.schemas import SearchResponse

router = APIRouter(prefix="/api/sources", tags=["sources"], dependencies=[Depends(get_current_user)])


def get_repository(db: DBSession = Depends(get_db)) -> SourceRepository:
    return SourceRepository(db)


@router.get("/search", response_model=SearchResponse)
async def search_sources(
    q: str = Query(default=""),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    filters: str = Query(default="[]"),
    repository: SourceRepository = Depends(get_repository),
) -> SearchResponse:
    try:
        parsed_filters = parse_filters(filters)
        items, total = await repository.search(q, page, page_size, parsed_filters)
        pages = math.ceil(total / page_size) if total else 0
        return SearchResponse(items=items, total=total, page=page, page_size=page_size, pages=pages)
    except Exception:
        raise HTTPException(status_code=500, detail="Search failed")

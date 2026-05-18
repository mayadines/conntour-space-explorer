from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from db import get_db
from modules.auth.security import get_current_user
from modules.search_history.repository import SearchHistoryRepository
from modules.search_history.schemas import SearchHistory, SearchHistoryCreate, SearchHistoryPage

router = APIRouter(prefix="/api/search-history", tags=["search-history"])


def get_repository(session: AsyncSession = Depends(get_db)) -> SearchHistoryRepository:
    return SearchHistoryRepository(session)


@router.get("", response_model=SearchHistoryPage)
async def get_history(
    page: int = Query(1, ge=1),
    page_size: int = Query(3, ge=1, le=100),
    current_user: dict = Depends(get_current_user),
    repository: SearchHistoryRepository = Depends(get_repository),
) -> SearchHistoryPage:
    items, total = await repository.get_by_user_id(current_user["id"], page, page_size)
    return SearchHistoryPage(items=items, total=total, page=page, page_size=page_size)


@router.delete("", status_code=204)
async def clear_history(
    current_user: dict = Depends(get_current_user),
    repository: SearchHistoryRepository = Depends(get_repository),
) -> None:
    await repository.clear(current_user["id"])


@router.delete("/{history_id}", status_code=204)
async def delete_history_item(
    history_id: int,
    current_user: dict = Depends(get_current_user),
    repository: SearchHistoryRepository = Depends(get_repository),
) -> None:
    await repository.delete(current_user["id"], history_id)


@router.post("", response_model=SearchHistory, status_code=201)
async def add_history(
    data: SearchHistoryCreate,
    current_user: dict = Depends(get_current_user),
    repository: SearchHistoryRepository = Depends(get_repository),
) -> SearchHistory:
    return await repository.create(current_user["id"], data)

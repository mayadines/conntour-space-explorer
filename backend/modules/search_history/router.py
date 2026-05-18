from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from db import get_db
from modules.auth.security import get_current_user
from modules.search_history.repository import SearchHistoryRepository
from modules.search_history.schemas import SearchHistory, SearchHistoryCreate

router = APIRouter(prefix="/api/search-history", tags=["search-history"])


def get_repository(session: AsyncSession = Depends(get_db)) -> SearchHistoryRepository:
    return SearchHistoryRepository(session)


@router.get("", response_model=List[SearchHistory])
async def get_history(
    current_user: dict = Depends(get_current_user),
    repository: SearchHistoryRepository = Depends(get_repository),
) -> List[SearchHistory]:
    return await repository.get_by_user_id(current_user["id"])


@router.post("", response_model=SearchHistory, status_code=201)
async def add_history(
    data: SearchHistoryCreate,
    current_user: dict = Depends(get_current_user),
    repository: SearchHistoryRepository = Depends(get_repository),
) -> SearchHistory:
    return await repository.create(current_user["id"], data)

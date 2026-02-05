from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from db import get_db
from models import Source
from repositories import Repository, SourceRepository

router = APIRouter(prefix="/api/sources", tags=["sources"])


def get_repository(session: AsyncSession = Depends(get_db)) -> Repository[Source]:
    """Dependency injection for the source repository."""
    return SourceRepository(session)


@router.get("", response_model=List[Source])
async def get_sources(
    repository: Repository[Source] = Depends(get_repository),
) -> List[Source]:
    """Get all NASA image sources."""
    return await repository.get_all()

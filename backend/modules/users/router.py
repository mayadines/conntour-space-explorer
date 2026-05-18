from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from db import get_db
from modules.users.repository import UserRepository
from modules.users.schemas import User, UserCreate

router = APIRouter(prefix="/api/users", tags=["users"])


def get_repository(session: AsyncSession = Depends(get_db)) -> UserRepository:
    return UserRepository(session)


@router.post("", response_model=User, status_code=201)
async def create_user(data: UserCreate, repository: UserRepository = Depends(get_repository)) -> User:
    return await repository.create(data)

from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from db import get_db
from repositories.user import UserRepository
from schemas.user import User, UserCreate, UserUpdate

router = APIRouter(prefix="/api/users", tags=["users"])


def get_repository(session: AsyncSession = Depends(get_db)) -> UserRepository:
    return UserRepository(session)


@router.get("", response_model=List[User])
async def get_users(repository: UserRepository = Depends(get_repository)) -> List[User]:
    return await repository.get_all()


@router.get("/{user_id}", response_model=User)
async def get_user(user_id: int, repository: UserRepository = Depends(get_repository)) -> User:
    user = await repository.get_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.post("", response_model=User, status_code=201)
async def create_user(data: UserCreate, repository: UserRepository = Depends(get_repository)) -> User:
    return await repository.create(data)


@router.patch("/{user_id}", response_model=User)
async def update_user(user_id: int, data: UserUpdate, repository: UserRepository = Depends(get_repository)) -> User:
    user = await repository.update(user_id, data)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.delete("/{user_id}", status_code=204)
async def delete_user(user_id: int, repository: UserRepository = Depends(get_repository)) -> None:
    deleted = await repository.delete(user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="User not found")

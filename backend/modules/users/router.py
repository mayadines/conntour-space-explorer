from fastapi import APIRouter, Depends, HTTPException

from db import DBSession, get_db
from exceptions import DuplicateEntryError
from modules.users.repository import UserRepository
from modules.users.schemas import User, UserCreate

router = APIRouter(prefix="/api/users", tags=["users"])


def get_repository(db: DBSession = Depends(get_db)) -> UserRepository:
    return UserRepository(db)


@router.post("", response_model=User, status_code=201)
async def create_user(data: UserCreate, repository: UserRepository = Depends(get_repository)) -> User:
    try:
        return await repository.create(data)
    except DuplicateEntryError:
        raise HTTPException(status_code=409, detail="Username already exists")
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to create user")

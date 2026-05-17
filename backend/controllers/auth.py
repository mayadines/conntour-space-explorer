from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from db import get_db
from repositories.auth import AuthRepository
from schemas.auth import LoginRequest
from schemas.user import User

router = APIRouter(prefix="/api/auth", tags=["auth"])


def get_repository(session: AsyncSession = Depends(get_db)) -> AuthRepository:
    return AuthRepository(session)


@router.post("/login", response_model=User)
async def login(data: LoginRequest, repository: AuthRepository = Depends(get_repository)) -> User:
    user = await repository.login(data)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user

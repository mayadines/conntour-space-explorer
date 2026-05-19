from fastapi import APIRouter, Depends, HTTPException
from db import DBSession, get_db
from modules.auth.repository import AuthRepository
from modules.auth.schemas import LoginRequest, TokenResponse
from modules.auth.security import create_access_token

router = APIRouter(prefix="/api/auth", tags=["auth"])


def get_repository(db: DBSession = Depends(get_db)) -> AuthRepository:
    return AuthRepository(db)


@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest, repository: AuthRepository = Depends(get_repository)) -> TokenResponse:
    try:
        user = await repository.login(data)
        if not user:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return TokenResponse(access_token=create_access_token(user.id, user.user_name))
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail="Login failed")

from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from db.models import UserModel
from schemas.auth import LoginRequest
from schemas.user import User


class AuthRepository:
    def __init__(self, session: AsyncSession):
        self._session = session

    async def login(self, data: LoginRequest) -> Optional[User]:
        result = await self._session.execute(
            select(UserModel).where(
                UserModel.user_name == data.user_name,
                UserModel.user_password == data.user_password,
            )
        )
        row = result.scalar_one_or_none()
        return User.model_validate(row) if row else None

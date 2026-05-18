from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from db.models import UserModel
from modules.auth.schemas import LoginRequest
from modules.auth.security import verify_password
from modules.users.schemas import User


class AuthRepository:
    def __init__(self, session: AsyncSession):
        self._session = session

    async def login(self, data: LoginRequest) -> Optional[User]:
        result = await self._session.execute(
            select(UserModel).where(UserModel.user_name == data.user_name)
        )
        row = result.scalar_one_or_none()
        if not row or not verify_password(data.user_password, row.user_password):
            return None
        return User.model_validate(row)

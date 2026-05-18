from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from db.models import UserModel
from modules.auth.security import hash_password
from modules.users.schemas import User, UserCreate


class UserRepository:
    def __init__(self, session: AsyncSession):
        self._session = session

    async def create(self, data: UserCreate) -> User:
        user = UserModel(user_name=data.user_name, user_password=hash_password(data.user_password))
        self._session.add(user)
        await self._session.commit()
        await self._session.refresh(user)
        return User.model_validate(user)

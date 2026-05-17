from typing import List, Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from db.models import UserModel
from repositories.base import Repository
from schemas.user import User, UserCreate, UserUpdate


class UserRepository(Repository[User]):
    def __init__(self, session: AsyncSession):
        self._session = session

    async def get_all(self) -> List[User]:
        result = await self._session.execute(select(UserModel))
        return [User.model_validate(row) for row in result.scalars().all()]

    async def get_by_id(self, user_id: int) -> Optional[User]:
        result = await self._session.execute(select(UserModel).where(UserModel.id == user_id))
        row = result.scalar_one_or_none()
        return User.model_validate(row) if row else None

    async def create(self, data: UserCreate) -> User:
        user = UserModel(user_name=data.user_name, user_password=data.user_password)
        self._session.add(user)
        await self._session.commit()
        await self._session.refresh(user)
        return User.model_validate(user)

    async def update(self, user_id: int, data: UserUpdate) -> Optional[User]:
        result = await self._session.execute(select(UserModel).where(UserModel.id == user_id))
        user = result.scalar_one_or_none()
        if not user:
            return None
        if data.user_name is not None:
            user.user_name = data.user_name
        if data.user_password is not None:
            user.user_password = data.user_password
        await self._session.commit()
        await self._session.refresh(user)
        return User.model_validate(user)

    async def delete(self, user_id: int) -> bool:
        result = await self._session.execute(select(UserModel).where(UserModel.id == user_id))
        user = result.scalar_one_or_none()
        if not user:
            return False
        await self._session.delete(user)
        await self._session.commit()
        return True

from repository import BaseRepository
from db.models import UserModel
from modules.auth.security import hash_password
from modules.users.schemas import User, UserCreate


class UserRepository(BaseRepository):
    async def create(self, data: UserCreate) -> User:
        new_user = UserModel(user_name=data.user_name, user_password=hash_password(data.user_password))
        saved_user = await self._db_session.add(new_user)
        return User.model_validate(saved_user)

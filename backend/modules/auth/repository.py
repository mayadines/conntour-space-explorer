from typing import Optional

from repository import BaseRepository
from db.models import UserModel
from modules.auth.schemas import LoginRequest
from modules.auth.security import verify_password
from modules.users.schemas import User


class AuthRepository(BaseRepository):
    async def login(self, data: LoginRequest) -> Optional[User]:
        user_record = await self._db_session.get_one(UserModel, {"user_name": data.user_name})
        if not user_record or not verify_password(data.user_password, user_record.user_password):
            return None
        return User.model_validate(user_record)

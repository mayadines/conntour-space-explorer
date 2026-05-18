from modules.users.schemas import UserBase


class LoginRequest(UserBase):
    user_password: str

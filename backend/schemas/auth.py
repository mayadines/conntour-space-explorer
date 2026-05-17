from schemas.user import UserBase


class LoginRequest(UserBase):
    user_password: str

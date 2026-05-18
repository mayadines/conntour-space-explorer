from pydantic import BaseModel

from modules.users.schemas import UserBase


class LoginRequest(UserBase):
    user_password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

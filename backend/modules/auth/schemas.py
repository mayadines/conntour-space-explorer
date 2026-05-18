from pydantic import BaseModel


class LoginRequest(BaseModel):
    user_name: str
    user_password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

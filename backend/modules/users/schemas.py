from typing import Optional

from pydantic import BaseModel, ConfigDict


class UserCreate(BaseModel):
    user_name: str
    user_password: str


class UserUpdate(BaseModel):
    user_name: Optional[str] = None
    user_password: Optional[str] = None


class User(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_name: str

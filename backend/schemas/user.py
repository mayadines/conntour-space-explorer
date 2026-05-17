from typing import Optional

from pydantic import BaseModel, ConfigDict


class UserBase(BaseModel):
    user_name: str


class UserCreate(UserBase):
    user_password: str


class UserUpdate(BaseModel):
    user_name: Optional[str] = None
    user_password: Optional[str] = None


class User(UserBase):
    model_config = ConfigDict(from_attributes=True)

    id: int

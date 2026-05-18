from pydantic import BaseModel, ConfigDict


class UserCreate(BaseModel):
    user_name: str
    user_password: str


class User(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_name: str

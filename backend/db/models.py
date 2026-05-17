from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class SourceModel(Base):
    __tablename__ = "sources"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(Text, nullable=False)
    type = Column(String(100), nullable=False)
    launch_date = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    image_url = Column(Text, nullable=True)
    status = Column(String(50), nullable=False, default="Active")


class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String(255), nullable=False, unique=True)
    user_password = Column(String(255), nullable=False)

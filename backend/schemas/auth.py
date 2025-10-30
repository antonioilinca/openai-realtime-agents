from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


class Token(BaseModel):
  access_token: str
  token_type: str = "bearer"


class UserBase(BaseModel):
  email: EmailStr


class UserCreate(UserBase):
  password: str = Field(min_length=8)


class UserPublic(UserBase):
  id: int
  created_at: datetime

  class Config:
    from_attributes = True


class LoginRequest(UserBase):
  password: str

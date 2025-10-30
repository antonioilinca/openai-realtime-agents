from datetime import datetime, timedelta, timezone
from typing import Any, Dict

from jose import JWTError, jwt
from passlib.context import CryptContext

from backend.core.config import get_settings

# Fonctions de sécurité (hashage et gestion des tokens JWT).

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str) -> str:
  return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
  return pwd_context.verify(plain_password, hashed_password)


def create_access_token(subject: str, expires_minutes: int | None = None, extra_claims: Dict[str, Any] | None = None) -> str:
  settings = get_settings()
  expire_delta = timedelta(minutes=expires_minutes or settings.token_expire_minutes)
  payload: Dict[str, Any] = {"sub": subject, "exp": datetime.now(timezone.utc) + expire_delta}
  if extra_claims:
    payload.update(extra_claims)
  return jwt.encode(payload, settings.jwt_secret, algorithm="HS256")


def decode_token(token: str) -> Dict[str, Any]:
  settings = get_settings()
  try:
    return jwt.decode(token, settings.jwt_secret, algorithms=["HS256"])
  except JWTError as exc:
    raise ValueError("Token invalide") from exc

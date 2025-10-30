from typing import AsyncGenerator, Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from prisma import Prisma

from backend.utils.security import decode_token

# Dépendances communes (connexion Prisma et récupération de l'utilisateur courant).

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login", auto_error=False)
prisma = Prisma()


async def get_db() -> AsyncGenerator[Prisma, None]:
  if not prisma.is_connected():
    await prisma.connect()
  yield prisma


async def get_current_user(token: Optional[str] = Depends(oauth2_scheme), db: Prisma = Depends(get_db)):
  if not token:
    return None
  try:
    payload = decode_token(token)
  except ValueError as exc:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(exc)) from exc

  user_id = payload.get("sub")
  if not user_id:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token invalide")

  user = await db.user.find_unique(where={"id": int(user_id)})
  if not user:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Utilisateur introuvable")
  return user

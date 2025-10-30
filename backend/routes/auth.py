from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from prisma import Prisma

from backend.schemas.auth import LoginRequest, Token, UserCreate, UserPublic
from backend.utils.deps import get_current_user, get_db
from backend.utils.security import create_access_token, get_password_hash, verify_password

# Routes d'authentification (inscription, connexion et profil).

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
async def register_user(payload: UserCreate, db: Prisma = Depends(get_db)):
  """Création d'un compte utilisateur avec hashage sécurisé."""
  existing = await db.user.find_unique(where={"email": payload.email})
  if existing:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Un compte existe déjà pour cet email")
  user = await db.user.create(
    data={"email": payload.email, "password_hash": get_password_hash(payload.password)}
  )
  return user


@router.post("/login", response_model=Token)
async def login_user(form_data: OAuth2PasswordRequestForm = Depends(), db: Prisma = Depends(get_db)):
  user = await db.user.find_unique(where={"email": form_data.username})
  if not user or not verify_password(form_data.password, user.password_hash):
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Identifiants invalides")
  token = create_access_token(str(user.id))
  return Token(access_token=token)


@router.post("/login-json", response_model=Token)
async def login_user_json(payload: LoginRequest, db: Prisma = Depends(get_db)):
  user = await db.user.find_unique(where={"email": payload.email})
  if not user or not verify_password(payload.password, user.password_hash):
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Identifiants invalides")
  token = create_access_token(str(user.id))
  return Token(access_token=token)


@router.get("/me", response_model=UserPublic)
async def get_profile(user = Depends(get_current_user)):
  if not user:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentification requise")
  return user

from __future__ import annotations

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

from backend.routes import analyze, auth, pdf
from backend.utils.deps import prisma

# Point d'entrée FastAPI (initialisation, middlewares et routes).

logger = logging.getLogger(__name__)


@asynccontextmanager
def lifespan(app: FastAPI):
  if not prisma.is_connected():
    await prisma.connect()
  yield
  if prisma.is_connected():
    await prisma.disconnect()


def create_app() -> FastAPI:
  app = FastAPI(
    title="LexaIA API",
    description="Assistant juridique français LexaIA",
    version="0.1.0",
    lifespan=lifespan
  )

  app.state.limiter = analyze.limiter
  app.add_exception_handler(RateLimitExceeded, analyze.limiter._rate_limit_exceeded_handler)  # type: ignore[attr-defined]
  app.add_middleware(SlowAPIMiddleware)

  app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
  )

  app.include_router(auth.router)
  app.include_router(analyze.router)
  app.include_router(pdf.router)

  @app.exception_handler(Exception)
  async def global_exception_handler(request, exc):  # type: ignore[override]
    logger.exception("Erreur inattendue", exc_info=exc)
    return JSONResponse(status_code=500, content={"detail": "Erreur interne inattendue"})

  return app


app = create_app()

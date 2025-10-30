"""FastAPI application entrypoint for the Lexora backend."""
from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from lexora.api import routes
from lexora.core.config import settings


def create_app() -> FastAPI:
    """Instantiate the FastAPI application."""
    app = FastAPI(
        title="Lexora API",
        description=(
            "Lexora provides general legal information, procedural guidance, "
            "and templated documents with explicit sourcing."
        ),
        version="0.1.0",
    )
    if settings.cors_allowed_origins:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=settings.cors_allowed_origins,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
    app.include_router(routes.router, prefix="/api")

    @app.get("/health", tags=["health"])
    async def healthcheck() -> dict[str, str]:
        """Simple healthcheck endpoint."""
        return {"status": "ok", "environment": settings.environment}

    return app


app = create_app()

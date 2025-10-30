"""Application configuration management."""
from __future__ import annotations

from functools import lru_cache
from typing import List

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Environment-backed settings for the backend service."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    environment: str = Field(default="development")
    db_url: str = Field(
        "postgresql+asyncpg://lexora:lexora@localhost:5432/lexora",
        alias="DB_URL",
    )
    opensearch_url: str = Field("https://localhost:9200", alias="OPENSEARCH_URL")
    redis_url: str = Field("redis://localhost:6379/0", alias="REDIS_URL")
    piste_client_id: str = Field("demo-client", alias="PISTE_CLIENT_ID")
    piste_client_secret: str = Field("demo-secret", alias="PISTE_CLIENT_SECRET")
    piste_token_url: str = Field("https://piste.gouv.fr/api/oauth/token", alias="PISTE_TOKEN_URL")
    openai_api_key: str = Field("sk-demo", alias="OPENAI_API_KEY")
    jwt_secret: str = Field("demo-secret", alias="JWT_SECRET")
    pdf_base_url: str = Field("http://localhost:3000", alias="PDF_BASE_URL")
    openfisca_api_url: str = Field("https://api.openfisca.fr", alias="OPENFISCA_API_URL")
    cors_allowed_origins: List[str] = Field(
        default_factory=lambda: ["http://localhost:3000", "http://127.0.0.1:3000"],
        alias="CORS_ALLOWED_ORIGINS",
    )


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    """Return a cached Settings instance."""

    return Settings()


settings = get_settings()

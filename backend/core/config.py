from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict

# Paramètres centraux de l'application (clés API, base de données, secrets JWT).


class Settings(BaseSettings):
  openai_api_key: str | None = None
  legifrance_api_key: str | None = None
  database_url: str
  jwt_secret: str
  token_expire_minutes: int = 60 * 24
  mistral_api_key: str | None = None

  model_config = SettingsConfigDict(env_file=".env", env_prefix="", extra="ignore")


@lru_cache()
def get_settings() -> Settings:
  return Settings()

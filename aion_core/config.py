from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any

import yaml


@dataclass(frozen=True)
class AppConfig:
    environment: str
    user_agent: str
    rate_limit_per_host: float
    request_timeout_seconds: int
    max_retries: int
    backoff_seconds: int
    daily_brief_hour: int
    ingestion_interval_minutes: int
    health_check_interval_minutes: int


@dataclass(frozen=True)
class StorageConfig:
    root_path: Path
    raw_path: Path
    cache_path: Path
    reports_path: Path
    vector_path: Path
    sqlite_path: Path


@dataclass(frozen=True)
class IndexConfig:
    embedding_dim: int
    similarity_threshold: float
    max_near_duplicates: int


@dataclass(frozen=True)
class SourceQualityConfig:
    base_scores: dict[str, float]
    domain_overrides: dict[str, float]


@dataclass(frozen=True)
class EvaluationConfig:
    novelty_threshold: float
    hallucination_keyword_blacklist: list[str]


@dataclass(frozen=True)
class Config:
    app: AppConfig
    storage: StorageConfig
    index: IndexConfig
    source_quality: SourceQualityConfig
    evaluation: EvaluationConfig


def load_config(path: str | Path) -> Config:
    with open(path, "r", encoding="utf-8") as handle:
        payload = yaml.safe_load(handle)

    app = payload["app"]
    storage = payload["storage"]
    index = payload["index"]
    source_quality = payload["source_quality"]
    evaluation = payload["evaluation"]

    return Config(
        app=AppConfig(**app),
        storage=StorageConfig(
            root_path=Path(storage["root_path"]),
            raw_path=Path(storage["raw_path"]),
            cache_path=Path(storage["cache_path"]),
            reports_path=Path(storage["reports_path"]),
            vector_path=Path(storage["vector_path"]),
            sqlite_path=Path(storage["sqlite_path"]),
        ),
        index=IndexConfig(**index),
        source_quality=SourceQualityConfig(**source_quality),
        evaluation=EvaluationConfig(**evaluation),
    )


def load_sources(path: str | Path) -> list[dict[str, Any]]:
    with open(path, "r", encoding="utf-8") as handle:
        payload = yaml.safe_load(handle)
    return payload.get("sources", [])


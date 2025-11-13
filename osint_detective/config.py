"""Configuration management for the OSINT detective."""
from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import List, Optional


@dataclass
class Settings:
    """Runtime configuration options for the detective agent."""

    data_dir: Path = Path("output")
    vector_store_path: Path = Path("output/vector_store.faiss")
    metadata_store_path: Path = Path("output/metadata.json")
    scraping_timeout: int = 20
    user_agent: str = (
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/114.0 Safari/537.36"
    )
    max_concurrent_requests: int = 5
    embedding_model: str = "sentence-transformers/all-mpnet-base-v2"
    embedding_batch_size: int = 8
    similarity_threshold: float = 0.82
    summary_model_path: Optional[str] = None
    summary_model: str = "bart-large-cnn"
    summary_max_tokens: int = 512
    max_summary_sentences: int = 8
    scheduler_cron: str = "0 7 * * *"  # daily at 07:00
    cache_dir: Optional[Path] = None
    allowed_domains: Optional[List[str]] = None
    disallowed_domains: List[str] = field(default_factory=list)

    def prepare(self) -> None:
        """Create required directories."""
        self.data_dir.mkdir(parents=True, exist_ok=True)
        if self.cache_dir:
            self.cache_dir.mkdir(parents=True, exist_ok=True)

from __future__ import annotations

from dataclasses import dataclass

from aion_core.pipeline import ingest_sources
from aion_core.config import Config


@dataclass
class CrawlerAgent:
    config: Config
    sources_path: str

    def run(self) -> int:
        documents = ingest_sources(self.config, self.sources_path)
        return len(documents)


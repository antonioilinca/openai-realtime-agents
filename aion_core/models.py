from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from typing import Any


@dataclass
class SourceRecord:
    source_id: str
    name: str
    url: str
    type: str
    topics: list[str]


@dataclass
class DocumentRecord:
    doc_id: str
    source_id: str
    url: str
    canonical_url: str
    title: str
    author: str | None
    published_at: datetime | None
    ingested_at: datetime
    language: str | None
    content_hash: str
    summary_short: str | None
    summary_long: str | None
    tags: list[str]
    raw_path: str
    metadata: dict[str, Any]


@dataclass
class ClaimRecord:
    doc_id: str
    kind: str
    text: str
    confidence: float


@dataclass
class BriefRecord:
    report_date: str
    summary_md: str
    summary_json: dict[str, Any]


@dataclass
class BeliefStatement:
    subject: str
    statement: str
    kind: str
    confidence: float
    evidence: list[dict[str, Any]]
    last_updated: str
    contradictions: list[dict[str, Any]]


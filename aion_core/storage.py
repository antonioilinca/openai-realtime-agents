from __future__ import annotations

import json
import sqlite3
from contextlib import contextmanager
from datetime import datetime
from pathlib import Path
from typing import Any, Iterator

from aion_core.models import ClaimRecord, DocumentRecord


def init_db(sqlite_path: Path) -> None:
    sqlite_path.parent.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(sqlite_path) as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS documents (
                doc_id TEXT PRIMARY KEY,
                source_id TEXT,
                url TEXT,
                canonical_url TEXT,
                title TEXT,
                author TEXT,
                published_at TEXT,
                ingested_at TEXT,
                language TEXT,
                content_hash TEXT,
                summary_short TEXT,
                summary_long TEXT,
                tags TEXT,
                raw_path TEXT,
                metadata TEXT
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS claims (
                doc_id TEXT,
                kind TEXT,
                text TEXT,
                confidence REAL
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS sources (
                source_id TEXT PRIMARY KEY,
                name TEXT,
                url TEXT,
                type TEXT,
                topics TEXT
            )
            """
        )
        conn.commit()


@contextmanager
def open_db(sqlite_path: Path) -> Iterator[sqlite3.Connection]:
    conn = sqlite3.connect(sqlite_path)
    try:
        yield conn
    finally:
        conn.close()


def upsert_source(sqlite_path: Path, source: dict[str, Any]) -> None:
    with open_db(sqlite_path) as conn:
        conn.execute(
            """
            INSERT INTO sources (source_id, name, url, type, topics)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(source_id) DO UPDATE SET
                name=excluded.name,
                url=excluded.url,
                type=excluded.type,
                topics=excluded.topics
            """,
            (
                source["id"],
                source["name"],
                source["url"],
                source["type"],
                json.dumps(source.get("topics", [])),
            ),
        )
        conn.commit()


def store_document(sqlite_path: Path, document: DocumentRecord) -> None:
    with open_db(sqlite_path) as conn:
        conn.execute(
            """
            INSERT OR REPLACE INTO documents (
                doc_id, source_id, url, canonical_url, title, author,
                published_at, ingested_at, language, content_hash,
                summary_short, summary_long, tags, raw_path, metadata
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                document.doc_id,
                document.source_id,
                document.url,
                document.canonical_url,
                document.title,
                document.author,
                document.published_at.isoformat() if document.published_at else None,
                document.ingested_at.isoformat(),
                document.language,
                document.content_hash,
                document.summary_short,
                document.summary_long,
                json.dumps(document.tags),
                document.raw_path,
                json.dumps(document.metadata),
            ),
        )
        conn.commit()


def store_claims(sqlite_path: Path, claims: list[ClaimRecord]) -> None:
    with open_db(sqlite_path) as conn:
        conn.executemany(
            """
            INSERT INTO claims (doc_id, kind, text, confidence)
            VALUES (?, ?, ?, ?)
            """,
            [(c.doc_id, c.kind, c.text, c.confidence) for c in claims],
        )
        conn.commit()


def list_documents(sqlite_path: Path) -> list[DocumentRecord]:
    with open_db(sqlite_path) as conn:
        rows = conn.execute("SELECT * FROM documents").fetchall()
    documents: list[DocumentRecord] = []
    for row in rows:
        (
            doc_id,
            source_id,
            url,
            canonical_url,
            title,
            author,
            published_at,
            ingested_at,
            language,
            content_hash,
            summary_short,
            summary_long,
            tags,
            raw_path,
            metadata,
        ) = row
        documents.append(
            DocumentRecord(
                doc_id=doc_id,
                source_id=source_id,
                url=url,
                canonical_url=canonical_url,
                title=title,
                author=author,
                published_at=datetime.fromisoformat(published_at) if published_at else None,
                ingested_at=datetime.fromisoformat(ingested_at),
                language=language,
                content_hash=content_hash,
                summary_short=summary_short,
                summary_long=summary_long,
                tags=json.loads(tags or "[]"),
                raw_path=raw_path,
                metadata=json.loads(metadata or "{}"),
            )
        )
    return documents


def list_claims(sqlite_path: Path) -> list[ClaimRecord]:
    with open_db(sqlite_path) as conn:
        rows = conn.execute("SELECT doc_id, kind, text, confidence FROM claims").fetchall()
    return [ClaimRecord(*row) for row in rows]


from __future__ import annotations

import json
import logging
import time
from datetime import datetime
from pathlib import Path
from typing import Any

import httpx

from aion_core.belief_state import build_beliefs, save_beliefs
from aion_core.config import Config, load_sources
from aion_core.dedupe import find_near_duplicates, is_exact_duplicate
from aion_core.embeddings import HashedEmbedder
from aion_core.extract import canonicalize_url, content_hash, extract_text, parse_date
from aion_core.index import VectorIndex
from aion_core.ingest import cache_response, fetch_rss, fetch_url, hash_content, normalize_url
from aion_core.models import ClaimRecord, DocumentRecord
from aion_core.reporting import build_daily_brief, save_report
from aion_core.source_quality import score_source
from aion_core.storage import init_db, list_documents, store_claims, store_document, upsert_source
from aion_core.summarize import classify_topics, detect_contradictions, extract_claims, summarize
from aion_core.evaluation import evaluate_documents

logger = logging.getLogger("aion")


def setup_logging(level: str) -> None:
    logging.basicConfig(
        level=level,
        format='{"time": "%(asctime)s", "level": "%(levelname)s", "message": "%(message)s"}',
    )


def ingest_sources(config: Config, sources_path: str | Path) -> list[DocumentRecord]:
    init_db(config.storage.sqlite_path)
    sources = load_sources(sources_path)

    for source in sources:
        upsert_source(config.storage.sqlite_path, source)

    existing_docs = list_documents(config.storage.sqlite_path)
    existing_hashes = {doc.content_hash for doc in existing_docs}

    embedder = HashedEmbedder(config.index.embedding_dim)
    index = VectorIndex(config.index.embedding_dim, config.storage.vector_path / "aion.index")
    index.load()
    existing_embeddings = embedder.embed_batch([doc.summary_long or "" for doc in existing_docs])

    new_documents: list[DocumentRecord] = []
    claims_to_store: list[ClaimRecord] = []

    with httpx.Client(headers={"User-Agent": config.app.user_agent}, timeout=config.app.request_timeout_seconds) as client:
        for source in sources:
            if source["type"] != "rss":
                continue
            entries = fetch_rss(source, config)
            for entry in entries:
                url = entry.get("url")
                if not url:
                    continue
                normalized_url = normalize_url(url)
                fetched = fetch_url(client, normalized_url, config)
                if not fetched or fetched.status_code != 200:
                    continue
                cache_response(config.storage.cache_path, normalized_url, fetched.content)

                extracted = extract_text(fetched.content)
                text = extracted["text"] or entry.get("summary") or ""
                if not text.strip():
                    continue

                hash_value = content_hash(text)
                if is_exact_duplicate(existing_hashes, hash_value):
                    continue

                canonical = canonicalize_url(normalized_url)
                summary_short, summary_long = summarize(text)
                claims = extract_claims(text)
                topics = classify_topics(text, source.get("topics", []))
                contradictions = detect_contradictions(claims)

                embedding = embedder.embed(summary_long)
                near_duplicates = find_near_duplicates(existing_embeddings, embedding, config.index)
                novelty_score = 1.0 if not near_duplicates else 0.5

                doc_id = hash_content(f"{canonical}:{hash_value}")
                raw_path = config.storage.raw_path / f"{doc_id}.txt"
                raw_path.parent.mkdir(parents=True, exist_ok=True)
                raw_path.write_text(text, encoding="utf-8")

                published_at = parse_date(entry.get("published"))
                source_quality = score_source(normalized_url, published_at, config.source_quality)

                document = DocumentRecord(
                    doc_id=doc_id,
                    source_id=source["id"],
                    url=normalized_url,
                    canonical_url=canonical,
                    title=extracted.get("title") or entry.get("title") or "Untitled",
                    author=extracted.get("author") or entry.get("author"),
                    published_at=published_at,
                    ingested_at=datetime.utcnow(),
                    language=extracted.get("language"),
                    content_hash=hash_value,
                    summary_short=summary_short,
                    summary_long=summary_long,
                    tags=topics,
                    raw_path=str(raw_path),
                    metadata={
                        "facts": claims,
                        "interpretations": [],
                        "hypotheses": [],
                        "contradictions": contradictions,
                        "source_quality": source_quality,
                        "novelty": novelty_score,
                    },
                )

                store_document(config.storage.sqlite_path, document)
                claims_to_store.extend(
                    [
                        ClaimRecord(doc_id=document.doc_id, **claim)
                        for claim in claims
                    ]
                )
                existing_hashes.add(hash_value)
                existing_embeddings.append(embedding)
                index.add([embedding], [document.doc_id])
                new_documents.append(document)
                time.sleep(1 / max(config.app.rate_limit_per_host, 1))

    if claims_to_store:
        store_claims(config.storage.sqlite_path, claims_to_store)

    index.save()
    return new_documents


def generate_outputs(config: Config, documents: list[DocumentRecord]) -> dict[str, Any]:
    brief = build_daily_brief(documents)
    json_path, md_path = save_report(config.storage.reports_path, brief)

    beliefs = build_beliefs(documents)
    belief_path = config.storage.reports_path / "beliefs.json"
    save_beliefs(belief_path, beliefs)

    evaluation = evaluate_documents(documents, config.evaluation)

    return {
        "brief_json": str(json_path),
        "brief_md": str(md_path),
        "beliefs": str(belief_path),
        "evaluation": evaluation,
    }


def run_pipeline(config: Config, sources_path: str | Path) -> dict[str, Any]:
    logger.info("Starting ingestion pipeline")
    documents = ingest_sources(config, sources_path)
    logger.info("Ingested %s documents", len(documents))
    outputs = generate_outputs(config, documents)
    logger.info("Generated outputs: %s", json.dumps(outputs))
    return outputs


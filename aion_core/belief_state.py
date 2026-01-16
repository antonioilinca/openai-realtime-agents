from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path
from typing import Any

from aion_core.models import BeliefStatement, DocumentRecord


def build_beliefs(documents: list[DocumentRecord]) -> list[BeliefStatement]:
    beliefs: list[BeliefStatement] = []
    for doc in documents:
        statement = BeliefStatement(
            subject=doc.title,
            statement=doc.summary_short or "",
            kind="fact",
            confidence=doc.metadata.get("source_quality", 0.5),
            evidence=[
                {
                    "url": doc.url,
                    "published_at": doc.published_at.isoformat() if doc.published_at else None,
                    "ingested_at": doc.ingested_at.isoformat(),
                    "hash": doc.content_hash,
                    "excerpt": (doc.summary_short or "")[:160],
                }
            ],
            last_updated=datetime.utcnow().isoformat(),
            contradictions=[],
        )
        beliefs.append(statement)
    return beliefs


def save_beliefs(path: Path, beliefs: list[BeliefStatement]) -> None:
    payload = {
        "generated_at": datetime.utcnow().isoformat(),
        "beliefs": [belief.__dict__ for belief in beliefs],
    }
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2), encoding="utf-8")


def load_beliefs(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {"beliefs": []}
    return json.loads(path.read_text(encoding="utf-8"))


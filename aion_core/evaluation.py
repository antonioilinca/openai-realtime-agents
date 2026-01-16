from __future__ import annotations

from datetime import datetime
from typing import Any

from aion_core.config import EvaluationConfig
from aion_core.models import DocumentRecord


def evaluate_documents(
    documents: list[DocumentRecord],
    config: EvaluationConfig,
) -> dict[str, Any]:
    novelty_scores = [doc.metadata.get("novelty", 0.0) for doc in documents]
    average_novelty = sum(novelty_scores) / len(novelty_scores) if documents else 0.0

    hallucination_flags = []
    for doc in documents:
        lower = (doc.summary_long or "").lower()
        flagged = any(keyword in lower for keyword in config.hallucination_keyword_blacklist)
        hallucination_flags.append(flagged)

    return {
        "evaluated_at": datetime.utcnow().isoformat(),
        "document_count": len(documents),
        "average_novelty": average_novelty,
        "hallucination_flags": sum(1 for flag in hallucination_flags if flag),
    }


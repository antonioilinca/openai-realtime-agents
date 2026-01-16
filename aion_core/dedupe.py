from __future__ import annotations

import numpy as np

from aion_core.config import IndexConfig


def is_exact_duplicate(existing_hashes: set[str], content_hash: str) -> bool:
    return content_hash in existing_hashes


def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    denom = np.linalg.norm(a) * np.linalg.norm(b)
    if denom == 0:
        return 0.0
    return float(np.dot(a, b) / denom)


def find_near_duplicates(
    embeddings: list[np.ndarray],
    candidate: np.ndarray,
    config: IndexConfig,
) -> list[int]:
    scores = []
    for idx, vector in enumerate(embeddings):
        score = cosine_similarity(vector, candidate)
        if score >= config.similarity_threshold:
            scores.append(idx)
        if len(scores) >= config.max_near_duplicates:
            break
    return scores


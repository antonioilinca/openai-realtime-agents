from __future__ import annotations

import hashlib
from typing import Iterable

import numpy as np


class HashedEmbedder:
    def __init__(self, dim: int = 256) -> None:
        self.dim = dim

    def embed(self, text: str) -> np.ndarray:
        tokens = text.lower().split()
        vector = np.zeros(self.dim, dtype=np.float32)
        for token in tokens:
            idx = int(hashlib.md5(token.encode("utf-8")).hexdigest(), 16) % self.dim
            vector[idx] += 1.0
        norm = np.linalg.norm(vector)
        if norm > 0:
            vector = vector / norm
        return vector

    def embed_batch(self, texts: Iterable[str]) -> list[np.ndarray]:
        return [self.embed(text) for text in texts]


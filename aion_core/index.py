from __future__ import annotations

from pathlib import Path

import faiss
import numpy as np


class VectorIndex:
    def __init__(self, dim: int, index_path: Path) -> None:
        self.dim = dim
        self.index_path = index_path
        self.index = faiss.IndexFlatIP(dim)
        self.doc_ids: list[str] = []

    def add(self, vectors: list[np.ndarray], doc_ids: list[str]) -> None:
        if not vectors:
            return
        matrix = np.vstack(vectors).astype("float32")
        self.index.add(matrix)
        self.doc_ids.extend(doc_ids)

    def search(self, query: np.ndarray, top_k: int = 5) -> list[tuple[str, float]]:
        if self.index.ntotal == 0:
            return []
        query_matrix = np.expand_dims(query.astype("float32"), axis=0)
        scores, indices = self.index.search(query_matrix, top_k)
        results = []
        for score, idx in zip(scores[0], indices[0]):
            if idx < 0:
                continue
            results.append((self.doc_ids[idx], float(score)))
        return results

    def save(self) -> None:
        self.index_path.parent.mkdir(parents=True, exist_ok=True)
        faiss.write_index(self.index, str(self.index_path))
        (self.index_path.with_suffix(".ids")).write_text("\n".join(self.doc_ids), encoding="utf-8")

    def load(self) -> None:
        if self.index_path.exists():
            self.index = faiss.read_index(str(self.index_path))
        ids_path = self.index_path.with_suffix(".ids")
        if ids_path.exists():
            self.doc_ids = ids_path.read_text(encoding="utf-8").splitlines()


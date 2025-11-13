"""Vector store backed by FAISS with metadata persistence."""
from __future__ import annotations

import json
import logging
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Iterable, List, Optional

import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

from .scraper import ScrapedDocument, chunk_text

logger = logging.getLogger(__name__)


@dataclass
class EmbeddedChunk:
    """A text chunk along with its metadata."""

    id: str
    url: str
    title: str
    text: str
    chunk: str
    embedding: List[float]
    fetched_at: float
    summary: Optional[str] = None


class VectorStore:
    """Wrapper over FAISS index for semantic retrieval."""

    def __init__(
        self,
        index_path: Path,
        metadata_path: Path,
        model_name: str,
        batch_size: int = 8,
        cache_dir: Optional[Path] = None,
    ) -> None:
        self.index_path = index_path
        self.metadata_path = metadata_path
        self.model_name = model_name
        self.batch_size = batch_size
        self.cache_dir = cache_dir
        self.model: Optional[SentenceTransformer] = None
        self.index: Optional[faiss.IndexFlatIP] = None
        self.metadata: List[EmbeddedChunk] = []

    def load(self) -> None:
        """Load index and metadata from disk if present."""
        if self.index_path.exists():
            logger.info("Loading FAISS index from %s", self.index_path)
            self.index = faiss.read_index(str(self.index_path))
        if self.metadata_path.exists():
            logger.info("Loading metadata from %s", self.metadata_path)
            data = json.loads(self.metadata_path.read_text())
            self.metadata = [EmbeddedChunk(**item) for item in data]
        if self.index is None:
            self.index = faiss.IndexFlatIP(self.embedding_dimension)

    def save(self) -> None:
        """Persist index and metadata."""
        if self.index is None:
            raise RuntimeError("Index not initialized")
        faiss.write_index(self.index, str(self.index_path))
        serializable = [asdict(item) for item in self.metadata]
        self.metadata_path.write_text(json.dumps(serializable, indent=2))

    @property
    def embedding_dimension(self) -> int:
        model = self._ensure_model()
        return model.get_sentence_embedding_dimension()

    def _ensure_model(self) -> SentenceTransformer:
        if self.model is None:
            logger.info("Loading embedding model %s", self.model_name)
            self.model = SentenceTransformer(self.model_name, cache_folder=self.cache_dir)
        return self.model

    def add_documents(self, documents: Iterable[ScrapedDocument]) -> List[EmbeddedChunk]:
        """Embed documents and insert them into the vector store."""

        model = self._ensure_model()
        new_chunks: List[EmbeddedChunk] = []
        for doc in documents:
            for idx, chunk in enumerate(chunk_text(doc.text)):
                chunk_id = f"{doc.url}:::{idx}"
                embedding = model.encode(chunk, batch_size=self.batch_size, convert_to_numpy=True)
                norm = np.linalg.norm(embedding)
                if norm == 0:
                    continue
                embedding = embedding / norm
                embedded = EmbeddedChunk(
                    id=chunk_id,
                    url=doc.url,
                    title=doc.title,
                    text=doc.text,
                    chunk=chunk,
                    embedding=embedding.tolist(),
                    fetched_at=doc.fetched_at,
                )
                new_chunks.append(embedded)
        if not new_chunks:
            return []
        embeddings = np.vstack([chunk.embedding for chunk in new_chunks]).astype("float32")
        if self.index is None:
            self.index = faiss.IndexFlatIP(embeddings.shape[1])
        self.index.add(embeddings)
        self.metadata.extend(new_chunks)
        return new_chunks

    def search(self, query: str, top_k: int = 5) -> List[EmbeddedChunk]:
        model = self._ensure_model()
        if self.index is None or self.index.ntotal == 0:
            return []
        embedding = model.encode(query, batch_size=self.batch_size, convert_to_numpy=True)
        norm = np.linalg.norm(embedding)
        if norm == 0:
            return []
        embedding = (embedding / norm).astype("float32")
        scores, indices = self.index.search(np.expand_dims(embedding, axis=0), top_k)
        results: List[EmbeddedChunk] = []
        for score, idx in zip(scores[0], indices[0]):
            if idx == -1:
                continue
            chunk = self.metadata[idx]
            results.append(chunk)
        return results

    def detect_novelty(self, text: str, threshold: float) -> bool:
        """Return True if the text is considered novel compared to existing chunks."""

        if self.index is None or self.index.ntotal == 0:
            return True
        model = self._ensure_model()
        embedding = model.encode(text, convert_to_numpy=True)
        norm = np.linalg.norm(embedding)
        if norm == 0:
            return False
        embedding = (embedding / norm).astype("float32")
        scores, _ = self.index.search(np.expand_dims(embedding, axis=0), 1)
        max_score = float(scores[0][0]) if scores.size else 0.0
        return max_score < threshold

    def attach_summary(self, chunk_id: str, summary: str) -> None:
        for meta in self.metadata:
            if meta.id == chunk_id:
                meta.summary = summary
                return
        raise KeyError(f"Chunk {chunk_id} not found")

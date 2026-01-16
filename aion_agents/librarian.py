from __future__ import annotations

from dataclasses import dataclass

from aion_core.embeddings import HashedEmbedder
from aion_core.index import VectorIndex
from aion_core.storage import list_documents


@dataclass
class LibrarianAgent:
    sqlite_path: str
    index_path: str
    embedding_dim: int

    def search(self, query: str, top_k: int = 5) -> list[tuple[str, float]]:
        embedder = HashedEmbedder(self.embedding_dim)
        index = VectorIndex(self.embedding_dim, self.index_path)
        index.load()
        query_vector = embedder.embed(query)
        return index.search(query_vector, top_k=top_k)

    def list_titles(self) -> list[str]:
        documents = list_documents(self.sqlite_path)
        return [doc.title for doc in documents]


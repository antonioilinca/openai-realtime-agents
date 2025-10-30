"""Simplified Retrieval-Augmented Generation engine."""
from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable

from lexora.models.schemas import Citation


@dataclass
class RetrievedChunk:
    """Lightweight representation of a retrieved legal text chunk."""

    eli: str
    nor: str | None
    url: str
    version: str
    text: str
    hash: str


class RAGEngine:
    """Mockable engine responsible for retrieval and summarisation."""

    def __init__(self, *, retriever: callable | None = None, summariser: callable | None = None) -> None:
        self._retriever = retriever or self._default_retriever
        self._summariser = summariser or self._default_summariser

    async def analyse(self, prompt: str, *, domain: str) -> tuple[str, list[Citation]]:
        """Return a summarised answer and the supporting citations."""

        chunks = list(self._retriever(prompt, domain=domain))
        summary = self._summariser(prompt, chunks)
        citations = [
            Citation(
                eli=chunk.eli,
                nor=chunk.nor,
                url=chunk.url,
                version=chunk.version,
                hash=chunk.hash,
                summary=chunk.text[:240] + ("…" if len(chunk.text) > 240 else ""),
            )
            for chunk in chunks
        ]
        return summary, citations

    @staticmethod
    def _default_retriever(prompt: str, *, domain: str) -> Iterable[RetrievedChunk]:
        """Return a deterministic set of chunks for demos and tests."""

        seed = hash((prompt, domain)) % 10000
        eli = f"eli/legis/fr/etat/{domain}/{seed}"
        return [
            RetrievedChunk(
                eli=eli,
                nor=None,
                url=f"https://www.legifrance.gouv.fr/{eli}",
                version="2024-01-01",
                text=(
                    "Résumé factuel de l'article pertinent pour la situation décrite. "
                    "Ce texte est simulé en attendant l'ingestion réelle."
                ),
                hash=f"demo-{seed}",
            )
        ]

    @staticmethod
    def _default_summariser(prompt: str, chunks: Iterable[RetrievedChunk]) -> str:
        """Return a concise summary referencing retrieved articles."""

        article_refs = ", ".join(chunk.eli for chunk in chunks)
        return (
            "Synthèse préliminaire basée sur les sources suivantes : "
            f"{article_refs}. Veillez à vérifier les dates de vigueur."
        )


"""Summarization utilities leveraging local language models."""
from __future__ import annotations

import logging
import os
from dataclasses import dataclass
from typing import Iterable, Optional

from transformers import pipeline

try:
    from llama_cpp import Llama  # type: ignore
except ImportError:  # pragma: no cover
    Llama = None  # type: ignore

logger = logging.getLogger(__name__)


@dataclass
class Summary:
    chunk_id: str
    summary: str
    entities: list[str]
    dates: list[str]


class Summarizer:
    """Summarize text chunks using local models with fallbacks."""

    def __init__(
        self,
        model_name: str,
        max_tokens: int = 512,
        model_path: Optional[str] = None,
    ) -> None:
        self.model_name = model_name
        self.max_tokens = max_tokens
        self.model_path = model_path or os.getenv("LLAMA_MODEL_PATH")
        self._pipeline = None
        self._llama = None

    def summarize(self, chunk_id: str, text: str) -> Summary:
        """Generate a factual summary and extract entities/dates."""

        summary_text = self._summarize_text(text)
        entities = self._extract_entities(summary_text)
        dates = self._extract_dates(summary_text)
        return Summary(chunk_id=chunk_id, summary=summary_text, entities=entities, dates=dates)

    def _summarize_text(self, text: str) -> str:
        prompt = (
            "Summarize the following passage focusing on verifiable facts, key actors, dates, "
            "and any controversies. Respond in under 8 sentences.\n\n" + text
        )
        if self.model_path and Llama is not None:
            try:
                if self._llama is None:
                    logger.info("Loading llama.cpp model from %s", self.model_path)
                    self._llama = Llama(model_path=self.model_path, n_ctx=4096, n_threads=4)
                output = self._llama(
                    prompt,
                    max_tokens=self.max_tokens,
                    temperature=0.2,
                    top_p=0.9,
                    stop=["\n\n"]
                )
                text = output["choices"][0]["text"].strip()
                if text:
                    return text
            except Exception:  # noqa: BLE001
                logger.exception("Local LLaMA inference failed; falling back to transformers pipeline")
        # Fallback to transformers summarization pipeline
        try:
            if self._pipeline is None:
                logger.info("Loading transformers summarization pipeline %s", self.model_name)
                self._pipeline = pipeline(
                    "summarization",
                    model=self.model_name,
                    tokenizer=self.model_name,
                    device="cpu",
                )
            outputs = self._pipeline(
                text,
                truncation=True,
                max_length=min(200, self.max_tokens),
                min_length=30,
            )
            if isinstance(outputs, list) and outputs:
                return outputs[0]["summary_text"].strip()
        except Exception:  # noqa: BLE001
            logger.exception("Transformer summarization failed")
        return text[: self.max_tokens]

    def _extract_entities(self, text: str) -> list[str]:
        import re

        pattern = re.compile(r"\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b")
        matches = pattern.findall(text)
        return sorted(set(matches))

    def _extract_dates(self, text: str) -> list[str]:
        import re

        pattern = re.compile(r"\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|"
                             r"Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|"
                             r"Dec(?:ember)?|\d{4})\b")
        matches = pattern.findall(text)
        return sorted(set(matches))

    def batch_summarize(self, items: Iterable[tuple[str, str]]) -> list[Summary]:
        summaries: list[Summary] = []
        for chunk_id, text in items:
            summaries.append(self.summarize(chunk_id, text))
        return summaries

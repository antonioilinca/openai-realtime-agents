"""Core investigation engine for correlating OSINT findings."""
from __future__ import annotations

import logging
from collections import defaultdict
from dataclasses import dataclass
from typing import Iterable, List

from .summarizer import Summary
from .vector_store import EmbeddedChunk

logger = logging.getLogger(__name__)


@dataclass
class Insight:
    """Structured representation of knowledge discovered."""

    chunk: EmbeddedChunk
    summary: Summary
    reliability: float
    novelty: bool


@dataclass
class InvestigationReport:
    """Aggregated findings ready for reporting."""

    executive_summary: str
    key_findings: List[str]
    sources: List[tuple[str, float]]
    timeline: List[str]
    contradictions: List[str]
    patterns: List[str]
    risks: List[str]
    unanswered_questions: List[str]
    appendices: List[str]


class Investigator:
    """Analyse summaries to surface contradictions and patterns."""

    def __init__(self, similarity_threshold: float) -> None:
        self.similarity_threshold = similarity_threshold

    def build_insights(self, chunks: Iterable[EmbeddedChunk], summaries: Iterable[Summary]) -> List[Insight]:
        summary_map = {summary.chunk_id: summary for summary in summaries}
        insights: List[Insight] = []
        for chunk in chunks:
            summary = summary_map.get(chunk.id)
            if not summary:
                logger.warning("Missing summary for chunk %s", chunk.id)
                continue
            reliability = self._score_reliability(chunk)
            novelty = chunk.summary is None
            insights.append(Insight(chunk=chunk, summary=summary, reliability=reliability, novelty=novelty))
        return insights

    def _score_reliability(self, chunk: EmbeddedChunk) -> float:
        score = 0.5
        if chunk.url.startswith("https://"):
            score += 0.1
        if "gov" in chunk.url or "edu" in chunk.url:
            score += 0.2
        if "blog" in chunk.url or "forum" in chunk.url:
            score -= 0.1
        return max(0.0, min(score, 1.0))

    def detect_contradictions(self, insights: Iterable[Insight]) -> List[str]:
        contradictions: List[str] = []
        by_entity: defaultdict[str, List[Insight]] = defaultdict(list)
        for insight in insights:
            for entity in insight.summary.entities:
                by_entity[entity].append(insight)
        for entity, items in by_entity.items():
            if len(items) < 2:
                continue
            statements = {insight.summary.summary.lower() for insight in items}
            if any("not" in stmt or "no" in stmt for stmt in statements) and any(
                "significant" in stmt or "leading" in stmt for stmt in statements
            ):
                contradictions.append(
                    f"Conflicting narratives detected for {entity}: "
                    f"{' | '.join(insight.summary.summary for insight in items)}"
                )
        return contradictions

    def detect_patterns(self, insights: Iterable[Insight]) -> List[str]:
        patterns: List[str] = []
        by_year: defaultdict[str, int] = defaultdict(int)
        for insight in insights:
            for date in insight.summary.dates:
                if date.isdigit() and len(date) == 4:
                    by_year[date] += 1
        for year, count in sorted(by_year.items()):
            if count > 1:
                patterns.append(f"{count} sources reference developments in {year}.")
        return patterns

    def generate_report(self, insights: List[Insight], query: str) -> InvestigationReport:
        contradictions = self.detect_contradictions(insights)
        patterns = self.detect_patterns(insights)
        key_findings = [insight.summary.summary for insight in insights]
        executive_summary = self._compose_executive_summary(key_findings, query)
        timeline = self._build_timeline(insights)
        sources = [(insight.chunk.url, insight.reliability) for insight in insights]
        risks = [finding for finding in key_findings if any(word in finding.lower() for word in ["risk", "concern", "threat"])]
        unanswered = [
            f"Investigate further details about {insight.summary.entities[0]}"
            for insight in insights
            if not insight.summary.dates
        ]
        return InvestigationReport(
            executive_summary=executive_summary,
            key_findings=key_findings,
            sources=sources,
            timeline=timeline,
            contradictions=contradictions,
            patterns=patterns,
            risks=risks,
            unanswered_questions=unanswered,
            appendices=[insight.chunk.chunk for insight in insights],
        )

    def _compose_executive_summary(self, findings: List[str], query: str) -> str:
        if not findings:
            return f"No open-source intelligence could be collected for {query}."
        first = findings[0]
        others = len(findings) - 1
        tail = f" Additional {others} findings provide supporting context." if others else ""
        return f"Investigation into {query} uncovered: {first}.{tail}"

    def _build_timeline(self, insights: Iterable[Insight]) -> List[str]:
        timeline_entries: List[str] = []
        for insight in insights:
            for date in sorted(insight.summary.dates):
                timeline_entries.append(f"{date}: {insight.summary.summary}")
        return timeline_entries

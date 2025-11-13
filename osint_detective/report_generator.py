"""Generate investigation reports in multiple formats."""
from __future__ import annotations

import logging
from pathlib import Path
from .investigator import InvestigationReport

logger = logging.getLogger(__name__)


class ReportGenerator:
    """Render investigation reports to disk."""

    def __init__(self, output_dir: Path) -> None:
        self.output_dir = output_dir
        self.output_dir.mkdir(parents=True, exist_ok=True)

    def generate_markdown(self, report: InvestigationReport, query: str) -> Path:
        filepath = self.output_dir / f"{_slugify(query)}.md"
        logger.info("Writing markdown report to %s", filepath)
        filepath.write_text(self._render_markdown(report, query))
        return filepath

    def _render_markdown(self, report: InvestigationReport, query: str) -> str:
        def section(title: str, lines: list[str]) -> str:
            if not lines:
                lines = ["_No data available._"]
            return f"# {title}\n\n" + "\n".join(f"- {line}" for line in lines) + "\n\n"

        content = [f"# Investigation Report: {query}\n\n", f"# Executive Summary\n\n{report.executive_summary}\n\n"]
        content.append(section("Key Findings", report.key_findings))
        sources = [f"{url} (reliability: {score:.2f})" for url, score in report.sources]
        content.append(section("Source List + Reliability Score", sources))
        content.append(section("Timeline", report.timeline))
        content.append(section("Contradictions Detected", report.contradictions))
        content.append(section("Patterns & Anomalies", report.patterns))
        content.append(section("Risks / Opportunities", report.risks))
        content.append(section("Unanswered Questions", report.unanswered_questions))
        content.append(section("Appendices", report.appendices))
        return "".join(content)


def _slugify(value: str) -> str:
    import re

    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return re.sub(r"-+", "-", value).strip("-") or "report"

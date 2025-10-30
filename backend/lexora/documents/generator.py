"""HTML to PDF document generation orchestration."""
from __future__ import annotations

from pathlib import Path

from jinja2 import Environment, FileSystemLoader, TemplateNotFound, select_autoescape

from lexora.utils.ids import hash_text

TEMPLATES_DIR = Path(__file__).resolve().parent / "templates"


class DocumentGenerator:
    """Render Markdown/HTML templates prior to PDF generation."""

    def __init__(self, *, templates_dir: Path = TEMPLATES_DIR) -> None:
        self.env = Environment(
            loader=FileSystemLoader(str(templates_dir)),
            autoescape=select_autoescape(["html", "xml"]),
        )

    def render(self, template_id: str, context: dict[str, object]) -> str:
        try:
            template = self.env.get_template(f"{template_id}.html")
        except TemplateNotFound as exc:
            raise ValueError(f"Template '{template_id}' introuvable") from exc
        html = template.render(**context)
        # Pre-compute a hash for EvidenceLogger integration
        context["template_hash"] = hash_text(html)
        return html


__all__ = ["DocumentGenerator"]

from __future__ import annotations

from dataclasses import dataclass

from aion_core.storage import list_documents


@dataclass
class SkepticAgent:
    sqlite_path: str

    def run(self) -> list[str]:
        documents = list_documents(self.sqlite_path)
        warnings = []
        for doc in documents:
            if doc.metadata.get("source_quality", 0.5) < 0.4:
                warnings.append(f"Low source quality for {doc.title}")
            if not doc.summary_short:
                warnings.append(f"Missing summary for {doc.title}")
        return warnings


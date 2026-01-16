from __future__ import annotations

from dataclasses import dataclass

from aion_core.pipeline import generate_outputs
from aion_core.config import Config
from aion_core.storage import list_documents


@dataclass
class AnalystAgent:
    config: Config

    def run(self) -> dict[str, str]:
        documents = list_documents(self.config.storage.sqlite_path)
        outputs = generate_outputs(self.config, documents)
        return outputs


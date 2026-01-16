from __future__ import annotations

from pathlib import Path
import sys

from rich import print

sys.path.append(str(Path(__file__).resolve().parents[1]))

from aion_core.config import load_config
from aion_core.pipeline import run_pipeline, setup_logging


if __name__ == "__main__":
    config = load_config(Path("configs/config.yaml"))
    setup_logging("INFO")
    outputs = run_pipeline(config, Path("configs/sources.yaml"))
    print("[green]Demo completed[/green]")
    print(outputs)


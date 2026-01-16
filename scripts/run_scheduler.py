from __future__ import annotations

from datetime import datetime
from pathlib import Path
import sys

from apscheduler.schedulers.blocking import BlockingScheduler
from rich import print

sys.path.append(str(Path(__file__).resolve().parents[1]))

from aion_agents.analyst import AnalystAgent
from aion_agents.crawler import CrawlerAgent
from aion_core.config import load_config
from aion_core.pipeline import setup_logging


def run_ingestion(config_path: Path, sources_path: Path) -> None:
    config = load_config(config_path)
    agent = CrawlerAgent(config=config, sources_path=str(sources_path))
    count = agent.run()
    print(f"[cyan]Ingested {count} documents at {datetime.utcnow()}[/cyan]")


def run_daily_brief(config_path: Path) -> None:
    config = load_config(config_path)
    agent = AnalystAgent(config=config)
    outputs = agent.run()
    print(f"[green]Daily brief generated: {outputs['brief_md']}[/green]")


def run_health_check() -> None:
    print(f"[yellow]Health check OK at {datetime.utcnow()}[/yellow]")


if __name__ == "__main__":
    config_path = Path("configs/config.yaml")
    sources_path = Path("configs/sources.yaml")
    config = load_config(config_path)

    setup_logging("INFO")
    scheduler = BlockingScheduler()
    scheduler.add_job(
        run_ingestion,
        "interval",
        minutes=config.app.ingestion_interval_minutes,
        args=[config_path, sources_path],
    )
    scheduler.add_job(
        run_daily_brief,
        "cron",
        hour=config.app.daily_brief_hour,
        args=[config_path],
    )
    scheduler.add_job(
        run_health_check,
        "interval",
        minutes=config.app.health_check_interval_minutes,
    )

    print("[bold green]AION scheduler started[/bold green]")
    scheduler.start()


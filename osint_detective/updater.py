"""Scheduled updater that refreshes the knowledge base."""
from __future__ import annotations

import asyncio
import logging
from datetime import datetime
from typing import Awaitable, Callable, Iterable

from apscheduler.schedulers.background import BackgroundScheduler

from .config import Settings
logger = logging.getLogger(__name__)


class KnowledgeBaseUpdater:
    """Manage scheduled re-scraping and processing of sources."""

    def __init__(self, settings: Settings, scrape_fn: Callable[[Iterable[str]], Awaitable[object]]) -> None:
        self.settings = settings
        self.scrape_fn = scrape_fn
        self.scheduler = BackgroundScheduler()
        self.job = None

    def start(self) -> None:
        if self.job:
            return
        cron_parts = self.settings.scheduler_cron.split()
        if len(cron_parts) != 5:
            raise ValueError("Invalid cron expression")
        minute, hour, day, month, weekday = cron_parts
        logger.info("Scheduling knowledge base updates: %s", self.settings.scheduler_cron)
        self.job = self.scheduler.add_job(
            self._run_update,
            "cron",
            minute=minute,
            hour=hour,
            day=day,
            month=month,
            day_of_week=weekday,
        )
        self.scheduler.start()

    def shutdown(self) -> None:
        if self.scheduler.running:
            logger.info("Shutting down scheduler")
            self.scheduler.shutdown(wait=False)

    def _run_update(self) -> None:
        logger.info("Running scheduled knowledge base update at %s", datetime.utcnow().isoformat())
        try:
            asyncio.run(self.scrape_fn([]))
        except Exception:  # noqa: BLE001
            logger.exception("Scheduled update failed")

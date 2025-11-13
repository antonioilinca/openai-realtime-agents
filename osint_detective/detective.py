"""CLI entry-point orchestrating the OSINT pipeline."""
from __future__ import annotations

import argparse
import asyncio
import json
import logging
from pathlib import Path
from typing import Iterable, List

from .config import Settings
from .investigator import Investigator
from .report_generator import ReportGenerator
from .scraper import Scraper, ScrapedDocument
from .summarizer import Summarizer
from .vector_store import VectorStore

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger(__name__)


async def run_pipeline(query: str, sources: Iterable[str], settings: Settings) -> Path:
    settings.prepare()
    scraper = Scraper(
        user_agent=settings.user_agent,
        timeout=settings.scraping_timeout,
        allowed_domains=settings.allowed_domains,
        disallowed_domains=settings.disallowed_domains,
    )
    vector_store = VectorStore(
        index_path=settings.vector_store_path,
        metadata_path=settings.metadata_store_path,
        model_name=settings.embedding_model,
        batch_size=settings.embedding_batch_size,
        cache_dir=settings.cache_dir,
    )
    vector_store.load()
    documents: List[ScrapedDocument] = []
    if sources:
        documents = await scraper.fetch_many(sources)
    else:
        logger.info("No sources explicitly provided; skipping scraping step")
    novel_docs = []
    for doc in documents:
        if vector_store.detect_novelty(doc.text, threshold=settings.similarity_threshold):
            novel_docs.append(doc)
        else:
            logger.info("Skipping %s due to similarity threshold", doc.url)
    new_chunks = vector_store.add_documents(novel_docs)
    summarizer = Summarizer(
        model_name=settings.summary_model,
        max_tokens=settings.summary_max_tokens,
        model_path=settings.summary_model_path,
    )
    summaries = summarizer.batch_summarize((chunk.id, chunk.chunk) for chunk in new_chunks)
    for summary in summaries:
        vector_store.attach_summary(summary.chunk_id, summary.summary)
    investigator = Investigator(settings.similarity_threshold)
    insights = investigator.build_insights(new_chunks, summaries)
    report = investigator.generate_report(insights, query)
    vector_store.save()
    report_generator = ReportGenerator(settings.data_dir)
    report_path = report_generator.generate_markdown(report, query)
    _persist_run_metadata(settings.data_dir, query, insights)
    return report_path


def _persist_run_metadata(output_dir: Path, query: str, insights) -> None:
    history_path = output_dir / "runs.jsonl"
    with history_path.open("a", encoding="utf-8") as fh:
        payload = {
            "query": query,
            "insights": [
                {
                    "url": insight.chunk.url,
                    "summary": insight.summary.summary,
                    "reliability": insight.reliability,
                    "novelty": insight.novelty,
                }
                for insight in insights
            ],
        }
        fh.write(json.dumps(payload) + "\n")


def run_detective(query: str, sources: Iterable[str], settings: Settings | None = None) -> Path:
    settings = settings or Settings()
    return asyncio.run(run_pipeline(query, sources, settings))


def main() -> None:
    parser = argparse.ArgumentParser(description="Autonomous OSINT detective agent")
    parser.add_argument("--query", required=True, help="Investigation topic")
    parser.add_argument(
        "--sources",
        nargs="*",
        help="Optional list of URLs to seed the investigation",
    )
    args = parser.parse_args()
    settings = Settings()
    report_path = asyncio.run(run_pipeline(args.query, args.sources or [], settings))
    print(f"Report written to {report_path}")


if __name__ == "__main__":
    main()

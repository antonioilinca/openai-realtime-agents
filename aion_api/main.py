from __future__ import annotations

from pathlib import Path

from fastapi import FastAPI

from aion_agents.analyst import AnalystAgent
from aion_agents.crawler import CrawlerAgent
from aion_agents.librarian import LibrarianAgent
from aion_core.config import load_config
from aion_api.schemas import BriefResponse, IngestResponse, SearchRequest

app = FastAPI(title="AION API")

CONFIG_PATH = Path("configs/config.yaml")
SOURCES_PATH = Path("configs/sources.yaml")


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/ingest", response_model=IngestResponse)
async def ingest() -> IngestResponse:
    config = load_config(CONFIG_PATH)
    agent = CrawlerAgent(config=config, sources_path=str(SOURCES_PATH))
    count = agent.run()
    return IngestResponse(ingested=count)


@app.post("/brief", response_model=BriefResponse)
async def brief() -> BriefResponse:
    config = load_config(CONFIG_PATH)
    agent = AnalystAgent(config=config)
    outputs = agent.run()
    return BriefResponse(
        brief_path=outputs["brief_md"],
        belief_path=outputs["beliefs"],
    )


@app.post("/search")
async def search(payload: SearchRequest) -> dict[str, list[tuple[str, float]]]:
    config = load_config(CONFIG_PATH)
    agent = LibrarianAgent(
        sqlite_path=str(config.storage.sqlite_path),
        index_path=str(config.storage.vector_path / "aion.index"),
        embedding_dim=config.index.embedding_dim,
    )
    results = agent.search(payload.query, payload.top_k)
    return {"results": results}


# AION (Artificial Intelligence Observatory Node)

AION is a 24/7 background agent for legally ingesting public web information, transforming it into structured knowledge, and producing daily briefs, topic dossiers, and a traceable belief state.

## Non-negotiable safeguards
- **Legal & ethical ingestion only:** RSS/Atom, official APIs, publicly accessible pages allowed by robots.txt/ToS, or user-provided files.
- **No surveillance / personal data minimization:** only collect what is necessary for public knowledge monitoring.
- **Strict traceability:** every summary includes source URL, publication date, ingestion date, and content hash.
- **Clear epistemic separation:** facts, interpretations, and hypotheses are stored separately.

## Architecture overview
```
/aion_core     Pipeline and core services (ingest → normalize → dedupe → summarize → index)
/aion_agents   Crawler, Analyst, Skeptic, Librarian agents
/aion_api      FastAPI service
/configs       YAML and env configuration
/storage       Raw content, metadata, cache, reports, vectors
/tests         Pytest suite
/scripts       Demo + scheduler entrypoints
```

## Data model (v1)
- **SQLite** (`storage/metadata/aion.db`)
  - `documents`: metadata, citations, hashes, summaries, tags
  - `claims`: extracted claims with confidence scores
  - `sources`: source registry
- **Raw storage** (`storage/raw/`): text snapshots
- **Vector index** (`storage/vectors/`): FAISS index + ID map
- **Reports** (`storage/reports/`): daily brief (JSON + Markdown) and `beliefs.json`

## Installation
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Configuration
- Copy `.env.example` to `.env` and update values.
- Update `configs/config.yaml` for runtime behavior.
- Update `configs/sources.yaml` to add RSS feeds or APIs.

## Running the demo
```bash
python scripts/run_demo.py
```

The demo will:
1. Ingest 3–5 public RSS sources.
2. Extract and normalize content.
3. Deduplicate and index content.
4. Produce a daily brief and belief state update.

## Running the scheduler
```bash
python scripts/run_scheduler.py
```

Schedules:
- Ingestion every `ingestion_interval_minutes`
- Daily brief at `daily_brief_hour`
- Health check every `health_check_interval_minutes`

## API
Start the API:
```bash
uvicorn aion_api.main:app --reload
```

OpenAPI docs are available at `http://localhost:8000/docs`.

## Adding sources
Edit `configs/sources.yaml` and add RSS feeds or API endpoints. The crawler enforces robots.txt, rate limits, and backoff.

## Observability
- JSON-formatted logs for ingestion and reporting.
- Daily reports in JSON + Markdown.
- Belief state in `storage/reports/beliefs.json`.

## Troubleshooting
- If ingestion returns zero documents, verify that sources are reachable and allowed by robots.txt.
- Ensure `AION_USER_AGENT` is set to a clear identifier.
- For faster iterations, reduce the ingestion interval in `configs/config.yaml`.

## Limitations (v1)
- Embeddings are deterministic hashed vectors for lightweight local use.
- Contradiction detection is heuristic and should be treated as a signal, not a verdict.
- Source reputation is configurable but basic.

## Next improvements
- Replace hashed embeddings with a stronger local embedding model.
- Expand contradiction detection with natural language inference.
- Add more granular data retention policies.


SHELL := /bin/bash
PYTHON := ./.venv/bin/python
PIP := ./.venv/bin/pip
PYTHONPATH := backend

.PHONY: dev-setup ingest reindex start test backend-test frontend-test lint fmt docker-build

dev-setup:
cp -n .env.example .env || true
npm install
python3 -m venv .venv
$(PIP) install -r backend/requirements-dev.txt

ingest:
PYTHONPATH=$(PYTHONPATH) $(PYTHON) -m lexora.ingestion.initial

reindex:
PYTHONPATH=$(PYTHONPATH) $(PYTHON) -m lexora.search.reindex

start:
docker compose up --build

backend-test:
PYTHONPATH=$(PYTHONPATH) $(PYTHON) -m pytest -q

frontend-test:
npm run test

test: backend-test frontend-test

lint:
npm run lint

fmt:
npx prettier --write .

docker-build:
docker compose build

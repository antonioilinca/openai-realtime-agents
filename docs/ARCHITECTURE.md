# Architecture technique

Lexora suit une architecture modulaire orientée services. Le dépôt monorepo héberge le frontend Next.js, l'API FastAPI et les scripts d'ingestion/recherche.

## Vue d'ensemble

```mermaid
graph TD
    A[Frontend Next.js] -->|REST| B(FastAPI)
    B -->|SQLModel/SQLAlchemy (à venir)| C[(PostgreSQL)]
    B -->|Indexation| D[(OpenSearch)]
    B -->|Jobs async| E[Celery Workers]
    E -->|Queue| F[(Redis)]
    B -->|PDF Requests| G[Puppeteer service]
```

### Frontend (Next.js + Tailwind)
- Pages : onboarding, formulaire situation, analyse & citations, plan d'actions, documents, export, paramètres.
- UI futuriste avec design tokens (cf. `tailwind.config.ts`).
- State management via hooks locaux et contexte.
- Appels API centralisés (`src/app/lib/api.ts`).
- Accessibilité : focus visible, contrastes vérifiés, navigation clavier.

### Backend (FastAPI)
- `lexora.api.routes` expose `/api/analyze`, `/api/plan`, `/api/document`, `/api/sources/{planId}`.
- `lexora.services` regroupe la logique métier :
  - `classifier` : heuristiques bootstrap + extraction d'entités (dates, montants, parties).
  - `rag_engine` : orchestrateur RAG (retrait/résumé) prêt à être branché sur OpenSearch + modèles OpenAI.
  - `procedure_engine` : génération d'étapes avec délais calculés.
- `lexora.documents` : rendu HTML avec Jinja2 avant conversion PDF (Puppeteer à intégrer côté worker).

### Ingestion & Recherche
- `lexora.ingestion.initial` : point d'entrée ingestion PISTE (stub) validant la configuration et préparant la journalisation.
- `lexora.search.reindex` : commande de réindexation OpenSearch.
- Ces modules seront orchestrés via Celery/Redis pour les traitements asynchrones.

### Données & persistance
- Schéma PostgreSQL cible : `users`, `situations`, `analyses`, `citations`, `plans`, `documents` (cf. README).
- Audit trail & journal des sources (module `EvidenceLogger` à venir) stockés dans une table dédiée.
- Chiffrement au repos (pgcrypto) et rotation JWT.

### Observabilité
- Endpoint `/health` (FastAPI).
- Prometheus/Grafana à ajouter via exporters uvicorn/opensearch/postgres.

## Flux principaux

1. **Analyse** : le frontend collecte la situation → POST `/api/analyze` → classification + synthèse sourcée.
2. **Plan** : l'utilisateur choisit ses objectifs → POST `/api/plan` → plan d'actions structuré.
3. **Document** : sélection d'un template → POST `/api/document` → HTML rendu puis conversion PDF (worker).
4. **Sources** : affichage et export → GET `/api/sources/{planId}` → journal horodaté.

## Tests & CI

- Tests backend : `pytest` (contrat API, services).
- Tests frontend : `vitest` + Testing Library (smoke tests UI).
- Pipeline CI à créer : lint (ESLint), format (Prettier), tests (pytest + vitest), build Docker.


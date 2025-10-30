# LEXORA

Lexora est une plateforme d'information juridique assistée par IA. Elle combine ingestion automatisée du contenu Légifrance, un moteur RAG spécialisé, une génération de plans d'actions procéduraux et la production de documents PDF prêts à l'emploi.

> **Information juridique générale. Pour un conseil personnalisé ou une représentation, contactez un avocat.**

## Fonctionnalités principales

- **Ingestion Légifrance (PISTE)** : connecteur OAuth server-to-server, versioning des articles et journalisation des sources.
- **Classification** : détection heuristique des domaines (consommation, logement, travail) et extraction d'entités clés (dates, montants, parties).
- **RAG juridique** : récupération de textes pertinents et synthèse sourcée avec références ELI/NOR.
- **Procedure Engine** : transformation d'une analyse en plan d'actions actionnable (étapes, délais, autorités, coûts, pièces).
- **Document Generator** : gabarits HTML → PDF (mise en demeure, contestation, courrier RH) avec charte graphique Lexora.
- **Frontend Next.js** : parcours guidé (onboarding, formulaire, analyse, plan, exports) respectant les contrastes WCAG 2.1 AA.
- **Comptes utilisateurs** : création et connexion pour particuliers ou entreprises avec mise en avant des parcours adaptés.
- **Infrastructure Docker** : services orchestrés (FastAPI, Next.js, PostgreSQL, Redis, OpenSearch) pour un déploiement reproductible.

## Structure du dépôt

```text
.
├── Dockerfile.backend          # Image FastAPI
├── Dockerfile.frontend         # Image Next.js
├── Makefile                    # Scripts DX (setup, tests, ingestion)
├── backend/
│   ├── lexora/
│   │   ├── api/                # Routes FastAPI
│   │   ├── core/               # Configuration & settings
│   │   ├── documents/          # Gabarits & moteur de rendu
│   │   ├── ingestion/          # Pipelines d'ingestion PISTE (stubs)
│   │   ├── models/             # Schemas Pydantic
│   │   ├── search/             # Réindexation OpenSearch (stub)
│   │   └── services/           # Classifier, RAG, ProcedureEngine
│   └── tests/                  # Tests pytest
├── docs/
│   ├── ARCHITECTURE.md         # Vue d'ensemble technique
│   └── SECURITY_RGPD.md        # Contrôles sécurité & conformité
├── docker-compose.yml
├── package.json
├── public/
├── src/                        # Frontend Next.js
└── tsconfig.json
```

## Prérequis

- Node.js 20+
- Python 3.11+
- Docker & Docker Compose

## Démarrage rapide

```bash
make dev-setup          # Installe les dépendances npm + python et génère .env
make test               # Exécute pytest et les tests frontend
make start              # Lance l'environnement complet via Docker Compose
```

L'API FastAPI est accessible sur `http://localhost:8000`, le frontend sur `http://localhost:3000`.

> 💡 Lorsque vous utilisez Docker Compose, le service frontend reçoit automatiquement l'URL `http://backend:8000/api` pour
> communiquer avec l'API. En développement hors Docker (`npm run dev`), conservez la valeur par défaut
> `http://localhost:8000/api` dans votre `.env`.

### Authentification API

Les routes d'analyse et de génération nécessitent un jeton de session (`Authorization: Bearer <token>`). Utilisez :

```http
POST /api/auth/signup   # body : {"email","password","accountType","fullName","companyName?"}
POST /api/auth/login    # body : {"email","password"}
GET  /api/auth/profile  # retourne le profil courant
```

Les comptes `company` valorisent les recommandations pour les obligations employeur et les litiges commerciaux, tout en conservant l'accès à l'ensemble des domaines juridiques.

## Variables d'environnement

Copiez `.env.example` vers `.env` puis complétez :

- `PISTE_CLIENT_ID`, `PISTE_CLIENT_SECRET`, `PISTE_TOKEN_URL`
- `OPENAI_API_KEY`
- `DB_URL`, `OPENSEARCH_URL`, `REDIS_URL`
- `JWT_SECRET`, `PDF_BASE_URL`
- `NEXT_PUBLIC_API_URL` (URL de base de l'API consommée par le frontend ; `http://localhost:8000` est accepté et normalisé vers `/api`)

## Tests

- **Backend** : `pytest -q`
- **Frontend** : `npm run test`
- **Lint** : `npm run lint`

Des jeux de données de démonstration sont fournis dans les services (classifieur et RAG deterministic) pour permettre des tests reproductibles sans accès aux API externes.

## Sécurité & RGPD

Les principes de sécurité, minimisation des données et journalisation sont décrits dans [`docs/SECURITY_RGPD.md`](docs/SECURITY_RGPD.md). Le frontend affiche systématiquement le disclaimer légal et propose un lien « Parler à un avocat » pour l'escalade.

## Roadmap

1. Implémentation complète de l'ingestion PISTE (delta quotidien et historisation).
2. Intégration d'OpenSearch + FAISS pour la recherche hybride et les embeddings juridiques.
3. Enrichissement du ProcedureEngine avec un DSL métier versionné.
4. Génération PDF avec Puppeteer (HTML → PDF) et stockage chiffré.
5. Automatisation CI/CD (lint, tests, build images) et déploiement cloud.


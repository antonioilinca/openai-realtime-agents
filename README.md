# LexaIA – Assistant juridique français

LexaIA est un SaaS complet combinant Next.js 14 (frontend) et FastAPI (backend) pour offrir une analyse juridique automatisée basée sur GPT-5 et l'API Légifrance.

## Fonctionnalités clés

- **Analyse juridique intelligente** : classification du domaine, extraction de mots-clés, requête Légifrance, synthèse et estimation de probabilité de succès.
- **Formulaire multi-étapes** : interface claire avec TailwindCSS, thème clair/sombre et explications pédagogiques.
- **Historique et PDF** : sauvegarde des analyses, filtrage par domaine, génération de rapports PDF avec WeasyPrint.
- **Sécurité** : Authentification JWT, mots de passe hashés via bcrypt, limitation de débit et CORS configuré.
- **Scalabilité** : Architecture modulaire, Docker Compose (frontend, backend, PostgreSQL) et Prisma ORM.

## Architecture

```
frontend/ (Next.js 14 + TailwindCSS + Zustand)
backend/  (FastAPI + LangChain-ready + Prisma + GPT-5)
db        (PostgreSQL 15 via Docker)
```

## Prérequis

- Docker et Docker Compose
- Clés API valides : `OPENAI_API_KEY`, `LEGIFRANCE_API_KEY`
- Python 3.12 si installation manuelle hors Docker

## Installation

1. Dupliquez `.env.example` en `.env` et renseignez les variables.
2. Lancez les services :

   ```bash
   docker-compose up --build
   ```

3. Accédez à l'interface : [http://localhost:3000](http://localhost:3000)
4. Testez avec un cas pratique, par exemple : `Mon locataire ne paie plus le loyer depuis 3 mois`.

## Backend (FastAPI)

- Endpoint `POST /analyze` : analyse une situation, met en cache 24h et persiste dans PostgreSQL.
- Endpoint `GET /history` : liste des analyses de l'utilisateur authentifié (ou publiques anonymes).
- Endpoint `GET /history/{id}` : détail d'une analyse.
- Endpoint `GET /pdf/{id}` : export PDF structuré.
- Endpoints `POST /auth/register`, `POST /auth/login`, `POST /auth/login-json`, `GET /auth/me`.

## Frontend (Next.js)

- `pages/index.tsx` : accueil + formulaire multi-étapes.
- `pages/result.tsx` : affichage dynamique du rapport.
- `pages/history.tsx` : tableau de bord avec filtres.
- `components/ResultCard.tsx`, `components/Navbar.tsx` : UI modulaires.

## Développement local hors Docker

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
prisma generate
uvicorn backend.main:app --reload
```

Dans un autre terminal :

```bash
cd frontend
npm install
npm run dev
```

## Mentions légales

LexaIA fournit un service d'information et ne remplace pas un avocat. Les utilisateurs doivent vérifier les recommandations auprès d'un professionnel qualifié.

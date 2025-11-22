# AdminCopilote

Application Next.js + Firebase livrée prête à déployer pour accompagner les citoyens français dans leurs démarches administratives : coffre-fort sécurisé, analyse documentaire IA (Gemini), calendrier d'échéances et assistant conversationnel premium.

## Fonctionnalités clés
- **Authentification sécurisée** : email/mot de passe + OAuth Google, persistance de session et pages d'onboarding dédiées.
- **Dashboard premium** : navigation sidebar iOS/Glassmorphism, stats, conseils IA et rappel des échéances Firestore.
- **Inbox & Scan** : import PDF/images, prévisualisation, envoi à Gemini (JSON strict), ajout automatique d'événement.
- **Bibliothèque** : 9 catégories de guides + fiches pratiques détaillées avec timeline, conditions et erreurs fréquentes.
- **Calendrier & Rappels** : vue agenda + grille mensuelle, priorisation couleur, ajout/édition/suppression.
- **Coffre-fort Firebase Storage** : dépôt de documents, filtres par catégorie, actions Télécharger/Partager/Supprimer.
- **Assistant IA Gemini** : chat temps réel, prompt système orienté sources officielles françaises, accessible partout via widget flottant.
- **Accessoires premium** : ScrollToTop, notifications natives, thème glass, arrondis `rounded-3xl`.

## Démarrage rapide
```bash
npm install
npm run dev
# puis ouvrir http://localhost:3000
```

## Variables d'environnement
Créez un fichier `.env.local` avec les valeurs de votre projet Firebase et de l'API Gemini :
```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_GEMINI_API_KEY=...
```
Sans configuration, l'application bascule en mode démo local (données d'exemple, pas d'appels réseau).

## Schéma Firestore conseillé
- `Users`: { uid, prenom, nom, email, createdAt }
- `InboxDocuments`: { userId, filename, storageUrl, analysis, createdAt }
- `Events`: { userId, title, date, priority, relatedDocId, createdAt }
- `Conversations`: { userId, messages[], createdAt }
- `VaultFiles`: { userId, name, category, expiration, storageUrl, createdAt }

## Déploiement
- **Firebase Hosting** ou **Vercel** : variables d'env identiques, exécuter `npm run build` puis déployer.
- La stack est 100% serverless (App Router Next.js, SDK Firebase côté client), aucune API custom requise.

## Scripts utiles
- `npm run dev` : serveur de développement
- `npm run build` : build production
- `npm run start` : serveur production local
- `npm run lint` : vérification ESLint

## Notes d'implémentation IA
- Analyse documentaire : `@google/generative-ai` modèle `gemini-1.5-pro-latest`, sortie JSON strict correspondant au format demandé dans l'UI.
- Assistant conversationnel : modèle `gemini-1.5-flash-latest`, prompt système contextualisé pour la France (service-public.fr, impots.gouv.fr, ameli.fr).
- Les composants gèrent automatiquement les erreurs de configuration et préviennent l'utilisateur si la clé n'est pas présente.

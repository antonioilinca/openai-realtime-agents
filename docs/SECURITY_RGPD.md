# Sécurité & conformité RGPD

## Principes directeurs
- Minimisation des données : seuls les champs nécessaires à la génération des plans et documents sont stockés.
- Consentement explicite : onboarding avec cases à cocher pour données potentiellement sensibles et politique de confidentialité accessible.
- Droit à l'oubli : endpoints (à implémenter) pour purge des situations, analyses et documents.
- Journalisation : EvidenceLogger consignera `eli`, `nor`, `hash`, `version_date`, `extracted_at` pour chaque source citée.

## Mesures techniques
- Authentification : JWT httpOnly + rotation refresh (à implémenter côté gateway).
- Chiffrement : AES-256 au repos (PostgreSQL + S3 via KMS) et TLS 1.2+ en transit.
- Secrets : variables d'environnement injectées via vault/secret manager.
- Logs : pas de données personnelles, rotation quotidienne, stockage 30 jours max.
- Accès : RBAC pour l'équipe interne, MFA obligatoire.

## DPIA (esquisse)
1. **Description** : traitement de situations juridiques de particuliers/entreprises, principalement non sensibles.
2. **Proportionnalité** : données limitées, durée de conservation configurable (par défaut 90 jours).
3. **Risques** : divulgation d'informations personnelles, génération de conseils incorrects.
4. **Mesures** : chiffrement, contrôle d'accès, tests de précision des citations (≥ 98%), disclaimers.

## Plan de réponse incident
1. Détection via alertes (erreurs 5xx, anomalies d'accès).
2. Contention (revocation des clés, isolement des services impactés).
3. Notification CNIL/utilisateurs selon gravité (72h max).
4. Post-mortem documenté & actions correctives.


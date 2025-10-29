# FitAI Coach

Application iOS native en SwiftUI générant automatiquement un plan d'entraînement, de nutrition et un suivi complet sur 90 jours.

## Modules
- Onboarding interactif collectant le profil
- Génération d'entraînements et de repas via moteur IA local
- Suivi de progression avec graphiques Swift Charts
- Coach IA conversationnel
- Export PDF complet et notifications locales

## Démarrage
1. Ouvrir `FitAICoach.xcodeproj` ou créer un projet Xcode vide et ajouter le dossier `FitAICoach`.
2. Cible iOS 17 minimum.
3. Activer les capacités iCloud, Notifications et PDFKit selon besoins.

## Architecture
Pattern MVVM avec services indépendants et persistance Core Data configurée dynamiquement.

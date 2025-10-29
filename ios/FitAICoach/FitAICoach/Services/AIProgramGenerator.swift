import Foundation
import SwiftUI

struct AIProgramGenerator {
    private let exercicesParFocus: [String: [Exercise]] = {
        var dictionnaire: [String: [Exercise]] = [:]
        dictionnaire["Push"] = [
            Exercise(nom: "Pompes diamant", series: 4, repetitions: 12, tempsRepos: 60, instructions: "Gardez les coudes proches du corps et engagez les triceps.", materiel: "Poids du corps"),
            Exercise(nom: "Développé haltères", series: 4, repetitions: 10, tempsRepos: 75, instructions: "Pousser en contrôlant la descente.", materiel: "Haltères"),
            Exercise(nom: "Dips banc", series: 3, repetitions: 15, tempsRepos: 60, instructions: "Descendre jusqu'à 90° d'angle.", materiel: "Banc")
        ]
        dictionnaire["Pull"] = [
            Exercise(nom: "Tractions assistées", series: 4, repetitions: 8, tempsRepos: 90, instructions: "Tirez les omoplates avant les coudes.", materiel: "Barre de traction"),
            Exercise(nom: "Rowing unilatéral", series: 4, repetitions: 12, tempsRepos: 75, instructions: "Maintenez le dos droit et serrez en haut.", materiel: "Haltère"),
            Exercise(nom: "Face pull", series: 3, repetitions: 15, tempsRepos: 60, instructions: "Alignez coudes et poignets, contraction arrière d'épaule.", materiel: "Élastique")
        ]
        dictionnaire["Legs"] = [
            Exercise(nom: "Squat goblet", series: 4, repetitions: 12, tempsRepos: 90, instructions: "Poussez sur les talons, poitrine ouverte.", materiel: "Haltère"),
            Exercise(nom: "Fentes marchées", series: 3, repetitions: 14, tempsRepos: 75, instructions: "Long pas, genou arrière proche du sol.", materiel: "Haltères"),
            Exercise(nom: "Soulevé de terre roumain", series: 4, repetitions: 10, tempsRepos: 90, instructions: "Charnière de hanche contrôlée.", materiel: "Barre ou haltères")
        ]
        dictionnaire["Full Body"] = [
            Exercise(nom: "Burpees contrôlés", series: 4, repetitions: 12, tempsRepos: 60, instructions: "Engagez la sangle abdominale.", materiel: "Poids du corps"),
            Exercise(nom: "Kettlebell swing", series: 4, repetitions: 15, tempsRepos: 75, instructions: "Propulsion par les hanches.", materiel: "Kettlebell"),
            Exercise(nom: "Planche dynamique", series: 3, repetitions: 45, tempsRepos: 45, instructions: "Alternez appuis coude/main.", materiel: "Tapis")
        ]
        return dictionnaire
    }()

    private let repasBase: [String] = [
        "Buddha bowl quinoa et poulet",
        "Wrap saumon fumé et fromage frais",
        "Omelette méditerranéenne",
        "Salade de pois chiches croustillants",
        "Yaourt grec granola maison",
        "Smoothie protéiné aux fruits rouges"
    ]

    func genererPlanEntrainement(profil: UserProfile) -> [WorkoutDay] {
        var plan: [WorkoutDay] = []
        let focusCycle = ["Push", "Pull", "Legs", "Full Body"]
        for jour in 1...90 {
            let focus = focusCycle[(jour - 1) % focusCycle.count]
            let difficulte = difficultePourProfil(profil: profil, jour: jour)
            let exercices = exercicesPour(focus: focus, progression: difficulte)
            let workout = WorkoutDay(numeroJour: jour,
                                     focus: focus,
                                     echauffement: "5 minutes de mobilité dynamique + 5 minutes de cardio léger",
                                     exercices: exercices,
                                     finisher: finisherPour(focus: focus, progression: difficulte),
                                     etirements: "Respiration profonde et étirements statiques 5 minutes")
            plan.append(workout)
        }
        return plan
    }

    func genererPlanNutrition(profil: UserProfile) -> [MealPlan] {
        let besoins = calculerBesoinsCaloriques(profil: profil)
        var plans: [MealPlan] = []
        for jour in 1...90 {
            let variation = Double((jour % 7) - 3) * 25.0
            let caloriesJour = max(1200, besoins.calories + variation)
            let macros = calculerMacros(calories: caloriesJour, objectif: profil.objectif)
            let repas = genererRepas(jour: jour, macros: macros, profil: profil)
            plans.append(MealPlan(jour: jour, repas: repas))
        }
        return plans
    }

    func messageMotivationnel(profil: UserProfile, progression: ProgressionResume?) -> String {
        let base = "Restez concentré·e sur votre objectif \(profil.objectif.lowercased())."
        guard let progression else { return base + " Chaque séance vous rapproche du résultat souhaité." }
        if progression.differencePoids < -1 {
            return "Perte de poids maîtrisée: -\(String(format: "%.1f", abs(progression.differencePoids))) kg. Continuez à suivre vos séances avec énergie!"
        }
        if progression.progressionForce > 0.1 {
            return "La force grimpe de \(String(format: "%.0f", progression.progressionForce * 100)) %. Super travail sur les charges!"
        }
        return base + " Les habitudes quotidiennes façonnent votre succès sur 90 jours."
    }

    private func difficultePourProfil(profil: UserProfile, jour: Int) -> Double {
        let base: Double
        switch profil.niveauActivite.lowercased() {
        case "faible":
            base = 0.8
        case "élevé", "eleve":
            base = 1.2
        default:
            base = 1.0
        }
        let progression = 1.0 + Double(jour / 14) * 0.05
        return base * progression
    }

    private func exercicesPour(focus: String, progression: Double) -> [Exercise] {
        let base = exercicesParFocus[focus] ?? []
        return base.map { exercice in
            var repetitions = Double(exercice.repetitions)
            repetitions = (repetitions * progression).rounded()
            let series = Int((Double(exercice.series) * (progression < 1.0 ? 1.0 : 1.1)).rounded())
            return Exercise(nom: exercice.nom,
                            series: max(series, exercice.series),
                            repetitions: max(Int(repetitions), exercice.repetitions),
                            tempsRepos: exercice.tempsRepos,
                            instructions: exercice.instructions,
                            materiel: exercice.materiel)
        }
    }

    private func finisherPour(focus: String, progression: Double) -> String {
        switch focus {
        case "Legs":
            return "Finisher HIIT: 5 sprints de 30 s avec \(Int(60 / progression)) s de récupération."
        case "Pull":
            return "Circuit gainage: planche + hollow body + superman, 3 tours." 
        case "Push":
            return "Circuit pompes explosives, mountain climbers, dips banc 3x45 s."
        default:
            return "Tabata burpees et jump squats 8x20s/10s."
        }
    }

    private func calculerBesoinsCaloriques(profil: UserProfile) -> (calories: Double, imc: Double) {
        let poids = profil.poids
        let tailleM = profil.taille / 100
        let imc = poids / (tailleM * tailleM)
        let bmr: Double
        if profil.genre.lowercased().contains("f") {
            bmr = 10 * poids + 6.25 * profil.taille - 5 * Double(profil.age) - 161
        } else {
            bmr = 10 * poids + 6.25 * profil.taille - 5 * Double(profil.age) + 5
        }
        let facteur: Double
        switch profil.niveauActivite.lowercased() {
        case "faible": facteur = 1.3
        case "élevé", "eleve": facteur = 1.6
        default: facteur = 1.45
        }
        var calories = bmr * facteur
        switch profil.objectif.lowercased() {
        case "perte de gras": calories -= 350
        case "prise de muscle": calories += 300
        default: break
        }
        return (calories, imc)
    }

    private func calculerMacros(calories: Double, objectif: String) -> (proteines: Double, glucides: Double, lipides: Double) {
        let proteines = calories * 0.3 / 4
        let lipides = calories * 0.25 / 9
        let glucides = max(0, (calories - proteines * 4 - lipides * 9) / 4)
        return (proteines, glucides, lipides)
    }

    private func genererRepas(jour: Int, macros: (proteines: Double, glucides: Double, lipides: Double), profil: UserProfile) -> [Meal] {
        var random = SeededGenerator(seed: UInt64(jour))
        let repasDuJour = repasBase.shuffled(using: &random).prefix(4)
        return repasDuJour.enumerated().map { index, nom in
            let calories = Int((macros.proteines * 4 + macros.glucides * 4 + macros.lipides * 9) / 4.0)
            let portionFactor = 0.9 + Double(index) * 0.05
            let proteines = macros.proteines / 4 * portionFactor
            let glucides = macros.glucides / 4 * portionFactor
            let lipides = macros.lipides / 4 * portionFactor
            let restrictions = profil.restrictionsAlimentaires.joined(separator: ", ")
            let noteRestriction = restrictions.isEmpty ? "" : " Option sans \(restrictions)."
            return Meal(nom: nom,
                        ingredients: genererIngredients(pour: nom, profil: profil),
                        calories: Int(Double(calories) * portionFactor),
                        proteines: proteines,
                        glucides: glucides,
                        lipides: lipides,
                        recette: "Préparer \(nom.lowercased()) avec cuisson douce, équilibrer les portions et ajouter des légumes colorés." + noteRestriction,
                        imageName: "repas-\(index % 3 + 1)")
        }
    }

    private func genererIngredients(pour nom: String, profil: UserProfile) -> [String] {
        var liste = ["Légumes de saison", "Épices anti-inflammatoires", "Graisses saines"]
        if nom.lowercased().contains("poulet") { liste.append("Filet de poulet fermier") }
        if nom.lowercased().contains("saumon") { liste.append("Saumon riche en oméga-3") }
        if profil.preferencesAlimentaires.contains(where: { $0.lowercased().contains("végétarien") }) {
            liste.append("Protéines végétales variées")
        }
        return liste
    }
}

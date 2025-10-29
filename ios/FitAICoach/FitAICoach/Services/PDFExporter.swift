import Foundation
import PDFKit
import UIKit

final class PDFExporter {
    static let shared = PDFExporter()
    private init() {}

    func genererPDF(profil: UserProfile, workouts: [WorkoutDay], meals: [MealPlan], progression: [ProgressEntry]) -> Data? {
        let pdf = PDFDocument()
        let meta = PDFMetadata(author: "FitAI Coach", title: "Programme personnalisé de \(profil.genre)")
        pdf.documentAttributes = meta.attributes

        let builder = PDFPageBuilder()
        let page1 = builder.page(titre: "Profil utilisateur", contenu: resumeProfil(profil))
        pdf.insert(page1, at: 0)

        let page2 = builder.page(titre: "Synthèse entraînement", contenu: resumeEntrainement(workouts))
        pdf.insert(page2, at: pdf.pageCount)

        let page3 = builder.page(titre: "Plan nutritionnel", contenu: resumeNutrition(meals))
        pdf.insert(page3, at: pdf.pageCount)

        let page4 = builder.page(titre: "Progression", contenu: resumeProgression(progression))
        pdf.insert(page4, at: pdf.pageCount)

        return pdf.dataRepresentation()
    }

    private func resumeProfil(_ profil: UserProfile) -> String {
        "Genre: \(profil.genre)\nÂge: \(profil.age) ans\nTaille: \(Int(profil.taille)) cm\nPoids: \(String(format: "%.1f", profil.poids)) kg\nObjectif: \(profil.objectif)\nType d'entraînement: \(profil.typeEntrainement)\nSéances/semaine: \(profil.seancesParSemaine)\nPréférences: \(profil.preferencesAlimentaires.joined(separator: ", "))"
    }

    private func resumeEntrainement(_ workouts: [WorkoutDay]) -> String {
        let extraits = workouts.prefix(7).map { jour in
            "Jour \(jour.numeroJour) - \(jour.focus)\nExercices: \(jour.exercices.map(\.nom).joined(separator: ", "))"
        }
        return extraits.joined(separator: "\n\n")
    }

    private func resumeNutrition(_ meals: [MealPlan]) -> String {
        meals.prefix(5).map { plan in
            let macros = plan.repas.reduce(into: (cal: 0, prot: 0.0, glu: 0.0, lip: 0.0)) { acc, repas in
                acc.cal += repas.calories
                acc.prot += repas.proteines
                acc.glu += repas.glucides
                acc.lip += repas.lipides
            }
            return "Jour \(plan.jour) - Calories: \(macros.cal) kcal / Prot: \(Int(macros.prot)) g"
        }.joined(separator: "\n")
    }

    private func resumeProgression(_ progression: [ProgressEntry]) -> String {
        guard let premier = progression.first, let dernier = progression.last else {
            return "Progression non enregistrée."
        }
        let diffPoids = dernier.poids - premier.poids
        let diffImc = dernier.imc - premier.imc
        return "Variation de poids: \(String(format: "%.1f", diffPoids)) kg\nVariation IMC: \(String(format: "%.1f", diffImc))\nDernière charge max: \(String(format: "%.1f", dernier.charge)) kg"
    }
}

private struct PDFMetadata {
    let author: String
    let title: String

    var attributes: [PDFDocumentAttribute] {
        [
            .authorAttribute: author,
            .titleAttribute: title,
            .creatorAttribute: "FitAI Coach"
        ]
    }
}

private final class PDFPageBuilder {
    func page(titre: String, contenu: String) -> PDFPage {
        let pageRect = CGRect(x: 0, y: 0, width: 612, height: 792)
        let renderer = UIGraphicsImageRenderer(size: pageRect.size)
        let image = renderer.image { context in
            UIColor.white.setFill()
            context.fill(pageRect)

            let titreAttributes: [NSAttributedString.Key: Any] = [
                .font: UIFont.boldSystemFont(ofSize: 22),
                .foregroundColor: UIColor(named: "#0a73e1") ?? UIColor(red: 0.04, green: 0.45, blue: 0.88, alpha: 1)
            ]
            let contenuAttributes: [NSAttributedString.Key: Any] = [
                .font: UIFont.systemFont(ofSize: 14),
                .foregroundColor: UIColor.black
            ]

            let titreRect = CGRect(x: 32, y: 48, width: pageRect.width - 64, height: 28)
            titre.draw(in: titreRect, withAttributes: titreAttributes)

            let contenuRect = CGRect(x: 32, y: 90, width: pageRect.width - 64, height: pageRect.height - 120)
            contenu.draw(in: contenuRect, withAttributes: contenuAttributes)
        }
        return PDFPage(image: image) ?? PDFPage()
    }
}

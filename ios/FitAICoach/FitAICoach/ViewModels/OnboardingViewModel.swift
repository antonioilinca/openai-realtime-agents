import Foundation
import Combine

final class OnboardingViewModel: ObservableObject {
    @Published var genre: String = ""
    @Published var age: Double = 25
    @Published var taille: Double = 170
    @Published var poids: Double = 70
    @Published var objectif: String = "Perte de gras"
    @Published var typeEntrainement: String = "Maison"
    @Published var seancesParSemaine: Double = 4
    @Published var restrictions: [String] = []
    @Published var niveauActivite: String = "Modéré"
    @Published var budget: String = "Standard"
    @Published var preferences: [String] = []

    @Published var etape: Int = 0

    var progression: Double {
        Double(etape + 1) / Double(totalEtapes)
    }

    let totalEtapes = 6

    func validerEtape() {
        etape = min(etape + 1, totalEtapes - 1)
    }

    func revenirEtape() {
        etape = max(etape - 1, 0)
    }

    func finaliser() {
        let profil = UserProfile(genre: genre,
                                 age: Int(age),
                                 taille: taille,
                                 poids: poids,
                                 objectif: objectif,
                                 typeEntrainement: typeEntrainement,
                                 seancesParSemaine: Int(seancesParSemaine),
                                 restrictionsAlimentaires: restrictions,
                                 niveauActivite: niveauActivite,
                                 budgetAlimentaire: budget,
                                 preferencesAlimentaires: preferences)
        PersistenceController.shared.sauvegarderProfil(profil)
    }
}

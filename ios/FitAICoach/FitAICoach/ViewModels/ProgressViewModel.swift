import Foundation
import Combine

final class ProgressViewModel: ObservableObject {
    @Published private(set) var entrees: [ProgressEntry] = []
    @Published private(set) var badges: [Badge] = []
    @Published private(set) var resume: ProgressionResume?

    private var cancellables = Set<AnyCancellable>()

    init() {
        charger()
    }

    func enregistrer(poids: Double, charge: Double, calories: Double) {
        guard let profil = PersistenceController.shared.profilCourant else { return }
        let tailleM = profil.taille / 100
        let imc = poids / (tailleM * tailleM)
        let entree = ProgressEntry(id: UUID(), date: Date(), poids: poids, imc: imc, charge: charge, caloriesDepensees: calories)
        PersistenceController.shared.enregistrerProgression(entree)
        charger()
        attribuerBadgeSiNecessaire()
    }

    func charger() {
        entrees = PersistenceController.shared.chargerProgression()
        resume = calculerResume()
    }

    private func calculerResume() -> ProgressionResume? {
        guard let premier = entrees.first, let dernier = entrees.last else { return nil }
        let diffPoids = dernier.poids - premier.poids
        let progressionForce = entrees.reduce(0.0) { acc, entree in acc + entree.charge } / Double(entrees.count * 100)
        let adherence = min(1.0, Double(entrees.count) / 12.0)
        return ProgressionResume(poidsActuel: dernier.poids,
                                 differencePoids: diffPoids,
                                 progressionForce: progressionForce,
                                 adherenceNutrition: adherence)
    }

    private func attribuerBadgeSiNecessaire() {
        guard let resume else { return }
        var nouveaux: [Badge] = badges
        if resume.differencePoids <= -2 && !nouveaux.contains(where: { $0.titre == "Cap Perte de gras" }) {
            nouveaux.append(Badge(id: UUID(), titre: "Cap Perte de gras", description: "Plus de 2 kg perdus", dateObtention: Date(), icone: "flame"))
        }
        if resume.progressionForce > 0.2 && !nouveaux.contains(where: { $0.titre == "Force montante" }) {
            nouveaux.append(Badge(id: UUID(), titre: "Force montante", description: "Progression significative des charges", dateObtention: Date(), icone: "bolt"))
        }
        badges = nouveaux
    }
}

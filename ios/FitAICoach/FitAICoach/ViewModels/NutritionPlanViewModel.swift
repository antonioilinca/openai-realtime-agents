import Foundation
import Combine

final class NutritionPlanViewModel: ObservableObject {
    @Published private(set) var plans: [MealPlan] = []
    @Published var jourSelectionne: Int = 1

    private let generateur = AIProgramGenerator()
    private var cancellables = Set<AnyCancellable>()

    init() {
        if let sauvegarde: [MealPlan] = PersistenceController.shared.chargerPlan(type: .nutrition, jour: 0, as: [MealPlan].self) {
            self.plans = sauvegarde
        }
        PersistenceController.shared.$profilCourant
            .compactMap { $0 }
            .sink { [weak self] profil in
                self?.genererPlan(profil: profil)
            }
            .store(in: &cancellables)
    }

    func genererPlan(profil: UserProfile) {
        plans = generateur.genererPlanNutrition(profil: profil)
        sauvegarder(plans: plans)
    }

    func planDuJour() -> MealPlan? {
        plans.first(where: { $0.jour == jourSelectionne })
    }

    private func sauvegarder(plans: [MealPlan]) {
        guard let data = try? JSONEncoder().encode(plans) else { return }
        PersistenceController.shared.enregistrerPlan(type: .nutrition, jour: 0, donnees: data)
    }
}

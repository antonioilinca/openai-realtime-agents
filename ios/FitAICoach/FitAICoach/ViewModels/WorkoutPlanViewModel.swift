import Foundation
import Combine

final class WorkoutPlanViewModel: ObservableObject {
    @Published private(set) var plan: [WorkoutDay] = []
    @Published var selectionJour: Int = 1
    @Published var noteUtilisateur: String = ""

    private let generateur = AIProgramGenerator()
    private var cancellables = Set<AnyCancellable>()

    init() {
        if let sauvegarde: [WorkoutDay] = PersistenceController.shared.chargerPlan(type: .workout, jour: 0, as: [WorkoutDay].self) {
            self.plan = sauvegarde
        }
        PersistenceController.shared.$profilCourant
            .compactMap { $0 }
            .sink { [weak self] profil in
                self?.genererPlan(profil: profil)
            }
            .store(in: &cancellables)
    }

    func genererPlan(profil: UserProfile) {
        plan = generateur.genererPlanEntrainement(profil: profil)
        sauvegarder(plan: plan)
    }

    func jourSelectionne() -> WorkoutDay? {
        plan.first(where: { $0.numeroJour == selectionJour })
    }

    private func sauvegarder(plan: [WorkoutDay]) {
        guard let data = try? JSONEncoder().encode(plan) else { return }
        PersistenceController.shared.enregistrerPlan(type: .workout, jour: 0, donnees: data)
    }
}

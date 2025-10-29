import Foundation
import Combine

final class ProfileViewModel: ObservableObject {
    @Published var profil: UserProfile?
    @Published var poidsActuel: Double = 0
    @Published var objectifTexte: String = ""

    private var cancellables = Set<AnyCancellable>()

    init() {
        PersistenceController.shared.$profilCourant
            .receive(on: DispatchQueue.main)
            .sink { [weak self] profil in
                self?.profil = profil
                self?.poidsActuel = profil?.poids ?? 0
                self?.objectifTexte = profil?.objectif ?? ""
            }
            .store(in: &cancellables)
    }

    func mettreAJourProfil(poids: Double, objectif: String) {
        guard var profil = profil else { return }
        profil.poids = poids
        profil.objectif = objectif
        PersistenceController.shared.sauvegarderProfil(profil)
    }
}

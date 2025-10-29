import Foundation
import Combine

final class AppState: ObservableObject {
    @Published var estOnboarde: Bool
    @Published var profilActif: UserProfile?

    private var cancellables = Set<AnyCancellable>()

    init(estOnboarde: Bool = false) {
        self.estOnboarde = estOnboarde
        PersistenceController.shared.$profilCourant
            .receive(on: DispatchQueue.main)
            .sink { [weak self] profil in
                self?.profilActif = profil
                self?.estOnboarde = profil != nil
            }
            .store(in: &cancellables)
    }
}

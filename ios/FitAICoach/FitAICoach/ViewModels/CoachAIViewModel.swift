import Foundation
import Combine

final class CoachAIViewModel: ObservableObject {
    @Published private(set) var messages: [ChatMessage] = []
    @Published var saisieUtilisateur: String = ""

    private let generateur = AIProgramGenerator()
    private var cancellables = Set<AnyCancellable>()

    init() {
        messages = PersistenceController.shared.chargerMessages()
        if messages.isEmpty {
            messages = [ChatMessage(id: UUID(), role: .coach, contenu: "Bonjour! Je suis votre coach IA FitAI Coach. Comment puis-je vous soutenir aujourd'hui?", date: Date())]
        }
        PersistenceController.shared.$profilCourant
            .compactMap { $0 }
            .sink { [weak self] profil in
                self?.ajouterMessageCoach(contenu: "Programme généré pour \(profil.objectif). Partagez vos sensations!", priorite: .medium)
            }
            .store(in: &cancellables)
    }

    func envoyer() {
        guard !saisieUtilisateur.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return }
        let message = ChatMessage(id: UUID(), role: .utilisateur, contenu: saisieUtilisateur, date: Date())
        messages.append(message)
        saisieUtilisateur = ""
        repondre(message: message)
        PersistenceController.shared.enregistrerMessages(messages)
    }

    private func repondre(message: ChatMessage) {
        guard let profil = PersistenceController.shared.profilCourant else { return }
        let resume = ProgressViewModel().resume
        let contenu = generateur.messageMotivationnel(profil: profil, progression: resume)
        ajouterMessageCoach(contenu: contenu, priorite: .high)
    }

    private func ajouterMessageCoach(contenu: String, priorite: Priorite) {
        let delai: TimeInterval
        switch priorite {
        case .high: delai = 0.7
        case .medium: delai = 1.0
        case .low: delai = 1.3
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + delai) {
            self.messages.append(ChatMessage(id: UUID(), role: .coach, contenu: contenu, date: Date()))
            PersistenceController.shared.enregistrerMessages(self.messages)
        }
    }

    enum Priorite {
        case high
        case medium
        case low
    }
}

import Foundation

struct ChatMessage: Codable, Identifiable, Equatable {
    enum Role: String, Codable {
        case utilisateur
        case coach
    }

    let id: UUID
    var role: Role
    var contenu: String
    var date: Date
}

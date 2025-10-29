import Foundation
import SwiftUI

struct ProgressEntry: Codable, Identifiable, Equatable {
    let id: UUID
    var date: Date
    var poids: Double
    var imc: Double
    var charge: Double
    var caloriesDepensees: Double
}

struct Badge: Codable, Identifiable, Equatable {
    let id: UUID
    var titre: String
    var description: String
    var dateObtention: Date
    var icone: String
}

struct ProgressionResume {
    let poidsActuel: Double
    let differencePoids: Double
    let progressionForce: Double
    let adherenceNutrition: Double
}

import Foundation

struct Exercise: Codable, Identifiable, Equatable {
    let id: UUID
    var nom: String
    var series: Int
    var repetitions: Int
    var tempsRepos: Int
    var instructions: String
    var materiel: String

    init(id: UUID = UUID(), nom: String, series: Int, repetitions: Int, tempsRepos: Int, instructions: String, materiel: String) {
        self.id = id
        self.nom = nom
        self.series = series
        self.repetitions = repetitions
        self.tempsRepos = tempsRepos
        self.instructions = instructions
        self.materiel = materiel
    }
}

struct WorkoutDay: Codable, Identifiable, Equatable {
    let id: UUID
    var numeroJour: Int
    var focus: String
    var echauffement: String
    var exercices: [Exercise]
    var finisher: String
    var etirements: String

    init(id: UUID = UUID(), numeroJour: Int, focus: String, echauffement: String, exercices: [Exercise], finisher: String, etirements: String) {
        self.id = id
        self.numeroJour = numeroJour
        self.focus = focus
        self.echauffement = echauffement
        self.exercices = exercices
        self.finisher = finisher
        self.etirements = etirements
    }
}

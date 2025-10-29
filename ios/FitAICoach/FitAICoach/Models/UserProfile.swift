import Foundation

struct UserProfile: Codable, Identifiable, Equatable {
    let id: UUID
    var genre: String
    var age: Int
    var taille: Double
    var poids: Double
    var objectif: String
    var typeEntrainement: String
    var seancesParSemaine: Int
    var restrictionsAlimentaires: [String]
    var niveauActivite: String
    var budgetAlimentaire: String
    var preferencesAlimentaires: [String]

    init(id: UUID = UUID(), genre: String, age: Int, taille: Double, poids: Double, objectif: String, typeEntrainement: String, seancesParSemaine: Int, restrictionsAlimentaires: [String], niveauActivite: String, budgetAlimentaire: String, preferencesAlimentaires: [String]) {
        self.id = id
        self.genre = genre
        self.age = age
        self.taille = taille
        self.poids = poids
        self.objectif = objectif
        self.typeEntrainement = typeEntrainement
        self.seancesParSemaine = seancesParSemaine
        self.restrictionsAlimentaires = restrictionsAlimentaires
        self.niveauActivite = niveauActivite
        self.budgetAlimentaire = budgetAlimentaire
        self.preferencesAlimentaires = preferencesAlimentaires
    }
}

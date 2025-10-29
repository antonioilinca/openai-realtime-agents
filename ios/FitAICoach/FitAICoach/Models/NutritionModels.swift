import Foundation

struct Meal: Codable, Identifiable, Equatable {
    let id: UUID
    var nom: String
    var ingredients: [String]
    var calories: Int
    var proteines: Double
    var glucides: Double
    var lipides: Double
    var recette: String
    var imageName: String

    init(id: UUID = UUID(), nom: String, ingredients: [String], calories: Int, proteines: Double, glucides: Double, lipides: Double, recette: String, imageName: String) {
        self.id = id
        self.nom = nom
        self.ingredients = ingredients
        self.calories = calories
        self.proteines = proteines
        self.glucides = glucides
        self.lipides = lipides
        self.recette = recette
        self.imageName = imageName
    }
}

struct MealPlan: Codable, Identifiable, Equatable {
    let id: UUID
    var jour: Int
    var repas: [Meal]

    init(id: UUID = UUID(), jour: Int, repas: [Meal]) {
        self.id = id
        self.jour = jour
        self.repas = repas
    }
}

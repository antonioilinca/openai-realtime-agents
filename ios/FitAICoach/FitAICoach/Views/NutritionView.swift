import SwiftUI

struct NutritionView: View {
    @ObservedObject var viewModel: NutritionPlanViewModel
    @EnvironmentObject private var theme: ThemeManager

    var body: some View {
        NavigationStack {
            VStack(spacing: 16) {
                Picker("Jour", selection: $viewModel.jourSelectionne) {
                    ForEach(1...90, id: \.self) { jour in
                        Text("Jour \(jour)").tag(jour)
                    }
                }
                .pickerStyle(.wheel)

                if let plan = viewModel.planDuJour() {
                    List {
                        Section(header: Text("Macro objectifs")) {
                            let macros = plan.repas.reduce(into: (cal: 0, prot: 0.0, glu: 0.0, lip: 0.0)) { acc, repas in
                                acc.cal += repas.calories
                                acc.prot += repas.proteines
                                acc.glu += repas.glucides
                                acc.lip += repas.lipides
                            }
                            Text("Calories: \(macros.cal) kcal")
                            Text("Protéines: \(Int(macros.prot)) g")
                            Text("Glucides: \(Int(macros.glu)) g")
                            Text("Lipides: \(Int(macros.lip)) g")
                        }

                        Section(header: Text("Repas")) {
                            ForEach(plan.repas) { repas in
                                NavigationLink(destination: MealDetailView(meal: repas)) {
                                    HStack {
                                        Circle()
                                            .fill(theme.palette.accent.gradient)
                                            .frame(width: 44, height: 44)
                                            .overlay(Text(repas.nom.prefix(1)).foregroundColor(.white))
                                        VStack(alignment: .leading) {
                                            Text(repas.nom)
                                                .font(.headline)
                                            Text("\(repas.calories) kcal")
                                                .font(.caption)
                                                .foregroundColor(.secondary)
                                        }
                                    }
                                    .padding(.vertical, 6)
                                }
                            }
                        }
                    }
                    .listStyle(.insetGrouped)
                } else {
                    Spacer()
                    Text("Sélectionnez un jour pour afficher les repas générés.")
                        .foregroundColor(.secondary)
                    Spacer()
                }
            }
            .padding()
            .navigationTitle("Plan alimentaire")
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button {
                        if let profil = PersistenceController.shared.profilCourant {
                            viewModel.genererPlan(profil: profil)
                        }
                    } label: {
                        Image(systemName: "arrow.clockwise")
                    }
                }
            }
        }
    }
}

struct MealDetailView: View {
    let meal: Meal

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                Text(meal.nom)
                    .font(.largeTitle.bold())
                Text("Ingrédients")
                    .font(.title3.bold())
                ForEach(meal.ingredients, id: \.self) { ingredient in
                    Text("• \(ingredient)")
                }
                Text("Instructions")
                    .font(.title3.bold())
                Text(meal.recette)
                Divider()
                Text("Valeurs nutritionnelles")
                    .font(.title3.bold())
                Text("Calories: \(meal.calories) kcal")
                Text("Protéines: \(Int(meal.proteines)) g")
                Text("Glucides: \(Int(meal.glucides)) g")
                Text("Lipides: \(Int(meal.lipides)) g")
            }
            .padding()
        }
        .navigationTitle(meal.nom)
        .navigationBarTitleDisplayMode(.inline)
    }
}

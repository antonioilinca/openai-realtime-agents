import SwiftUI

struct WorkoutListView: View {
    @ObservedObject var viewModel: WorkoutPlanViewModel
    @EnvironmentObject private var theme: ThemeManager

    var body: some View {
        NavigationStack {
            List {
                ForEach(viewModel.plan) { jour in
                    NavigationLink(value: jour.numeroJour) {
                        HStack {
                            VStack(alignment: .leading, spacing: 4) {
                                Text("Jour \(jour.numeroJour)")
                                    .font(.headline)
                                Text(jour.focus)
                                    .font(.subheadline)
                                    .foregroundStyle(theme.palette.accent)
                            }
                            Spacer()
                            Text("\(jour.exercices.count) exercices")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                        .padding(.vertical, 8)
                    }
                }
            }
            .listStyle(.insetGrouped)
            .navigationDestination(for: Int.self) { jour in
                if let workout = viewModel.plan.first(where: { $0.numeroJour == jour }) {
                    WorkoutDetailView(jour: workout)
                }
            }
            .navigationTitle("Programme 90 jours")
            .toolbar {
                ToolbarItemGroup(placement: .bottomBar) {
                    Button {
                        if let profil = PersistenceController.shared.profilCourant {
                            viewModel.genererPlan(profil: profil)
                        }
                    } label: {
                        Label("Regénérer", systemImage: "arrow.clockwise")
                    }
                    Spacer()
                    Text("Jour sélectionné: \(viewModel.selectionJour)")
                }
            }
        }
    }
}

struct WorkoutDetailView: View {
    let jour: WorkoutDay

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                Text(jour.focus)
                    .font(.largeTitle.bold())
                Text("Échauffement")
                    .font(.title3.bold())
                Text(jour.echauffement)
                Divider()
                ForEach(jour.exercices) { exercice in
                    VStack(alignment: .leading, spacing: 6) {
                        HStack {
                            Text(exercice.nom)
                                .font(.headline)
                            Spacer()
                            Text("\(exercice.series)x\(exercice.repetitions)")
                                .font(.subheadline)
                        }
                        Text(exercice.instructions)
                            .font(.footnote)
                        Text("Matériel: \(exercice.materiel)")
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                    .padding()
                    .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 16))
                }
                Divider()
                Text("Finisher")
                    .font(.title3.bold())
                Text(jour.finisher)
                Text("Étirements")
                    .font(.title3.bold())
                Text(jour.etirements)
            }
            .padding()
        }
        .navigationTitle("Jour \(jour.numeroJour)")
        .navigationBarTitleDisplayMode(.inline)
    }
}

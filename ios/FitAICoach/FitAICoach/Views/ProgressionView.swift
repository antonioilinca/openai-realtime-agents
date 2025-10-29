import SwiftUI
import Charts

struct ProgressionView: View {
    @ObservedObject var viewModel: ProgressViewModel
    @State private var poids: Double = 70
    @State private var charge: Double = 40
    @State private var calories: Double = 2200

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    graphiquesSection
                    saisieSection
                    badgesSection
                }
                .padding()
            }
            .navigationTitle("Suivi progression")
        }
        .onAppear {
            viewModel.charger()
        }
    }

    private var graphiquesSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Évolution du poids")
                .font(.headline)
            Chart(viewModel.entrees) { entree in
                LineMark(x: .value("Date", entree.date), y: .value("Poids", entree.poids))
                    .foregroundStyle(.blue)
                PointMark(x: .value("Date", entree.date), y: .value("Poids", entree.poids))
                    .foregroundStyle(.blue)
            }
            .frame(height: 200)

            Text("Charges maximales")
                .font(.headline)
            Chart(viewModel.entrees) { entree in
                BarMark(x: .value("Date", entree.date), y: .value("Charge", entree.charge))
                    .foregroundStyle(.green)
            }
            .frame(height: 200)
        }
        .padding()
        .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 24))
    }

    private var saisieSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Ajouter une mesure")
                .font(.headline)
            VStack(alignment: .leading) {
                Text("Poids (kg): \(String(format: "%.1f", poids))")
                Slider(value: $poids, in: 30...180)
            }
            VStack(alignment: .leading) {
                Text("Charge max (kg): \(String(format: "%.1f", charge))")
                Slider(value: $charge, in: 10...200)
            }
            VStack(alignment: .leading) {
                Text("Calories dépensées: \(Int(calories))")
                Slider(value: $calories, in: 1000...4000)
            }
            Button {
                viewModel.enregistrer(poids: poids, charge: charge, calories: calories)
            } label: {
                Label("Enregistrer", systemImage: "tray.and.arrow.down")
                    .frame(maxWidth: .infinity)
            }
            .buttonStyle(GlassButtonStyle())
        }
        .padding()
        .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 24))
    }

    private var badgesSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Badges gagnés")
                .font(.headline)
            if viewModel.badges.isEmpty {
                Text("Enregistrez vos séances pour débloquer des badges inspirants.")
                    .foregroundColor(.secondary)
            } else {
                ForEach(viewModel.badges) { badge in
                    HStack {
                        Image(systemName: badge.icone)
                            .font(.title2)
                        VStack(alignment: .leading) {
                            Text(badge.titre)
                                .font(.headline)
                            Text(badge.description)
                                .font(.caption)
                        }
                        Spacer()
                        Text(badge.dateObtention, style: .date)
                            .font(.caption)
                    }
                    .padding()
                    .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 18))
                }
            }
        }
        .padding()
        .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 24))
    }
}

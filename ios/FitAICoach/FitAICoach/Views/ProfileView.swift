import SwiftUI

struct ProfileView: View {
    @ObservedObject var viewModel: ProfileViewModel

    var body: some View {
        Form {
            Section(header: Text("Informations")) {
                if let profil = viewModel.profil {
                    Text("Genre: \(profil.genre)")
                    Text("Âge: \(profil.age) ans")
                    Text("Taille: \(Int(profil.taille)) cm")
                    TextField("Poids", value: $viewModel.poidsActuel, formatter: NumberFormatter.decimal)
                        .keyboardType(.decimalPad)
                    TextField("Objectif", text: $viewModel.objectifTexte)
                } else {
                    Text("Profil en cours de chargement...")
                }
            }

            Section(header: Text("Préférences")) {
                if let profil = viewModel.profil {
                    Text("Séances/semaine: \(profil.seancesParSemaine)")
                    Text("Restrictions: \(profil.restrictionsAlimentaires.joined(separator: ", ").ifEmpty("Aucune"))")
                    Text("Préférences: \(profil.preferencesAlimentaires.joined(separator: ", ").ifEmpty("Varié"))")
                }
            }

            Button {
                viewModel.mettreAJourProfil(poids: viewModel.poidsActuel, objectif: viewModel.objectifTexte)
            } label: {
                Label("Mettre à jour", systemImage: "square.and.pencil")
            }
        }
        .navigationTitle("Profil")
    }
}

private extension NumberFormatter {
    static var decimal: NumberFormatter {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 1
        return formatter
    }
}

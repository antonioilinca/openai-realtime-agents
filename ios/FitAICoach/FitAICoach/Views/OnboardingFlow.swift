import SwiftUI

struct OnboardingFlow: View {
    @StateObject private var viewModel = OnboardingViewModel()
    @EnvironmentObject private var theme: ThemeManager

    var body: some View {
        VStack(spacing: 24) {
            ProgressView(value: viewModel.progression)
                .accentColor(theme.palette.accent)
                .padding(.top, 32)

            TabView(selection: $viewModel.etape) {
                genreEtObjectif
                    .tag(0)
                mesuresEtActivite
                    .tag(1)
                seancesView
                    .tag(2)
                restrictionsView
                    .tag(3)
                preferencesView
                    .tag(4)
                recapView
                    .tag(5)
            }
            .tabViewStyle(.page(indexDisplayMode: .never))

            HStack {
                if viewModel.etape > 0 {
                    Button("Précédent") {
                        withAnimation { viewModel.revenirEtape() }
                    }
                    .buttonStyle(GlassButtonStyle())
                }
                Spacer()
                Button(viewModel.etape == viewModel.totalEtapes - 1 ? "Finaliser" : "Suivant") {
                    withAnimation {
                        if viewModel.etape == viewModel.totalEtapes - 1 {
                            viewModel.finaliser()
                        } else {
                            viewModel.validerEtape()
                        }
                    }
                }
                .buttonStyle(GlassButtonStyle())
            }
            .padding(.horizontal)
            .padding(.bottom, 24)
        }
        .padding(.horizontal)
        .background(
            LinearGradient(colors: [theme.palette.fondClair, Color.white.opacity(0.6)], startPoint: .topLeading, endPoint: .bottomTrailing)
                .ignoresSafeArea()
        )
    }

    private var genreEtObjectif: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Bienvenue sur FitAI Coach")
                .font(.largeTitle.bold())
            Text("Construisons un programme sur-mesure en quelques questions.")
                .foregroundColor(.secondary)
            Picker("Genre", selection: $viewModel.genre) {
                Text("Femme").tag("Femme")
                Text("Homme").tag("Homme")
                Text("Autre").tag("Autre")
            }
            .pickerStyle(.segmented)

            Picker("Objectif principal", selection: $viewModel.objectif) {
                Text("Perte de gras").tag("Perte de gras")
                Text("Prise de muscle").tag("Prise de muscle")
                Text("Maintien").tag("Maintien")
                Text("Bien-être").tag("Bien-être")
            }
            .pickerStyle(.menu)
        }
    }

    private var mesuresEtActivite: some View {
        VStack(alignment: .leading, spacing: 20) {
            Text("Vos mesures")
                .font(.title2.bold())
            HStack {
                VStack(alignment: .leading) {
                    Text("Âge: \(Int(viewModel.age))")
                    Slider(value: $viewModel.age, in: 15...70, step: 1)
                }
                VStack(alignment: .leading) {
                    Text("Taille: \(Int(viewModel.taille)) cm")
                    Slider(value: $viewModel.taille, in: 140...210)
                }
            }
            Text("Poids: \(String(format: "%.1f", viewModel.poids)) kg")
            Slider(value: $viewModel.poids, in: 40...150)

            Picker("Niveau d'activité", selection: $viewModel.niveauActivite) {
                Text("Faible").tag("Faible")
                Text("Modéré").tag("Modéré")
                Text("Élevé").tag("Élevé")
            }
            .pickerStyle(.segmented)
        }
    }

    private var seancesView: some View {
        VStack(alignment: .leading, spacing: 18) {
            Text("Combien de séances par semaine?")
                .font(.title2.bold())
            Slider(value: $viewModel.seancesParSemaine, in: 2...6, step: 1)
            Text("\(Int(viewModel.seancesParSemaine)) séances prévues")
            Picker("Type d'entraînement", selection: $viewModel.typeEntrainement) {
                Text("Maison").tag("Maison")
                Text("Salle").tag("Salle")
                Text("Hybride").tag("Hybride")
            }
            .pickerStyle(.segmented)
        }
    }

    private var restrictionsView: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Restrictions alimentaires")
                .font(.title2.bold())
            Toggle("Végétarien", isOn: Binding(
                get: { viewModel.restrictions.contains("Végétarien") },
                set: { actif in
                    mettreAJour(&viewModel.restrictions, valeur: "Végétarien", actif: actif)
                }
            ))
            Toggle("Sans gluten", isOn: Binding(
                get: { viewModel.restrictions.contains("Sans gluten") },
                set: { actif in
                    mettreAJour(&viewModel.restrictions, valeur: "Sans gluten", actif: actif)
                }
            ))
            Toggle("Sans lactose", isOn: Binding(
                get: { viewModel.restrictions.contains("Sans lactose") },
                set: { actif in
                    mettreAJour(&viewModel.restrictions, valeur: "Sans lactose", actif: actif)
                }
            ))
        }
    }

    private var preferencesView: some View {
        VStack(alignment: .leading, spacing: 18) {
            Text("Préférences culinaires")
                .font(.title2.bold())
            Toggle("Cuisine méditerranéenne", isOn: Binding(
                get: { viewModel.preferences.contains("Méditerranéenne") },
                set: { actif in
                    mettreAJour(&viewModel.preferences, valeur: "Méditerranéenne", actif: actif)
                }
            ))
            Toggle("Recettes rapides", isOn: Binding(
                get: { viewModel.preferences.contains("Rapide") },
                set: { actif in
                    mettreAJour(&viewModel.preferences, valeur: "Rapide", actif: actif)
                }
            ))
            Toggle("Budget optimisé", isOn: Binding(
                get: { viewModel.budget == "Économique" },
                set: { actif in
                    viewModel.budget = actif ? "Économique" : "Standard"
                }
            ))
        }
    }

    private var recapView: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Résumé personnalisé")
                .font(.title2.bold())
            GroupBox {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Profil: \(viewModel.genre), \(Int(viewModel.age)) ans, \(Int(viewModel.taille)) cm")
                    Text("Objectif: \(viewModel.objectif)")
                    Text("Séances: \(Int(viewModel.seancesParSemaine)) par semaine")
                    Text("Restrictions: \(viewModel.restrictions.joined(separator: ", ").ifEmpty("Aucune"))")
                    Text("Préférences: \(viewModel.preferences.joined(separator: ", ").ifEmpty("Varié"))")
                }
            }
            Text("Validez pour générer automatiquement votre programme complet.")
                .foregroundColor(.secondary)
        }
    }

    private func mettreAJour(_ collection: inout [String], valeur: String, actif: Bool) {
        if actif {
            if !collection.contains(valeur) { collection.append(valeur) }
        } else {
            collection.removeAll { $0 == valeur }
        }
    }
}


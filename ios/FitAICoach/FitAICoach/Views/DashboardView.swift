import SwiftUI

struct DashboardView: View {
    @EnvironmentObject private var theme: ThemeManager
    @ObservedObject var progressVM: ProgressViewModel

    @State private var afficherExport = false
    @State private var exportData: Data?

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    resumeBloc
                    progressionCarte
                    boutonsActions
                }
                .padding()
            }
            .navigationTitle("FitAI Coach")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button {
                        exportPDF()
                    } label: {
                        Image(systemName: "square.and.arrow.up")
                    }
                    .accessibilityLabel("Exporter en PDF")
                }
            }
            .sheet(isPresented: $afficherExport) {
                if let exportData {
                    ActivityViewController(activityItems: [exportData])
                }
            }
        }
        .onAppear {
            progressVM.charger()
        }
    }

    private var resumeBloc: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Transformation 90 jours")
                .font(.title.bold())
            if let resume = progressVM.resume {
                Text("Poids actuel: \(String(format: "%.1f", resume.poidsActuel)) kg")
                ProgressView(value: min(1.0, abs(resume.differencePoids) / 5.0)) {
                    Text("Objectif poids")
                } currentValueLabel: {
                    Text("\(String(format: "%.1f", resume.differencePoids)) kg")
                }
                ProgressView(value: resume.progressionForce) {
                    Text("Force")
                } currentValueLabel: {
                    Text("\(Int(resume.progressionForce * 100)) %")
                }
                ProgressView(value: resume.adherenceNutrition) {
                    Text("Adhérence nutrition")
                } currentValueLabel: {
                    Text("\(Int(resume.adherenceNutrition * 100)) %")
                }
            } else {
                Text("Renseignez vos premières données de progression pour activer les recommandations personnalisées.")
                    .foregroundColor(.secondary)
            }
        }
        .padding()
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 24))
    }

    private var progressionCarte: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Badges récents")
                .font(.headline)
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 16) {
                    ForEach(progressVM.badges) { badge in
                        VStack {
                            Image(systemName: badge.icone)
                                .font(.largeTitle)
                                .foregroundStyle(theme.palette.accent)
                            Text(badge.titre)
                                .font(.headline)
                            Text(badge.description)
                                .font(.caption)
                                .multilineTextAlignment(.center)
                        }
                        .padding()
                        .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 18))
                    }
                }
            }
        }
        .padding()
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 24))
    }

    private var boutonsActions: some View {
        VStack(spacing: 12) {
            Button(action: exportPDF) {
                Label("Exporter le plan complet", systemImage: "doc.richtext")
                    .frame(maxWidth: .infinity)
            }
            .buttonStyle(GlassButtonStyle())

            Button {
                NotificationScheduler.shared.demanderAutorisation()
                NotificationScheduler.shared.programmerRappelsEntrainement(jours: [1, 3, 5], heure: DateComponents(hour: 18, minute: 30))
                NotificationScheduler.shared.programmerRappelsRepas()
                NotificationScheduler.shared.programmerCitation()
            } label: {
                Label("Activer les rappels", systemImage: "bell.badge.fill")
                    .frame(maxWidth: .infinity)
            }
            .buttonStyle(GlassButtonStyle())
        }
    }

    private func exportPDF() {
        guard let profil = PersistenceController.shared.profilCourant else { return }
        let workouts = WorkoutPlanViewModel().plan
        let meals = NutritionPlanViewModel().plans
        let progression = progressVM.entrees
        exportData = PDFExporter.shared.genererPDF(profil: profil, workouts: workouts, meals: meals, progression: progression)
        afficherExport = exportData != nil
    }
}

struct DashboardView_Previews: PreviewProvider {
    static var previews: some View {
        DashboardView(progressVM: ProgressViewModel())
            .environmentObject(ThemeManager())
            .background(Image("dashboard-bg"))
    }
}

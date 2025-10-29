import SwiftUI

struct MainTabView: View {
    @StateObject private var workoutVM = WorkoutPlanViewModel()
    @StateObject private var nutritionVM = NutritionPlanViewModel()
    @StateObject private var progressVM = ProgressViewModel()
    @StateObject private var coachVM = CoachAIViewModel()
    @StateObject private var profilVM = ProfileViewModel()

    var body: some View {
        TabView {
            DashboardView(progressVM: progressVM)
                .tabItem {
                    Label("Accueil", systemImage: "house.fill")
                }

            WorkoutListView(viewModel: workoutVM)
                .tabItem {
                    Label("Entraînement", systemImage: "figure.strengthtraining.traditional")
                }

            NutritionView(viewModel: nutritionVM)
                .tabItem {
                    Label("Nutrition", systemImage: "fork.knife")
                }

            ProgressionView(viewModel: progressVM)
                .tabItem {
                    Label("Progression", systemImage: "chart.line.uptrend.xyaxis")
                }

            CoachIAView(viewModel: coachVM)
                .tabItem {
                    Label("Coach IA", systemImage: "message.fill")
                }

            ProfileView(viewModel: profilVM)
                .tabItem {
                    Label("Profil", systemImage: "person.crop.circle")
                }
        }
    }
}

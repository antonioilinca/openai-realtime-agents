import SwiftUI

struct RootView: View {
    @EnvironmentObject private var appState: AppState

    var body: some View {
        Group {
            if appState.estOnboarde {
                MainTabView()
            } else {
                OnboardingFlow()
            }
        }
    }
}

struct RootView_Previews: PreviewProvider {
    static var previews: some View {
        RootView()
            .environmentObject(AppState(estOnboarde: true))
            .environmentObject(ThemeManager())
    }
}

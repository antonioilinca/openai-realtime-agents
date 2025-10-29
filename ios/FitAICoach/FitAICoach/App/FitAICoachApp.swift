import SwiftUI
import CoreData

@main
struct FitAICoachApp: App {
    @StateObject private var persistenceController = PersistenceController.shared
    @StateObject private var appState = AppState()

    var body: some Scene {
        WindowGroup {
            RootView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
                .environmentObject(appState)
                .environmentObject(ThemeManager())
                .onAppear {
                    persistenceController.setupDefaultData()
                }
        }
    }
}

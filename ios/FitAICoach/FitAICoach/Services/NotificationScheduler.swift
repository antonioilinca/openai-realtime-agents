import Foundation
import UserNotifications

final class NotificationScheduler {
    static let shared = NotificationScheduler()

    private init() {}

    func demanderAutorisation() {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { accord, erreur in
            if let erreur = erreur {
                print("Erreur de demande de notifications: \(erreur)")
            } else {
                print("Autorisation notifications: \(accord)")
            }
        }
    }

    func programmerRappelsEntrainement(jours: [Int], heure: DateComponents) {
        let center = UNUserNotificationCenter.current()
        center.removePendingNotificationRequests(withIdentifiers: jours.map { "entrainement-\($0)" })
        for jour in jours {
            let content = UNMutableNotificationContent()
            content.title = "Séance FitAI Coach"
            content.body = "Votre entraînement du jour \(jour) est prêt. Enfilez vos baskets!"
            content.sound = .default

            var components = heure
            components.weekday = ((jour - 1) % 7) + 1

            let trigger = UNCalendarNotificationTrigger(dateMatching: components, repeats: true)
            let request = UNNotificationRequest(identifier: "entrainement-\(jour)", content: content, trigger: trigger)
            center.add(request)
        }
    }

    func programmerRappelsRepas() {
        let heures = [8, 12, 19]
        for (index, heure) in heures.enumerated() {
            let content = UNMutableNotificationContent()
            content.title = "Moment nutrition"
            content.body = "Votre repas #\(index + 1) est planifié. Préparez-vous à cuisiner sain!"
            content.sound = .default

            var components = DateComponents()
            components.hour = heure
            let trigger = UNCalendarNotificationTrigger(dateMatching: components, repeats: true)
            let request = UNNotificationRequest(identifier: "repas-\(index)", content: content, trigger: trigger)
            UNUserNotificationCenter.current().add(request)
        }
    }

    func programmerCitation() {
        let content = UNMutableNotificationContent()
        content.title = "Inspiration du jour"
        content.body = """La discipline est le pont entre les objectifs et leur réalisation."""
        content.sound = .default

        var components = DateComponents()
        components.hour = 7
        let trigger = UNCalendarNotificationTrigger(dateMatching: components, repeats: true)
        let request = UNNotificationRequest(identifier: "citation-jour", content: content, trigger: trigger)
        UNUserNotificationCenter.current().add(request)
    }
}

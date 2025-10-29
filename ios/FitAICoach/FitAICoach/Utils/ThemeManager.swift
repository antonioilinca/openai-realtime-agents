import SwiftUI

final class ThemeManager: ObservableObject {
    struct Palette {
        let primaire = Color(hex: "#0a73e1")
        let secondaire = Color(hex: "#1a1a1a")
        let accent = Color(hex: "#D4AF37")
        let fondClair = Color(hex: "#FFFFFF")
        let fondSombre = Color(hex: "#0C0C0C")
    }

    let palette = Palette()
}

extension Color {
    init(hex: String) {
        let scanner = Scanner(string: hex)
        _ = scanner.scanString("#")

        var rgbValue: UInt64 = 0
        scanner.scanHexInt64(&rgbValue)

        let r = Double((rgbValue >> 16) & 0xff) / 255.0
        let g = Double((rgbValue >> 8) & 0xff) / 255.0
        let b = Double(rgbValue & 0xff) / 255.0

        self.init(red: r, green: g, blue: b)
    }
}

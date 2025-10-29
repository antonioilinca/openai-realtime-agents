import Foundation

extension String {
    func ifEmpty(_ remplacement: String) -> String {
        isEmpty ? remplacement : self
    }
}

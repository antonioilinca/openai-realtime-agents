import SwiftUI

struct CoachIAView: View {
    @ObservedObject var viewModel: CoachAIViewModel

    var body: some View {
        VStack(spacing: 0) {
            ScrollViewReader { proxy in
                ScrollView {
                    LazyVStack(spacing: 12) {
                        ForEach(viewModel.messages) { message in
                            messageBubble(message)
                                .id(message.id)
                        }
                    }
                    .padding()
                }
                .background(Color(.systemGroupedBackground))
                .onChange(of: viewModel.messages.count) { _ in
                    if let dernier = viewModel.messages.last {
                        withAnimation {
                            proxy.scrollTo(dernier.id, anchor: .bottom)
                        }
                    }
                }
            }
            saisieBarre
        }
        .navigationTitle("Coach IA")
    }

    private func messageBubble(_ message: ChatMessage) -> some View {
        HStack {
            if message.role == .coach { Spacer() }
            VStack(alignment: .leading, spacing: 6) {
                Text(message.role == .coach ? "Coach" : "Vous")
                    .font(.caption)
                    .foregroundColor(.secondary)
                Text(message.contenu)
                    .font(.body)
                    .padding(12)
                    .background(message.role == .coach ? Color.blue.opacity(0.85) : Color.gray.opacity(0.2), in: RoundedRectangle(cornerRadius: 18))
                    .foregroundColor(message.role == .coach ? .white : .primary)
            }
            if message.role == .utilisateur { Spacer() }
        }
        .transition(.move(edge: message.role == .coach ? .trailing : .leading).combined(with: .opacity))
    }

    private var saisieBarre: some View {
        HStack {
            TextField("Partagez vos sensations...", text: $viewModel.saisieUtilisateur, axis: .vertical)
                .textFieldStyle(.roundedBorder)
            Button {
                viewModel.envoyer()
            } label: {
                Image(systemName: "paperplane.fill")
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
        .background(.ultraThinMaterial)
    }
}

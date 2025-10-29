import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atlas Stratégique IA",
  description:
    "Générateur de plans d’action 30/60/90 jours pour entrepreneurs francophones avec IA intégrée.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="bg-surface-primary">
      <body className="antialiased bg-surface-primary text-primary-900">
        {children}
      </body>
    </html>
  );
}

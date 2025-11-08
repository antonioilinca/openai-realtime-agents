import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Codex Python Day Camp",
  description:
    "Formation immersive en Python pour débutants : apprends les bases, pratique et lance ton mini-projet en une journée.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="bg-sand-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}

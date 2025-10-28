import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

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
      <body
        className={`${inter.variable} ${dmSans.variable} antialiased bg-surface-primary text-primary-900`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EventFlow | Billetterie en ligne sans commission & Cashless",
  description: "La solution de billetterie événementielle nouvelle génération. Créez votre événement en 2 minutes, gardez 100% de vos revenus (0% commission) et encaissez vos fonds à J+0.",
  keywords: ["billetterie en ligne", "logiciel billetterie", "créer un événement", "solution événementielle", "cashless", "sans commission", "gestion d'équipe événement"],
  openGraph: {
    title: "EventFlow - Billetterie 100% gratuite pour les organisateurs",
    description: "Orchestrez votre événement avec brio. Billetterie sans commission, cashless intégré, vos fonds disponibles le jour même.",
    type: "website",
    locale: "fr_FR",
    siteName: "EventFlow",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

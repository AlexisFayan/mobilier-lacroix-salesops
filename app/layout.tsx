import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mobilier Lacroix, Pilotage commercial & copilote IA",
  description:
    "Prototype SalesOps + IA pour Mobilier Lacroix : pipeline des projets, scoring des devis, copilote de relance et résumé d'échanges.",
  openGraph: {
    title: "Mobilier Lacroix — SalesOps B2B augmenté par l'IA",
    description:
      "Étude de cas : remettre de l'ordre dans la vente d'un atelier de mobilier sur-mesure, avec une IA utile et gratuite.",
    type: "website",
    locale: "fr_FR",
    siteName: "Mobilier Lacroix",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

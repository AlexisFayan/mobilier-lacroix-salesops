import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mobilier Lacroix — Pilotage commercial & copilote IA",
  description:
    "Prototype SalesOps + IA pour Mobilier Lacroix : pipeline des projets, scoring des devis, copilote de relance et résumé d'échanges.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

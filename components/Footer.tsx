import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-paper/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-10 text-center">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-bois-dark text-paper">
            <span className="font-serif text-lg leading-none">L</span>
          </span>
          <span className="font-serif text-lg font-semibold text-bois-dark">Mobilier Lacroix</span>
        </div>
        <p className="max-w-md text-[12.5px] leading-relaxed text-muted">
          Étude de cas <strong className="text-ink">SalesOps B2B augmenté par l'IA</strong>.
          Epitech Digital School Lyon · Promo 2026.
        </p>
        <div className="flex gap-3 text-[12.5px]">
          <Link href="/crm" className="font-medium text-terracotta-dark hover:underline">
            Prototype
          </Link>
          <span className="text-border">·</span>
          <Link href="/charte" className="font-medium text-terracotta-dark hover:underline">
            Charte graphique
          </Link>
          <span className="text-border">·</span>
          <Link href="/rendu" className="font-medium text-terracotta-dark hover:underline">
            Rendu du projet
          </Link>
        </div>
        <p className="text-[10.5px] text-muted/80">
          Projet pédagogique fictif · Photos d'illustration sous licence Creative Commons (Flickr).
        </p>
      </div>
    </footer>
  );
}

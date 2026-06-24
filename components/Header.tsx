import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-bois-dark text-paper shadow-sm">
            <span className="font-serif text-lg leading-none">L</span>
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-[15px] font-semibold text-bois-dark">
              Mobilier Lacroix
            </span>
            <span className="block text-[10px] uppercase tracking-[0.18em] text-muted">
              Atelier sur mesure · CHR
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/crm"
            className="rounded-full px-3.5 py-1.5 font-medium text-ink transition hover:bg-sand"
          >
            Le prototype
          </Link>
          <Link
            href="/charte"
            className="hidden rounded-full px-3.5 py-1.5 font-medium text-ink transition hover:bg-sand sm:inline-block"
          >
            La charte
          </Link>
          <Link
            href="/rendu"
            className="rounded-full bg-bois-dark px-3.5 py-1.5 font-medium text-paper transition hover:bg-bois"
          >
            Le dossier
          </Link>
        </nav>
      </div>
    </header>
  );
}

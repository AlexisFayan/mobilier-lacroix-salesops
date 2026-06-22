import Link from "next/link";
import Header from "@/components/Header";

function Feature({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-border bg-paper p-5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="text-2xl">{icon}</div>
      <h3 className="mt-2 font-serif text-lg font-semibold text-bois-dark">{title}</h3>
      <p className="mt-1 text-[13.5px] leading-relaxed text-ink/80">{desc}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-5 pb-10 pt-16 text-center">
          <span className="inline-block rounded-full border border-border bg-paper px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted">
            Atelier sur mesure · Cafés · Restaurants · Hôtels
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl font-serif text-4xl font-semibold leading-tight text-bois-dark sm:text-5xl">
            Donner une âme aux lieux où les gens se réunissent.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/80">
            Mobilier Lacroix façonne, à la main, le mobilier sur mesure du CHR. Voici le prototype
            qui remet de l'ordre dans sa façon de vendre — un pilotage commercial simple, augmenté
            par une IA utile et mesurable.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/crm"
              className="rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-paper shadow-sm transition hover:bg-terracotta-dark"
            >
              🛠️ Ouvrir le prototype
            </Link>
            <Link
              href="/rendu"
              className="rounded-full border border-bois-dark px-6 py-3 text-sm font-medium text-bois-dark transition hover:bg-sand"
            >
              📂 Voir le rendu
            </Link>
          </div>
        </section>

        {/* Le pourquoi / le comment / le quoi */}
        <section className="mx-auto max-w-5xl px-5 py-6">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-sand/50 p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-terracotta-dark">Pourquoi</div>
              <p className="mt-1.5 text-[13.5px] text-ink/85">
                Faire que chaque café, restaurant ou hôtel raconte sa propre histoire.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-sand/50 p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-terracotta-dark">Comment</div>
              <p className="mt-1.5 text-[13.5px] text-ink/85">
                L'artisanat du sur-mesure, le savoir-faire d'atelier, l'accompagnement de bout en bout.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-sand/50 p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-terracotta-dark">Quoi</div>
              <p className="mt-1.5 text-[13.5px] text-ink/85">
                Du mobilier sur mesure, conçu pour durer et porter l'identité du lieu.
              </p>
            </div>
          </div>
        </section>

        {/* Fonctionnalités du prototype */}
        <section className="mx-auto max-w-5xl px-5 py-8">
          <h2 className="mb-4 text-center font-serif text-2xl font-semibold text-bois-dark">
            Le copilote SalesOps de l'atelier
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Feature icon="📊" title="Pipeline des projets" desc="Le funnel reconstruit, de la demande à la signature, avec KPIs en direct." />
            <Feature icon="🎯" title="Scoring des devis" desc="L'IA estime la probabilité de signature et priorise les relances." />
            <Feature icon="✍️" title="Copilote de relance" desc="Des emails « dans le ton » de la marque, prêts en un clic." />
            <Feature icon="🧾" title="Résumé d'échanges" desc="Chaque dossier synthétisé en une fiche projet exploitable." />
          </div>
        </section>

        <footer className="border-t border-border py-8 text-center text-[12px] text-muted">
          Mobilier Lacroix · Prototype SalesOps + IA · Epitech Digital School Lyon — Promo 2026
        </footer>
      </main>
    </>
  );
}

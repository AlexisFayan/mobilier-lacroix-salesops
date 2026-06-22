import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-border bg-paper px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
      {children}
    </span>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-serif text-3xl font-semibold text-terracotta-dark sm:text-4xl">{value}</div>
      <div className="mt-1 text-[12px] uppercase tracking-wide text-muted">{label}</div>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="group rounded-2xl border border-border bg-paper p-5 transition hover:-translate-y-1 hover:border-clay/50 hover:shadow-lg">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sand text-xl transition group-hover:bg-terracotta/15">
        {icon}
      </div>
      <h3 className="mt-3 font-serif text-lg font-semibold text-bois-dark">{title}</h3>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink/80">{desc}</p>
    </div>
  );
}

function Photo({
  src,
  alt,
  caption,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={`group relative overflow-hidden rounded-2xl border border-border shadow-sm ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bois-dark/55 via-bois-dark/5 to-transparent" />
      {caption && (
        <figcaption className="absolute bottom-3 left-4 right-4 text-[12.5px] font-medium text-paper drop-shadow-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function GoldenCircle() {
  return (
    <svg viewBox="0 0 240 240" className="h-56 w-56 shrink-0" role="img" aria-label="Le Cercle d'Or">
      <circle cx="120" cy="120" r="112" fill="none" stroke="#e7dcc8" strokeWidth="1.5" />
      <circle cx="120" cy="120" r="78" fill="none" stroke="#e7dcc8" strokeWidth="1.5" />
      <circle cx="120" cy="120" r="44" fill="#c0653e" opacity="0.12" />
      <circle cx="120" cy="120" r="44" fill="none" stroke="#c0653e" strokeWidth="2" />
      <text x="120" y="116" textAnchor="middle" className="fill-[#9f4e2d]" style={{ fontSize: 15, fontWeight: 600, fontFamily: "var(--font-serif)" }}>Pourquoi</text>
      <text x="120" y="134" textAnchor="middle" className="fill-[#9f4e2d]" style={{ fontSize: 9 }}>la mission</text>
      <text x="120" y="70" textAnchor="middle" className="fill-bois" style={{ fontSize: 12, fontWeight: 600, fontFamily: "var(--font-serif)" }}>Comment</text>
      <text x="120" y="26" textAnchor="middle" className="fill-muted" style={{ fontSize: 12, fontWeight: 600, fontFamily: "var(--font-serif)" }}>Quoi</text>
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* ───────── HERO ───────── */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(192,101,62,0.10),transparent_70%)]" />
          <div className="mx-auto max-w-5xl px-5 pb-10 pt-16 text-center sm:pt-20">
            <Eyebrow>Atelier sur mesure · Cafés · Restaurants · Hôtels</Eyebrow>
            <h1 className="mx-auto mt-6 max-w-3xl font-serif text-[2.6rem] font-semibold leading-[1.08] text-bois-dark sm:text-6xl">
              Donner une âme aux lieux où les gens se réunissent.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[15.5px] leading-relaxed text-ink/80">
              Mobilier Lacroix façonne, à la main, le mobilier sur mesure du CHR. Voici le prototype
              qui remet de l'ordre dans sa façon de vendre — un pilotage commercial simple, augmenté
              par une IA utile, mesurable et responsable.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/crm" className="rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-paper shadow-sm transition hover:bg-terracotta-dark hover:shadow-md">
                🛠️ Ouvrir le prototype
              </Link>
              <Link href="/rendu" className="rounded-full border border-bois-dark px-6 py-3 text-sm font-medium text-bois-dark transition hover:bg-sand">
                📂 Voir le rendu
              </Link>
            </div>
          </div>

          {/* showcase atelier */}
          <div className="mx-auto max-w-5xl px-5">
            <Photo
              src="/images/atelier.jpg"
              alt="L'atelier Mobilier Lacroix"
              caption="L'atelier — le sur-mesure façonné à la main, à Lyon."
              className="h-[260px] sm:h-[380px]"
            />
          </div>

          <div className="mx-auto max-w-4xl px-5 py-12">
            <div className="grid grid-cols-2 gap-6 rounded-2xl border border-border bg-paper/70 px-6 py-7 sm:grid-cols-4">
              <Stat value="15 pers." label="L'atelier" />
              <Stat value="5–15 k€" label="Panier projet" />
              <Stat value="3–5 / mois" label="Projets signés" />
              <Stat value="0 €" label="Coût de l'IA" />
            </div>
          </div>
        </section>

        {/* ───────── LE CERCLE D'OR ───────── */}
        <section className="mx-auto max-w-5xl px-5 py-14">
          <div className="mb-8 text-center">
            <Eyebrow>Identité de marque · le « pourquoi »</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-bois-dark">
              On n'achète pas ce que vous faites, mais <em className="text-terracotta-dark not-italic">pourquoi</em> vous le faites.
            </h2>
          </div>
          <div className="flex flex-col items-center gap-8 rounded-3xl border border-border bg-sand/40 p-8 sm:flex-row sm:gap-12 sm:p-10">
            <GoldenCircle />
            <div className="flex-1 space-y-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-terracotta-dark">Pourquoi</div>
                <p className="mt-0.5 text-[15px] text-ink/90">Faire que chaque café, restaurant ou hôtel raconte sa propre histoire.</p>
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-bois">Comment</div>
                <p className="mt-0.5 text-[15px] text-ink/90">L'artisanat du sur-mesure, le savoir-faire d'atelier, l'accompagnement de bout en bout.</p>
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-muted">Quoi</div>
                <p className="mt-0.5 text-[15px] text-ink/90">Du mobilier sur mesure, conçu pour durer et porter l'identité du lieu.</p>
              </div>
              <p className="border-t border-border pt-4 text-[13px] text-muted">
                Archétype de marque : <strong className="text-bois-dark">le Créateur</strong> — donner forme à une vision,
                créer de l'unique et du durable. Cette voix guide aussi le ton du copilote IA.
              </p>
            </div>
          </div>
        </section>

        {/* ───────── LE SAVOIR-FAIRE (images) ───────── */}
        <section className="mx-auto max-w-5xl px-5 py-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="grid grid-cols-2 gap-4">
              <Photo src="/images/artisan.jpg" alt="Travail du bois à la main" className="aspect-[4/5]" />
              <Photo src="/images/bois.jpg" alt="Bois massif" className="mt-8 aspect-[4/5]" />
            </div>
            <div>
              <Eyebrow>Le savoir-faire</Eyebrow>
              <h2 className="mt-4 font-serif text-3xl font-semibold text-bois-dark">La matière, travaillée pour durer.</h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink/80">
                Chêne, noyer, frêne, velours : chaque pièce est dessinée puis façonnée à l'atelier. Le sur-mesure
                n'est pas un luxe — c'est la garantie d'un mobilier qui traverse les années et porte l'identité
                d'un lieu, là où la série s'use et se ressemble.
              </p>
              <ul className="mt-4 space-y-1.5 text-[13.5px] text-ink/85">
                <li>🪵 Bois massif &amp; finitions artisanales</li>
                <li>📐 Conception sur plans (SketchUp, prototypes)</li>
                <li>🔧 Réfection &amp; recouvrement de banquettes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ───────── LE CONSTAT ───────── */}
        <section className="border-y border-border bg-paper/50">
          <div className="mx-auto max-w-5xl px-5 py-14">
            <div className="grid items-center gap-10 sm:grid-cols-2">
              <div>
                <Eyebrow>Le constat</Eyebrow>
                <h2 className="mt-4 font-serif text-3xl font-semibold text-bois-dark">Un savoir-faire d'exception… qui vend à l'instinct.</h2>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink/80">
                  Pas de CRM, des devis sur Excel, et des relances qui passent à la trappe. Le carnet de commandes
                  vit sur la réputation et le bouche-à-oreille — mais des projets chauds s'échappent faute de suivi.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-cream p-5">
                  <div className="font-serif text-3xl font-semibold text-bois-dark">15–20</div>
                  <div className="mt-1 text-[12px] text-muted">demandes / mois</div>
                </div>
                <div className="rounded-2xl border border-border bg-cream p-5">
                  <div className="font-serif text-3xl font-semibold text-bois-dark">~25 %</div>
                  <div className="mt-1 text-[12px] text-muted">taux de signature</div>
                </div>
                <div className="rounded-2xl border border-terracotta/40 bg-terracotta/5 p-5">
                  <div className="font-serif text-3xl font-semibold text-terracotta-dark">≠ CRM</div>
                  <div className="mt-1 text-[12px] text-muted">infos éparpillées</div>
                </div>
                <div className="rounded-2xl border border-terracotta/40 bg-terracotta/5 p-5">
                  <div className="font-serif text-3xl font-semibold text-terracotta-dark">Devis ⚠️</div>
                  <div className="mt-1 text-[12px] text-muted">jamais relancés = fuite</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── LA SOLUTION ───────── */}
        <section className="mx-auto max-w-5xl px-5 py-16">
          <div className="mb-9 text-center">
            <Eyebrow>La solution · le prototype</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-bois-dark">Le copilote SalesOps de l'atelier</h2>
            <p className="mx-auto mt-2 max-w-xl text-[14px] text-ink/75">
              Un pilotage simple du carnet de commandes, où l'IA fait gagner du temps à chaque étape.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Feature icon="📊" title="Pipeline des projets" desc="Le funnel reconstruit, de la demande à la signature, avec les KPIs en direct." />
            <Feature icon="🎯" title="Scoring des devis" desc="L'IA estime la probabilité de signature et fait remonter les devis à relancer." />
            <Feature icon="✍️" title="Copilote de relance" desc="Des emails « dans le ton » de la marque, adaptés à l'objection, prêts en un clic." />
            <Feature icon="🧾" title="Résumé d'échanges" desc="Chaque dossier synthétisé en une fiche projet claire et exploitable." />
          </div>
          <div className="mt-9 text-center">
            <Link href="/crm" className="inline-flex items-center gap-2 rounded-full bg-bois-dark px-6 py-3 text-sm font-medium text-paper transition hover:bg-bois">
              Essayer le prototype en direct →
            </Link>
          </div>
        </section>

        {/* ───────── RÉALISATIONS CHR (images) ───────── */}
        <section className="mx-auto max-w-5xl px-5 pb-4">
          <div className="mb-6 text-center">
            <Eyebrow>Pour qui</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-bois-dark">Des lieux qui ont une âme</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Photo src="/images/restaurant.jpg" alt="Salle de restaurant en bois" caption="Restaurants & brasseries — banquettes, tables, comptoirs" className="h-64" />
            <Photo src="/images/hotel.jpg" alt="Lobby d'hôtel" caption="Hôtels — lobby, têtes de lit, mobilier sur mesure" className="h-64" />
          </div>
        </section>

        {/* ───────── IA RESPONSABLE ───────── */}
        <section className="mt-12 border-y border-border bg-bois-dark text-paper">
          <div className="mx-auto max-w-5xl px-5 py-14">
            <div className="text-center">
              <span className="inline-block rounded-full border border-paper/25 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-paper/70">
                Une IA utile, pas gadget
              </span>
              <h2 className="mt-4 font-serif text-3xl font-semibold">Vraie IA, gratuite et responsable</h2>
            </div>
            <div className="mt-9 grid gap-5 sm:grid-cols-3">
              <div className="rounded-2xl border border-paper/15 bg-paper/5 p-5">
                <div className="text-2xl">🇫🇷</div>
                <h3 className="mt-2 font-serif text-lg font-semibold">Mistral AI · UE</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-paper/75">De vrais appels à une IA française, hébergée dans l'UE. Repli automatique pour ne jamais tomber en panne.</p>
              </div>
              <div className="rounded-2xl border border-paper/15 bg-paper/5 p-5">
                <div className="text-2xl">🔒</div>
                <h3 className="mt-2 font-serif text-lg font-semibold">RGPD par défaut</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-paper/75">Les données ne servent pas à entraîner les modèles. Minimisation et hébergement UE.</p>
              </div>
              <div className="rounded-2xl border border-paper/15 bg-paper/5 p-5">
                <div className="text-2xl">👤</div>
                <h3 className="mt-2 font-serif text-lg font-semibold">Contrôle humain</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-paper/75">L'IA propose, l'humain valide. Chaque relance reste relue et éditée avant l'envoi.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── SOMMAIRE DU RENDU ───────── */}
        <section className="mx-auto max-w-5xl px-5 py-16">
          <div className="mb-8 text-center">
            <Eyebrow>Vision d'ensemble</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-bois-dark">Le rendu en 9 critères</h2>
            <p className="mx-auto mt-2 max-w-xl text-[14px] text-ink/75">
              Tout le dossier noté (/100), présenté visuellement et sourcé, dans l'onglet Rendu.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {[
              "Identité de marque", "Marché & concurrents", "Diagnostic du funnel",
              "Plan d'action SalesOps", "Indicateurs (KPI)", "Profondeur de l'IA",
              "Garde-fous & ROI", "Prototype qui marche", "Posture conseil",
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-paper px-4 py-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sand text-[12px] font-semibold text-bois-dark">{i + 1}</span>
                <span className="text-[13px] font-medium text-ink">{t}</span>
              </div>
            ))}
          </div>
          <div className="mt-9 text-center">
            <Link href="/rendu" className="inline-flex items-center gap-2 rounded-full border border-bois-dark px-6 py-3 text-sm font-medium text-bois-dark transition hover:bg-sand">
              Explorer le rendu complet →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

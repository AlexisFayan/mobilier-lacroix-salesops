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

/** Repère d'étape affiché en tête de chaque section (le fil conducteur). */
function Step({ n, phase, title }: { n: string; phase: string; title: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bois-dark font-serif text-sm font-semibold text-paper">
        {n}
      </span>
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-terracotta-dark">
          Étape {n} · {phase}
        </div>
        <h2 className="font-serif text-2xl font-semibold text-bois-dark sm:text-3xl">{title}</h2>
      </div>
    </div>
  );
}

function Feature({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="group rounded-2xl border border-border bg-paper p-5 transition hover:-translate-y-1 hover:border-clay/50 hover:shadow-lg">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sand font-serif text-sm font-semibold text-bois-dark">
        {n}
      </div>
      <h3 className="mt-3 font-serif text-lg font-semibold text-bois-dark">{title}</h3>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink/80">{desc}</p>
    </div>
  );
}

function Photo({ src, alt, caption, className, priority }: { src: string; alt: string; caption?: string; className?: string; priority?: boolean }) {
  return (
    <figure className={`group relative overflow-hidden rounded-2xl border border-border shadow-sm ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bois-dark/55 via-bois-dark/5 to-transparent" />
      {caption && (
        <figcaption className="absolute bottom-3 left-4 right-4 text-[12.5px] font-medium text-paper drop-shadow-sm">{caption}</figcaption>
      )}
    </figure>
  );
}

function GoldenCircle() {
  return (
    <svg viewBox="0 0 240 240" className="h-52 w-52 shrink-0" role="img" aria-label="Le Cercle d'Or">
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

const PARCOURS = [
  { n: "1", phase: "Comprendre", desc: "L'entreprise & sa raison d'être", href: "#comprendre" },
  { n: "2", phase: "Diagnostiquer", desc: "Ce qui bloque la croissance", href: "#diagnostiquer" },
  { n: "3", phase: "Recommander", desc: "Le plan d'action + l'IA", href: "#recommander" },
  { n: "4", phase: "Démontrer", desc: "Le prototype, en direct", href: "#demontrer" },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* ───────── HERO ───────── */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(192,101,62,0.10),transparent_70%)]" />
          <div className="mx-auto max-w-5xl px-5 pb-10 pt-16 text-center sm:pt-20">
            <Eyebrow>Étude de cas · SalesOps + IA · Epitech Lyon</Eyebrow>
            <h1 className="mx-auto mt-6 max-w-3xl font-serif text-[2.6rem] font-semibold leading-[1.08] text-bois-dark sm:text-6xl">
              Offrir à chaque lieu de rencontre un morceau d'histoire française.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[15.5px] leading-relaxed text-ink/80">
              Mobilier Lacroix, atelier de mobilier sur mesure pour cafés, restaurants et hôtels, vend
              « à l'instinct ». Voici comment nous remettons sa machine commerciale sur les rails, avec
              une IA utile et gratuite. Suivez le parcours ci-dessous.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#comprendre" className="rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-paper shadow-sm transition hover:bg-terracotta-dark hover:shadow-md">
                Suivre la démarche
              </a>
              <Link href="/crm" className="rounded-full border border-bois-dark px-6 py-3 text-sm font-medium text-bois-dark transition hover:bg-sand">
                Tester le prototype
              </Link>
            </div>
          </div>

          <div className="mx-auto max-w-5xl px-5">
            <Photo
              src="/images/atelier.jpg"
              alt="L'atelier Mobilier Lacroix"
              caption="L'atelier : le sur-mesure façonné à la main, à Lyon."
              className="h-[240px] sm:h-[360px]"
              priority
            />
          </div>
        </section>

        {/* ───────── LE PARCOURS (fil conducteur) ───────── */}
        <section className="mx-auto max-w-5xl px-5 py-12">
          <div className="mb-5 text-center">
            <Eyebrow>Le parcours</Eyebrow>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-bois-dark">La démarche d'un cabinet de conseil, en 4 temps</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            {PARCOURS.map((p) => (
              <a key={p.n} href={p.href} className="rounded-2xl border border-border bg-paper p-4 transition hover:-translate-y-0.5 hover:border-clay/50 hover:shadow-md">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bois-dark font-serif text-sm font-semibold text-paper">{p.n}</span>
                <div className="mt-2 font-serif text-lg font-semibold text-bois-dark">{p.phase}</div>
                <div className="text-[12.5px] text-muted">{p.desc}</div>
              </a>
            ))}
          </div>
        </section>

        {/* ───────── ÉTAPE 1 · COMPRENDRE ───────── */}
        <section id="comprendre" className="mx-auto max-w-5xl scroll-mt-20 border-t border-border px-5 py-14">
          <Step n="1" phase="Comprendre" title="L'entreprise & sa raison d'être" />
          <p className="mb-8 max-w-2xl text-[14.5px] leading-relaxed text-ink/80">
            Avant de vendre, il faut une identité claire. Le « pourquoi » de Mobilier Lacroix passe avant
            le produit, et donne le ton de toute la marque.
          </p>
          <div className="flex flex-col items-center gap-8 rounded-3xl border border-border bg-sand/40 p-8 sm:flex-row sm:gap-12 sm:p-10">
            <GoldenCircle />
            <div className="flex-1 space-y-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-terracotta-dark">Pourquoi</div>
                <p className="mt-0.5 text-[15px] text-ink/90">Offrir à chaque lieu de rencontre un morceau d'histoire française.</p>
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-bois">Comment</div>
                <p className="mt-0.5 text-[15px] text-ink/90">Un savoir-faire artisanal français, façonné à Lyon : la matière, le raffinement et l'accompagnement qui font qu'on se sent chez soi.</p>
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-muted">Quoi</div>
                <p className="mt-0.5 text-[15px] text-ink/90">Du mobilier sur mesure, conçu pour durer et porter l'histoire du lieu.</p>
              </div>
              <p className="border-t border-border pt-4 text-[13px] text-muted">
                Archétypes : <strong className="text-bois-dark">le Créateur</strong> (donner forme, faire durable) et, en secondaire, <strong className="text-bois-dark">l'Amant</strong> (appartenance, raffinement, émotion). Cette voix guide aussi le ton du copilote IA.
              </p>
            </div>
          </div>

          <div className="mt-8 grid items-center gap-8 lg:grid-cols-2">
            <div className="grid grid-cols-2 gap-4">
              <Photo src="/images/artisan.jpg" alt="Travail du bois à la main" className="aspect-[4/5]" />
              <Photo src="/images/bois.jpg" alt="Bois massif" className="mt-8 aspect-[4/5]" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-semibold text-bois-dark">La matière, travaillée pour durer</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink/80">
                Chêne, noyer, frêne, velours : chaque pièce est dessinée puis façonnée à l'atelier. Le
                sur-mesure garantit un mobilier qui traverse les années et porte l'identité d'un lieu, là
                où la série s'use et se ressemble.
              </p>
              <ul className="mt-4 space-y-1.5 text-[13.5px] text-ink/85">
                <li>Bois massif &amp; finitions artisanales</li>
                <li>Conception sur plans (SketchUp, prototypes)</li>
                <li>Réfection &amp; recouvrement de banquettes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ───────── ÉTAPE 2 · DIAGNOSTIQUER ───────── */}
        <section id="diagnostiquer" className="scroll-mt-20 border-y border-border bg-paper/50">
          <div className="mx-auto max-w-5xl px-5 py-14">
            <Step n="2" phase="Diagnostiquer" title="Un savoir-faire d'exception qui vend à l'instinct" />
            <div className="grid items-center gap-10 sm:grid-cols-2">
              <p className="text-[14.5px] leading-relaxed text-ink/80">
                Pas de CRM, des devis sur Excel, et des relances qui passent à la trappe. Le carnet de
                commandes vit sur la réputation et le bouche-à-oreille, mais des projets chauds s'échappent
                faute de suivi. Voici les chiffres de départ.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-cream p-5">
                  <div className="font-serif text-3xl font-semibold text-bois-dark">15-20</div>
                  <div className="mt-1 text-[12px] text-muted">demandes / mois</div>
                </div>
                <div className="rounded-2xl border border-border bg-cream p-5">
                  <div className="font-serif text-3xl font-semibold text-bois-dark">~25 %</div>
                  <div className="mt-1 text-[12px] text-muted">taux de signature</div>
                </div>
                <div className="rounded-2xl border border-terracotta/40 bg-terracotta/5 p-5">
                  <div className="font-serif text-2xl font-semibold text-terracotta-dark">Sans CRM</div>
                  <div className="mt-1 text-[12px] text-muted">infos éparpillées</div>
                </div>
                <div className="rounded-2xl border border-terracotta/40 bg-terracotta/5 p-5">
                  <div className="font-serif text-2xl font-semibold text-terracotta-dark">Devis perdus</div>
                  <div className="mt-1 text-[12px] text-muted">jamais relancés = fuite</div>
                </div>
              </div>
            </div>
            <p className="mt-6 text-[12.5px] text-muted">
              Le diagnostic complet (funnel reconstruit, irritants priorisés) est détaillé dans
              <Link href="/rendu#diagnostiquer" className="font-medium text-terracotta-dark hover:underline"> le dossier</Link>.
            </p>
          </div>
        </section>

        {/* ───────── ÉTAPE 3 · RECOMMANDER ───────── */}
        <section id="recommander" className="mx-auto max-w-5xl scroll-mt-20 px-5 py-16">
          <Step n="3" phase="Recommander" title="Le copilote SalesOps de l'atelier" />
          <p className="mb-8 max-w-2xl text-[14.5px] leading-relaxed text-ink/80">
            Un pilotage simple du carnet de commandes, où l'IA fait gagner du temps à chaque étape, sans
            jamais remplacer le bon sens commercial. Le plan équilibre le marketing (attirer et capter, à
            bas coût) et le commercial (qualifier et convertir).
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Feature n="1" title="Pipeline des projets" desc="Le funnel reconstruit, de la demande à la signature, avec les KPIs en direct." />
            <Feature n="2" title="Scoring des devis" desc="L'IA estime la probabilité de signature et fait remonter les devis à relancer." />
            <Feature n="3" title="Copilote de relance" desc="Des emails « dans le ton » de la marque, adaptés à l'objection, prêts en un clic." />
            <Feature n="4" title="Résumé d'échanges" desc="Chaque dossier synthétisé en une fiche projet claire et exploitable." />
          </div>

          <div className="mt-8 rounded-3xl border border-border bg-bois-dark p-8 text-paper">
            <div className="text-center">
              <span className="inline-block rounded-full border border-paper/25 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-paper/70">
                Une IA utile, pas gadget
              </span>
              <h3 className="mt-3 font-serif text-2xl font-semibold">Vraie IA, gratuite et responsable</h3>
            </div>
            <div className="mt-7 grid gap-5 sm:grid-cols-3">
              <div className="rounded-2xl border border-paper/15 bg-paper/5 p-5">
                <h4 className="font-serif text-lg font-semibold">Mistral AI · UE</h4>
                <p className="mt-1 text-[13px] leading-relaxed text-paper/75">De vrais appels à une IA française, hébergée dans l'UE. Repli automatique pour ne jamais tomber en panne.</p>
              </div>
              <div className="rounded-2xl border border-paper/15 bg-paper/5 p-5">
                <h4 className="font-serif text-lg font-semibold">RGPD par défaut</h4>
                <p className="mt-1 text-[13px] leading-relaxed text-paper/75">Les données ne servent pas à entraîner les modèles. Minimisation et hébergement UE.</p>
              </div>
              <div className="rounded-2xl border border-paper/15 bg-paper/5 p-5">
                <h4 className="font-serif text-lg font-semibold">Contrôle humain</h4>
                <p className="mt-1 text-[13px] leading-relaxed text-paper/75">L'IA propose, l'humain valide. Chaque relance reste relue avant l'envoi.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── ÉTAPE 4 · DÉMONTRER ───────── */}
        <section id="demontrer" className="scroll-mt-20 border-t border-border bg-paper/50">
          <div className="mx-auto max-w-5xl px-5 py-16">
            <Step n="4" phase="Démontrer" title="Le prototype, à tester en direct" />
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <p className="text-[14.5px] leading-relaxed text-ink/80">
                  Le plan ne reste pas sur le papier : il tourne. Pipeline des projets, scoring des devis,
                  copilote de relance et résumé d'échanges, le tout jouable et démontrable.
                </p>
                <Link href="/crm" className="mt-5 inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-paper transition hover:bg-terracotta-dark">
                  Ouvrir le prototype →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Photo src="/images/restaurant.jpg" alt="Salle de restaurant en bois" caption="Restaurants & brasseries" className="h-48" />
                <Photo src="/images/hotel.jpg" alt="Hall d'hôtel" caption="Hôtels" className="h-48" />
              </div>
            </div>
          </div>
        </section>

        {/* ───────── POUR LE JURY ───────── */}
        <section className="mx-auto max-w-4xl px-5 py-16 text-center">
          <Eyebrow>Pour le jury</Eyebrow>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-bois-dark">Trois destinations, c'est tout</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <Link href="/rendu" className="rounded-2xl border border-border bg-paper p-6 text-left transition hover:-translate-y-1 hover:border-clay/50 hover:shadow-lg">
              <div className="font-serif text-lg font-semibold text-bois-dark">Le dossier noté</div>
              <p className="mt-1 text-[13px] text-ink/75">Les 9 critères (/100), regroupés en 4 temps, avec sources vérifiées.</p>
              <span className="mt-3 inline-block text-[13px] font-medium text-terracotta-dark">Ouvrir le dossier →</span>
            </Link>
            <Link href="/crm" className="rounded-2xl border border-border bg-paper p-6 text-left transition hover:-translate-y-1 hover:border-clay/50 hover:shadow-lg">
              <div className="font-serif text-lg font-semibold text-bois-dark">Le prototype</div>
              <p className="mt-1 text-[13px] text-ink/75">L'outil SalesOps + IA, à tester et démontrer en direct.</p>
              <span className="mt-3 inline-block text-[13px] font-medium text-terracotta-dark">Tester le prototype →</span>
            </Link>
            <Link href="/charte" className="rounded-2xl border border-border bg-paper p-6 text-left transition hover:-translate-y-1 hover:border-clay/50 hover:shadow-lg">
              <div className="font-serif text-lg font-semibold text-bois-dark">La charte graphique</div>
              <p className="mt-1 text-[13px] text-ink/75">L'identité de marque : archétypes, palette, typographie, ton de voix.</p>
              <span className="mt-3 inline-block text-[13px] font-medium text-terracotta-dark">Voir la charte →</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

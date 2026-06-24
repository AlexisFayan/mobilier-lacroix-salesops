import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Charte graphique · Mobilier Lacroix",
};

/* ───────── Petits blocs réutilisables ───────── */

function Block({
  n,
  title,
  desc,
  children,
}: {
  n: string;
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-24 border-t border-border pt-10">
      <div className="mb-5 flex items-start gap-3">
        <span className="font-serif text-2xl font-semibold text-terracotta-dark">{n}</span>
        <div>
          <h2 className="font-serif text-2xl font-semibold text-bois-dark">{title}</h2>
          {desc && <p className="mt-1 text-[13px] text-muted">{desc}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function Swatch({ name, token, hex, dark }: { name: string; token: string; hex: string; dark?: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-paper">
      <div className="h-16 w-full" style={{ background: hex }} />
      <div className={`px-3 py-2 ${dark ? "" : ""}`}>
        <div className="text-[12px] font-semibold text-bois-dark">{name}</div>
        <div className="text-[10.5px] text-muted">{token}</div>
        <div className="text-[10.5px] uppercase tracking-wide text-muted">{hex}</div>
      </div>
    </div>
  );
}

const NEUTRES = [
  { name: "Crème", token: "cream", hex: "#faf6ef" },
  { name: "Papier", token: "paper", hex: "#fffdf8" },
  { name: "Sable", token: "sand", hex: "#f1e8d8" },
  { name: "Bordure", token: "border", hex: "#e7dcc8" },
  { name: "Encre", token: "ink", hex: "#2a2320" },
  { name: "Atténué", token: "muted", hex: "#837567" },
];
const BOIS = [
  { name: "Bois", token: "bois", hex: "#6f4e37" },
  { name: "Bois foncé", token: "bois-dark", hex: "#463122" },
  { name: "Argile", token: "clay", hex: "#bc7d57" },
];
const ACCENTS = [
  { name: "Terracotta", token: "terracotta", hex: "#c0653e" },
  { name: "Terracotta foncé", token: "terracotta-dark", hex: "#9f4e2d" },
  { name: "Rouille", token: "rouille", hex: "#a23d23" },
  { name: "Bordeaux", token: "bordeaux", hex: "#722f37" },
  { name: "Olive", token: "olive", hex: "#5e7150" },
  { name: "Or", token: "gold", hex: "#c39a45" },
];

export default function ChartePage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-5">
        {/* Intro */}
        <div className="py-10 text-center">
          <span className="inline-block rounded-full border border-border bg-paper px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted">
            Charte graphique
          </span>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-bois-dark sm:text-4xl">
            L'identité de Mobilier Lacroix
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-relaxed text-ink/80">
            Le système de marque qui guide le site, les supports et le ton du copilote IA. Il découle
            directement de la raison d'être et des deux archétypes, le Créateur et l'Amant.
          </p>
        </div>

        <div className="space-y-12 pb-16">
          {/* 1 · Positionnement */}
          <Block n="01" title="Positionnement" desc="Le « pourquoi » avant le produit (cercle d'or, Sinek).">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-terracotta/30 bg-terracotta/5 p-5">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-terracotta-dark">Pourquoi</div>
                <p className="mt-1.5 font-serif text-lg text-bois-dark">Offrir à chaque lieu de rencontre un morceau d'histoire française.</p>
              </div>
              <div className="rounded-2xl border border-border bg-paper p-5">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-bois">Comment</div>
                <p className="mt-1.5 text-[14px] text-ink/90">Un savoir-faire artisanal français, à Lyon : la matière, le raffinement et l'accompagnement qui font qu'on se sent chez soi.</p>
              </div>
              <div className="rounded-2xl border border-border bg-paper p-5">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-muted">Quoi</div>
                <p className="mt-1.5 text-[14px] text-ink/90">Du mobilier sur mesure pour le CHR, conçu pour durer et porter l'histoire du lieu.</p>
              </div>
            </div>
          </Block>

          {/* 2 · Archétypes */}
          <Block n="02" title="Archétypes de marque" desc="Mark & Pearson, The Hero and the Outlaw (2001).">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-bois/30 bg-sand/40 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-semibold text-bois-dark">Le Créateur</h3>
                  <span className="rounded-full bg-bois-dark px-2 py-0.5 text-[10px] font-medium text-paper">Principal</span>
                </div>
                <p className="mt-1.5 text-[13px] text-ink/80">Donner forme à une vision, créer de l'unique et du durable. Le geste artisanal, la maîtrise de la matière.</p>
                <ul className="mt-3 space-y-1 text-[12.5px] text-ink/85">
                  <li>Valeurs : création, durabilité, authenticité</li>
                  <li>Registre : façonner, dessiner, transmettre</li>
                </ul>
              </div>
              <div className="rounded-2xl border p-5" style={{ borderColor: "rgba(114,47,55,0.35)", background: "rgba(114,47,55,0.05)" }}>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-semibold" style={{ color: "#722f37" }}>L'Amant</h3>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-medium text-paper" style={{ background: "#722f37" }}>Secondaire · appartenance</span>
                </div>
                <p className="mt-1.5 text-[13px] text-ink/80">Le raffinement, l'émotion et le sentiment d'être chez soi. On crée un attachement, une expérience, pas une simple transaction.</p>
                <ul className="mt-3 space-y-1 text-[12.5px] text-ink/85">
                  <li>Valeurs : beauté, émotion, appartenance</li>
                  <li>Registre : accueillir, sublimer, fidéliser</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              {[
                ["Ton", "chaleureux et raffiné, fier du savoir-faire français"],
                ["Vocabulaire", "la matière et l'émotion : chêne, noyer, velours, patine"],
                ["Visuels", "atelier lyonnais, mains, finitions, lumière chaude"],
                ["Promesse", "« un morceau d'histoire, façonné pour durer »"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-border bg-paper p-3">
                  <div className="text-[10.5px] font-semibold uppercase tracking-wide text-terracotta-dark">{k}</div>
                  <div className="mt-0.5 text-[12.5px] text-ink/85">{v}</div>
                </div>
              ))}
            </div>
          </Block>

          {/* 3 · Logo */}
          <Block n="03" title="Logo & monogramme" desc="Monogramme « L » sur bois foncé, accompagné du nom en serif.">
            <div className="flex flex-wrap items-center gap-8 rounded-2xl border border-border bg-paper p-6">
              <div className="flex items-center gap-2.5">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-bois-dark text-paper shadow-sm">
                  <span className="font-serif text-2xl leading-none">L</span>
                </span>
                <span className="leading-tight">
                  <span className="block font-serif text-lg font-semibold text-bois-dark">Mobilier Lacroix</span>
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-muted">Atelier sur mesure · CHR</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-bois-dark text-paper"><span className="font-serif text-lg leading-none">L</span></span>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg text-paper" style={{ background: "#722f37" }}><span className="font-serif text-lg leading-none">L</span></span>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-cream text-bois-dark"><span className="font-serif text-lg leading-none">L</span></span>
              </div>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-olive/30 bg-olive/5 p-4 text-[12.5px] text-ink/85">
                <strong className="text-olive">À faire</strong> : préserver une zone de respiration autour du logo, l'utiliser sur fond clair (crème/papier) ou bois foncé.
              </div>
              <div className="rounded-xl border border-rouille/30 bg-rouille/5 p-4 text-[12.5px] text-ink/85">
                <strong className="text-rouille">À éviter</strong> : déformer le monogramme, le poser sur une photo chargée, changer la typographie ou les couleurs.
              </div>
            </div>
          </Block>

          {/* 4 · Palette */}
          <Block n="04" title="Palette" desc="Tons d'atelier chaleureux. Le bordeaux est l'accent raffinement (l'Amant), à doser.">
            <div className="space-y-4">
              <div>
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted">Neutres</div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  {NEUTRES.map((c) => <Swatch key={c.token} {...c} />)}
                </div>
              </div>
              <div>
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted">Bois</div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  {BOIS.map((c) => <Swatch key={c.token} {...c} />)}
                </div>
              </div>
              <div>
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted">Accents</div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  {ACCENTS.map((c) => <Swatch key={c.token} {...c} />)}
                </div>
              </div>
            </div>
          </Block>

          {/* 5 · Typographie */}
          <Block n="05" title="Typographie" desc="Une serif de caractère pour les titres, une sans neutre pour le texte.">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-paper p-5">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-terracotta-dark">Titres · Fraunces (serif)</div>
                <p className="mt-2 font-serif text-4xl font-semibold text-bois-dark">Aa</p>
                <p className="mt-1 font-serif text-lg text-bois-dark">Un morceau d'histoire française</p>
                <p className="mt-2 text-[11.5px] text-muted">Graisses 400 / 500 / 600 / 700. Chaleureuse, artisanale, raffinée.</p>
              </div>
              <div className="rounded-2xl border border-border bg-paper p-5">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-bois">Texte · sans-serif système</div>
                <p className="mt-2 text-4xl font-semibold text-bois-dark" style={{ fontFamily: "var(--font-sans)" }}>Aa</p>
                <p className="mt-1 text-[14px] text-ink/90" style={{ fontFamily: "var(--font-sans)" }}>Lisible, sobre, sans distraction. Le savoir-faire parle, pas la typo.</p>
                <p className="mt-2 text-[11.5px] text-muted">Corps de texte, libellés, interface du prototype.</p>
              </div>
            </div>
          </Block>

          {/* 6 · Image & iconographie */}
          <Block n="06" title="Image & iconographie" desc="La preuve par la matière et le geste.">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Matière", "Bois massif, velours, finitions. Gros plans qui donnent envie de toucher."],
                ["Le geste", "Mains au travail, atelier, copeaux, lumière chaude et naturelle."],
                ["Le lieu habité", "Cafés, restaurants, hôtels où l'on se sent chez soi, ambiance accueillante."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl border border-border bg-paper p-4">
                  <div className="text-[12.5px] font-semibold text-bois-dark">{t}</div>
                  <p className="mt-0.5 text-[11.5px] leading-snug text-ink/75">{d}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11.5px] text-muted">Cadrage soigné, peu d'éléments, jamais de banque d'images froide. Photos d'illustration sous licence Creative Commons pour la démo.</p>
          </Block>

          {/* 7 · Ton de voix */}
          <Block n="07" title="Ton de voix" desc="Le même esprit à l'écrit, jusque dans les relances générées par l'IA.">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-olive/30 bg-olive/5 p-5">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-olive">À faire</div>
                <ul className="mt-2 space-y-1.5 text-[12.5px] text-ink/85">
                  <li>Vouvoyer, rester chaleureux et raffiné</li>
                  <li>Valoriser la matière, le geste, la durée</li>
                  <li>Parler d'histoire, d'émotion, de « se sentir chez soi »</li>
                  <li>Phrases sobres, en français soigné</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-rouille/30 bg-rouille/5 p-5">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-rouille">À éviter</div>
                <ul className="mt-2 space-y-1.5 text-[12.5px] text-ink/85">
                  <li>Anglicismes, jargon commercial, survente</li>
                  <li>Emojis et tirets cadratins dans les supports</li>
                  <li>Promesses creuses, superlatifs gratuits</li>
                  <li>Mentionner le produit dans le « pourquoi »</li>
                </ul>
              </div>
            </div>
          </Block>
        </div>
      </main>
      <Footer />
    </>
  );
}

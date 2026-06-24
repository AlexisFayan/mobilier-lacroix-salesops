import { SIZING, FUNNEL, IRRITANTS, COMPETITORS, CAT_META, LACROIX_MARKER } from "@/lib/rendu";
import { Src } from "./Src";

/* ───────── TAM / SAM / SOM (bandeau horizontal) ───────── */
export function TamSamSom() {
  const items = [
    { d: SIZING.tam, bar: "#6f4e37" },
    { d: SIZING.sam, bar: "#bc7d57" },
    { d: SIZING.som, bar: "#c0653e" },
  ];
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
      {items.map(({ d, bar }, i) => (
        <div key={d.label} className="flex flex-1 items-stretch gap-2">
          <div className="relative flex-1 overflow-hidden rounded-2xl border border-border bg-paper p-4">
            <span className="absolute inset-x-0 top-0 h-1" style={{ background: bar }} />
            <div className="flex items-center justify-between">
              <span className="font-serif text-xl font-semibold text-bois-dark">{d.label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${
                  d.kind === "Chiffre dur" ? "bg-olive/15 text-olive" : "bg-gold/20 text-[#8a6d1d]"
                }`}
              >
                {d.kind}
              </span>
            </div>
            <div className="text-[10.5px] uppercase tracking-wide text-muted">{d.title}</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-serif text-3xl font-semibold text-terracotta-dark">{d.value}</span>
              <span className="text-[11px] text-muted">{d.unit}</span>
            </div>
            <p className="mt-2 text-[12px] leading-snug text-ink/80">
              {d.definition}
              <Src ids={d.sources} />
            </p>
            <p className="mt-1.5 text-[11px] italic leading-snug text-muted">{d.calc}</p>
          </div>
          {i < items.length - 1 && (
            <div className="hidden items-center font-serif text-xl text-clay sm:flex" aria-hidden>
              →
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ───────── Funnel commercial reconstruit ───────── */
export function SalesFunnel() {
  return (
    <div className="space-y-1.5">
      {FUNNEL.map((f, i) => {
        const leak = f.note.includes("fuite");
        return (
          <div key={i} className="mx-auto" style={{ width: `${100 - i * 15}%` }}>
            <div
              className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-paper ${
                leak ? "bg-rouille" : "bg-bois-dark"
              }`}
              style={{ opacity: 1 - i * 0.1 }}
            >
              <span className="text-[12.5px] font-medium">{f.stage}</span>
              <span className="font-serif text-base font-semibold">{f.value}</span>
            </div>
            <div className={`mt-0.5 text-center text-[10.5px] ${leak ? "font-medium text-rouille" : "text-muted"}`}>
              {f.note}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ───────── Matrice impact / effort ───────── */
export function ImpactEffortMatrix() {
  return (
    <div>
      <div className="relative mx-auto aspect-square w-full max-w-md rounded-xl border border-border bg-paper">
        <div className="absolute left-1/2 top-0 h-full border-l border-dashed border-border" />
        <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-border" />
        <span className="absolute left-2 top-2 text-[9.5px] font-medium uppercase tracking-wide text-olive">Gains rapides</span>
        <span className="absolute right-2 top-2 text-[9.5px] uppercase tracking-wide text-muted">Gros chantiers</span>
        <span className="absolute bottom-2 left-2 text-[9.5px] uppercase tracking-wide text-muted">À faire si temps</span>
        <span className="absolute bottom-2 right-2 text-[9.5px] uppercase tracking-wide text-muted">À éviter</span>
        <span className="absolute -left-1 top-1/2 -translate-x-full -rotate-90 text-[10px] font-medium text-muted">Impact →</span>
        <span className="absolute bottom-[-22px] left-1/2 -translate-x-1/2 text-[10px] font-medium text-muted">Effort →</span>
        {IRRITANTS.map((it) => (
          <div key={it.n} className="absolute -translate-x-1/2 translate-y-1/2" style={{ left: `${it.effort}%`, bottom: `${it.impact}%` }}>
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-semibold text-paper shadow ${
                it.major ? "bg-terracotta" : "bg-muted"
              }`}
              title={it.label}
            >
              {it.n}
            </span>
          </div>
        ))}
      </div>
      <ol className="mt-7 space-y-1.5">
        {IRRITANTS.map((it) => (
          <li key={it.n} className="flex items-start gap-2 text-[12.5px]">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-paper ${
                it.major ? "bg-terracotta" : "bg-muted"
              }`}
            >
              {it.n}
            </span>
            <span className={it.major ? "font-medium text-ink" : "text-ink/75"}>
              {it.label}
              {it.major && <span className="ml-1.5 text-[10px] font-semibold text-terracotta-dark">· majeur</span>}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ───────── Carte de positionnement concurrentielle ───────── */
const CATS: Competitor_cat[] = ["sur-mesure", "agenceur", "luxe", "serie"];
type Competitor_cat = "sur-mesure" | "agenceur" | "luxe" | "serie";

const CRENEAU = [
  { t: "Marque blanche", d: "Sous-traitance pour agenceurs & architectes (seul Atelier Media l'assume frontalement)." },
  { t: "Réfection de banquettes", d: "Un revenu récurrent que les autres ignorent." },
  { t: "Proximité lyonnaise", d: "Cotes, délais et SAV que les acteurs nationaux n'offrent pas." },
];

export function CompetitorMap() {
  return (
    <div className="space-y-4">
      {/* La carte 2D, compacte */}
      <div className="rounded-2xl border border-border bg-paper p-4">
        <div className="relative mx-auto max-w-md pl-5">
          <div className="absolute -left-1 top-1/2 origin-center -translate-y-1/2 -rotate-90 whitespace-nowrap text-[8.5px] uppercase tracking-wide text-muted">
            National → Local
          </div>

          <div className="relative aspect-[16/10] w-full rounded-xl border border-border bg-cream">
            <div className="absolute left-1/2 top-0 h-full border-l border-dashed border-border/70" />
            <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-border/70" />

            {COMPETITORS.map((c) => (
              <div
                key={c.name}
                className="absolute flex -translate-x-1/2 translate-y-1/2 flex-col items-center"
                style={{ left: `${c.x}%`, bottom: `${c.y}%` }}
                title={c.positioning}
              >
                <span className="h-2 w-2 rounded-full ring-2 ring-cream" style={{ background: CAT_META[c.cat].color }} />
                <span className="mt-0.5 whitespace-nowrap text-[8px] leading-none text-ink/70">{c.tag}</span>
              </div>
            ))}

            <div
              className="absolute z-10 flex -translate-x-1/2 translate-y-1/2 flex-col items-center"
              style={{ left: `${LACROIX_MARKER.x}%`, bottom: `${LACROIX_MARKER.y}%` }}
            >
              <span className="h-3 w-3 rounded-full bg-terracotta ring-4 ring-terracotta/25" />
              <span className="mt-0.5 whitespace-nowrap rounded bg-terracotta px-1.5 py-0.5 text-[8.5px] font-semibold text-paper">
                Mobilier Lacroix
              </span>
            </div>
          </div>

          <div className="mt-1.5 flex justify-between text-[8.5px] uppercase tracking-wide text-muted">
            <span>Série / prix bas</span>
            <span>Sur-mesure / premium</span>
          </div>
        </div>

        {/* légende */}
        <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1.5 border-t border-border pt-3 text-[10.5px]">
          {CATS.map((cat) => (
            <span key={cat} className="inline-flex items-center gap-1.5 text-ink/75">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: CAT_META[cat].color }} />
              {CAT_META[cat].label}
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5 font-medium text-terracotta-dark">
            <span className="h-2.5 w-2.5 rounded-full bg-terracotta ring-2 ring-terracotta/25" />
            Mobilier Lacroix
          </span>
        </div>
      </div>

      {/* Le créneau, en bandeau pleine largeur */}
      <div className="rounded-2xl border border-terracotta/40 bg-terracotta/5 p-5">
        <h4 className="font-serif text-[15px] font-semibold text-terracotta-dark">Le créneau de Mobilier Lacroix</h4>
        <p className="mt-1 text-[12.5px] text-ink/85">
          Dans le cluster « sur-mesure local », trois angles peu occupés font la différence :
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {CRENEAU.map((c) => (
            <div key={c.t} className="rounded-xl border border-terracotta/20 bg-paper/70 p-3">
              <div className="text-[12.5px] font-semibold text-bois-dark">{c.t}</div>
              <p className="mt-0.5 text-[11.5px] leading-snug text-ink/75">{c.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Liste de référence, 4 cartes à hauteurs égales */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CATS.map((cat) => {
          const list = COMPETITORS.filter((c) => c.cat === cat);
          const meta = CAT_META[cat];
          return (
            <div key={cat} className="rounded-2xl border border-border bg-paper p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: meta.color }} />
                <h4 className="text-[12px] font-semibold text-ink">{meta.label}</h4>
              </div>
              <ul className="space-y-1.5">
                {list.map((c) => (
                  <li key={c.name} className="text-[12px] leading-snug">
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-medium text-bois-dark hover:underline">
                      {c.name}
                    </a>
                    <span className="block text-[11.5px] text-ink/70">{c.positioning}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

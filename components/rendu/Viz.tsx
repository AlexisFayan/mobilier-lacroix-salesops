import { SIZING, FUNNEL, IRRITANTS, COMPETITORS, CAT_META } from "@/lib/rendu";
import { Src } from "./Src";

/* ───────── TAM / SAM / SOM (funnel de marché) ───────── */
export function TamSamSom() {
  const tiers = [
    { d: SIZING.tam, w: "100%", bg: "bg-bois/10", border: "border-bois/30", text: "text-bois-dark" },
    { d: SIZING.sam, w: "78%", bg: "bg-clay/15", border: "border-clay/40", text: "text-bois-dark" },
    { d: SIZING.som, w: "56%", bg: "bg-terracotta/15", border: "border-terracotta/45", text: "text-terracotta-dark" },
  ];
  return (
    <div className="space-y-3">
      {tiers.map(({ d, w, bg, border, text }) => (
        <div key={d.label} className="mx-auto" style={{ width: w }}>
          <div className={`rounded-xl border ${border} ${bg} p-4`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <span className={`font-serif text-2xl font-semibold ${text}`}>{d.label}</span>
                <span className="text-[12px] text-muted">{d.title}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`font-serif text-2xl font-semibold ${text}`}>{d.value}</span>
                <span className="text-[11px] text-muted">{d.unit}</span>
                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-[9px] font-medium ${
                    d.kind === "Chiffre dur" ? "bg-olive/15 text-olive" : "bg-gold/20 text-[#8a6d1d]"
                  }`}
                >
                  {d.kind}
                </span>
              </div>
            </div>
            <p className="mt-1.5 text-[12px] leading-snug text-ink/80">
              {d.definition}
              <Src ids={d.sources} />
            </p>
            <p className="mt-1 text-[11px] italic leading-snug text-muted">{d.calc}</p>
          </div>
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
        {/* lignes médianes */}
        <div className="absolute left-1/2 top-0 h-full border-l border-dashed border-border" />
        <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-border" />
        {/* labels de quadrant */}
        <span className="absolute left-2 top-2 text-[9.5px] font-medium uppercase tracking-wide text-olive">
          Quick wins
        </span>
        <span className="absolute right-2 top-2 text-[9.5px] uppercase tracking-wide text-muted">Gros chantiers</span>
        <span className="absolute bottom-2 left-2 text-[9.5px] uppercase tracking-wide text-muted">À faire si temps</span>
        <span className="absolute bottom-2 right-2 text-[9.5px] uppercase tracking-wide text-muted">À éviter</span>
        {/* axes */}
        <span className="absolute -left-1 top-1/2 -translate-x-full -rotate-90 text-[10px] font-medium text-muted">
          Impact →
        </span>
        <span className="absolute bottom-[-22px] left-1/2 -translate-x-1/2 text-[10px] font-medium text-muted">
          Effort →
        </span>
        {/* points */}
        {IRRITANTS.map((it) => (
          <div
            key={it.n}
            className="absolute -translate-x-1/2 translate-y-1/2"
            style={{ left: `${it.effort}%`, bottom: `${it.impact}%` }}
          >
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

/* ───────── Carte concurrentielle ───────── */
export function CompetitorMap() {
  const cats: Competitor_cat[] = ["sur-mesure", "agenceur", "luxe", "serie"];
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        {cats.map((cat) => {
          const list = COMPETITORS.filter((c) => c.cat === cat);
          const meta = CAT_META[cat];
          return (
            <div key={cat} className="rounded-xl border border-border bg-paper p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ background: meta.color }} />
                <h4 className="text-[12.5px] font-semibold text-ink">{meta.label}</h4>
              </div>
              <ul className="space-y-2">
                {list.map((c) => (
                  <li key={c.name} className="text-[12px]">
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-medium text-bois-dark hover:underline">
                      {c.name}
                    </a>
                    {c.local && <span className="ml-1.5 rounded bg-sand px-1.5 py-0.5 text-[9px] text-muted">Lyon/AURA</span>}
                    <p className="text-[11.5px] leading-snug text-ink/70">{c.positioning}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="mt-4 rounded-xl border border-terracotta/40 bg-terracotta/5 p-4">
        <h4 className="font-serif text-[15px] font-semibold text-terracotta-dark">Le trou de marché à occuper</h4>
        <p className="mt-1 text-[13px] text-ink/85">
          La <strong>sous-traitance « marque blanche » pour agenceurs &amp; architectes</strong> (seul Atelier Media
          l'assume frontalement) et la <strong>réfection/recouvrement de banquettes</strong> (revenu récurrent),
          le tout porté par la <strong>proximité lyonnaise</strong> (prise de cotes, délais, SAV) que les fabricants
          nationaux (Acces-Sit, Conforel) n'offrent pas.
        </p>
      </div>
    </div>
  );
}

type Competitor_cat = "sur-mesure" | "agenceur" | "luxe" | "serie";

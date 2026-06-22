import Link from "next/link";

export const CRITERES = [
  { id: "c1", n: 1, t: "Identité de marque", pts: 10 },
  { id: "c2", n: 2, t: "Marché & ICP", pts: 10 },
  { id: "c3", n: 3, t: "Diagnostic funnel", pts: 13 },
  { id: "c4", n: 4, t: "Plan SalesOps", pts: 15 },
  { id: "c5", n: 5, t: "KPI", pts: 9 },
  { id: "c6", n: 6, t: "Profondeur IA", pts: 18 },
  { id: "c7", n: 7, t: "Garde-fous & ROI", pts: 10 },
  { id: "c8", n: 8, t: "Prototype", pts: 10 },
  { id: "c9", n: 9, t: "Posture & sources", pts: 5 },
];

/** Les 4 temps de la démarche conseil (le fil conducteur du site). */
export const PHASES = [
  { key: "comprendre", n: "01", title: "Comprendre", desc: "L'entreprise, son marché et son client idéal.", crit: ["c1", "c2"] },
  { key: "diagnostiquer", n: "02", title: "Diagnostiquer", desc: "Reconstruire le funnel et cibler ce qui bloque.", crit: ["c3"] },
  { key: "recommander", n: "03", title: "Recommander", desc: "Le plan d'action, les indicateurs, l'IA et ses garde-fous.", crit: ["c4", "c5", "c6", "c7"] },
  { key: "demontrer", n: "04", title: "Démontrer", desc: "Le prototype qui marche et la rigueur du rendu.", crit: ["c8", "c9"] },
];

export function RenduNav() {
  return (
    <nav className="thin-scroll sticky top-[57px] z-20 -mx-5 overflow-x-auto border-b border-border bg-cream/90 px-5 py-2 backdrop-blur-md">
      <div className="flex min-w-max items-center gap-3">
        {PHASES.map((ph, pi) => (
          <div key={ph.key} className="flex items-center gap-1.5">
            <a
              href={`#${ph.key}`}
              className="text-[11px] font-semibold uppercase tracking-wide text-terracotta-dark hover:underline"
            >
              {ph.title}
            </a>
            {ph.crit.map((cid) => {
              const c = CRITERES.find((x) => x.id === cid)!;
              return (
                <a
                  key={cid}
                  href={`#${cid}`}
                  title={c.t}
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-paper text-[11px] font-medium text-ink transition hover:border-clay/60 hover:bg-sand"
                >
                  {c.n}
                </a>
              );
            })}
            {pi < PHASES.length - 1 && <span className="text-border">/</span>}
          </div>
        ))}
      </div>
    </nav>
  );
}

export function PhaseHeader({
  n,
  id,
  title,
  desc,
}: {
  n: string;
  id: string;
  title: string;
  desc: string;
}) {
  return (
    <div id={id} className="scroll-mt-32 pt-14">
      <div className="flex items-center gap-3 border-b-2 border-bois-dark pb-3">
        <span className="font-serif text-3xl font-semibold text-terracotta-dark">{n}</span>
        <div>
          <h2 className="font-serif text-2xl font-semibold text-bois-dark">{title}</h2>
          <p className="text-[13px] text-muted">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export function Section({
  id,
  n,
  pts,
  eyebrow,
  title,
  children,
}: {
  id: string;
  n: number;
  pts: number;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 pt-10">
      <div className="mb-6 flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bois-dark font-serif text-lg font-semibold text-paper">
          {n}
        </span>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-terracotta-dark">
              {eyebrow}
            </span>
            <span className="rounded-full bg-sand px-2 py-0.5 text-[10px] font-medium text-bois-dark">
              {pts} pts
            </span>
          </div>
          <h3 className="mt-1 font-serif text-2xl font-semibold text-bois-dark sm:text-[1.7rem]">{title}</h3>
        </div>
      </div>
      {children}
    </section>
  );
}

export function SubCard({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-paper p-5">
      {title && <h3 className="mb-2 font-serif text-lg font-semibold text-bois-dark">{title}</h3>}
      {children}
    </div>
  );
}

export { Link };

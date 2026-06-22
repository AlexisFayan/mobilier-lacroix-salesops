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

export function RenduNav() {
  return (
    <nav className="thin-scroll sticky top-[57px] z-20 -mx-5 overflow-x-auto border-b border-border bg-cream/90 px-5 py-2 backdrop-blur-md">
      <div className="flex min-w-max gap-1.5">
        {CRITERES.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="flex items-center gap-1.5 rounded-full border border-border bg-paper px-3 py-1 text-[11.5px] font-medium text-ink transition hover:border-clay/50 hover:bg-sand"
          >
            <span className="text-muted">{c.n}.</span> {c.t}
            <span className="rounded-full bg-sand px-1.5 text-[9.5px] text-muted">{c.pts}</span>
          </a>
        ))}
      </div>
    </nav>
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
    <section id={id} className="scroll-mt-32 border-t border-border py-12 first:border-t-0">
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
          <h2 className="mt-1 font-serif text-2xl font-semibold text-bois-dark sm:text-3xl">{title}</h2>
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

import Header from "@/components/Header";

const CRITERES = [
  { n: 1, t: "Identité de marque", pts: 10, d: "Le « pourquoi » (Cercle d'Or) + l'archétype Créateur." },
  { n: 2, t: "Marché, concurrents & ICP", pts: 10, d: "TAM / SAM / SOM sourcés et vérifiés." },
  { n: 3, t: "Diagnostic du funnel & irritants", pts: 13, d: "Funnel reconstruit + 3 irritants priorisés." },
  { n: 4, t: "Plan d'action SalesOps", pts: 15, d: "Process, outils, gouvernance (RACI + rituels)." },
  { n: 5, t: "Indicateurs (KPI) & dimensionnement", pts: 9, d: "KPIs actionnables et cibles chiffrées." },
  { n: 6, t: "Pertinence & profondeur de l'IA", pts: 18, d: "Cas d'usage ancrés dans le funnel." },
  { n: 7, t: "Garde-fous & ROI de l'IA", pts: 10, d: "RGPD, contrôle humain, ROI chiffré." },
  { n: 8, t: "Prototype qui marche", pts: 10, d: "Le CRM + IA, démontrable en live." },
  { n: 9, t: "Posture conseil & rigueur", pts: 5, d: "Sources, structure, sobriété." },
];

export default function RenduPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10">
        <div className="text-center">
          <span className="inline-block rounded-full border border-border bg-paper px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted">
            Le dossier, en un coup d'œil
          </span>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-bois-dark">Rendu du projet</h1>
          <p className="mx-auto mt-2 max-w-2xl text-[14px] text-ink/80">
            Les 9 critères notés (/100), présentés visuellement et sourcés. Section en cours de
            construction — le prototype, lui, est déjà jouable.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CRITERES.map((c) => (
            <div key={c.n} className="rounded-2xl border border-border bg-paper p-4">
              <div className="flex items-center justify-between">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bois-dark text-[12px] font-semibold text-paper">
                  {c.n}
                </span>
                <span className="rounded-full bg-sand px-2 py-0.5 text-[11px] font-medium text-bois-dark">
                  {c.pts} pts
                </span>
              </div>
              <h3 className="mt-2.5 font-serif text-[15px] font-semibold text-bois-dark">{c.t}</h3>
              <p className="mt-1 text-[12.5px] text-ink/75">{c.d}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-[12px] text-muted">
          ⏳ Contenu détaillé (infographies + sources) à venir.
        </p>
      </main>
    </>
  );
}

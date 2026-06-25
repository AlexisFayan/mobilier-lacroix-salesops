import { SIZING, FUNNEL, IRRITANTS, COMPETITORS, CAT_META, LACROIX_MARKER } from "@/lib/rendu";
import { Src } from "./Src";

/* ───────── Aperçu du workflow n8n (canvas reconstitué, fidèle à l'éditeur) ───────── */
const WF = {
  paper: "#fffdf8",
  border: "#e7dcc8",
  ink: "#463122",
  muted: "#837567",
  olive: "#5e7150",
  clay: "#bc7d57",
  bois: "#6f4e37",
  terracotta: "#c0653e",
  gold: "#c39a45",
  link: "#bc7d57",
};

function WfIcon({ kind, ox, oy }: { kind: string; ox: number; oy: number }) {
  const w = "#fffdf8";
  if (kind === "trigger") return <path d={`M${ox + 8} ${oy + 6} L${ox + 18} ${oy + 12} L${ox + 8} ${oy + 18} Z`} fill={w} />;
  if (kind === "set")
    return (
      <g fill={w}>
        <rect x={ox + 6} y={oy + 7} width={12} height={2.6} rx={1} />
        <rect x={ox + 6} y={oy + 11} width={12} height={2.6} rx={1} />
        <rect x={ox + 6} y={oy + 15} width={8} height={2.6} rx={1} />
      </g>
    );
  if (kind === "ia")
    return (
      <text x={ox + 12} y={oy + 16} textAnchor="middle" fontSize="9.5" fontWeight={700} fill={w}>
        IA
      </text>
    );
  if (kind === "check") return <path d={`M${ox + 6} ${oy + 12} l3 3 l7 -8`} stroke={w} strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
  if (kind === "kpi")
    return (
      <g fill={w}>
        <rect x={ox + 6} y={oy + 12} width={3} height={6} rx={1} />
        <rect x={ox + 11} y={oy + 9} width={3} height={9} rx={1} />
        <rect x={ox + 16} y={oy + 6} width={3} height={12} rx={1} />
      </g>
    );
  return <rect x={ox + 7} y={oy + 11} width={10} height={2.4} rx={1} fill={w} />;
}

function WfNode({
  x, y, w, accent, title, sub, icon, dim,
}: { x: number; y: number; w: number; accent: string; title: string; sub: string; icon: string; dim?: boolean }) {
  const h = 56;
  return (
    <g opacity={dim ? 0.85 : 1}>
      <rect x={x} y={y} width={w} height={h} rx={12} fill={WF.paper} stroke={dim ? WF.border : accent} strokeWidth={dim ? 1 : 1.4} />
      <path d={`M${x} ${y + 12} a12 12 0 0 1 12 -12 h0 v${h} h0 a12 12 0 0 1 -12 -12 Z`} fill={accent} />
      <rect x={x + 16} y={y + h / 2 - 12} width={24} height={24} rx={7} fill={accent} />
      <WfIcon kind={icon} ox={x + 16} oy={y + h / 2 - 12} />
      <text x={x + 48} y={y + 23} fontSize="11.5" fontWeight={600} fill={WF.ink}>{title}</text>
      <text x={x + 48} y={y + 38} fontSize="9.5" fill={WF.muted}>{sub}</text>
    </g>
  );
}

export function N8nWorkflow() {
  const trueY = 86, ifY = 210, ifH = 66, falseY = 312;
  const trueC = trueY + 28, mainC = ifY + ifH / 2, falseC = falseY + 28;
  const ifRight = 356 + 158;
  const tNodes = [
    { x: 540, title: "Scoring IA", sub: "Mistral (UE)", icon: "ia", accent: WF.bois },
    { x: 712, title: "Brouillon", sub: "Mistral (UE)", icon: "ia", accent: WF.bois },
    { x: 884, title: "Validation", sub: "humain · garde-fou", icon: "check", accent: WF.terracotta },
    { x: 1056, title: "Suivi KPI", sub: "tableau de bord", icon: "kpi", accent: WF.gold },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-paper">
      {/* barre d'éditeur (lecture « capture d'écran ») */}
      <div className="flex items-center justify-between border-b border-border bg-sand/60 px-4 py-2">
        <div className="flex items-center gap-2.5">
          <span className="flex gap-1" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-terracotta/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-olive/70" />
          </span>
          <span className="text-[12px] font-medium text-bois-dark">Relance devis · Mobilier Lacroix</span>
          <span className="rounded-full bg-olive/15 px-2 py-0.5 text-[9px] font-semibold text-olive">n8n Cloud</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden rounded-full border border-border bg-paper px-2 py-0.5 text-[9.5px] text-muted sm:inline">Inactif · déclenché à la main</span>
          <span className="rounded-md bg-terracotta px-2.5 py-1 text-[10px] font-semibold text-paper">Exécuter</span>
        </div>
      </div>

      <div className="bg-cream p-2">
        <svg viewBox="0 0 1240 392" className="h-auto w-full" role="img" aria-label="Schéma du scénario n8n de relance des devis : déclencheur, condition 72 h, scoring et brouillon par Mistral, validation humaine, suivi KPI.">
          <defs>
            <pattern id="wf-dots" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1.4" cy="1.4" r="1.4" fill="#e7dcc8" />
            </pattern>
            <marker id="wf-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill={WF.link} />
            </marker>
            <marker id="wf-arrow-d" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill={WF.muted} />
            </marker>
          </defs>
          <rect x="0" y="0" width="1240" height="392" fill="url(#wf-dots)" opacity="0.55" />

          {/* notes adhésives (en arrière-plan, comme dans n8n) */}
          <g>
            <rect x="528" y="40" width="340" height="138" rx="10" fill={WF.gold} opacity="0.12" />
            <rect x="528" y="40" width="340" height="138" rx="10" fill="none" stroke={WF.gold} strokeOpacity="0.5" strokeDasharray="4 3" />
            <text x="544" y="58" fontSize="11" fontWeight={700} fill="#8a6d1d">Étapes IA · Mistral (UE)</text>
            <text x="544" y="73" fontSize="9.5" fill={WF.muted}>Score, puis courriel dans la voix de la marque.</text>
          </g>
          <g>
            <rect x="876" y="40" width="176" height="138" rx="10" fill={WF.terracotta} opacity="0.1" />
            <rect x="876" y="40" width="176" height="138" rx="10" fill="none" stroke={WF.terracotta} strokeOpacity="0.5" strokeDasharray="4 3" />
            <text x="892" y="58" fontSize="11" fontWeight={700} fill="#9f4e2d">Garde-fou humain</text>
            <text x="892" y="73" fontSize="9.5" fill={WF.muted}>Le commercial relit et envoie.</text>
          </g>

          {/* connexions */}
          <g fill="none" stroke={WF.link} strokeWidth="1.6">
            <line x1={174} y1={mainC} x2={190} y2={mainC} markerEnd="url(#wf-arrow)" />
            <line x1={340} y1={mainC} x2={356} y2={mainC} markerEnd="url(#wf-arrow)" />
            <path d={`M${ifRight} ${ifY + 22} C ${ifRight + 16} ${ifY + 22}, ${528} ${trueC}, ${540} ${trueC}`} markerEnd="url(#wf-arrow)" />
            <line x1={696} y1={trueC} x2={712} y2={trueC} markerEnd="url(#wf-arrow)" />
            <line x1={868} y1={trueC} x2={884} y2={trueC} markerEnd="url(#wf-arrow)" />
            <line x1={1040} y1={trueC} x2={1056} y2={trueC} markerEnd="url(#wf-arrow)" />
          </g>
          <path d={`M${ifRight} ${ifY + 44} C ${ifRight + 16} ${ifY + 44}, ${528} ${falseC}, ${540} ${falseC}`} fill="none" stroke={WF.muted} strokeWidth="1.4" strokeDasharray="5 4" markerEnd="url(#wf-arrow-d)" />
          <text x={524} y={trueC - 8} textAnchor="end" fontSize="9" fontWeight={600} fill={WF.olive}>oui</text>
          <text x={524} y={falseC - 8} textAnchor="end" fontSize="9" fontWeight={600} fill={WF.muted}>non</text>

          {/* nœud condition (IF) */}
          <g>
            <rect x={356} y={ifY} width={158} height={ifH} rx={12} fill={WF.paper} stroke={WF.clay} strokeWidth={1.4} />
            <path d={`M${356} ${ifY + 12} a12 12 0 0 1 12 -12 h0 v${ifH} h0 a12 12 0 0 1 -12 -12 Z`} fill={WF.clay} />
            <path d={`M${368} ${ifY + 22} l8 8 l-8 8 l-8 -8 Z`} fill="none" stroke="#fffdf8" strokeWidth={2} strokeLinejoin="round" />
            <text x={388} y={ifY + 28} fontSize="11.5" fontWeight={600} fill={WF.ink}>Sans réponse</text>
            <text x={388} y={ifY + 43} fontSize="11.5" fontWeight={600} fill={WF.ink}>{"> 72 h ?"}</text>
            <circle cx={ifRight} cy={ifY + 22} r={2.6} fill={WF.olive} />
            <circle cx={ifRight} cy={ifY + 44} r={2.6} fill={WF.muted} />
          </g>

          {/* nœuds principaux */}
          <WfNode x={24} y={ifY + 5} w={150} accent={WF.olive} title="Déclencheur" sub="devis envoyé" icon="trigger" />
          <WfNode x={190} y={ifY + 5} w={150} accent={WF.clay} title="Devis (exemple)" sub="Edit Fields" icon="set" />
          {tNodes.map((n) => (
            <WfNode key={n.title} x={n.x} y={trueY} w={156} accent={n.accent} title={n.title} sub={n.sub} icon={n.icon} />
          ))}
          <WfNode x={540} y={falseY} w={190} accent={WF.muted} title="Aucune relance" sub="déjà répondu" icon="none" dim />
        </svg>
      </div>
    </div>
  );
}

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
              className={`flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-paper ${
                leak ? "bg-rouille" : "bg-bois-dark"
              }`}
              style={{ opacity: 1 - i * 0.08 }}
            >
              <span className="text-[12.5px] font-medium">{f.stage}</span>
              <span className="flex items-baseline gap-2">
                <span className="font-serif text-base font-semibold">{f.value}</span>
                <span className="rounded bg-paper/20 px-1.5 py-0.5 text-[10px] font-medium">{f.pct}%</span>
              </span>
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

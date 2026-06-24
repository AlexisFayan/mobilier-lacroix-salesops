import { DEVIS_RELANCE_DAYS, euro } from "@/lib/types";
import type { Project } from "@/lib/types";

function Tile({
  label,
  value,
  sub,
  accent,
  alert,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
  alert?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border px-4 py-3 ${
        alert
          ? "border-terracotta/40 bg-terracotta/5"
          : accent
          ? "border-olive/30 bg-olive/5"
          : "border-border bg-paper"
      }`}
    >
      <div className="text-[11px] font-medium uppercase tracking-wide text-muted">{label}</div>
      <div
        className={`mt-1 font-serif text-2xl font-semibold ${
          alert ? "text-terracotta-dark" : accent ? "text-olive" : "text-bois-dark"
        }`}
      >
        {value}
      </div>
      {sub && <div className="mt-0.5 text-[11px] text-muted">{sub}</div>}
    </div>
  );
}

export default function KpiBar({ projects }: { projects: Project[] }) {
  const mois = projects.filter((p) => p.createdDaysAgo <= 30);
  const signe = projects.filter((p) => p.stage === "signe");
  const actifs = projects.filter((p) => p.stage !== "signe" && p.stage !== "perdu");
  const caSigne = signe.reduce((s, p) => s + p.estValue, 0);
  const panier = signe.length ? Math.round(caSigne / signe.length) : 0;
  const tauxSign = mois.length ? Math.round((signe.length / mois.length) * 100) : 0;
  const pondere = Math.round(actifs.reduce((s, p) => s + (p.estValue * p.score) / 100, 0));
  const aRelancer = projects.filter((p) => p.stage === "devis" && p.lastActivityDaysAgo >= DEVIS_RELANCE_DAYS).length;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      <Tile label="Demandes / mois" value={String(mois.length)} sub="demandes entrantes" />
      <Tile label="Taux de signature" value={`${tauxSign}%`} sub={`${signe.length} signés ce mois`} />
      <Tile label="Panier moyen" value={euro(panier)} sub="sur affaires signées" />
      <Tile label="CA signé (mois)" value={euro(caSigne)} accent sub={`${signe.length} projets`} />
      <Tile label="Pipeline pondéré" value={euro(pondere)} sub="par la proba IA" />
      <Tile
        label="Devis à relancer"
        value={String(aRelancer)}
        alert={aRelancer > 0}
        sub={aRelancer > 0 ? "fuite à colmater" : "à jour"}
      />
    </div>
  );
}

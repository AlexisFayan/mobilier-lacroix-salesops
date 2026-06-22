"use client";

import { useState } from "react";
import { STAGES, STAGE_LABEL, TYPE_ICON, euro, joursLabel } from "@/lib/types";
import type { Project, Stage } from "@/lib/types";

type SortKey = "client" | "stage" | "estValue" | "score" | "lastActivityDaysAgo";

const STAGE_ORDER: Record<Stage, number> = Object.fromEntries(
  STAGES.map((s, i) => [s.key, i])
) as Record<Stage, number>;

const STAGE_COLOR: Record<Stage, string> = Object.fromEntries(
  STAGES.map((s) => [s.key, s.color])
) as Record<Stage, string>;

export default function ProjectList({
  projects,
  onSelect,
}: {
  projects: Project[];
  onSelect: (id: string) => void;
}) {
  const [sort, setSort] = useState<SortKey>("score");
  const [asc, setAsc] = useState(false);

  function toggle(k: SortKey) {
    if (k === sort) setAsc((a) => !a);
    else {
      setSort(k);
      setAsc(k === "client");
    }
  }

  const sorted = [...projects].sort((a, b) => {
    let d = 0;
    if (sort === "client") d = a.client.localeCompare(b.client);
    else if (sort === "stage") d = STAGE_ORDER[a.stage] - STAGE_ORDER[b.stage];
    else d = (a[sort] as number) - (b[sort] as number);
    return asc ? d : -d;
  });

  const arrow = (k: SortKey) => (sort === k ? (asc ? " ▲" : " ▼") : "");

  const Th = ({ k, label, className }: { k: SortKey; label: string; className?: string }) => (
    <th className={`cursor-pointer px-4 py-2.5 font-semibold select-none hover:text-terracotta-dark ${className ?? ""}`} onClick={() => toggle(k)}>
      {label}
      <span className="text-[10px] text-terracotta-dark">{arrow(k)}</span>
    </th>
  );

  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[720px] text-left text-[13px]">
        <thead className="bg-sand text-bois-dark">
          <tr>
            <Th k="client" label="Projet" />
            <Th k="stage" label="Étape" />
            <Th k="estValue" label="Montant" />
            <Th k="score" label="Score IA" />
            <Th k="lastActivityDaysAgo" label="Activité" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((p, i) => {
            const relance = p.stage === "devis" && p.lastActivityDaysAgo >= 6;
            return (
              <tr
                key={p.id}
                onClick={() => onSelect(p.id)}
                className={`cursor-pointer transition hover:bg-sand/40 ${i % 2 ? "bg-paper" : "bg-cream/50"}`}
              >
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span>{TYPE_ICON[p.type]}</span>
                    <div>
                      <div className="font-medium text-bois-dark">{p.client}</div>
                      <div className="text-[11px] text-muted">{p.city}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <span className="inline-flex items-center gap-1.5 text-[12px]">
                    <span className="h-2 w-2 rounded-full" style={{ background: STAGE_COLOR[p.stage] }} />
                    {STAGE_LABEL[p.stage]}
                  </span>
                </td>
                <td className="px-4 py-2.5 font-medium text-terracotta-dark">{euro(p.estValue)}</td>
                <td className="px-4 py-2.5">
                  {p.stage === "perdu" ? (
                    <span className="text-muted">—</span>
                  ) : (
                    <span className={`font-semibold ${p.score >= 70 ? "text-olive" : p.score >= 40 ? "text-[#a07d20]" : "text-muted"}`}>
                      {p.score}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2.5 text-muted">
                  {joursLabel(p.lastActivityDaysAgo)}
                  {relance && <span className="ml-2 font-medium text-terracotta-dark">⚠️</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

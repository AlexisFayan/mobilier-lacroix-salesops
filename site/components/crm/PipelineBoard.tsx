"use client";

import { STAGES, TYPE_ICON, CHANNEL_META, euro, joursLabel } from "@/lib/types";
import type { Project, Stage } from "@/lib/types";
import ScoreBadge from "./ScoreBadge";

function needsRelance(p: Project): boolean {
  return p.stage === "devis" && p.lastActivityDaysAgo >= 6;
}

function ProjectCard({ p, onClick }: { p: Project; onClick: () => void }) {
  const relance = needsRelance(p);
  return (
    <button
      onClick={onClick}
      className="group w-full rounded-xl border border-border bg-paper p-3 text-left transition hover:-translate-y-0.5 hover:border-clay/50 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-base">{TYPE_ICON[p.type]}</span>
            <span className="truncate font-medium text-bois-dark">{p.client}</span>
          </div>
          <div className="mt-0.5 text-[11px] text-muted">{p.city}</div>
        </div>
        {p.stage !== "perdu" && <ScoreBadge score={p.score} size={38} />}
      </div>

      <p className="mt-2 line-clamp-2 text-[12.5px] leading-snug text-ink/80">{p.description}</p>

      <div className="mt-2.5 flex items-center justify-between">
        <span className="font-serif text-sm font-semibold text-terracotta-dark">{euro(p.estValue)}</span>
        <span className="rounded-full bg-sand px-2 py-0.5 text-[10px] text-muted" title={CHANNEL_META[p.channel].label}>
          {CHANNEL_META[p.channel].icon} {CHANNEL_META[p.channel].label.split(" ")[0]}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-border/70 pt-2 text-[10.5px]">
        <span className="text-muted">{joursLabel(p.lastActivityDaysAgo)}</span>
        {relance && (
          <span className="font-medium text-terracotta-dark">⚠️ à relancer</span>
        )}
      </div>
    </button>
  );
}

export default function PipelineBoard({
  projects,
  onSelect,
}: {
  projects: Project[];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="thin-scroll overflow-x-auto pb-3">
      <div className="flex min-w-max gap-3">
        {STAGES.map((s) => {
          const cards = projects.filter((p) => p.stage === (s.key as Stage));
          const sum = cards.reduce((a, p) => a + p.estValue, 0);
          return (
            <div key={s.key} className="w-[248px] shrink-0">
              <div className="mb-2 flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-[12.5px] font-semibold text-ink">{s.label}</span>
                  <span className="text-[11px] text-muted">· {cards.length}</span>
                </div>
              </div>
              <div className="mb-2 px-1 text-[10.5px] text-muted">{euro(sum)}</div>
              <div className="flex flex-col gap-2.5">
                {cards.map((p) => (
                  <ProjectCard key={p.id} p={p} onClick={() => onSelect(p.id)} />
                ))}
                {cards.length === 0 && (
                  <div className="rounded-xl border border-dashed border-border py-6 text-center text-[11px] text-muted">
                    —
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

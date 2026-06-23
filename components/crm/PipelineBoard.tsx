"use client";

import { useState } from "react";
import { STAGES, TYPE_LABEL, CHANNEL_META, euro, joursLabel } from "@/lib/types";
import type { Project, Stage } from "@/lib/types";
import ScoreBadge from "./ScoreBadge";

function needsRelance(p: Project): boolean {
  return p.stage === "devis" && p.lastActivityDaysAgo >= 6;
}

function ProjectCard({
  p,
  onClick,
  onDragStart,
  onDragEnd,
  dragging,
}: {
  p: Project;
  onClick: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  dragging: boolean;
}) {
  const relance = needsRelance(p);
  return (
    <div
      role="button"
      tabIndex={0}
      draggable
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", p.id);
        e.dataTransfer.effectAllowed = "move";
        onDragStart();
      }}
      onDragEnd={onDragEnd}
      className={`group w-full cursor-grab rounded-xl border border-border bg-paper p-3 text-left transition hover:-translate-y-0.5 hover:border-clay/50 hover:shadow-md active:cursor-grabbing ${
        dragging ? "opacity-40" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <span className="line-clamp-2 break-words font-medium leading-tight text-bois-dark">{p.client}</span>
          <div className="mt-0.5 break-words text-[11px] text-muted">
            {TYPE_LABEL[p.type]} · {p.city}
          </div>
        </div>
        {p.stage !== "perdu" && (
          <div className="shrink-0">
            <ScoreBadge score={p.score} size={38} />
          </div>
        )}
      </div>

      <p className="mt-2 line-clamp-2 break-words text-[12.5px] leading-snug text-ink/80">{p.description}</p>

      <div className="mt-2.5 flex items-center justify-between">
        <span className="font-serif text-sm font-semibold text-terracotta-dark">{euro(p.estValue)}</span>
        <span className="rounded-full bg-sand px-2 py-0.5 text-[10px] text-muted" title={CHANNEL_META[p.channel].label}>
          {CHANNEL_META[p.channel].label.split(" ")[0]}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-border/70 pt-2 text-[10.5px]">
        <span className="text-muted">{joursLabel(p.lastActivityDaysAgo)}</span>
        {relance && <span className="font-medium text-terracotta-dark">à relancer</span>}
      </div>
    </div>
  );
}

export default function PipelineBoard({
  projects,
  onSelect,
  onMove,
}: {
  projects: Project[];
  onSelect: (id: string) => void;
  onMove: (id: string, stage: Stage) => void;
}) {
  const [dragId, setDragId] = useState<string | null>(null);
  const [overStage, setOverStage] = useState<Stage | null>(null);

  return (
    <div className="thin-scroll overflow-x-auto pb-3">
      <div className="flex min-w-max gap-3">
        {STAGES.map((s) => {
          const cards = projects.filter((p) => p.stage === (s.key as Stage));
          const sum = cards.reduce((a, p) => a + p.estValue, 0);
          const isOver = overStage === s.key && dragId !== null;
          return (
            <div
              key={s.key}
              className="w-[248px] shrink-0"
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                if (overStage !== s.key) setOverStage(s.key);
              }}
              onDragLeave={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setOverStage((o) => (o === s.key ? null : o));
                }
              }}
              onDrop={(e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData("text/plain");
                if (id) onMove(id, s.key);
                setOverStage(null);
                setDragId(null);
              }}
            >
              <div className="mb-2 flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-[12.5px] font-semibold text-ink">{s.label}</span>
                  <span className="text-[11px] text-muted">· {cards.length}</span>
                </div>
              </div>
              <div className="mb-2 px-1 text-[10.5px] text-muted">{euro(sum)}</div>
              <div
                className={`flex min-h-[80px] flex-col gap-2.5 rounded-xl p-1 transition ${
                  isOver ? "bg-terracotta/10 outline-2 outline-dashed outline-terracotta/40" : ""
                }`}
              >
                {cards.map((p) => (
                  <ProjectCard
                    key={p.id}
                    p={p}
                    onClick={() => onSelect(p.id)}
                    onDragStart={() => setDragId(p.id)}
                    onDragEnd={() => {
                      setDragId(null);
                      setOverStage(null);
                    }}
                    dragging={dragId === p.id}
                  />
                ))}
                {cards.length === 0 && (
                  <div className="rounded-xl border border-dashed border-border py-6 text-center text-[11px] text-muted">
                    {isOver ? "Déposer ici" : "·"}
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

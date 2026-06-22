"use client";

import { useState } from "react";
import { PROJECTS } from "@/lib/data";
import type { Project, Stage } from "@/lib/types";
import Header from "@/components/Header";
import KpiBar from "@/components/crm/KpiBar";
import PipelineBoard from "@/components/crm/PipelineBoard";
import ProjectDrawer from "@/components/crm/ProjectDrawer";

export default function CrmPage() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = projects.find((p) => p.id === selectedId) || null;

  function handleStage(id: string, stage: Stage) {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              stage,
              lastActivityDaysAgo: 0,
              score: stage === "signe" ? 100 : stage === "perdu" ? 0 : p.score,
            }
          : p
      )
    );
  }

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-6">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-serif text-2xl font-semibold text-bois-dark">Pilotage commercial</h1>
            <p className="mt-0.5 text-sm text-muted">
              Le carnet de commandes de l'atelier, augmenté par l'IA — pipeline, scoring des devis,
              copilote de relance et résumé d'échanges.
            </p>
          </div>
          <span className="rounded-full border border-border bg-paper px-3 py-1 text-[11px] text-muted">
            Cliquez une fiche projet pour ouvrir le copilote IA →
          </span>
        </div>

        <KpiBar projects={projects} />

        <div className="mt-6">
          <PipelineBoard projects={projects} onSelect={setSelectedId} />
        </div>
      </main>

      {selected && (
        <ProjectDrawer project={selected} onClose={() => setSelectedId(null)} onStage={handleStage} />
      )}
    </>
  );
}

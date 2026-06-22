"use client";

import { useState } from "react";
import { PROJECTS } from "@/lib/data";
import type { Project, Stage } from "@/lib/types";
import Header from "@/components/Header";
import KpiBar from "@/components/crm/KpiBar";
import PipelineBoard from "@/components/crm/PipelineBoard";
import ProjectList from "@/components/crm/ProjectList";
import ProjectDrawer from "@/components/crm/ProjectDrawer";

export default function CrmPage() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [view, setView] = useState<"kanban" | "liste">("kanban");
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
              Le carnet de commandes de l'atelier, augmenté par l'IA, pipeline, scoring des devis,
              copilote de relance et résumé d'échanges.
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-border bg-paper p-1">
            <button
              onClick={() => setView("kanban")}
              className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition ${
                view === "kanban" ? "bg-bois-dark text-paper" : "text-ink hover:bg-sand"
              }`}
            >
              Pipeline
            </button>
            <button
              onClick={() => setView("liste")}
              className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition ${
                view === "liste" ? "bg-bois-dark text-paper" : "text-ink hover:bg-sand"
              }`}
            >
              Liste
            </button>
          </div>
        </div>

        <KpiBar projects={projects} />

        <div className="mt-4 mb-3 flex items-center justify-between text-[11.5px] text-muted">
          <span>
            {view === "kanban"
              ? "Glissez une carte d'une colonne à l'autre pour faire avancer un dossier."
              : "Cliquez un en-tête pour trier · cliquez une ligne pour ouvrir le copilote IA."}
          </span>
          <span className="hidden sm:inline">Cliquez une fiche → copilote IA →</span>
        </div>

        {view === "kanban" ? (
          <PipelineBoard projects={projects} onSelect={setSelectedId} onMove={handleStage} />
        ) : (
          <ProjectList projects={projects} onSelect={setSelectedId} />
        )}
      </main>

      {selected && (
        <ProjectDrawer project={selected} onClose={() => setSelectedId(null)} onStage={handleStage} />
      )}
    </>
  );
}

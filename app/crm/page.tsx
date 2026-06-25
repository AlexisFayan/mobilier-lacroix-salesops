"use client";

import { useEffect, useState } from "react";
import { PROJECTS } from "@/lib/data";
import { fetchProjects, upsertProject } from "@/lib/projects";
import type { Project, Stage } from "@/lib/types";
import Header from "@/components/Header";
import KpiBar from "@/components/crm/KpiBar";
import PipelineBoard from "@/components/crm/PipelineBoard";
import ProjectList from "@/components/crm/ProjectList";
import ProjectDrawer from "@/components/crm/ProjectDrawer";
import NewProjectForm from "@/components/crm/NewProjectForm";
import DevisInbox from "@/components/crm/DevisInbox";

export default function CrmPage() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [view, setView] = useState<"kanban" | "liste" | "demandes">("kanban");
  const [creating, setCreating] = useState(false);
  const [synced, setSynced] = useState(false);
  const selected = projects.find((p) => p.id === selectedId) || null;

  // Persistance Supabase : on lit la base au chargement (et on l'amorce avec le jeu
  // de démo si elle est vide). En cas d'échec, on garde les données de démo affichées :
  // la démo ne casse jamais. Voir lib/projects.ts.
  useEffect(() => {
    let alive = true;
    fetchProjects().then((rows) => {
      if (!alive) return;
      if (rows) {
        setProjects(rows);
        setSynced(true);
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  function handleStage(id: string, stage: Stage) {
    setProjects((prev) => {
      const next = prev.map((p) =>
        p.id === id
          ? {
              ...p,
              stage,
              lastActivityDaysAgo: 0,
              score: stage === "signe" ? 100 : stage === "perdu" ? 0 : p.score,
            }
          : p
      );
      const updated = next.find((p) => p.id === id);
      if (updated) void upsertProject(updated);
      return next;
    });
  }

  function handleCreate(p: Project) {
    setProjects((prev) => [p, ...prev]);
    void upsertProject(p);
  }

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-6">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-semibold text-bois-dark">Pilotage commercial</h1>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  synced ? "bg-olive/15 text-olive" : "bg-sand text-muted"
                }`}
                title={synced ? "Données lues et écrites dans Supabase" : "Base indisponible : données de démonstration"}
              >
                {synced ? "Synchronisé · Supabase" : "Mode démo"}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-muted">
              Le carnet de commandes de l'atelier, augmenté par l'IA : pipeline, scoring des devis,
              copilote de relance et résumé d'échanges.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCreating(true)}
              className="rounded-full bg-terracotta px-4 py-2 text-[12.5px] font-medium text-paper transition hover:bg-terracotta-dark"
            >
              + Nouveau projet
            </button>
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
              <button
                onClick={() => setView("demandes")}
                className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition ${
                  view === "demandes" ? "bg-bois-dark text-paper" : "text-ink hover:bg-sand"
                }`}
              >
                Demandes
              </button>
            </div>
          </div>
        </div>

        {view !== "demandes" && <KpiBar projects={projects} />}

        <div className="mt-4 mb-3 flex items-center justify-between text-[11.5px] text-muted">
          <span>
            {view === "kanban"
              ? "Glissez une carte d'une colonne à l'autre pour faire avancer un dossier."
              : view === "liste"
              ? "Cliquez un en-tête pour trier, cliquez une ligne pour ouvrir le copilote IA."
              : "Générez une réponse dans le ton, envoyez-la au prospect ou supprimez la demande."}
          </span>
          {view !== "demandes" && (
            <span className="hidden sm:inline">Cliquez une fiche pour ouvrir le copilote IA</span>
          )}
        </div>

        {view === "kanban" && (
          <PipelineBoard projects={projects} onSelect={setSelectedId} onMove={handleStage} />
        )}
        {view === "liste" && <ProjectList projects={projects} onSelect={setSelectedId} />}
        {view === "demandes" && <DevisInbox />}
      </main>

      {selected && (
        <ProjectDrawer project={selected} onClose={() => setSelectedId(null)} onStage={handleStage} />
      )}

      {creating && <NewProjectForm onCreate={handleCreate} onClose={() => setCreating(false)} />}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { STAGES, STAGE_LABEL, CHANNEL_META, euro, joursLabel } from "@/lib/types";
import type { Project, Stage, ExchangeType } from "@/lib/types";
import type { ScoreResult, RelanceResult, ResumeResult } from "@/lib/ai";
import { aiScore, aiRelance, aiResume } from "@/lib/aiClient";
import ScoreBadge from "./ScoreBadge";

const EX_LABEL: Record<ExchangeType, string> = {
  appel: "Appel",
  email: "Email",
  visite: "Visite",
  devis: "Devis",
  note: "Note",
};

function SourceBadge({ engine, real }: { engine: string; real: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-cream px-2 py-0.5 text-[10px] text-muted">
      <span className={`h-1.5 w-1.5 rounded-full ${real ? "bg-olive" : "bg-gold"}`} />
      {real ? "IA · " : "Démo · "}
      {engine}
    </span>
  );
}

function Spinner({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[12px] text-muted">
      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-border border-t-terracotta" />
      {label}
    </span>
  );
}

export default function ProjectDrawer({
  project,
  onClose,
  onStage,
}: {
  project: Project;
  onClose: () => void;
  onStage: (id: string, stage: Stage) => void;
}) {
  const [score, setScore] = useState<ScoreResult | null>(null);
  const [relance, setRelance] = useState<RelanceResult | null>(null);
  const [resume, setResume] = useState<ResumeResult | null>(null);
  const [loading, setLoading] = useState<{ [k: string]: boolean }>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setScore(null);
    setRelance(null);
    setResume(null);
    setCopied(false);
  }, [project.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function run(key: string, fn: () => Promise<void>) {
    setLoading((l) => ({ ...l, [key]: true }));
    try {
      await fn();
    } catch {
      /* repli géré côté serveur */
    } finally {
      setLoading((l) => ({ ...l, [key]: false }));
    }
  }

  const levelColor =
    score?.level === "chaud" ? "text-olive" : score?.level === "tiède" ? "text-[#a07d20]" : "text-muted";

  return (
    <>
      <div className="fixed inset-0 z-40 bg-bois-dark/30 backdrop-blur-[2px]" onClick={onClose} />
      <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[480px] animate-fadeup flex-col border-l border-border bg-cream shadow-2xl">
        {/* En-tête */}
        <div className="flex items-start justify-between gap-3 border-b border-border bg-paper px-5 py-4">
          <div className="min-w-0">
            <h2 className="truncate font-serif text-xl font-semibold text-bois-dark">{project.client}</h2>
            <p className="mt-0.5 text-[12.5px] text-muted">
              {project.city} · {project.contactName} ({project.contactRole})
            </p>
            <p className="mt-1 text-[11px] text-muted">{CHANNEL_META[project.channel].label}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full px-2 py-1 text-lg leading-none text-muted transition hover:bg-sand hover:text-ink"
            aria-label="Fermer"
          >
            ×
          </button>
        </div>

        <div className="thin-scroll flex-1 space-y-5 overflow-y-auto px-5 py-5">
          {/* Montant + étape */}
          <div className="flex items-center justify-between rounded-xl border border-border bg-paper px-4 py-3">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-muted">Montant estimé</div>
              <div className="font-serif text-2xl font-semibold text-terracotta-dark">{euro(project.estValue)}</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-wide text-muted">Étape</div>
              <div className="font-medium text-ink">{STAGE_LABEL[project.stage]}</div>
            </div>
          </div>

          {/* Contrôles d'étape */}
          <div>
            <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted">
              Faire avancer le dossier
            </div>
            <div className="flex flex-wrap gap-1.5">
              {STAGES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => onStage(project.id, s.key)}
                  className={`rounded-full border px-2.5 py-1 text-[11px] transition ${
                    project.stage === s.key
                      ? "border-transparent text-paper"
                      : "border-border bg-paper text-ink hover:bg-sand"
                  }`}
                  style={project.stage === s.key ? { background: s.color } : undefined}
                >
                  {s.short}
                </button>
              ))}
            </div>
          </div>

          {/* 1. Scoring IA */}
          <section className="rounded-xl border border-border bg-paper p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-[15px] font-semibold text-bois-dark">Scoring IA du devis</h3>
              {score && <SourceBadge engine={score.source.engine} real={score.source.real} />}
            </div>

            {!score && !loading.score && (
              <p className="mt-1 text-[12.5px] text-muted">
                Estime la probabilité de signature et explique les facteurs clés.
              </p>
            )}

            {loading.score && <div className="mt-3"><Spinner label="Analyse du dossier…" /></div>}

            {score && (
              <div className="mt-3 animate-fadeup">
                <div className="flex items-center gap-3">
                  <ScoreBadge score={score.score} size={52} />
                  <div>
                    <div className={`font-serif text-lg font-semibold capitalize ${levelColor}`}>
                      Lead {score.level}
                    </div>
                    <div className="text-[12px] text-muted">probabilité de signature</div>
                  </div>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {score.factors.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-[12.5px]">
                      <span
                        className={`mt-0.5 w-3 text-center font-bold ${
                          f.impact === "+" ? "text-olive" : f.impact === "-" ? "text-rouille" : "text-muted"
                        }`}
                      >
                        {f.impact}
                      </span>
                      <span className="text-ink/85">{f.label}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 rounded-lg bg-cream px-3 py-2 text-[12.5px] text-ink">
                  <span className="font-medium text-bois-dark">Reco : </span>
                  {score.reco}
                </div>
              </div>
            )}

            <button
              onClick={() => run("score", async () => setScore(await aiScore(project)))}
              disabled={loading.score}
              className="mt-3 w-full rounded-lg bg-bois-dark py-2 text-[13px] font-medium text-paper transition hover:bg-bois disabled:opacity-50"
            >
              {score ? "Réanalyser" : "Analyser avec l'IA"}
            </button>
          </section>

          {/* 2. Copilote relance */}
          <section className="rounded-xl border border-border bg-paper p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-[15px] font-semibold text-bois-dark">Copilote de relance</h3>
              {relance && <SourceBadge engine={relance.source.engine} real={relance.source.real} />}
            </div>

            {!relance && !loading.relance && (
              <p className="mt-1 text-[12.5px] text-muted">
                Rédige un email de relance « dans le ton » de la marque, adapté au dernier échange.
              </p>
            )}
            {loading.relance && <div className="mt-3"><Spinner label="Rédaction en cours…" /></div>}

            {relance && (
              <div className="mt-3 animate-fadeup">
                <div className="rounded-lg border border-border bg-cream px-3 py-2">
                  <div className="text-[11px] text-muted">Objet</div>
                  <div className="text-[13px] font-medium text-bois-dark">{relance.subject}</div>
                  <div className="mt-2 whitespace-pre-line border-t border-border pt-2 text-[12.5px] leading-relaxed text-ink/90">
                    {relance.body}
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(`${relance.subject}\n\n${relance.body}`);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1800);
                  }}
                  className="mt-2 text-[12px] font-medium text-terracotta-dark hover:underline"
                >
                  {copied ? "Copié" : "Copier l'email"}
                </button>
              </div>
            )}

            <button
              onClick={() => run("relance", async () => setRelance(await aiRelance(project)))}
              disabled={loading.relance}
              className="mt-3 w-full rounded-lg bg-terracotta py-2 text-[13px] font-medium text-paper transition hover:bg-terracotta-dark disabled:opacity-50"
            >
              {relance ? "Regénérer" : "Générer une relance"}
            </button>
          </section>

          {/* 3. Résumé des échanges */}
          <section className="rounded-xl border border-border bg-paper p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-[15px] font-semibold text-bois-dark">Résumé des échanges</h3>
              {resume && <SourceBadge engine={resume.source.engine} real={resume.source.real} />}
            </div>
            {!resume && !loading.resume && (
              <p className="mt-1 text-[12.5px] text-muted">
                Synthétise l'historique en une fiche projet exploitable.
              </p>
            )}
            {loading.resume && <div className="mt-3"><Spinner label="Synthèse…" /></div>}

            {resume && (
              <div className="mt-3 animate-fadeup space-y-2 text-[12.5px]">
                <p className="text-ink/90">{resume.synthese}</p>
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-wide text-muted">Signaux budget</div>
                  <p className="text-ink/85">{resume.signauxBudget}</p>
                </div>
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-wide text-muted">Prochaine étape</div>
                  <p className="font-medium text-bois-dark">{resume.prochaineEtape}</p>
                </div>
              </div>
            )}

            <button
              onClick={() => run("resume", async () => setResume(await aiResume(project)))}
              disabled={loading.resume}
              className="mt-3 w-full rounded-lg border border-bois-dark py-2 text-[13px] font-medium text-bois-dark transition hover:bg-sand disabled:opacity-50"
            >
              {resume ? "Régénérer la fiche" : "Résumer les échanges"}
            </button>
          </section>

          {/* Timeline */}
          <section>
            <h3 className="mb-2 font-serif text-[15px] font-semibold text-bois-dark">Historique</h3>
            <ol className="relative space-y-3 border-l border-border pl-4">
              {project.exchanges.map((e) => (
                <li key={e.id} className="relative">
                  <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-clay" />
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-medium text-ink">
                      <span className="text-muted">{EX_LABEL[e.type]} · </span>
                      {e.author}
                    </span>
                    <span className="text-[10.5px] text-muted">{joursLabel(e.daysAgo)}</span>
                  </div>
                  <p className="text-[12px] leading-snug text-ink/80">{e.content}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </aside>
    </>
  );
}

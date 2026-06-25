"use client";

import { useEffect, useState } from "react";
import { STAGES, STAGE_LABEL, CHANNEL_META, TYPE_LABEL, euro, joursLabel } from "@/lib/types";
import type { Project, Stage, ClientType, Channel, ExchangeType } from "@/lib/types";
import type { ScoreResult, RelanceResult, ResumeResult } from "@/lib/ai";
import { aiScore, aiRelance, aiResume } from "@/lib/aiClient";
import ScoreBadge from "./ScoreBadge";

const EX_LABEL: Record<ExchangeType, string> = {
  appel: "Appel",
  email: "Courriel",
  visite: "Visite",
  devis: "Devis",
  note: "Note",
};

const INPUT = "mt-1 w-full rounded-lg border border-border bg-cream/40 px-3 py-2 text-[13px] text-ink";

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
  onUpdate,
}: {
  project: Project;
  onClose: () => void;
  onStage: (id: string, stage: Stage) => void;
  onUpdate: (p: Project) => void;
  onDelete: (id: string) => void;
}) {
  const [score, setScore] = useState<ScoreResult | null>(null);
  const [relance, setRelance] = useState<RelanceResult | null>(null);
  const [resume, setResume] = useState<ResumeResult | null>(null);
  const [loading, setLoading] = useState<{ [k: string]: boolean }>({});
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Project>(project);

  useEffect(() => {
    setScore(null);
    setRelance(null);
    setResume(null);
    setCopied(false);
    setEditing(false);
  }, [project.id]);

  function startEdit() {
    setDraft(project);
    setEditing(true);
  }
  function saveEdit() {
    onUpdate(draft);
    setEditing(false);
  }

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
            <h2 className="break-words font-serif text-xl font-semibold text-bois-dark">{project.client}</h2>
            <p className="mt-0.5 text-[12.5px] text-muted">
              {project.city} · {project.contactName} ({project.contactRole})
            </p>
            <p className="mt-1 text-[11px] text-muted">{CHANNEL_META[project.channel].label}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              onClick={editing ? () => setEditing(false) : startEdit}
              className="rounded-full border border-border bg-paper px-2.5 py-1 text-[11px] font-medium text-bois-dark transition hover:bg-sand"
            >
              {editing ? "Annuler" : "Modifier"}
            </button>
            <button
              onClick={onClose}
              className="rounded-full px-2 py-1 text-lg leading-none text-muted transition hover:bg-sand hover:text-ink"
              aria-label="Fermer"
            >
              ×
            </button>
          </div>
        </div>

        <div className="thin-scroll flex-1 space-y-5 overflow-y-auto px-5 py-5">
          {/* Montant + étape, ou formulaire d'édition */}
          {editing ? (
            <div className="space-y-3 rounded-xl border border-clay/50 bg-paper p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-clay">Modifier la fiche</div>
              <label className="block">
                <span className="text-[11px] text-muted">Client / établissement</span>
                <input value={draft.client} onChange={(e) => setDraft({ ...draft, client: e.target.value })} className={INPUT} />
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="block">
                  <span className="text-[11px] text-muted">Type</span>
                  <select value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value as ClientType })} className={INPUT}>
                    {Object.entries(TYPE_LABEL).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-[11px] text-muted">Canal</span>
                  <select value={draft.channel} onChange={(e) => setDraft({ ...draft, channel: e.target.value as Channel })} className={INPUT}>
                    {Object.entries(CHANNEL_META).map(([k, v]) => (
                      <option key={k} value={k}>{v.label}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label className="block">
                  <span className="text-[11px] text-muted">Ville</span>
                  <input value={draft.city} onChange={(e) => setDraft({ ...draft, city: e.target.value })} className={INPUT} />
                </label>
                <label className="block">
                  <span className="text-[11px] text-muted">Montant estimé (€)</span>
                  <input type="number" value={draft.estValue} onChange={(e) => setDraft({ ...draft, estValue: parseInt(e.target.value) || 0 })} className={INPUT} />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label className="block">
                  <span className="text-[11px] text-muted">Contact</span>
                  <input value={draft.contactName} onChange={(e) => setDraft({ ...draft, contactName: e.target.value })} className={INPUT} />
                </label>
                <label className="block">
                  <span className="text-[11px] text-muted">Rôle</span>
                  <input value={draft.contactRole} onChange={(e) => setDraft({ ...draft, contactRole: e.target.value })} className={INPUT} />
                </label>
              </div>
              <div className="grid grid-cols-2 items-end gap-2">
                <label className="block">
                  <span className="text-[11px] text-muted">Score IA (0-100)</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={draft.score}
                    onChange={(e) => setDraft({ ...draft, score: Math.max(0, Math.min(100, parseInt(e.target.value) || 0)) })}
                    className={INPUT}
                  />
                </label>
                <label className="flex items-center gap-2 pb-2 text-[12.5px] text-ink">
                  <input type="checkbox" checked={draft.devisSent} onChange={(e) => setDraft({ ...draft, devisSent: e.target.checked })} />
                  Devis envoyé
                </label>
              </div>
              <label className="block">
                <span className="text-[11px] text-muted">Description</span>
                <textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} rows={3} className={INPUT} />
              </label>
              <label className="block">
                <span className="text-[11px] text-muted">Prochaine action</span>
                <input value={draft.nextAction} onChange={(e) => setDraft({ ...draft, nextAction: e.target.value })} className={INPUT} />
              </label>
              <div className="flex gap-2 pt-1">
                <button onClick={saveEdit} className="rounded-lg bg-olive px-4 py-2 text-[13px] font-medium text-paper transition hover:bg-olive/85">
                  Enregistrer
                </button>
                <button onClick={() => setEditing(false)} className="rounded-lg border border-border px-4 py-2 text-[13px] font-medium text-ink transition hover:bg-sand">
                  Annuler
                </button>
              </div>
            </div>
          ) : (
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
          )}

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
              onClick={() =>
                run("score", async () => {
                  const r = await aiScore(project);
                  setScore(r);
                  onUpdate({ ...project, score: r.score });
                })
              }
              disabled={loading.score}
              className="mt-3 w-full rounded-lg bg-bois-dark py-2 text-[13px] font-medium text-paper transition hover:bg-bois disabled:opacity-50"
            >
              {score ? "Réanalyser" : "Analyser avec l'IA"}
            </button>
            {score && (
              <p className="mt-2 text-center text-[11px] text-olive">Score enregistré sur la fiche ({score.score}/100).</p>
            )}
          </section>

          {/* 2. Copilote relance */}
          <section className="rounded-xl border border-border bg-paper p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-[15px] font-semibold text-bois-dark">Copilote de relance</h3>
              {relance && <SourceBadge engine={relance.source.engine} real={relance.source.real} />}
            </div>

            {!relance && !loading.relance && (
              <p className="mt-1 text-[12.5px] text-muted">
                Rédige un courriel de relance « dans le ton » de la marque, adapté au dernier échange.
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
                  {copied ? "Copié" : "Copier le courriel"}
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

          {/* Suppression du projet */}
          <section className="border-t border-border pt-4">
            <button
              onClick={() => {
                if (confirm(`Supprimer définitivement le projet « ${project.client} » ?`)) onDelete(project.id);
              }}
              className="w-full rounded-lg border border-rouille/40 py-2 text-[13px] font-medium text-rouille transition hover:bg-rouille hover:text-paper"
            >
              Supprimer ce projet
            </button>
          </section>
        </div>
      </aside>
    </>
  );
}

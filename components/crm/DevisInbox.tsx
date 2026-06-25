"use client";

import { useEffect, useState } from "react";
import { fetchDevisLeads, deleteDevisLead, projectFromLead, type DevisLead } from "@/lib/devis";
import type { Project } from "@/lib/types";

type Draft = { subject: string; body: string; engine: string; real: boolean };

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  } catch {
    return iso;
  }
}

export default function DevisInbox({ onAddToPipeline }: { onAddToPipeline: (p: Project) => void }) {
  const [leads, setLeads] = useState<DevisLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [busy, setBusy] = useState<Record<string, string>>({}); // id -> action en cours
  const [feedback, setFeedback] = useState<Record<string, { ok: boolean; msg: string }>>({});

  useEffect(() => {
    let alive = true;
    fetchDevisLeads().then((rows) => {
      if (!alive) return;
      if (rows === null) setUnavailable(true);
      else setLeads(rows);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, []);

  function setLeadBusy(id: string, action: string) {
    setBusy((b) => ({ ...b, [id]: action }));
  }
  function clearBusy(id: string) {
    setBusy((b) => {
      const next = { ...b };
      delete next[id];
      return next;
    });
  }

  async function generer(lead: DevisLead) {
    setLeadBusy(lead.id, "generer");
    setFeedback((f) => ({ ...f, [lead.id]: undefined as never }));
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: "devis-reply",
          lead: {
            nom: lead.nom,
            etablissement: lead.etablissement,
            type_etablissement: lead.type_etablissement,
            type_projet: lead.type_projet,
            description: lead.description,
            budget: lead.budget,
            delai: lead.delai,
            ville: lead.ville,
          },
        }),
      });
      const j = await res.json();
      if (j?.body) {
        setDrafts((d) => ({
          ...d,
          [lead.id]: { subject: j.subject ?? "", body: j.body, engine: j.source?.engine ?? "", real: !!j.source?.real },
        }));
      } else {
        setFeedback((f) => ({ ...f, [lead.id]: { ok: false, msg: "Génération impossible." } }));
      }
    } catch {
      setFeedback((f) => ({ ...f, [lead.id]: { ok: false, msg: "Génération impossible." } }));
    } finally {
      clearBusy(lead.id);
    }
  }

  async function envoyer(lead: DevisLead) {
    const draft = drafts[lead.id];
    if (!draft || !lead.email) return;
    setLeadBusy(lead.id, "envoyer");
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: lead.email, subject: draft.subject, message: draft.body }),
      });
      const j = await res.json();
      if (res.ok && j?.ok) {
        setFeedback((f) => ({ ...f, [lead.id]: { ok: true, msg: `Courriel envoyé à ${lead.email}.` } }));
      } else {
        setFeedback((f) => ({
          ...f,
          [lead.id]: { ok: false, msg: j?.error || "Envoi refusé. Vérifiez le domaine Resend." },
        }));
      }
    } catch {
      setFeedback((f) => ({ ...f, [lead.id]: { ok: false, msg: "Envoi impossible." } }));
    } finally {
      clearBusy(lead.id);
    }
  }

  async function supprimer(lead: DevisLead) {
    if (!confirm(`Supprimer la demande de ${lead.etablissement || lead.nom || "ce prospect"} ?`)) return;
    setLeadBusy(lead.id, "supprimer");
    const ok = await deleteDevisLead(lead.id);
    if (ok) setLeads((ls) => ls.filter((l) => l.id !== lead.id));
    else setFeedback((f) => ({ ...f, [lead.id]: { ok: false, msg: "Suppression impossible." } }));
    clearBusy(lead.id);
  }

  async function ajouter(lead: DevisLead) {
    setLeadBusy(lead.id, "ajouter");
    onAddToPipeline(projectFromLead(lead));
    const ok = await deleteDevisLead(lead.id);
    if (ok) {
      setLeads((ls) => ls.filter((l) => l.id !== lead.id));
    } else {
      setFeedback((f) => ({ ...f, [lead.id]: { ok: true, msg: "Ajouté à la pipeline." } }));
    }
    clearBusy(lead.id);
  }

  function updateDraft(id: string, patch: Partial<Draft>) {
    setDrafts((d) => ({ ...d, [id]: { ...d[id], ...patch } }));
  }

  if (loading) {
    return <p className="rounded-2xl border border-border bg-paper p-6 text-[13px] text-muted">Chargement des demandes…</p>;
  }
  if (unavailable) {
    return (
      <p className="rounded-2xl border border-border bg-paper p-6 text-[13px] text-muted">
        Base indisponible. La table des demandes n'est pas accessible pour le moment.
      </p>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-[11.5px] text-muted">
        <span>
          Demandes reçues via le formulaire du site (table Supabase <code className="text-bois-dark">devis_leads</code>).
        </span>
        <span className="rounded-full bg-sand px-2 py-0.5 font-semibold text-bois-dark">{leads.length}</span>
      </div>

      {leads.length === 0 ? (
        <p className="rounded-2xl border border-border bg-paper p-6 text-[13px] text-muted">
          Aucune demande pour l'instant. Les formulaires de devis envoyés depuis la landing arriveront ici.
        </p>
      ) : (
        <div className="grid gap-3">
          {leads.map((lead) => {
            const draft = drafts[lead.id];
            const action = busy[lead.id];
            const fb = feedback[lead.id];
            return (
              <div key={lead.id} className="rounded-2xl border border-border bg-paper p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-[15px] font-semibold text-bois-dark">
                        {lead.etablissement || "Sans nom"}
                      </span>
                      {lead.type_etablissement && (
                        <span className="rounded bg-sand px-1.5 py-0.5 text-[9.5px] font-medium text-muted">
                          {lead.type_etablissement}
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 text-[12px] text-ink/80">
                      {lead.nom}
                      {lead.email && <> · {lead.email}</>}
                      {lead.telephone && <> · {lead.telephone}</>}
                    </div>
                    <div className="mt-0.5 text-[11.5px] text-muted">
                      {[lead.type_projet, lead.budget && `budget ${lead.budget}`, lead.delai && `délai ${lead.delai}`, lead.ville]
                        .filter(Boolean)
                        .join(" · ")}
                    </div>
                  </div>
                  <span className="text-[10.5px] text-muted/80">{formatDate(lead.created_at)}</span>
                </div>

                {lead.description && (
                  <p className="mt-2 rounded-lg bg-cream/60 px-3 py-2 text-[12.5px] leading-snug text-ink/85">
                    {lead.description}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => ajouter(lead)}
                    disabled={!!action}
                    className="rounded-full bg-olive px-3 py-1.5 text-[12px] font-medium text-paper transition hover:bg-olive/85 disabled:opacity-50"
                  >
                    {action === "ajouter" ? "Ajout…" : "Ajouter à la pipeline"}
                  </button>
                  <button
                    onClick={() => generer(lead)}
                    disabled={!!action}
                    className="rounded-full bg-bois-dark px-3 py-1.5 text-[12px] font-medium text-paper transition hover:bg-bois disabled:opacity-50"
                  >
                    {action === "generer" ? "Rédaction…" : draft ? "Regénérer" : "Générer un message"}
                  </button>
                  <button
                    onClick={() => supprimer(lead)}
                    disabled={!!action}
                    className="rounded-full border border-border px-3 py-1.5 text-[12px] font-medium text-muted transition hover:border-rouille hover:text-rouille disabled:opacity-50"
                  >
                    {action === "supprimer" ? "Suppression…" : "Supprimer"}
                  </button>
                </div>

                {draft && (
                  <div className="mt-3 rounded-xl border border-border bg-cream/40 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">Message au prospect</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                          draft.real ? "bg-olive/15 text-olive" : "bg-gold/20 text-[#8a6d1d]"
                        }`}
                        title={draft.real ? "Généré par une vraie IA" : "Repli simulé (démonstration)"}
                      >
                        {draft.real ? draft.engine : "Démonstration"}
                      </span>
                    </div>
                    <input
                      value={draft.subject}
                      onChange={(e) => updateDraft(lead.id, { subject: e.target.value })}
                      className="mb-2 w-full rounded-lg border border-border bg-paper px-3 py-2 text-[13px] font-medium text-bois-dark"
                      placeholder="Objet"
                    />
                    <textarea
                      value={draft.body}
                      onChange={(e) => updateDraft(lead.id, { body: e.target.value })}
                      rows={8}
                      className="w-full rounded-lg border border-border bg-paper px-3 py-2 text-[12.5px] leading-relaxed text-ink/90"
                    />
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => envoyer(lead)}
                        disabled={!!action || !lead.email}
                        className="rounded-full bg-terracotta px-3.5 py-1.5 text-[12px] font-medium text-paper transition hover:bg-terracotta-dark disabled:opacity-50"
                      >
                        {action === "envoyer" ? "Envoi…" : `Envoyer à ${lead.email || "—"}`}
                      </button>
                      <button
                        onClick={() => navigator.clipboard?.writeText(`${draft.subject}\n\n${draft.body}`)}
                        className="rounded-full border border-border px-3 py-1.5 text-[12px] font-medium text-ink transition hover:bg-sand"
                      >
                        Copier
                      </button>
                      <span className="text-[10.5px] italic text-muted">L'humain relit avant l'envoi.</span>
                    </div>
                  </div>
                )}

                {fb && (
                  <p className={`mt-2 text-[11.5px] ${fb.ok ? "text-olive" : "text-rouille"}`}>{fb.msg}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

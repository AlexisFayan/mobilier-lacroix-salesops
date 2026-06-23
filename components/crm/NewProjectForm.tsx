"use client";

import { useEffect, useState } from "react";
import { STAGES, CHANNEL_META, TYPE_LABEL } from "@/lib/types";
import type { Project, Stage, ClientType, Channel } from "@/lib/types";

export default function NewProjectForm({
  onCreate,
  onClose,
}: {
  onCreate: (p: Project) => void;
  onClose: () => void;
}) {
  const [client, setClient] = useState("");
  const [type, setType] = useState<ClientType>("restaurant");
  const [city, setCity] = useState("Lyon");
  const [contactName, setContactName] = useState("");
  const [contactRole, setContactRole] = useState("Gérant");
  const [channel, setChannel] = useState<Channel>("bouche-a-oreille");
  const [description, setDescription] = useState("");
  const [estValue, setEstValue] = useState("8000");
  const [stage, setStage] = useState<Stage>("nouveau");
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!client.trim()) {
      setError("Le nom du client est obligatoire.");
      return;
    }
    const proj: Project = {
      id: "p" + Date.now().toString(36),
      client: client.trim(),
      type,
      city: city.trim() || "Lyon",
      contactName: contactName.trim() || "Contact",
      contactRole: contactRole.trim() || "Gérant",
      channel,
      description: description.trim() || "Projet de mobilier sur mesure.",
      estValue: Math.max(0, Math.round(Number(estValue) || 0)),
      stage,
      score: stage === "signe" ? 100 : stage === "perdu" ? 0 : 35,
      createdDaysAgo: 0,
      lastActivityDaysAgo: 0,
      devisSent: ["devis", "negociation", "signe"].includes(stage),
      nextAction: "Qualifier la demande et planifier le prochain contact",
      exchanges: [
        { id: "e1", daysAgo: 0, type: "note", author: "Atelier", content: "Fiche créée dans le CRM." },
      ],
    };
    onCreate(proj);
    onClose();
  }

  const labelCls = "block text-[11px] font-medium uppercase tracking-wide text-muted";
  const inputCls =
    "mt-1 w-full rounded-lg border border-border bg-cream px-3 py-2 text-[13px] text-ink outline-none focus:border-clay/60";

  return (
    <>
      <div className="fixed inset-0 z-40 bg-bois-dark/30 backdrop-blur-[2px]" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:items-center">
        <form
          onSubmit={submit}
          className="my-auto w-full max-w-lg animate-fadeup rounded-2xl border border-border bg-paper p-6 shadow-2xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold text-bois-dark">Nouveau projet</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-2 py-1 text-lg leading-none text-muted transition hover:bg-sand hover:text-ink"
              aria-label="Fermer"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className={labelCls}>Client *</label>
              <input className={inputCls} value={client} onChange={(e) => setClient(e.target.value)} placeholder="Ex. Café Lumière" autoFocus />
            </div>
            <div>
              <label className={labelCls}>Type</label>
              <select className={inputCls} value={type} onChange={(e) => setType(e.target.value as ClientType)}>
                {(Object.entries(TYPE_LABEL) as [ClientType, string][]).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Ville</label>
              <input className={inputCls} value={city} onChange={(e) => setCity(e.target.value)} placeholder="Lyon 2e" />
            </div>
            <div>
              <label className={labelCls}>Contact</label>
              <input className={inputCls} value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Nom du contact" />
            </div>
            <div>
              <label className={labelCls}>Rôle</label>
              <input className={inputCls} value={contactRole} onChange={(e) => setContactRole(e.target.value)} placeholder="Gérant" />
            </div>
            <div>
              <label className={labelCls}>Canal</label>
              <select className={inputCls} value={channel} onChange={(e) => setChannel(e.target.value as Channel)}>
                {(Object.entries(CHANNEL_META) as [Channel, { label: string }][]).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Montant estimé (€)</label>
              <input className={inputCls} type="number" min={0} value={estValue} onChange={(e) => setEstValue(e.target.value)} />
            </div>
            <div className="col-span-2">
              <label className={labelCls}>Description du projet</label>
              <textarea
                className={`${inputCls} h-20 resize-none`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex. Banquettes sur mesure + comptoir en chêne pour la salle principale."
              />
            </div>
            <div className="col-span-2">
              <label className={labelCls}>Étape du funnel</label>
              <select className={inputCls} value={stage} onChange={(e) => setStage(e.target.value as Stage)}>
                {STAGES.map((s) => (
                  <option key={s.key} value={s.key}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {error && <p className="mt-3 text-[12px] font-medium text-rouille">{error}</p>}

          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-border px-4 py-2 text-[13px] font-medium text-ink transition hover:bg-sand"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="rounded-full bg-terracotta px-5 py-2 text-[13px] font-medium text-paper transition hover:bg-terracotta-dark"
            >
              Créer la fiche
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

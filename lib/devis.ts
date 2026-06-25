import { supabase } from "./supabase";
import type { Project, ClientType, Channel } from "./types";

/**
 * Demandes de devis reçues via le formulaire de la landing (webhook n8n -> Supabase).
 * Lecture et suppression depuis le prototype avec la clé publique (policies de démo).
 * L'écriture, elle, vient de n8n (clé secrète). Voir docs/automation.
 */
export type DevisLead = {
  id: string;
  created_at: string;
  nom: string;
  email: string;
  telephone: string;
  etablissement: string;
  type_etablissement: string;
  type_projet: string;
  description: string;
  budget: string;
  delai: string;
  ville: string;
  source: string;
};

const COLS =
  "id,created_at,nom,email,telephone,etablissement,type_etablissement,type_projet,description,budget,delai,ville,source";

/** Renvoie les demandes (plus récentes d'abord) ou null si la base est indisponible. */
export async function fetchDevisLeads(): Promise<DevisLead[] | null> {
  const { data, error } = await supabase
    .from("devis_leads")
    .select(COLS)
    .order("created_at", { ascending: false });
  if (error) return null;
  return (data ?? []) as DevisLead[];
}

/** Supprime une demande. Renvoie true si réussi. */
export async function deleteDevisLead(id: string): Promise<boolean> {
  const { error } = await supabase.from("devis_leads").delete().eq("id", id);
  return !error;
}

const CLIENT_TYPES: ClientType[] = ["café", "restaurant", "hôtel", "bar", "brasserie", "coffee-shop", "agenceur"];

/** Convertit une demande entrante en projet du pipeline (étape « nouveau »). */
export function projectFromLead(l: DevisLead): Project {
  const type = (CLIENT_TYPES as string[]).includes(l.type_etablissement)
    ? (l.type_etablissement as ClientType)
    : "restaurant";
  const m = String(l.budget || "").match(/\d{3,}/);
  const estValue = m ? parseInt(m[0], 10) : 0;
  return {
    id: l.id,
    client: l.etablissement || l.nom || "Demande sans nom",
    type,
    city: l.ville || "",
    contactName: l.nom || "",
    contactRole: "Contact",
    channel: "bouche-a-oreille" as Channel,
    description: l.description || "",
    estValue,
    stage: "nouveau",
    score: 0,
    createdDaysAgo: 0,
    lastActivityDaysAgo: 0,
    devisSent: false,
    nextAction: "Qualifier la demande reçue via le site",
    exchanges: l.description
      ? [{ id: "e1", daysAgo: 0, type: "email", author: l.nom || "Prospect", content: l.description }]
      : [],
  };
}

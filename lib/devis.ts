import { supabase } from "./supabase";

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

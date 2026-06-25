import { supabase } from "./supabase";
import { PROJECTS } from "./data";
import type { Project, Exchange, ClientType, Channel, Stage } from "./types";

/**
 * Couche de données du prototype CRM, adossée à Supabase (table `crm_projects`).
 * Conventions : la base est en snake_case, l'application en camelCase, d'où le mapping.
 * Tout échec (table absente, réseau) renvoie un repli sur les données de démo :
 * la démo ne casse jamais, même sans base.
 */
const TABLE = "crm_projects";

type Row = {
  id: string;
  client: string;
  type: string | null;
  city: string | null;
  contact_name: string | null;
  contact_role: string | null;
  channel: string | null;
  description: string | null;
  est_value: number | null;
  stage: string | null;
  score: number | null;
  created_days_ago: number | null;
  last_activity_days_ago: number | null;
  devis_sent: boolean | null;
  next_action: string | null;
  exchanges: Exchange[] | null;
};

function fromRow(r: Row): Project {
  return {
    id: r.id,
    client: r.client,
    type: (r.type ?? "restaurant") as ClientType,
    city: r.city ?? "",
    contactName: r.contact_name ?? "",
    contactRole: r.contact_role ?? "",
    channel: (r.channel ?? "bouche-a-oreille") as Channel,
    description: r.description ?? "",
    estValue: r.est_value ?? 0,
    stage: (r.stage ?? "nouveau") as Stage,
    score: r.score ?? 0,
    createdDaysAgo: r.created_days_ago ?? 0,
    lastActivityDaysAgo: r.last_activity_days_ago ?? 0,
    devisSent: r.devis_sent ?? false,
    nextAction: r.next_action ?? "",
    exchanges: Array.isArray(r.exchanges) ? r.exchanges : [],
  };
}

function toRow(p: Project): Row {
  return {
    id: p.id,
    client: p.client,
    type: p.type,
    city: p.city,
    contact_name: p.contactName,
    contact_role: p.contactRole,
    channel: p.channel,
    description: p.description,
    est_value: p.estValue,
    stage: p.stage,
    score: p.score,
    created_days_ago: p.createdDaysAgo,
    last_activity_days_ago: p.lastActivityDaysAgo,
    devis_sent: p.devisSent,
    next_action: p.nextAction,
    exchanges: p.exchanges,
  };
}

/**
 * Lit les projets depuis Supabase. Si la table est vide, l'amorce avec le jeu de
 * démo (source unique : lib/data.ts). Renvoie `null` en cas d'échec (repli côté appelant).
 */
export async function fetchProjects(): Promise<Project[] | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_days_ago", { ascending: true });

  if (error) return null;

  if (!data || data.length === 0) {
    const { error: seedError } = await supabase
      .from(TABLE)
      .upsert(PROJECTS.map(toRow), { onConflict: "id" });
    if (seedError) return null;
    return PROJECTS;
  }

  return (data as Row[]).map(fromRow);
}

/** Crée ou met à jour un projet (déplacement d'étape, nouveau dossier). Silencieux en cas d'échec. */
export async function upsertProject(project: Project): Promise<void> {
  await supabase.from(TABLE).upsert(toRow(project), { onConflict: "id" });
}

/** Supprime un projet du pipeline. Silencieux en cas d'échec. */
export async function deleteProject(id: string): Promise<void> {
  await supabase.from(TABLE).delete().eq("id", id);
}

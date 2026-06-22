export type Stage =
  | "nouveau"
  | "qualifie"
  | "visite"
  | "devis"
  | "negociation"
  | "signe"
  | "perdu";

export type Channel =
  | "agenceur"
  | "bouche-a-oreille"
  | "salon"
  | "recommandation"
  | "visite-atelier"
  | "instagram";

export type ClientType =
  | "café"
  | "restaurant"
  | "hôtel"
  | "bar"
  | "brasserie"
  | "coffee-shop"
  | "agenceur";

export type ExchangeType = "appel" | "email" | "visite" | "devis" | "note";

export interface Exchange {
  id: string;
  daysAgo: number;
  type: ExchangeType;
  author: string; // "Atelier" ou nom du contact
  content: string;
}

export interface Project {
  id: string;
  client: string;
  type: ClientType;
  city: string;
  contactName: string;
  contactRole: string;
  channel: Channel;
  description: string;
  estValue: number; // € — panier projet
  stage: Stage;
  score: number; // 0-100 — chaleur / probabilité de signature
  createdDaysAgo: number;
  lastActivityDaysAgo: number;
  devisSent: boolean;
  nextAction: string;
  exchanges: Exchange[];
}

export const STAGES: { key: Stage; label: string; short: string; color: string; bar: string }[] = [
  { key: "nouveau", label: "Nouvelle demande", short: "Demande", color: "#837567", bar: "bg-muted" },
  { key: "qualifie", label: "Qualifié", short: "Qualifié", color: "#c39a45", bar: "bg-gold" },
  { key: "visite", label: "Visite atelier / RDV", short: "Visite", color: "#bc7d57", bar: "bg-clay" },
  { key: "devis", label: "Devis envoyé", short: "Devis", color: "#c0653e", bar: "bg-terracotta" },
  { key: "negociation", label: "Négociation / Relance", short: "Négo", color: "#a23d23", bar: "bg-rouille" },
  { key: "signe", label: "Signé", short: "Signé", color: "#5e7150", bar: "bg-olive" },
  { key: "perdu", label: "Perdu", short: "Perdu", color: "#a39a90", bar: "bg-muted" },
];

export const STAGE_LABEL: Record<Stage, string> = Object.fromEntries(
  STAGES.map((s) => [s.key, s.label])
) as Record<Stage, string>;

export const CHANNEL_META: Record<Channel, { label: string; icon: string }> = {
  agenceur: { label: "Agenceur / Architecte", icon: "📐" },
  "bouche-a-oreille": { label: "Bouche-à-oreille", icon: "💬" },
  salon: { label: "Salon professionnel", icon: "🎪" },
  recommandation: { label: "Recommandation client", icon: "🤝" },
  "visite-atelier": { label: "Visite d'atelier", icon: "🪚" },
  instagram: { label: "Instagram", icon: "📷" },
};

export const TYPE_ICON: Record<ClientType, string> = {
  café: "☕",
  restaurant: "🍽️",
  hôtel: "🏨",
  bar: "🍸",
  brasserie: "🍺",
  "coffee-shop": "🥐",
  agenceur: "📐",
};

export function euro(n: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function joursLabel(d: number): string {
  if (d <= 0) return "aujourd'hui";
  if (d === 1) return "hier";
  if (d < 7) return `il y a ${d} j`;
  if (d < 30) return `il y a ${Math.round(d / 7)} sem`;
  return `il y a ${Math.round(d / 30)} mois`;
}

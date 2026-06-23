/**
 * Contenu structuré du dossier (onglet Rendu).
 * Chaque chiffre sensible référence une source de SOURCES (citation vérifiable).
 */

export type Source = { id: string; org: string; title: string; url: string; theme: string };

export const SOURCE_THEMES = [
  "Marché & filière du mobilier",
  "Marché CHR & restauration",
  "Hôtellerie & tourisme",
  "Région AURA & Lyon",
  "Tendances & conjoncture",
  "Outils IA",
];

/** Sources numérotées (l'ordre = le numéro affiché). */
export const SOURCES: Source[] = [
  { id: "ameublement-contract", theme: "Marché & filière du mobilier", org: "L'Ameublement français / CODIFAB × MKG", title: "Étude marché Contract & Agencement (675 M€, 28/01/2026)", url: "https://www.ameublement.com/marches/contract-agencement" },
  { id: "courrier-meuble", theme: "Marché & filière du mobilier", org: "Le Courrier du Meuble", title: "Le contract, levier structurant (2 700-40 000 €/chambre)", url: "https://www.courrierdumeuble.fr/blog/etude-ameublement-francais-codifab-x-mkg-consulting-le-marche-du-contract-levier-structurant-pour-la-filiere-du-meuble-en-france" },
  { id: "ipea-meuble", theme: "Marché & filière du mobilier", org: "IPEA / L'Ameublement français", title: "Filière Meuble 2025, marché du meuble 13,6 Md€", url: "https://www.ameublement.com/uploads/attachments/confrence-ameublement-26---dossier-de-presse-v30012026.pdf" },
  { id: "archidvisor", theme: "Marché & filière du mobilier", org: "Archidvisor", title: "Agencement de restaurant, 750 à 2 250 €/m²", url: "https://www.archidvisor.com/guides/agencement-restaurant" },
  { id: "umih-hcr", theme: "Marché CHR & restauration", org: "UMIH / AKTO / DARES", title: "Monographie HCR 2024, 122 000 ét. ; AURA 16 679", url: "https://www.umih.fr/assets/files/site/ressources/observatoires-et-etudes/2024_AnalyseBranche_HCR_akkto.pdf" },
  { id: "insee-561", theme: "Marché CHR & restauration", org: "INSEE", title: "Fiche secteur 561, Restauration (171 356 entreprises)", url: "https://www.insee.fr/fr/statistiques/7763790" },
  { id: "altares-umih", theme: "Marché CHR & restauration", org: "Altares / UMIH", title: "Défaillances T2 2025, restauration trad. +21 %", url: "https://www.umih.fr/medias/news/16-600-defaillances-dentreprises-au-2e-trimestre-2025-la-restauration-traditionnelle-en-premiere-ligne.html" },
  { id: "insee-hotels-2024", theme: "Hôtellerie & tourisme", org: "INSEE", title: "Tourisme 2024, 16 722 hôtels ; 656 965 chambres", url: "https://www.insee.fr/fr/statistiques/7767766" },
  { id: "aura-hotel", theme: "Hôtellerie & tourisme", org: "Auvergne-Rhône-Alpes Tourisme", title: "Mémento, 2 471 hôtels AURA ; 384 hôtels 4-5*", url: "https://pro.auvergnerhonealpes-tourisme.com/memento/hotellerie/" },
  { id: "coach-omnium", theme: "Hôtellerie & tourisme", org: "Coach Omnium", title: "Panorama hôtellerie, 28 % du parc en 4-5*", url: "https://coachomnium.com/bonus/89-panorama-de-lhotellerie-en-france/" },
  { id: "insee-aura-creations", theme: "Région AURA & Lyon", org: "INSEE", title: "Bilan 2024 AURA, créations héberg.-restauration +15,7 %", url: "https://www.insee.fr/fr/statistiques/8354533?sommaire=8354850" },
  { id: "onlylyon-resto", theme: "Région AURA & Lyon", org: "ONLYLYON / Métropole de Lyon", title: "Chiffres clés Métropole 2024 (~5 280 restaurants)", url: "https://business.onlylyon.com/fileadmin/user_upload/documents/20240423-mdl-chiffres-cles-metropole-de-lyon-2024-plaquette-fr.pdf" },
  { id: "onlylyon-tourisme", theme: "Région AURA & Lyon", org: "ONLYLYON Tourisme & Congrès", title: "Tourisme à Lyon, ~212 hôtels, 2e parc français", url: "https://www.onlylyon.com/secteur-tourisme" },
  { id: "fevad-circulaire", theme: "Tendances & conjoncture", org: "FEVAD", title: "Ameublement & circulaire 2025 (~1 meuble/4 d'occasion)", url: "https://www.fevad.com/special-ameublement-et-modeles-circulaires-2025/" },
  { id: "mistral-privacy", theme: "Outils IA", org: "Mistral AI", title: "Confidentialité de l'API (no-training par défaut)", url: "https://docs.mistral.ai/" },
  { id: "groq-limits", theme: "Outils IA", org: "Groq", title: "Limites du free tier (quotas publics)", url: "https://console.groq.com/docs/rate-limits" },
];

export function srcIndex(id: string): number {
  return SOURCES.findIndex((s) => s.id === id) + 1;
}

/** Client idéal (ICP). */
export const ICP = {
  oneLiner:
    "Restaurateur, cafetier ou hôtelier indépendant de Lyon / AURA, en création ou rénovation, attaché au sur-mesure local et durable plutôt qu'au prix le plus bas.",
  attributs: [
    { k: "Budget projet", v: "5 à 15 k€" },
    { k: "Zone", v: "Métropole de Lyon / AURA" },
    { k: "Moment d'achat", v: "création ou rénovation" },
    { k: "Critère clé", v: "sur-mesure & durable, pas le prix" },
  ],
  segments: [
    { label: "Restaurants & cafés indépendants", desc: "Cœur de cible : banquettes, comptoirs, tables. Cycle de 5 à 10 ans.", src: ["onlylyon-resto"] },
    { label: "Hôtels 3-4 étoiles", desc: "Montée en gamme : têtes de lit, mobilier de lobby. 384 hôtels 4-5* en AURA.", src: ["aura-hotel"] },
    { label: "Agenceurs & architectes", desc: "Prescripteurs en marque blanche : le canal le plus prometteur.", src: [] },
    { label: "Brasseries & concepts", desc: "Renouvellement de salle et d'identité, projets à forte valeur.", src: [] },
    { label: "Clients existants", desc: "Réfection et recouvrement de banquettes : un revenu récurrent.", src: [] },
  ],
};

/** TAM / SAM / SOM */
export const SIZING = {
  tam: {
    value: "≈ 675 M€",
    unit: "/ an",
    label: "TAM",
    title: "Marché total",
    definition: "Mobilier + agencement CHR & commerce en France (tous fournisseurs : sur-mesure, série, import).",
    calc: "Chiffre de filière direct, dont ≈ 420 M€ hôtellerie + ≈ 250 M€ restauration.",
    kind: "Chiffre dur",
    sources: ["ameublement-contract", "courrier-meuble"],
  },
  sam: {
    value: "≈ 34 M€",
    unit: "/ an",
    label: "SAM",
    title: "Marché accessible",
    definition: "Mobilier CHR sur-mesure milieu/haut de gamme accessible en Auvergne-Rhône-Alpes.",
    calc: "675 M€ × 14 % (part AURA) × ~35 % (sur-mesure accessible) ≈ 34 M€. Fourchette 28-40 M€.",
    kind: "Estimation d'expert",
    sources: ["umih-hcr", "ameublement-contract"],
  },
  som: {
    value: "≈ 0,55 M€",
    unit: "/ an",
    label: "SOM",
    title: "Cible 12-24 mois",
    definition: "CA réaliste, borné par la capacité de l'atelier (15 pers.) et un budget com de ~250 €/mois.",
    calc: "3-5 projets/mois × 10 k€, soit 0,45 à 0,60 M€. Levier : +10 à +25 % de conversion via le CRM.",
    kind: "Estimation d'expert",
    sources: [],
  },
} as const;

/**
 * Carte de positionnement concurrentielle.
 * x : 0 = série / prix bas  ->  100 = sur-mesure / premium
 * y : 0 = acteur national   ->  100 = ancrage local (Lyon / AURA)
 */
export type Competitor = {
  name: string;
  tag: string;
  cat: "sur-mesure" | "agenceur" | "luxe" | "serie";
  x: number;
  y: number;
  positioning: string;
  url: string;
};

export const COMPETITORS: Competitor[] = [
  { name: "City Mobilier", tag: "City", cat: "sur-mesure", x: 70, y: 82, positioning: "100 % sur-mesure CHR, showroom Lyon. Le concurrent frontal le plus proche.", url: "https://citymobilier.com/fr" },
  { name: "Mobikent Design", tag: "Mobikent", cat: "sur-mesure", x: 64, y: 73, positioning: "Sur-mesure + agencement, « fabricant de référence » à Lyon, SEO agressif.", url: "https://www.mobikent.com/lyon+69+rhone-y1" },
  { name: "Gouskant", tag: "Gouskant", cat: "sur-mesure", x: 60, y: 90, positioning: "Petit atelier bois sur-mesure resto, bois local, délais 4-8 sem.", url: "https://gouskant.fr/agencement-restaurant/" },
  { name: "Atelier Media", tag: "At. Media", cat: "sur-mesure", x: 54, y: 80, positioning: "Sous-traitance B2B pour architectes/agenceurs : seul à assumer la marque blanche.", url: "https://ateliermedia-lyon.fr/" },
  { name: "Acces-Sit", tag: "Acces-Sit", cat: "sur-mesure", x: 66, y: 26, positioning: "Spécialiste banquette sur-mesure (+5000/an) + série, national.", url: "https://www.acces-sit.com/" },
  { name: "Conforel", tag: "Conforel", cat: "agenceur", x: 56, y: 50, positioning: "Agenceur-fabricant clés en main, bureau d'études, grands comptes & chaînes.", url: "https://www.conforel-mobilier.com/lyon/" },
  { name: "BUROC", tag: "BUROC", cat: "agenceur", x: 50, y: 70, positioning: "Groupe d'agencement (origine bureau) fabriquant pour le CHR, Lyon.", url: "https://www.buroc.fr/" },
  { name: "Architéa Lyon", tag: "Architéa", cat: "agenceur", x: 44, y: 86, positioning: "Architecture d'intérieur CHR non-fabricante : concurrent ET prescripteur.", url: "https://www.architea.fr/architea-lyon/agencement-restaurant-lyon/" },
  { name: "Servizial", tag: "Servizial", cat: "luxe", x: 90, y: 64, positioning: "Mobilier hôtelier/resto luxe & technique, cible palaces. Au-dessus du segment.", url: "https://servizial.com/" },
  { name: "Ateliers Montespan", tag: "Montespan", cat: "luxe", x: 92, y: 40, positioning: "Ébénisterie haut de gamme sur-mesure depuis 1978, France & Suisse.", url: "https://www.ateliersmontespan.fr/" },
  { name: "Tradis Design", tag: "Tradis", cat: "serie", x: 24, y: 32, positioning: "Mobilier CHR de série bois massif, prix affichés (tables ~281-475 €).", url: "https://www.tradis-design.com/fr/meuble-restaurant" },
  { name: "Tigaone", tag: "Tigaone", cat: "serie", x: 12, y: 22, positioning: "Importateur discount, stock, livraison 10-15 j (chaises ~60-70 €).", url: "https://tigaone.fr/" },
  { name: "MOOD Design", tag: "MOOD", cat: "serie", x: 34, y: 68, positioning: "Mobilier design de série, vente & location, showroom Lyon.", url: "https://pro.mooddesign.eu/a+lyon+auvergne-rhone-alpes-y8" },
  { name: "Distrid'Or", tag: "Distrid'Or", cat: "serie", x: 40, y: 64, positioning: "Distributeur-agenceur de mobilier pro, région lyonnaise.", url: "https://distridor.com/references-inspiration-mobilier-professionnel/" },
];

/** Position de Mobilier Lacroix sur la carte. */
export const LACROIX_MARKER = { name: "Mobilier Lacroix", x: 75, y: 90 };

export const CAT_META: Record<Competitor["cat"], { label: string; color: string }> = {
  "sur-mesure": { label: "Fabricants sur-mesure (concurrents directs)", color: "#c0653e" },
  agenceur: { label: "Agenceurs / prescripteurs", color: "#c39a45" },
  luxe: { label: "Sur-mesure luxe (au-dessus)", color: "#6f4e37" },
  serie: { label: "Série / import (concurrence prix)", color: "#837567" },
};

/** Funnel reconstruit (volumes mensuels typiques). */
export const FUNNEL = [
  { stage: "Demandes entrantes", value: "15-20", note: "leads / mois", pct: 100 },
  { stage: "Qualifiées", value: "10-13", note: "besoin + budget", pct: 65 },
  { stage: "Visite atelier / devis", value: "7-9", note: "chiffrage", pct: 45 },
  { stage: "Négociation / relance", value: "5-7", note: "fuite : devis non relancés", pct: 32 },
  { stage: "Signés", value: "3-5", note: "≈ 25 % de conversion", pct: 22 },
];

/** Irritants priorisés (matrice impact / effort). x = effort (0-100), y = impact (0-100). */
export const IRRITANTS = [
  { n: 1, label: "Pas de CRM, infos éparpillées (Excel, mails, têtes)", impact: 88, effort: 30, major: true },
  { n: 2, label: "Devis envoyés jamais relancés (fuite directe de CA)", impact: 92, effort: 22, major: true },
  { n: 3, label: "Aucun pilotage chiffré (ni KPI, ni prévision)", impact: 70, effort: 35, major: true },
  { n: 4, label: "Prescripteurs (agenceurs) non suivis", impact: 60, effort: 40, major: false },
  { n: 5, label: "Devis Excel lents à produire", impact: 45, effort: 65, major: false },
];

/** Cas d'usage IA (ancrés dans le funnel). */
export const AI_USECASES = [
  { etape: "Piloter", titre: "Scoring des devis", irritant: "Devis chauds oubliés, priorisation à l'instinct.", cas: "L'IA note la probabilité de signature et fait remonter les devis à relancer.", indicateur: "Taux de relance des devis · taux de conversion" },
  { etape: "Conclure", titre: "Copilote de relance", irritant: "Relances chronophages, donc jamais faites.", cas: "Génère un email « dans le ton » de la marque, adapté à l'objection.", indicateur: "Délai de relance · nb de relances envoyées" },
  { etape: "Qualifier", titre: "Résumé d'échanges", irritant: "Historique dispersé, contexte perdu d'un échange à l'autre.", cas: "Synthétise appels/mails/visites en une fiche projet exploitable.", indicateur: "Temps de mise à jour des dossiers" },
];

/** KPIs cibles. */
export const KPIS = [
  { kpi: "Taux de conversion", actuel: "~25 %", cible: "30-35 %", note: "demandes → signés" },
  { kpi: "Relance des devis", actuel: "≈ 0 % (manuel)", cible: "100 %", note: "systématique via le CRM" },
  { kpi: "Délai de 1re relance", actuel: "jamais / tardif", cible: "< 72 h", note: "après envoi du devis" },
  { kpi: "Panier moyen", actuel: "5-15 k€", cible: "via hôtels/agenceurs", note: "montée en gamme" },
  { kpi: "Cycle de vente", actuel: "non mesuré", cible: "suivi", note: "demande → signature" },
];

/** ROI de l'IA. */
export const ROI = {
  hypotheses: [
    "Temps gagné ≈ 8 h / mois (relances + résumés + priorisation)",
    "Coût horaire chargé ≈ 35 €/h",
    "Coût de l'outil IA = 0 € (free tier Mistral / Groq)",
  ],
  gainMensuel: "≈ 280 €/mois de temps libéré",
  gainConversion: "+1 devis signé récupéré (devis non relancé) ≈ 10 000 €",
  conclusion: "Coût outil nul + un seul devis « sauvé » par la relance = ROI immédiat.",
};

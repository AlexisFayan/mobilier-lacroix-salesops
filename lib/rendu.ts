/**
 * Contenu structuré du dossier (onglet Rendu).
 * Chaque chiffre sensible référence une source de SOURCES (citation vérifiable).
 */

export type Source = { id: string; org: string; title: string; url: string };

/** Sources numérotées (l'ordre = le numéro affiché). */
export const SOURCES: Source[] = [
  { id: "ameublement-contract", org: "L'Ameublement français / CODIFAB × MKG Consulting", title: "Étude marché Contract & Agencement du mobilier (675 M€, 28/01/2026)", url: "https://www.ameublement.com/marches/contract-agencement" },
  { id: "courrier-meuble", org: "Le Courrier du Meuble", title: "Le marché du contract, levier structurant (budgets 2 700-40 000 €/chambre)", url: "https://www.courrierdumeuble.fr/blog/etude-ameublement-francais-codifab-x-mkg-consulting-le-marche-du-contract-levier-structurant-pour-la-filiere-du-meuble-en-france" },
  { id: "ipea-meuble", org: "IPEA / L'Ameublement français", title: "Filière Meuble 2025, marché du meuble 13,6 Md€ (−1,8 %)", url: "https://www.ameublement.com/uploads/attachments/confrence-ameublement-26---dossier-de-presse-v30012026.pdf" },
  { id: "umih-hcr", org: "UMIH / AKTO / DARES", title: "Monographie HCR 2024, 122 000 établissements HCR ; AURA 16 679", url: "https://www.umih.fr/assets/files/site/ressources/observatoires-et-etudes/2024_AnalyseBranche_HCR_akkto.pdf" },
  { id: "insee-561", org: "INSEE", title: "Fiche secteur 561, Restauration (171 356 entreprises, 2021)", url: "https://www.insee.fr/fr/statistiques/7763790" },
  { id: "insee-hotels-2024", org: "INSEE", title: "Tourisme 2024, 16 722 hôtels au 01/01/2024 ; 656 965 chambres", url: "https://www.insee.fr/fr/statistiques/7767766" },
  { id: "insee-aura-creations", org: "INSEE", title: "Bilan économique 2024 AURA, créations commerce-hébergement-restauration +15,7 %", url: "https://www.insee.fr/fr/statistiques/8354533?sommaire=8354850" },
  { id: "aura-hotel", org: "Auvergne-Rhône-Alpes Tourisme", title: "Mémento du tourisme, 2 471 hôtels AURA ; 384 hôtels 4-5*", url: "https://pro.auvergnerhonealpes-tourisme.com/memento/hotellerie/" },
  { id: "onlylyon-resto", org: "ONLYLYON Business / Métropole de Lyon", title: "Chiffres clés de la Métropole de Lyon 2024 (~5 280 restaurants)", url: "https://business.onlylyon.com/fileadmin/user_upload/documents/20240423-mdl-chiffres-cles-metropole-de-lyon-2024-plaquette-fr.pdf" },
  { id: "onlylyon-tourisme", org: "ONLYLYON Tourisme & Congrès", title: "Tourisme à Lyon, ~212 hôtels, 2e parc français, ~66 % affaires", url: "https://www.onlylyon.com/secteur-tourisme" },
  { id: "coach-omnium", org: "Coach Omnium", title: "Panorama de l'hôtellerie, 28 % du parc en 4-5* (vs ~10 % en 2010)", url: "https://coachomnium.com/bonus/89-panorama-de-lhotellerie-en-france/" },
  { id: "altares-umih", org: "Altares / UMIH", title: "Défaillances T2 2025, restauration traditionnelle +21 %", url: "https://www.umih.fr/medias/news/16-600-defaillances-dentreprises-au-2e-trimestre-2025-la-restauration-traditionnelle-en-premiere-ligne.html" },
  { id: "fevad-circulaire", org: "FEVAD", title: "Ameublement & modèles circulaires 2025 (~1 meuble sur 4 d'occasion)", url: "https://www.fevad.com/special-ameublement-et-modeles-circulaires-2025/" },
  { id: "archidvisor", org: "Archidvisor", title: "Agencement de restaurant, 750 à 2 250 €/m²", url: "https://www.archidvisor.com/guides/agencement-restaurant" },
  { id: "mistral-privacy", org: "Mistral AI", title: "Confidentialité de l'API La Plateforme (no-training par défaut)", url: "https://docs.mistral.ai/" },
  { id: "groq-limits", org: "Groq", title: "Limites du free tier (quotas publics)", url: "https://console.groq.com/docs/rate-limits" },
];

export function srcIndex(id: string): number {
  return SOURCES.findIndex((s) => s.id === id) + 1;
}

/** TAM / SAM / SOM */
export const SIZING = {
  tam: {
    value: "≈ 675 M€",
    unit: "/ an",
    label: "TAM",
    title: "Marché total",
    definition: "Marché « contract » du mobilier + agencement CHR & commerce en France (tous fournisseurs : sur-mesure, série, import).",
    calc: "Chiffre de filière direct. Dont ≈ 420 M€ hôtellerie + ≈ 250 M€ restauration.",
    kind: "Chiffre dur",
    sources: ["ameublement-contract", "courrier-meuble"],
  },
  sam: {
    value: "≈ 34 M€",
    unit: "/ an",
    label: "SAM",
    title: "Marché accessible",
    definition: "Mobilier CHR sur-mesure « milieu/haut de gamme accessible » en Auvergne-Rhône-Alpes (hors série bas de gamme et hors luxe pur).",
    calc: "675 M€ × 14 % (part AURA) × ~35 % (part sur-mesure accessible) ≈ 33-34 M€. Fourchette 28-40 M€ selon l'hypothèse sur-mesure (25 %→23 M€, 40 %→37 M€).",
    kind: "Estimation d'expert",
    sources: ["umih-hcr", "ameublement-contract"],
  },
  som: {
    value: "≈ 0,55 M€",
    unit: "/ an",
    label: "SOM",
    title: "Cible 12-24 mois",
    definition: "CA réaliste atteignable, borné par la capacité de l'atelier (15 pers.) et un budget com très limité (~250 €/mois).",
    calc: "3-5 projets/mois × 10 k€ ≈ 360-600 k€/an. Levier : +10 à +25 % de conversion via le CRM (relance des devis aujourd'hui oubliés). Fourchette 0,45-0,60 M€.",
    kind: "Estimation d'expert",
    sources: [],
  },
} as const;

/** Concurrents cartographiés. axis: positionnement prix (1=série/prix … 4=luxe), sur-mesure (true/false), local (true/false). */
export type Competitor = {
  name: string;
  cat: "sur-mesure" | "agenceur" | "luxe" | "serie";
  local: boolean;
  positioning: string;
  url: string;
};

export const COMPETITORS: Competitor[] = [
  { name: "City Mobilier", cat: "sur-mesure", local: true, positioning: "100 % sur-mesure CHR, showroom Lyon, concurrent frontal le plus proche.", url: "https://citymobilier.com/fr" },
  { name: "Mobikent Design", cat: "sur-mesure", local: true, positioning: "Sur-mesure + agencement, « fabricant de référence » Lyon, SEO agressif.", url: "https://www.mobikent.com/lyon+69+rhone-y1" },
  { name: "Gouskant", cat: "sur-mesure", local: true, positioning: "Petit atelier bois sur-mesure resto, bois local, délais 4-8 sem.", url: "https://gouskant.fr/agencement-restaurant/" },
  { name: "Atelier Media", cat: "sur-mesure", local: true, positioning: "Sous-traitance B2B pour architectes/agenceurs, seul à assumer la marque blanche.", url: "https://ateliermedia-lyon.fr/" },
  { name: "Acces-Sit", cat: "sur-mesure", local: false, positioning: "Spécialiste banquette sur-mesure (+5000/an) + série, national.", url: "https://www.acces-sit.com/" },
  { name: "Conforel", cat: "agenceur", local: true, positioning: "Agenceur-fabricant clés en main, bureau d'études, grands comptes/chaînes.", url: "https://www.conforel-mobilier.com/lyon/" },
  { name: "BUROC", cat: "agenceur", local: true, positioning: "Groupe d'agencement (origine bureau) fabriquant pour le CHR, Lyon.", url: "https://www.buroc.fr/" },
  { name: "Architéa Lyon", cat: "agenceur", local: true, positioning: "Architecture d'intérieur CHR non-fabricante, concurrent ET prescripteur.", url: "https://www.architea.fr/architea-lyon/agencement-restaurant-lyon/" },
  { name: "Servizial", cat: "luxe", local: true, positioning: "Mobilier hôtelier/resto luxe & technique, cible palaces. Au-dessus du segment.", url: "https://servizial.com/" },
  { name: "Ateliers Montespan", cat: "luxe", local: false, positioning: "Ébénisterie haut de gamme sur-mesure depuis 1978, France & Suisse.", url: "https://www.ateliersmontespan.fr/" },
  { name: "Tradis Design", cat: "serie", local: false, positioning: "Mobilier CHR de série bois massif, prix affichés (tables ~281-475 €).", url: "https://www.tradis-design.com/fr/meuble-restaurant" },
  { name: "Tigaone", cat: "serie", local: false, positioning: "Importateur discount, stock, livraison 10-15 j (chaises ~60-70 €).", url: "https://tigaone.fr/" },
  { name: "MOOD Design", cat: "serie", local: true, positioning: "Mobilier design de série, vente & location, showroom Lyon.", url: "https://pro.mooddesign.eu/a+lyon+auvergne-rhone-alpes-y8" },
  { name: "Distrid'Or", cat: "serie", local: true, positioning: "Distributeur-agenceur mobilier pro, région lyonnaise.", url: "https://distridor.com/references-inspiration-mobilier-professionnel/" },
];

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
  { icon: "", etape: "Piloter", titre: "Scoring des devis", irritant: "Devis chauds oubliés, priorisation à l'instinct.", cas: "L'IA note la probabilité de signature et fait remonter les devis à relancer.", indicateur: "Taux de relance des devis · taux de conversion" },
  { icon: "", etape: "Conclure", titre: "Copilote de relance", irritant: "Relances chronophages, donc jamais faites.", cas: "Génère un email « dans le ton » de la marque, adapté à l'objection.", indicateur: "Délai de relance · nb de relances envoyées" },
  { icon: "", etape: "Qualifier", titre: "Résumé d'échanges", irritant: "Historique dispersé, contexte perdu d'un échange à l'autre.", cas: "Synthétise appels/mails/visites en une fiche projet exploitable.", indicateur: "Temps de mise à jour des dossiers" },
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

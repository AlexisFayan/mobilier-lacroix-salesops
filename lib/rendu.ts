/**
 * Contenu structuré du dossier (onglet Rendu).
 * Chaque chiffre sensible référence une source de SOURCES (citation vérifiable).
 */

export type Source = { id: string; org: string; title: string; url: string; theme: string; date: string };

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
  { id: "ameublement-contract", theme: "Marché & filière du mobilier", org: "L'Ameublement français / CODIFAB × MKG", title: "Étude marché Contract & Agencement CHR & commerce (≈ 670-675 M€, janvier 2026)", url: "https://www.ameublement.com/marches/contract-agencement", date: "janv. 2026" },
  { id: "courrier-meuble", theme: "Marché & filière du mobilier", org: "Le Courrier du Meuble", title: "Le contract, levier structurant (2 700-40 000 €/chambre)", url: "https://www.courrierdumeuble.fr/blog/etude-ameublement-francais-codifab-x-mkg-consulting-le-marche-du-contract-levier-structurant-pour-la-filiere-du-meuble-en-france", date: "2026" },
  { id: "ipea-meuble", theme: "Marché & filière du mobilier", org: "IPEA / L'Ameublement français", title: "Filière Meuble 2025, marché du meuble 13,6 Md€", url: "https://www.ameublement.com/uploads/attachments/confrence-ameublement-26---dossier-de-presse-v30012026.pdf", date: "févr. 2026" },
  { id: "archidvisor", theme: "Marché & filière du mobilier", org: "Archidvisor", title: "Agencement de restaurant (rénovation 500-1 500 €/m², neuf 2 000-3 500 €/m²)", url: "https://www.archidvisor.com/guides/agencement-restaurant", date: "2025" },
  { id: "umih-hcr", theme: "Marché CHR & restauration", org: "UMIH / AKTO / DARES", title: "Monographie HCR 2024, 122 000 ét. ; AURA 16 679", url: "https://www.umih.fr/assets/files/site/ressources/observatoires-et-etudes/2024_AnalyseBranche_HCR_akkto.pdf", date: "2024" },
  { id: "insee-561", theme: "Marché CHR & restauration", org: "INSEE", title: "Fiche secteur 561, Restauration (171 356 entreprises)", url: "https://www.insee.fr/fr/statistiques/7763790", date: "2021" },
  { id: "altares-umih", theme: "Marché CHR & restauration", org: "Altares / UMIH", title: "Défaillances T2 2025, restauration trad. +21 %", url: "https://www.umih.fr/medias/news/16-600-defaillances-dentreprises-au-2e-trimestre-2025-la-restauration-traditionnelle-en-premiere-ligne.html", date: "2025" },
  { id: "insee-hotels-2024", theme: "Hôtellerie & tourisme", org: "INSEE", title: "Parc hôtelier 2024 : 15 155 hôtels ; 617 000 chambres", url: "https://www.insee.fr/fr/statistiques/2015412", date: "2024" },
  { id: "aura-hotel", theme: "Hôtellerie & tourisme", org: "Auvergne-Rhône-Alpes Tourisme", title: "Mémento, 2 471 hôtels AURA ; 384 hôtels 4-5*", url: "https://pro.auvergnerhonealpes-tourisme.com/memento/hotellerie/", date: "2025" },
  { id: "coach-omnium", theme: "Hôtellerie & tourisme", org: "Coach Omnium", title: "Panorama hôtellerie : 19 % de l'offre classée haut de gamme/luxe (vs 5 % en 2010)", url: "https://coachomnium.com/bonus/89-panorama-de-lhotellerie-en-france/", date: "2025" },
  { id: "insee-aura-creations", theme: "Région AURA & Lyon", org: "INSEE", title: "Bilan 2024 AURA, créations d'entreprises du tertiaire marchand (commerce-transport-hébergement-restauration) +15,7 %", url: "https://www.insee.fr/fr/statistiques/8354533?sommaire=8354850", date: "2024" },
  { id: "onlylyon-resto", theme: "Région AURA & Lyon", org: "ONLYLYON / Métropole de Lyon", title: "Chiffres clés Métropole de Lyon (≈ 5 280 restaurants, INSEE-REE 2021)", url: "https://business.onlylyon.com/fileadmin/user_upload/documents/20240423-mdl-chiffres-cles-metropole-de-lyon-2024-plaquette-fr.pdf", date: "2021" },
  { id: "onlylyon-tourisme", theme: "Région AURA & Lyon", org: "ONLYLYON Tourisme & Congrès", title: "Tourisme à Lyon, 2e parc hôtelier français (18 929 chambres)", url: "https://www.onlylyon.com/secteur-tourisme", date: "2022" },
  { id: "fevad-circulaire", theme: "Tendances & conjoncture", org: "FEVAD", title: "Ameublement & seconde main 2025 (essor de l'occasion)", url: "https://www.fevad.com/special-ameublement-et-modeles-circulaires-2025/", date: "2025" },
  { id: "mistral-privacy", theme: "Outils IA", org: "Mistral AI", title: "Confidentialité de l'API La Plateforme (pas d'entraînement sur les données par défaut)", url: "https://docs.mistral.ai/admin/security-access/privacy", date: "2026" },
  { id: "groq-limits", theme: "Outils IA", org: "Groq", title: "Limites de l'offre gratuite (quotas publics)", url: "https://console.groq.com/docs/rate-limits", date: "2026" },
  { id: "pappers-city", theme: "Marché & filière du mobilier", org: "Pappers / Societe.com", title: "CM City Mobilier (820831402), Oullins : effectif < 10, comptes confidentiels (2021)", url: "https://www.pappers.fr/entreprise/cm-city-mobilier-820831402", date: "2021" },
  { id: "google-trends", theme: "Tendances & conjoncture", org: "Google Trends", title: "Intérêt de recherche « mobilier restaurant » (France), demande et saisonnalité", url: "https://trends.google.fr/trends/explore?geo=FR&q=mobilier%20restaurant", date: "2026" },
  { id: "similarweb", theme: "Tendances & conjoncture", org: "Similarweb", title: "Empreinte numérique des concurrents (méthode de veille)", url: "https://www.similarweb.com/", date: "2026" },
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
    calc: "≈ 670-675 M€ (CHR & commerce, base prudente) × 14 % (part AURA, 16 679/122 000 ét.) × ~35 % (sur-mesure accessible, hypothèse d'expert) ≈ 34 M€. Fourchette 28-40 M€.",
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
  { stage: "Demandes entrantes", value: "15-20", note: "demandes / mois", pct: 100 },
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
  {
    etape: "Piloter",
    titre: "Scoring des devis",
    irritant: "Devis chauds oubliés, priorisation à l'instinct.",
    cas: "L'IA note la probabilité de signature et fait remonter les devis à relancer.",
    workflow: "Étape, canal, panier et historique du dossier → modèle → note 0-100 + facteurs explicités.",
    donnees: "Étape du funnel, canal, montant, ancienneté, derniers échanges.",
    outil: "Mistral (UE) → repli Groq → simulé.",
    indicateur: "Taux de relance des devis · taux de conversion",
  },
  {
    etape: "Conclure",
    titre: "Copilote de relance",
    irritant: "Relances chronophages, donc jamais faites.",
    cas: "Génère un courriel « dans le ton » de la marque, adapté à l'objection.",
    workflow: "Contexte projet + objection détectée → prompt voix Créateur → objet et corps éditables.",
    donnees: "Dernier échange, objection, nom du contact, descriptif du projet.",
    outil: "Mistral (UE) → repli Groq → simulé.",
    indicateur: "Délai de relance · nb de relances envoyées",
  },
  {
    etape: "Qualifier",
    titre: "Résumé d'échanges",
    irritant: "Historique dispersé, contexte perdu d'un échange à l'autre.",
    cas: "Synthétise appels, courriels et visites en une fiche projet exploitable.",
    workflow: "Historique horodaté complet → synthèse structurée (points, signaux budget, prochaine étape).",
    donnees: "L'ensemble des échanges horodatés du dossier.",
    outil: "Mistral (UE) → repli Groq → simulé.",
    indicateur: "Temps de mise à jour des dossiers",
  },
];

/**
 * Équilibre marketing (attirer & capter) ↔ commercial (qualifier & convertir),
 * l'IA faisant le pont. Le plan ne couvre pas que le bas du tunnel.
 */
export const PLAN_BALANCE = {
  marketing: {
    titre: "Marketing · attirer & capter",
    items: ["Carnet de réalisations", "Guide expert (SEO local)", "Estimateur de budget", "Instagram & bouche-à-oreille", "Programme prescripteurs"],
  },
  ia: {
    titre: "IA · faire le pont",
    items: ["Tri des demandes entrantes", "Scoring de la probabilité de signature"],
  },
  commercial: {
    titre: "Commercial · convertir & fidéliser",
    items: ["Qualification & visite d'atelier", "Relance sous 72 h", "Signature & acompte", "Réfection / clients existants"],
  },
};

/** Aimants à prospects (lead magnets), à bas coût, cohérents avec la marque. */
export const LEAD_MAGNETS: { titre: string; aimant: string; cible: string; canal: string; kpi: string; href?: string }[] = [
  { titre: "Carnet de réalisations", aimant: "Le catalogue des projets en PDF, à recevoir contre un courriel.", cible: "Restaurateurs & hôteliers en projet", canal: "Site, Instagram", kpi: "Courriels captés / mois" },
  { titre: "Guide de l'aménagement CHR", aimant: "Matières, budget, délais : l'expertise qui rassure avant d'acheter.", cible: "Création ou rénovation", canal: "Site, SEO local", kpi: "Téléchargements → RDV" },
  { titre: "Estimateur de budget", aimant: "Une fourchette de prix indicative en deux minutes, en ligne.", cible: "Demandes tièdes à qualifier", canal: "Site", kpi: "Estimations → devis", href: "/estimateur" },
  { titre: "Visite d'atelier", aimant: "Voir et toucher la matière : l'expérience qui fait signer.", cible: "Prospects chauds", canal: "Direct, recommandation", kpi: "Visites → signatures" },
  { titre: "Programme prescripteurs", aimant: "Marque blanche et commission pour agenceurs & architectes.", cible: "Agenceurs / architectes", canal: "Partenariats", kpi: "Projets apportés / partenaire" },
];

/** Moteur d'acquisition par le contenu (inbound) : capter sans publicité payante. */
export const CONTENU = {
  intro:
    "Le haut du tunnel se re-remplit par le contenu, pas par la publicité : des articles utiles bien référencés en local (SEO) et une présence Instagram qui prouve le savoir-faire. Le contenu attire, l'aimant capte le courriel, le CRM qualifie et relance.",
  flow: ["Contenu · blog & SEO local", "Aimant · guide, estimateur", "Demande qualifiée", "CRM · scoring & relance"],
  /** Idées d'articles calées sur ce que cherchent vraiment les restaurateurs et hôteliers. */
  articles: [
    { titre: "Combien coûte l'agencement sur-mesure d'un restaurant ?", intent: "Recherche « prix mobilier restaurant Lyon »", aimant: "Estimateur de budget" },
    { titre: "Banquette de restaurant : velours, simili ou cuir ?", intent: "Le client compare les matières avant d'acheter", aimant: "Carnet de réalisations" },
    { titre: "Rénover sa salle sans fermer : la méthode en 5 étapes", intent: "Peur du chantier et de la perte d'exploitation", aimant: "Guide de l'aménagement CHR" },
    { titre: "Chêne, noyer, frêne : quelle essence pour votre établissement ?", intent: "Cherche l'expertise qui rassure avant de signer", aimant: "Visite d'atelier" },
  ],
  cadence: [
    { l: "Rythme", v: "1 article SEO / mois + 2-3 posts Instagram / semaine" },
    { l: "Coût", v: "Organique, dans le budget ~250 €/mois (aucune pub payante)" },
    { l: "Qui", v: "Gérant + commercial, environ 2 h / semaine" },
    { l: "Mesure", v: "Trafic → courriels captés → rendez-vous" },
  ],
};

/** Exemple de publication Instagram (maquette), pour illustrer le volet « preuve par l'image ». */
export const INSTA_POST = {
  handle: "mobilier.lacroix",
  lieu: "Lyon · Atelier de mobilier sur-mesure",
  image: "/images/artisan.jpg",
  alt: "Les mains d'un artisan rabotant une pièce de bois, copeaux sur l'établi",
  credit: "Photo · Edward Morgan, CC BY-SA",
  legende:
    "Dans l'atelier : les mains qui façonnent une pièce pour la Brasserie des Brotteaux. Chêne massif raboté à la main, ajusté au dixième, pensé pour durer dix ans et pas trois. Offrir à chaque lieu de rencontre un morceau d'histoire française, c'est tout notre métier.\n\nUn projet en tête ? Estimez votre budget en deux minutes, le lien est dans la bio.",
  hashtags: ["#MobilierSurMesure", "#SavoirFaireFrançais", "#ArtisanatLyonnais", "#TravailDuBois", "#CHR", "#Atelier"],
  jaime: 247,
};

/** Stack outils retenu (gratuit, FR/UE, RGPD), benchmark surfacé sur la page notée. */
export const STACK = [
  { poste: "CRM & pipeline", choix: "Le prototype (sinon HubSpot Free / Brevo FR)", pourquoi: "gratuit, simple, hébergé UE", limite: "HubSpot Free plafonne vite ; le prototype reste sur-mesure" },
  { poste: "Automatisation", choix: "n8n (sinon Make)", pourquoi: "rappels de relance automatiques", limite: "n8n auto-hébergé UE, préféré à Make/Zapier (US)" },
  { poste: "Tableau de bord", choix: "Looker Studio", pourquoi: "gratuit, KPI en direct", limite: "connecteurs limités, prise en main" },
  { poste: "IA", choix: "Mistral (FR/UE) → Groq → simulé", pourquoi: "RGPD natif, pas d'entraînement, repli", limite: "quotas gratuits limités, d'où le repli automatique" },
];

/** KPIs cibles. */
export const KPIS = [
  { kpi: "Demandes entrantes", actuel: "15-20 / mois", cible: "+ via aimants", note: "carnet, guide, estimateur" },
  { kpi: "Taux de conversion", actuel: "~25 %", cible: "30-35 %", note: "demandes → signés" },
  { kpi: "Relance des devis", actuel: "≈ 0 % (manuel)", cible: "100 %", note: "systématique via le CRM" },
  { kpi: "Délai de 1re relance", actuel: "jamais / tardif", cible: "< 72 h", note: "après envoi du devis" },
  { kpi: "Panier moyen", actuel: "5-15 k€", cible: "via hôtels/agenceurs", note: "montée en gamme" },
  { kpi: "CAC", actuel: "≈ 60-80 €/projet", cible: "stable", note: "budget com ÷ projets signés" },
  { kpi: "Cycle de vente", actuel: "non mesuré", cible: "suivi", note: "demande → signature" },
];

/** ROI de l'IA. */
export const ROI = {
  hypotheses: [
    "Hypothèse : ≈ 8 h/mois gagnées (≈ 3 relances/sem × 10 min + 5 résumés d'échanges + priorisation)",
    "Hypothèse : coût horaire chargé ≈ 35 €/h (atelier 15 pers.)",
    "Coût de l'outil IA = 0 € (offre gratuite Mistral / Groq)",
  ],
  gainMensuel: "≈ 280 €/mois de temps libéré",
  gainConversion: "+1 devis signé récupéré (devis non relancé) ≈ 10 000 €",
  conclusion: "Coût outil nul + un seul devis « sauvé » par la relance = ROI immédiat.",
};

/** Carte d'identité de l'entreprise (livrable 1, cadre B2B). */
export const FICHE = {
  nom: "Mobilier Lacroix",
  activite:
    "Fabrication artisanale de mobilier sur mesure pour le CHR (cafés, restaurants, hôtels), basée en région lyonnaise.",
  faits: [
    { k: "Équipe", v: "15 personnes" },
    { k: "Zone", v: "Lyon / AURA" },
    { k: "Modèle", v: "Ponctuel (projet × panier)" },
    { k: "Demandes", v: "15-20 / mois" },
    { k: "Signés", v: "3-5 / mois" },
    { k: "Panier", v: "5 000 - 15 000 €" },
    { k: "Budget com.", v: "≈ 250 €/mois" },
    { k: "Outils", v: "Devis Excel, SketchUp, téléphone (pas de CRM)" },
  ],
};

/** Schéma d'automatisation (n8n) qui industrialise la relance des devis. */
export const AUTOMATION: {
  outil: string;
  pourquoi: string;
  garde: string;
  etapes: { n: string; role: string; t: string; d: string; garde?: boolean }[];
} = {
  outil: "n8n (libre, auto-hébergeable en UE)",
  pourquoi:
    "Industrialiser la relance des devis (la fuite n°1) pour qu'aucun ne soit oublié. Étape d'après le prototype.",
  garde: "L'IA propose, l'humain valide : aucune relance ne part sans la relecture du commercial.",
  etapes: [
    { n: "1", role: "CRM", t: "Déclencheur", d: "Un devis passe au statut « envoyé » dans le pipeline." },
    { n: "2", role: "n8n", t: "Attente 72 h", d: "Sans réponse ni nouvelle activité sous 72 h." },
    { n: "3", role: "IA", t: "Scoring", d: "Mistral (UE) note la probabilité de signature et priorise." },
    { n: "4", role: "IA", t: "Brouillon", d: "Mistral rédige le courriel « dans le ton » de la marque." },
    { n: "5", role: "Humain", t: "Validation", d: "Une tâche est créée pour le commercial : il relit et envoie.", garde: true },
    { n: "6", role: "Looker", t: "Suivi KPI", d: "L'événement alimente le tableau de bord (taux et délai de relance)." },
  ],
};

/** Benchmark des fournisseurs d'IA (justifie le choix de Mistral). Détail dans docs/benchmark-ia.md. */
export const BENCHMARK_IA = [
  { f: "Mistral AI", gratuit: "Oui (sans CB)", zone: "FR / UE", training: "Non", note: "5/5", retenu: "Principal" },
  { f: "Groq · Llama 3.3", gratuit: "Oui (sans CB)", zone: "US", training: "Non", note: "4,5/5", retenu: "Repli" },
  { f: "Google Gemini", gratuit: "Oui", zone: "US", training: "Oui (offre gratuite)", note: "4/5", retenu: "Écarté" },
  { f: "Cohere", gratuit: "Essai", zone: "US", training: "Oui (opt-out)", note: "3/5", retenu: "Écarté" },
  { f: "OpenRouter (:free)", gratuit: "Oui", zone: "US", training: "Souvent oui", note: "3/5", retenu: "Écarté" },
];

/** Personas qui incarnent l'ICP. */
export const PERSONAS = [
  { nom: "Claire, 38 ans", role: "Restauratrice indépendante, Lyon 6e", budget: "≈ 12 k€", trait: "Rénove son bistrot et veut des banquettes uniques qui durent. Décide sur la matière et le sur-mesure, pas sur le prix le plus bas." },
  { nom: "Marc, 45 ans", role: "Architecte d'intérieur CHR (prescripteur)", budget: "2 à 3 projets / an", trait: "Cherche un atelier fiable pour fabriquer ses plans en marque blanche. Veut des délais tenus et une exécution soignée." },
];

/** Limites assumées (transparence = posture conseil senior). */
export const INCERTITUDES = [
  "La part « sur-mesure accessible » (~35 %) est une estimation d'expert non publiée : SAM et SOM sont donnés en fourchettes.",
  "Périmètres de comptage distincts : établissements employeurs (122 000 HCR) et unités légales INSEE (~171 000 restaurants) ne s'additionnent pas.",
  "Le cycle de rénovation CHR (5 à 10 ans) est une référence sectorielle, pas une statistique officielle.",
  "Le nombre de restaurants à Lyon (≈ 5 280, INSEE 2021) provient d'une plaquette en cours de réactualisation : nous le retenons comme ordre de grandeur.",
];

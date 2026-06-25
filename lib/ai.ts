import type { Project } from "./types";
import { CHANNEL_META, STAGE_LABEL, DEVIS_RELANCE_DAYS, euro } from "./types";

/**
 * Couche IA hybride.
 *  - Si une clé API gratuite est configurée, on fait de VRAIS appels → "vraie IA".
 *    Bascule automatique : Mistral (FR/UE, RGPD) → Groq (repli rapide) → Gemini.
 *  - Si tout échoue ou rien n'est configuré : repli simulé déterministe et réaliste
 *    → la démo marche toujours, même hors-ligne. (badge honnête "démonstration").
 */

export type AiSource = { engine: string; real: boolean };
const SIMULATED: AiSource = { engine: "Moteur de démonstration", real: false };

type Provider = "mistral" | "groq" | "gemini";
const LABEL: Record<Provider, string> = {
  mistral: "Mistral AI (FR · UE)",
  groq: "Groq · Llama 3.3",
  gemini: "Google Gemini",
};

// Ordre de bascule recommandé : Mistral d'abord (RGPD/FR), Groq en repli.
function configuredProviders(): Provider[] {
  const list: Provider[] = [];
  if (process.env.MISTRAL_API_KEY) list.push("mistral");
  if (process.env.GROQ_API_KEY) list.push("groq");
  if (process.env.GOOGLE_API_KEY) list.push("gemini");
  return list;
}

/** Moteur affiché par défaut (avant un appel), le premier configuré, sinon démo. */
export function defaultEngine(): AiSource {
  const p = configuredProviders()[0];
  return p ? { engine: LABEL[p], real: true } : SIMULATED;
}

async function callOne(p: Provider, system: string, user: string): Promise<string | null> {
  try {
    if (p === "mistral") {
      const r = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
        },
        body: JSON.stringify({
          model: process.env.MISTRAL_MODEL || "mistral-large-latest",
          temperature: 0.5,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
      });
      if (!r.ok) return null;
      const j = await r.json();
      return j?.choices?.[0]?.message?.content ?? null;
    }
    if (p === "groq") {
      const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
          temperature: 0.5,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
      });
      if (!r.ok) return null;
      const j = await r.json();
      return j?.choices?.[0]?.message?.content ?? null;
    }
    // gemini
    const model = process.env.GOOGLE_MODEL || "gemini-2.0-flash";
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [{ parts: [{ text: user }] }],
          generationConfig: { temperature: 0.5 },
        }),
      }
    );
    if (!r.ok) return null;
    const j = await r.json();
    return j?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
  } catch {
    return null;
  }
}

/** Essaie chaque fournisseur configuré dans l'ordre ; renvoie le texte + le moteur réel utilisé. */
async function callLLM(system: string, user: string): Promise<{ text: string; engine: string } | null> {
  for (const p of configuredProviders()) {
    const text = await callOne(p, system, user);
    if (text && text.trim()) return { text, engine: LABEL[p] };
  }
  return null;
}

function extractJSON(text: string): any | null {
  try {
    return JSON.parse(text);
  } catch {
    const m = text.match(/\{[\s\S]*\}/);
    if (m) {
      try {
        return JSON.parse(m[0]);
      } catch {
        return null;
      }
    }
    return null;
  }
}

// Voix de marque (archétype Créateur) injectée dans tous les prompts.
const BRAND_VOICE = `Tu écris pour Mobilier Lacroix, atelier français de mobilier sur mesure pour cafés, restaurants et hôtels, basé à Lyon (archétypes : le Créateur en principal, l'Amant en secondaire, famille de l'appartenance). Raison d'être : offrir à chaque lieu de rencontre un morceau d'histoire française. Ton : chaleureux, raffiné, fier du savoir-faire français, jamais agressif commercialement. On valorise la matière (chêne, noyer, frêne, velours), le raffinement, l'émotion et l'accompagnement, pour que chacun se sente chez soi. Vouvoiement professionnel et cordial, pas d'anglicismes.`;

function projectContext(p: Project): string {
  const hist = p.exchanges
    .map((e) => `- (il y a ${e.daysAgo} j, ${e.type}, ${e.author}) ${e.content}`)
    .join("\n");
  return `Client : ${p.client} (${p.type}, ${p.city})
Contact : ${p.contactName}, ${p.contactRole}
Canal d'acquisition : ${CHANNEL_META[p.channel].label}
Projet : ${p.description}
Montant estimé : ${euro(p.estValue)}
Étape du funnel : ${STAGE_LABEL[p.stage]}
Devis envoyé : ${p.devisSent ? "oui" : "non"}
Dernière activité : il y a ${p.lastActivityDaysAgo} j
Historique des échanges :
${hist}`;
}

// ───────────────────────── 1. Scoring des devis ─────────────────────────

export type Factor = { label: string; impact: "+" | "-" | "=" };
export type ScoreResult = {
  score: number;
  level: "chaud" | "tiède" | "froid";
  factors: Factor[];
  reco: string;
  source: AiSource;
};

function levelOf(score: number): ScoreResult["level"] {
  if (score >= 70) return "chaud";
  if (score >= 40) return "tiède";
  return "froid";
}

function simulateScore(p: Project): ScoreResult {
  const factors: Factor[] = [];
  let s = 30;

  const stageBase: Record<string, number> = {
    nouveau: 5,
    qualifie: 25,
    visite: 38,
    devis: 40,
    negociation: 48,
    signe: 70,
    perdu: -40,
  };
  s += stageBase[p.stage] ?? 0;
  factors.push({
    label: `Étape « ${STAGE_LABEL[p.stage]} » dans le funnel`,
    impact: p.stage === "perdu" ? "-" : "+",
  });

  if (["agenceur", "recommandation", "bouche-a-oreille"].includes(p.channel)) {
    s += 12;
    factors.push({ label: `Canal qualifiant : ${CHANNEL_META[p.channel].label}`, impact: "+" });
  } else if (p.channel === "instagram") {
    s -= 6;
    factors.push({ label: "Canal Instagram : intention souvent moins mûre", impact: "-" });
  } else {
    factors.push({ label: `Canal : ${CHANNEL_META[p.channel].label}`, impact: "=" });
  }

  if (p.estValue >= 9000) {
    s += 6;
    factors.push({ label: `Panier élevé (${euro(p.estValue)}) cohérent avec le sur-mesure`, impact: "+" });
  } else if (p.estValue < 6000) {
    s -= 5;
    factors.push({ label: `Panier serré (${euro(p.estValue)}) : sensibilité prix probable`, impact: "-" });
  }

  const last = p.exchanges[p.exchanges.length - 1];
  if (last && last.author !== "Atelier" && last.daysAgo <= 7) {
    s += 10;
    factors.push({ label: "Le client a écrit récemment (signal d'intérêt fort)", impact: "+" });
  }

  if (p.devisSent && p.stage === "devis" && p.lastActivityDaysAgo >= DEVIS_RELANCE_DAYS) {
    s -= 12;
    factors.push({ label: `Devis sans relance depuis ${p.lastActivityDaysAgo} j (fuite à colmater)`, impact: "-" });
  }

  if (p.lastActivityDaysAgo >= 14 && p.stage !== "perdu" && p.stage !== "signe") {
    s -= 8;
    factors.push({ label: `Dossier dormant (${p.lastActivityDaysAgo} j sans contact)`, impact: "-" });
  }

  // 100 est réservé aux affaires signées : un dossier non résolu plafonne à 95.
  if (p.stage === "signe") s = 100;
  else if (p.stage === "perdu") s = 0;
  else s = Math.max(0, Math.min(95, Math.round(s)));

  let reco: string;
  if (p.stage === "signe") reco = "Affaire gagnée, capitaliser : demander un avis et activer le bouche-à-oreille.";
  else if (p.stage === "perdu") reco = "Affaire perdue, analyser la cause (relance manquée ? prix ?) pour ne pas reproduire la fuite.";
  else if (p.devisSent && p.lastActivityDaysAgo >= DEVIS_RELANCE_DAYS) reco = "Priorité haute : relancer aujourd'hui, le devis refroidit.";
  else if (s >= 70) reco = "Lead chaud : sécuriser la prochaine étape sans attendre.";
  else if (s >= 40) reco = "À nourrir : un contact bien placé peut faire basculer le dossier.";
  else reco = "À qualifier avant d'investir du temps de chiffrage.";

  return { score: s, level: levelOf(s), factors, reco, source: SIMULATED };
}

export async function scoreProject(p: Project): Promise<ScoreResult> {
  const sim = simulateScore(p);
  if (configuredProviders().length === 0) return sim;

  const system = `Tu es analyste SalesOps. Tu évalues la probabilité de signature d'un devis B2B (mobilier sur mesure CHR). Tu réponds UNIQUEMENT en JSON valide, sans texte autour : {"score": <0-100>, "factors": [{"label": "...", "impact": "+|-|="}], "reco": "..."}. 3 à 5 facteurs concrets tirés du dossier.`;
  const res = await callLLM(system, projectContext(p));
  if (!res) return sim;
  const j = extractJSON(res.text);
  if (!j || typeof j.score !== "number") return sim;
  const score = Math.max(0, Math.min(100, Math.round(j.score)));
  return {
    score,
    level: levelOf(score),
    factors: Array.isArray(j.factors) ? j.factors.slice(0, 5) : sim.factors,
    reco: typeof j.reco === "string" ? j.reco : sim.reco,
    source: { engine: res.engine, real: true },
  };
}

// ───────────────────────── 2. Copilote de relance ─────────────────────────

export type RelanceResult = { subject: string; body: string; source: AiSource };

function detectObjection(p: Project): "prix" | "delai" | "garantie" | "silence" | "info" {
  const last = p.exchanges[p.exchanges.length - 1];
  const t = (last?.content || "").toLowerCase();
  if (/prix|budget|cher|enveloppe|moins cher/.test(t)) return "prix";
  if (/délai|delai|semaine|rentrée|rentree|livraison|tenir/.test(t)) return "delai";
  if (/garantie|tenue|extérieur|exterieur|durab/.test(t)) return "garantie";
  if (last && last.author !== "Atelier") return "info";
  return "silence";
}

function simulateRelance(p: Project): RelanceResult {
  const obj = detectObjection(p);
  const prenom = p.contactName.split(" ")[0];
  let subject = `Votre projet sur mesure, ${p.client}`;
  let corps = "";
  const ouverture = `Bonjour ${prenom},`;
  const signature = `\n\nBien à vous,\nL'atelier Mobilier Lacroix\nLe sur-mesure, façonné pour durer.`;

  switch (obj) {
    case "prix":
      subject = `${p.client}, trouvons la bonne formule ensemble`;
      corps = `${ouverture}\n\nMerci pour votre retour, et ravi que la qualité de nos finitions vous parle, c'est précisément ce qui fait durer un mobilier dix ou quinze ans plutôt que trois.\n\nPour rester dans votre enveloppe, deux pistes : un échelonnement du règlement (40 % à la commande, le solde à la livraison), ou un ajustement du périmètre en conservant les pièces signature. Dites-moi ce qui vous arrange, et nous construisons la solution avec vous.`;
      break;
    case "delai":
      subject = `${p.client}, votre délai, nous le tenons`;
      corps = `${ouverture}\n\nMerci pour votre message. Bonne nouvelle : sur ce projet, nous pouvons garantir le délai annoncé en réservant dès maintenant un créneau d'atelier. Plus tôt la fabrication démarre, plus la date de livraison est sécurisée.\n\nJe vous propose de bloquer ce créneau cette semaine, un simple accord de principe suffit pour lancer la prise de mesures finale.`;
      break;
    case "garantie":
      subject = `${p.client}, la tenue de votre mobilier dans le temps`;
      corps = `${ouverture}\n\nExcellente question, et c'est justement notre fierté. Pour l'extérieur, nous sélectionnons des essences adaptées et appliquons un traitement spécifique ; chaque réalisation est accompagnée d'une garantie et de conseils d'entretien pour traverser les saisons sans faiblir.\n\nJe peux vous montrer une réalisation comparable, encore impeccable après plusieurs étés. Souhaitez-vous que je vous l'envoie ?`;
      break;
    case "info":
      corps = `${ouverture}\n\nMerci pour votre retour. Je reviens vers vous avec plaisir pour avancer sur votre projet (${p.description.toLowerCase()}).\n\nDites-moi le moment qui vous conviendrait pour en parler, je m'adapte à votre agenda.`;
      break;
    default:
      subject = `${p.client}, je reviens vers vous`;
      corps = `${ouverture}\n\nJe me permets de revenir vers vous au sujet du devis pour votre projet (${p.description.toLowerCase()}). Il reste tout à fait d'actualité de notre côté, et je serais ravi d'y donner suite.\n\nAvez-vous des questions sur les essences, les finitions ou le calendrier ? Je peux aussi vous accueillir à l'atelier pour voir et toucher la matière, c'est souvent ce qui fait la différence.`;
  }
  return { subject, body: corps + signature, source: SIMULATED };
}

export async function generateRelance(p: Project): Promise<RelanceResult> {
  const sim = simulateRelance(p);
  if (configuredProviders().length === 0) return sim;

  const system = `${BRAND_VOICE}\nRédige un courriel de relance commerciale court (80-130 mots), personnalisé, qui fait avancer la vente sans pression. Si le client a soulevé une objection (prix, délai, garantie), traite-la avec élégance. Réponds UNIQUEMENT en JSON : {"subject": "...", "body": "..."}. Le body inclut une ouverture et une signature « L'atelier Mobilier Lacroix ».`;
  const res = await callLLM(system, projectContext(p));
  if (!res) return sim;
  const j = extractJSON(res.text);
  if (!j || typeof j.body !== "string") return sim;
  return {
    subject: typeof j.subject === "string" ? j.subject : sim.subject,
    body: j.body,
    source: { engine: res.engine, real: true },
  };
}

// ── Première réponse à une demande de devis entrante (formulaire de la landing) ──

export type DevisLeadInput = {
  nom?: string;
  etablissement?: string;
  type_etablissement?: string;
  type_projet?: string;
  description?: string;
  budget?: string;
  delai?: string;
  ville?: string;
};

function devisContext(l: DevisLeadInput): string {
  return [
    `Etablissement : ${l.etablissement || "non precise"} (${l.type_etablissement || "CHR"})`,
    `Contact : ${l.nom || "non precise"}`,
    l.type_projet ? `Type de projet : ${l.type_projet}` : "",
    l.ville ? `Ville : ${l.ville}` : "",
    l.budget ? `Budget evoque : ${l.budget}` : "",
    l.delai ? `Delai souhaite : ${l.delai}` : "",
    `Besoin exprime : ${l.description || "non precise"}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function simulateDevisReply(l: DevisLeadInput): RelanceResult {
  const prenom = (l.nom || "").split(" ")[0];
  const ouverture = prenom ? `Bonjour ${prenom},` : "Bonjour,";
  const subject = l.etablissement
    ? `Votre projet sur mesure, ${l.etablissement}`
    : "Votre projet sur mesure";
  const besoin = l.description ? `votre projet (${l.description.toLowerCase()})` : "votre projet";
  const body = `${ouverture}\n\nMerci pour votre demande, et ravi de l'intérêt que vous portez à notre atelier. ${besoin.charAt(0).toUpperCase() + besoin.slice(1)} est exactement le type de réalisation que nous aimons accompagner : des essences nobles et des finitions pensées pour durer.\n\nJe vous propose un court échange pour cerner vos attentes, ou une visite de l'atelier pour voir et toucher la matière, c'est souvent ce qui éclaire un projet. Quel moment vous conviendrait cette semaine ?\n\nBien à vous,\nL'atelier Mobilier Lacroix\nLe sur-mesure, façonné pour durer.`;
  return { subject, body, source: SIMULATED };
}

export async function generateDevisReply(l: DevisLeadInput): Promise<RelanceResult> {
  const sim = simulateDevisReply(l);
  if (configuredProviders().length === 0) return sim;

  const system = `${BRAND_VOICE}\nRédige un courriel de PREMIÈRE réponse à une demande de devis entrante (le prospect vient de remplir le formulaire du site). Chaleureux et raffiné, vouvoiement, remercie, montre que tu comprends le besoin, propose un échange ou une visite de l'atelier, NE CHIFFRE PAS encore. 80-130 mots. Réponds UNIQUEMENT en JSON : {"subject": "...", "body": "..."}. Le body inclut une ouverture et une signature « L'atelier Mobilier Lacroix ».`;
  const res = await callLLM(system, devisContext(l));
  if (!res) return sim;
  const j = extractJSON(res.text);
  if (!j || typeof j.body !== "string") return sim;
  return {
    subject: typeof j.subject === "string" ? j.subject : sim.subject,
    body: j.body,
    source: { engine: res.engine, real: true },
  };
}

// ───────────────────────── 3. Résumé d'échanges → fiche projet ─────────────────────────

export type ResumeResult = {
  synthese: string;
  points: string[];
  signauxBudget: string;
  prochaineEtape: string;
  source: AiSource;
};

function simulateResume(p: Project): ResumeResult {
  const points = p.exchanges.map((e) => {
    const qui = e.author === "Atelier" ? "Nous" : p.contactName;
    return `${qui}, ${e.content}`;
  });

  const synthese = `${p.client} (${p.type}, ${p.city}), projet « ${p.description} » estimé à ${euro(
    p.estValue
  )}. Entré via ${CHANNEL_META[p.channel].label.toLowerCase()}, le dossier est à l'étape « ${STAGE_LABEL[
    p.stage
  ].toLowerCase()} » après ${p.exchanges.length} échange(s).`;

  return {
    synthese,
    points,
    signauxBudget:
      p.estValue >= 9000
        ? `Budget cohérent avec le sur-mesure (${euro(p.estValue)}). Décision orientée qualité.`
        : `Budget plus serré (${euro(p.estValue)}) : valoriser la durabilité face au prix.`,
    prochaineEtape: p.nextAction,
    source: SIMULATED,
  };
}

export async function summarizeExchanges(p: Project): Promise<ResumeResult> {
  const sim = simulateResume(p);
  if (configuredProviders().length === 0) return sim;

  const system = `Tu es l'assistant d'un atelier de mobilier sur mesure. À partir de l'historique d'échanges, produis une fiche projet synthétique. Réponds UNIQUEMENT en JSON : {"synthese": "2-3 phrases", "points": ["...","..."], "signauxBudget": "...", "prochaineEtape": "..."}.`;
  const res = await callLLM(system, projectContext(p));
  if (!res) return sim;
  const j = extractJSON(res.text);
  if (!j || typeof j.synthese !== "string") return sim;
  return {
    synthese: j.synthese,
    points: Array.isArray(j.points) ? j.points : sim.points,
    signauxBudget: typeof j.signauxBudget === "string" ? j.signauxBudget : sim.signauxBudget,
    prochaineEtape: typeof j.prochaineEtape === "string" ? j.prochaineEtape : sim.prochaineEtape,
    source: { engine: res.engine, real: true },
  };
}

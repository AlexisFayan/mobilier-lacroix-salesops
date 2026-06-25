# CLAUDE.md — Mobilier Lacroix · SalesOps B2B + IA

> Contrat de travail du projet. Lu à chaque session. Objectif unique :
> **la note maximale (dossier /100 + oral /20) PAR LA RIGUEUR**, jamais par l'enjolivement.
> La note et la cohérence avec le réel sont le même vecteur : le barème récompense le sourcé,
> l'honnête et l'ancré, et sanctionne la fabrication et le gadget.

## Mission

Posture : équipe conseil senior. On remet de l'ordre dans la façon de vendre d'une PME B2B
(Mobilier Lacroix, 15 pers., mobilier sur mesure pour le CHR) et on y greffe une IA utile.
Les 4 verbes, qui sont le fil conducteur du site : **Comprendre → Diagnostiquer → Recommander → Démontrer.**

**Référence absolue du barème et du cadrage : [`PROJET-Mobilier-Lacroix.md`](./PROJET-Mobilier-Lacroix.md).**
Ne jamais s'en écarter. Tout ajout doit se rattacher à un critère, à l'oral, ou à la cohérence/rigueur.

## Règles dures (toute violation coûte des points)

- **Sources** : aucun chiffre de marché sans source **réelle, datée, cliquable**. Ne jamais
  inventer une URL, une étude ou un chiffre. Non sourçable → **fourchette + « estimation d'expert »** assumée.
- **« Pourquoi »** (critère 1) : ne mentionne **jamais le produit**. Pourquoi retenu :
  « Offrir à chaque lieu de rencontre un morceau d'histoire française. » Archétypes :
  **le Créateur** (principal) + **l'Amant** (secondaire, famille de l'appartenance : raffinement, émotion,
  sentiment d'être chez soi). Le « comment » porte le savoir-faire français, Lyon, la qualité et le raffinement.
- **IA** (critères 6/7) : toujours ancrée à **un irritant précis + un indicateur de succès**. Jamais « gadget ».
- **Équilibre marketing ↔ commercial** : le plan couvre l'**acquisition** (marketing de contenu à bas coût,
  aimants / lead magnets, prescripteurs) ET la **conversion** (pipeline, relance), pas seulement le bas du tunnel.
  Acquisition = organique/bas coût (budget ~250 €/mois), jamais de pub payante massive (incohérent avec le SOM).
- **Voix de marque** (Créateur + l'Amant) : chaleureux, raffiné, fier du savoir-faire français, vouvoiement.
  **Zéro anglicisme, zéro emoji, zéro tiret cadratin (em-dash).** Phrases sobres.
- **Cohérence proto ↔ dossier** : les chiffres affichés dans `/crm` et dans `/rendu` doivent concorder
  (taux de signature, panier, funnel). Une incohérence vue par le jury fait perdre la crédibilité.
- **Nuances RGPD à préserver** (voir [`docs/benchmark-ia.md`](./docs/benchmark-ia.md)) :
  ne jamais affirmer « 100 % serveurs France » ; distinguer l'**API La Plateforme** (no-training par défaut)
  du produit grand public **Le Chat**. On défend « RGPD natif + UE par défaut + DPA + API no-training ».
- **Réel vs fictif** : les données CRM (`lib/data.ts`) sont **fictives mais réalistes** (assumé dans le footer).
  Les chiffres de marché et les outils IA sont **réels et vérifiables**. Ne jamais mélanger les deux statuts.
- **Réaliste > gros chiffre faux.** Un TAM/SAM/SOM défendable bat un chiffre énorme et fragile.

## Conventions techniques

- Stack : **Next.js 16** (App Router), **React 19**, **TypeScript strict**, **Tailwind 4** (`@theme` dans `app/globals.css`).
- Commandes : `npm run dev` · `npm run build` · `npm run lint`.
- Carte des fichiers :
  - Sources numérotées → `lib/rendu.ts` (`SOURCES`, `srcIndex`). Tout chiffre du dossier passe par `<Src>`.
  - Données de démo CRM → `lib/data.ts` (`PROJECTS`).
  - Logique IA → `lib/ai.ts` : **vraie IA si une clé est configurée** (Mistral → Groq → Gemini),
    sinon **repli simulé déterministe** avec **badge honnête** (« IA » olive / « Démo » gold). Ne jamais présenter le repli comme de l'IA.
  - Endpoint serveur → `app/api/ai/route.ts`. **Les clés API restent côté serveur**, jamais exposées au client.
  - Données du CRM → **Supabase** (`lib/supabase.ts`, `lib/projects.ts`, table `crm_projects`) ; `lib/data.ts` (`PROJECTS`) reste la source d'amorçage et le repli de démo.
- Variables d'environnement : `MISTRAL_API_KEY`, `GROQ_API_KEY`, `GOOGLE_API_KEY` (+ `*_MODEL` optionnels) côté serveur ; `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` côté client (repli en dur sur les valeurs du projet si absentes).

## Definition of Done (auto-vérification avant de conclure une tâche)

1. La modif se rattache à un critère du barème ou à l'oral.
2. Tout chiffre introduit est sourcé (ou présenté en fourchette assumée).
3. Cohérence proto ↔ dossier vérifiée.
4. `npm run build` passe.
5. Voix Créateur respectée (pas de produit dans le pourquoi, pas d'anglicisme/emoji/em-dash).

## Ne PAS faire (anti-dérive)

- Pas d'authentification ni de backend serveur custom (hors routes `app/api/*` existantes). Le prototype CRM persiste désormais dans **Supabase** (table `crm_projects`, clé *publishable*/anon côté client + policies RLS de démo, repli automatique sur `lib/data.ts` si la base est indisponible). Voir `lib/supabase.ts` et `lib/projects.ts`. Ne pas revenir au localStorage. La **clé secrète** Supabase, elle, ne vit que côté n8n, jamais dans le repo.
- Pas de feature hors barème, pas de refonte de stack, pas de dépendance lourde ajoutée sans raison.
- Pas d'orchestration multi-agents sans demande explicite (coûteux ; proportionner au projet).

## Agents disponibles (`.claude/agents/`)

- **jury-blanc** : note les 9 critères, liste les trous et les questions du comité exécutif.
- **verificateur-sources** : vérifie en ligne chaque source/chiffre (valeur, date, lien, concordance).
- **relecteur-voix** : traque produit-dans-le-pourquoi, anglicismes, emoji/em-dash, ton hors-Créateur.

Ils sont en lecture seule : ils proposent, l'humain valide (cohérent avec notre propre garde-fou IA).

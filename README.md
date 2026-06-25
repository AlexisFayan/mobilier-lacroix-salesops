# Mobilier Lacroix — SalesOps B2B + IA

Cas d'étude **SalesOps B2B augmenté par l'IA** — Epitech Digital School Lyon, Promo 2026.

**Mobilier Lacroix** : fabrication artisanale de mobilier sur-mesure pour le CHR
(cafés, restaurants, hôtels), 15 personnes, modèle ponctuel, pas de CRM.

**Pourquoi de la marque** : offrir à chaque lieu de rencontre un morceau d'histoire française.
Archétypes : le Créateur (principal) et l'Amant (secondaire, appartenance).

## Le rendu = un site unique

| Page | Rôle |
|---|---|
| `/` | Accueil, le parcours conseil en 4 temps (Comprendre, Diagnostiquer, Recommander, Démontrer) |
| `/crm` | Prototype SalesOps + IA : pipeline, scoring des devis, copilote de relance, résumé d'échanges |
| `/estimateur` | Aimant marketing jouable : estimation de budget qui crée une demande qualifiée |
| `/charte` | Charte graphique : positionnement, archétypes, logo, palette, typographie, ton de voix |
| `/rendu` | Le dossier noté : les 9 critères du barème, sourcés et vérifiés |

## Couche IA

Vrais appels IA si une clé est configurée (bascule **Mistral** FR/UE → **Groq** → **Gemini**),
sinon **repli simulé déterministe** avec badge honnête (« IA » / « Démo »). Voir [`.env.example`](./.env.example).
Les clés restent côté serveur (route `app/api/ai`).

## Développement

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
```

Stack : Next.js 16 (App Router), React 19, TypeScript, Tailwind 4.

## Documentation

- [`PROJET-Mobilier-Lacroix.md`](./PROJET-Mobilier-Lacroix.md) — cahier des charges et barème.
- [`CLAUDE.md`](./CLAUDE.md) — cadre de travail (garde-fous barème, voix de marque, RGPD).
- [`docs/`](./docs) — benchmark IA, étude de marché, registre des sources, et `docs/oral/` (pitch, démo, questions du jury).

> Déployé sur Vercel.

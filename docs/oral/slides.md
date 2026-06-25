# Support de slides — déroulé slide par slide (12-15 min)

> Décision : le **support principal = le site déroulé en direct** (cohérent avec « le rendu = un site »),
> doublé d'un **deck léger** de titres/visuels pour le rythme. Chaque slide indique quoi montrer, qui parle, la durée.
> Aligné sur `plan-pitch.md` (les 4 temps) et `script-demo.md` (la démo).

## Règles
- Une idée par slide, peu de texte, le site fait la preuve.
- Toute l'équipe parle (barème oral : 2 pts). Respecter 13 min (1 pt).
- Ne jamais lire la slide ; la slide illustre, on raconte.

## Deck

| # | Slide | Contenu clé | Support live | Qui | Durée |
|---|---|---|---|---|---|
| 1 | Accroche | « Offrir à chaque lieu de rencontre un morceau d'histoire française. » | `/` (hero) | A | 0:45 |
| 2 | L'entreprise | Atelier sur-mesure CHR, 15 pers., modèle ponctuel, vend « à l'instinct » | `/` | A | 1:00 |
| 3 | Identité | Cercle d'or (pourquoi/comment/quoi) + archétypes Créateur & Amant | `/charte` ou `/rendu` c1 | A | 1:30 |
| 4 | Marché & ICP | TAM/SAM/SOM en fourchettes + carte des 14 concurrents + créneau | `/rendu` c2 | B | 2:00 |
| 5 | Diagnostic | Funnel reconstruit + matrice impact/effort + **fuite n°1 : devis non relancés** | `/rendu` c3 | B | 2:00 |
| 6 | Le plan | Attirer → IA → convertir, aimants, RACI, stack outils (gratuit/RGPD) | `/rendu` c4 | C | 2:00 |
| 7 | KPI & ROI | Cibles (conversion, relance, CAC) + ROI chiffré (outil 0 €, 1 devis sauvé) | `/rendu` c5 + c7 | C | 1:30 |
| 8 | IA, utile pas gadget | 3 cas ancrés au funnel + pipeline + garde-fous (RGPD, humain) | `/rendu` c6/c7 | C/D | 1:30 |
| 9 | **DÉMO** | Estimateur (aimant) → fiche qualifiée → CRM : scoring, relance, résumé | `/estimateur` puis `/crm` | D | 2:30 |
| 10 | Conclusion | Ce qui change pour l'atelier, en une phrase + rappel du pourquoi | `/` | A | 0:45 |

## Slides de secours (si questions)
- **Sources & rigueur** : `/rendu` c9 (16 sources, recoupement Pappers/Google Trends/Similarweb).
- **Sensibilités** : SAM 28-40 M€, SOM borné par la capacité (cf. `docs/etude-marche.md`).
- **RGPD** : API La Plateforme ≠ Le Chat, base légale intérêt légitime (cf. `docs/benchmark-ia.md`).
- **Questions pièges** : voir `docs/oral/questions-jury.md`.

## Check technique avant de monter
- [ ] Déploiement Vercel testé la veille, et un onglet local `npm run dev` en secours.
- [ ] Un appel IA à blanc 2 min avant la démo (réveiller la route serverless).
- [ ] Ne pas rafraîchir pendant la démo (l'état CRM est en localStorage).

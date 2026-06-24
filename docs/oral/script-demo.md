# Script de démo — prototype (≈ 2 min 30, sans risque)

> Démo notée 3 pts (oral) + sert le critère 8 (10 pts). Objectif : montrer l'IA **visible et utile**,
> ancrée dans la fuite diagnostiquée. Jouer un scénario répété, ne rien improviser.

## Avant de monter sur scène
- [ ] Ouvrir l'URL de prod (Vercel) **et** un onglet de secours en local (`npm run dev`).
- [ ] Faire un **appel IA à blanc** 2 min avant (réveiller la route serverless, éviter le cold start).
- [ ] Vérifier la connexion. Si l'IA tombe, le **repli simulé** prend le relais : l'assumer (« notre filet de sécurité »).
- [ ] **Ne pas rafraîchir la page** pendant la démo (l'état CRM n'est pas persistant tant que P4 n'est pas faite).

## Déroulé

0. **L'aimant marketing (20 s)** — Ouvrir `/estimateur`. Remplir 2-3 postes, montrer la fourchette indicative, cliquer « Recevoir l'estimation » → message « crée une fiche qualifiée dans le CRM ».
   → « Voilà comment on attire et on qualifie, à bas coût. Cette demande arrive maintenant côté commercial. »

1. **Le pilotage (5 s)** — Ouvrir `/crm`. Pointer la barre KPI : « Devis à relancer » en alerte.
   → « Voilà la fuite qu'on a diagnostiquée, rendue visible et chiffrée. »

2. **Le cas qui fuit (15 s)** — Ouvrir la fiche **Restaurant La Mâchonnerie** (devis envoyé il y a 9 j, jamais relancé).
   → C'est exactement le scénario du **Restaurant Ginkgo** déjà perdu : on montre qu'on l'évite cette fois.

3. **Scoring IA (30 s)** — Cliquer « Analyser avec l'IA ». Lire le score, les facteurs (+/-), la reco.
   → Souligner le **badge** : « IA · Mistral » (vraie IA) ou « Démo » (repli honnête). « L'IA priorise, elle ne décide pas. »

4. **Copilote de relance (40 s)** — Cliquer « Générer une relance ». Montrer l'email « dans le ton » de la marque,
   adapté à l'objection. « Rédigé en 30 secondes au lieu de 10 minutes. L'humain relit, puis envoie. »

5. **Résumé d'échanges (20 s)** — Cliquer « Résumer les échanges ». Montrer la fiche synthétique + prochaine étape.
   → « Le contexte ne se perd plus d'un échange à l'autre. »

6. **Le pipeline vivant (20 s)** — Glisser une carte d'une colonne à l'autre (ou via les boutons d'étape).
   → « Le carnet de commandes piloté, plus à l'instinct. »

## Phrases de secours
- IA en panne : « Notre garde-fou : si l'IA est indisponible, un moteur de démonstration prend le relais,
  signalé honnêtement. Le commercial n'est jamais bloqué. »
- Question « est-ce vraiment de l'IA ? » : « Oui, de vrais appels à Mistral (FR/UE). Le badge le prouve en direct. »

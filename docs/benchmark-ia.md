# 🤖 Benchmark — moteur IA du prototype (gratuit, RGPD-friendly)

> Sert les livrables : **Benchmark outils IA** (mercredi) + **Critère 7 « Garde-fous & ROI de l'IA »** (10 pts) + **Critère 6** (18 pts).
> Recherche multi-sources vérifiée (juin 2026). 8 fournisseurs gratuits comparés.

## Décision

| Rôle | Fournisseur | Modèle | Pourquoi |
|---|---|---|---|
| **Principal** | **Mistral AI — La Plateforme** | `mistral-large-latest` | Gratuit (*Free mode*, sans CB), **éditeur français / UE**, **API qui n'entraîne pas sur les données**, meilleure qualité FR |
| **Repli auto** | **Groq** | `llama-3.3-70b-versatile` | Gratuit permanent sans CB, quotas larges (30 req/min, 1000/j), API compatible → même code |
| **Filet ultime** | Repli **simulé local** | — | Templates paramétrés côté app, badge honnête « démonstration », jamais présenté comme IA |

**Bascule automatique** : Mistral → (429/erreur) → Groq → (échec) → repli simulé. *Déjà implémenté dans `site/lib/ai.ts`.*

## Classement complet (note /5 pour notre cas)

| # | Fournisseur | Note | Verdict |
|---|---|---|---|
| 1 | **Mistral AI (La Plateforme)** | **5** | Seul à cumuler gratuit réel + **FR/UE + RGPD natif + no-training par défaut** + qualité FR + intégration Vercel triviale. Gagne le critère RGPD. |
| 2 | **Groq** | 4,5 | Free tier permanent, quotas généreux, latence record, OpenAI-compatible. Frein : hébergement US (RGPD via CCT). |
| 3 | Google Gemini (AI Studio) | 4 | Free tier sans CB, bon en FR. **MAIS CGU interdit de servir des utilisateurs UE en prod** + pas de résidence UE → mauvais signal RGPD. |
| 4 | Cloudflare Workers AI | 4 | 10k Neurons/j gratuits, REST simple. Pas FR, pas d'inférence UE garantie en gratuit. |
| 5 | Cerebras | 3,5 | 1M tokens/j, ultra-rapide. Mais 5 req/min, catalogue volatil, US. |
| 6 | Cohere | 3 | FR excellent. **Entraîne sur vos données par défaut** (opt-out manuel), Trial interdite en prod, US. |
| 7 | Hugging Face Inference | 3 | Angle souveraineté (Scaleway/OVH) possible, mais free tier s'écroule à ~0,10 $/mois. |
| 8 | OpenRouter (`:free`) | 3 | Pire RGPD : modèles gratuits exigent souvent d'autoriser logging/entraînement. US. |

## 🛡️ Argument RGPD à défendre à l'oral (critère 7)

> « Nous avons retenu **Mistral AI**, éditeur **français** (siège Paris), nativement soumis au RGPD. Trois points concrets :
> 1. Sur l'**API La Plateforme**, les données envoyées **ne sont pas utilisées pour entraîner** les modèles par défaut.
> 2. **Stockage et traitement en UE** par défaut + **DPA** disponible → pas de transfert international à justifier (contrairement aux acteurs US : Groq, Cohere, OpenRouter).
> 3. **Minimisation** : le copilote n'envoie que le strict nécessaire ; les champs sensibles peuvent être pseudonymisés côté serveur avant l'appel. »

**Nuances à assumer (pour ne pas se faire piéger)** :
- Distinguer l'**API La Plateforme** (no-training, ce qu'on utilise) du produit grand public **Le Chat** (qui peut utiliser les conversations sauf opt-out, visé par une plainte CNIL). **On n'utilise PAS Le Chat.**
- Ne pas dire « 100 % serveurs France » : historiquement des traitements ont transité par GCP (UE). On défend **« RGPD natif + UE par défaut + DPA + API no-training »**.

**Garde-fous généraux** : qualité des données (l'IA = aussi bonne que ses données) · **contrôle humain** (l'IA propose, l'humain valide — chaque relance est éditable avant envoi) · RGPD ci-dessus.

## Sources (à citer dans le dossier)
- Mistral — confidentialité API : `docs.mistral.ai/admin/security-access/privacy`
- Mistral — conformité / DPA : `trust.mistral.ai`
- Mistral — console / Free mode : `console.mistral.ai`
- Groq — quotas free tier : `console.groq.com/docs/rate-limits`
- (Comparatif établi à partir des pages officielles pricing/CGU de chaque fournisseur, juin 2026.)

## ⚠️ À confirmer avant la soutenance
1. **Créer les comptes en avance** (Mistral : vérif téléphone obligatoire ; Groq : SMS possible).
2. Quotas *Free mode* Mistral non publics → **ne pas s'engager sur des chiffres** à l'oral.
3. Coder en alias `*-latest` (Mistral déprécie/renomme vite) + modèle de repli.
4. **Déploiement de test la veille** (cold start, timeouts route serverless, gestion des 429).
5. Tester la qualité FR de Groq/Llama 3.3 sur nos prompts avant de compter dessus en repli.

## 💶 ROI (à chiffrer dans le dossier)
`Gain = temps gagné × coût horaire − coût outil`. Le coût outil = **0 € (free tier)**.
Pistes de temps gagné : relances rédigées en 30 s au lieu de ~10 min · résumés d'échanges automatiques · priorisation des devis (moins de devis « chauds » oubliés → moins de fuites comme le cas Restaurant Ginkgo).

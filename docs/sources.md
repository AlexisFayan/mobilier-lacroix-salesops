# Registre des sources — vérification

> Source de vérité unique pour la rigueur (critères 2 et 9). Miroir de `lib/rendu.ts` (`SOURCES`)
> enrichi du statut de vérification. **À repasser intégralement avant la soutenance** avec l'agent
> `verificateur-sources`. Statut : ✅ confirmé en ligne · ⚠️ à reformuler/fourchette · ❌ introuvable · ⏳ à vérifier.

## Procédure

1. Lancer l'agent `verificateur-sources`.
2. Reporter ci-dessous le statut + la date de vérification.
3. Toute source ⚠️/❌ → reformuler dans `lib/rendu.ts` (fourchette + « estimation d'expert ») ou remplacer.

## Sources (numéro = ordre dans `lib/rendu.ts`)

Vérifié en ligne le **24/06/2026** (agent verificateur-sources). Corrections appliquées dans `lib/rendu.ts`.

| # | id | Organisme | Chiffre / affirmation (corrigé) | Statut | Note |
|---|---|---|---|---|---|
| 1 | ameublement-contract | L'Ameublement français / CODIFAB × MKG | Contract CHR & commerce ≈ 670-675 M€ (janvier 2026) | ✅ | Date « 28/01 » retirée (article du 13/01) ; 675 M€ porté par [2] |
| 2 | courrier-meuble | Le Courrier du Meuble | 675 M€ ; 2 700-40 000 €/chambre | ✅ | Confirme le 675 M€ et la fourchette |
| 3 | ipea-meuble | IPEA / L'Ameublement français | Filière meuble 13,6 Md€ (2025) | ✅ | Ne pas y rattacher le contract |
| 4 | archidvisor | Archidvisor | Réno 500-1 500 ; neuf 2 000-3 500 €/m² | ✅ | « 750-2 250 » introuvable → remplacé par les fourchettes réelles |
| 5 | umih-hcr | UMIH / AKTO / DARES | 122 000 ét. ; AURA 16 679 ; 28 % 4-5* | ✅ | Porte aussi le « 28 % 4-5* » (ex-attribué à tort à Coach Omnium) |
| 6 | insee-561 | INSEE | 171 356 entreprises (2021) | ✅ | Lien vivant |
| 7 | altares-umih | Altares / UMIH | +21 % resto trad. (T2 2025) | ✅ | Lien vivant |
| 8 | insee-hotels-2024 | INSEE | 15 155 hôtels ; 617 000 chambres (2024) | ✅ | URL morte remplacée par insee.fr/.../2015412 + chiffre actualisé |
| 9 | aura-hotel | AURA Tourisme | 2 471 hôtels ; 384 hôtels 4-5* | ✅ | Confirmé (296×4* + 88×5*) |
| 10 | coach-omnium | Coach Omnium | 19 % haut de gamme/luxe (vs 5 % en 2010) | ✅ | Recalé sur le vrai chiffre Coach Omnium |
| 11 | insee-aura-creations | INSEE | Créations héberg.-resto AURA +15,7 % | ⏳ | À recliquer (non re-fetché) |
| 12 | onlylyon-resto | ONLYLYON / Métropole de Lyon | ≈ 5 280 restaurants (INSEE-REE 2021) | ⚠️ | Date 2021 ajoutée ; PDF parfois redirigé |
| 13 | onlylyon-tourisme | ONLYLYON Tourisme & Congrès | 2e parc français (18 929 chambres) | ✅ | « 212 hôtels » non vérifiable → retiré |
| 14 | fevad-circulaire | FEVAD | Essor de la seconde main (2025) | ✅ | « 1 meuble/4 » non confirmé → reformulé |
| 15 | mistral-privacy | Mistral AI | API La Plateforme : pas d'entraînement par défaut | ✅ | URL pointée vers .../security-access/privacy |
| 16 | groq-limits | Groq | 30 req/min (ordre de grandeur côté jour) | ✅ | RPD réels plus élevés que 1 000 |

## Points de vigilance déjà connus (cf. `docs/etude-marche.md`)

- Part « sur-mesure accessible » 30-40 % = **estimation d'expert non publiée** → toujours en fourchette.
- Ne pas additionner établissements *employeurs* (122 000 HCR) et *unités légales* INSEE (~171 000 resto).
- ~5 280 restaurants Métropole = chiffre fin 2021 (à dater explicitement).
- Prix concurrents sur-mesure non publics → positionnement prix qualitatif uniquement.

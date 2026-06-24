# Questions du jury — anticipées et défendues

> Oral : « gestion des questions » = 2 pts, « maîtrise du fond & défense des choix » = 4 pts.
> Réponses ancrées dans les notes de défense (`etude-marche.md`, `benchmark-ia.md`). Honnêteté = rigueur = points.

## Marché & chiffres (critère 2)

**Q. Votre SAM de 34 M€, d'où sort-il ?**
675 M€ (chiffre dur de filière) × 14 % (part AURA, UMIH) × ~35 % (sur-mesure accessible). Le 35 % est une
**estimation d'expert non publiée**, donc on le donne en fourchette (28-40 M€). Sensibilité : 25 % → 23 M€, 40 % → 37 M€.

**Q. Pourquoi un SOM si petit (0,55 M€) ?**
Parce qu'il est **borné par la capacité réelle** de l'atelier (15 pers., 3-5 projets/mois × 10 k€), pas par le marché.
Notre levier de croissance est la **conversion** (relances), pas le budget média (250 €/mois).

**Q. Vos chiffres se recoupent-ils ?**
On ne mélange pas les périmètres : établissements *employeurs* HCR (122 000) ≠ unités légales INSEE (~171 000 resto).
Les ~5 280 restaurants Métropole datent de fin 2021, on le précise.

## Diagnostic & cohérence proto (critères 3, 8)

**Q. Le taux de signature affiché dans l'outil ne correspond pas à votre dossier.**
[À traiter avant l'oral : aligner le calcul de `KpiBar` et la donnée du dossier — cf. P1/P2 de l'analyse.]
Réponse cible : « Les deux affichent ~25 %, cohérent avec 3-5 signés sur 15-20 demandes. »

**Q. Le score de la carte diffère de l'analyse IA.**
[À traiter : unifier la source du score — cf. P1.] Réponse cible : « Même moteur de scoring partout. »

## IA — pertinence & garde-fous (critères 6, 7)

**Q. En quoi ce n'est pas un gadget ?**
Chaque cas d'usage part d'un **irritant mesuré** (devis non relancés) et porte un **indicateur** (taux de relance,
délai de 1re relance). L'IA s'insère dans une étape précise du funnel, elle ne remplace pas le commercial.

**Q. Et le RGPD ?**
Mistral AI, éditeur français, API La Plateforme : **no-training par défaut**, traitement UE, DPA disponible.
On ne dit pas « 100 % serveurs France » (des traitements ont pu transiter par GCP UE). On n'utilise **pas** Le Chat
(produit grand public, plainte CNIL). Minimisation des données + contrôle humain systématique.

**Q. Si l'IA hallucine ou tombe ?**
Garde-fou à trois niveaux : Mistral → Groq → repli simulé déterministe, signalé par un badge honnête.
Et surtout : **l'IA propose, l'humain valide** (chaque relance est relue avant envoi).

**Q. Le ROI tient la route ?**
Coût outil = 0 € (free tier). Gain = ~8 h/mois × 35 €/h ≈ 280 €/mois, plus **un seul devis sauvé** par la relance
(~10 k€, cf. cas Ginkgo perdu). ROI immédiat même en hypothèse prudente.

## Plan & gouvernance (critères 4, 5)

**Q. Comment garantissez-vous que les relances se font vraiment ?**
Gouvernance : point quotidien 5 min, revue hebdo des devis/relances, bilan mensuel chiffré, et un **RACI** par tâche.
L'outil rend la relance impossible à oublier (alerte « à relancer » + copilote).

**Q. Quels KPI piloteriez-vous en premier ?**
Taux de relance des devis (≈ 0 % → 100 %) et délai de 1re relance (< 72 h) : ce sont les deux qui colmatent la fuite n°1.

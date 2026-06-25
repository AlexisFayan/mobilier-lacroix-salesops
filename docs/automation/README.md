# Automatisation n8n - relance des devis

Workflow **réel** qui industrialise la relance des devis (la « fuite n°1 » du diagnostic). Il existe sous deux formes, identiques :

- **En ligne**, déjà construit dans notre instance n8n (n8n Cloud) :
  **https://alexisfayan.app.n8n.cloud/workflow/xr1yq95IEPk8HlUk** (à montrer en direct le jour de la soutenance).
- **Importable**, pour rejouer le scénario sur n'importe quelle instance : `relance-devis.n8n.json`.

> À présenter honnêtement : c'est **l'automatisation qu'on industrialiserait après le POC**. Le prototype, lui, fait déjà les vrais appels IA. n8n n'est pas obligatoire au barème - c'est un plus qui rend le « process → outil → déclencheur » concret (critère 4) et montre le garde-fou humain (critère 7).

## Le scénario (6 étapes)

1. **Déclencheur** - un devis passe au statut « envoyé » (en prod : webhook depuis le CRM ; ici : déclencheur manuel + un devis d'exemple).
2. **Attente 72 h** - si pas de réponse ni d'activité (condition `IF`).
3. **Scoring IA** - appel Mistral (UE) : probabilité de signature → priorise.
4. **Brouillon de relance** - appel Mistral : courriel « dans le ton » de la marque.
5. **Validation humaine** - une tâche est créée pour le commercial : *il relit et envoie*. **Rien ne part tout seul** (garde-fou RGPD).
6. **Suivi KPI** - l'événement alimente le tableau de bord (taux et délai de relance).

## Montrer le scénario au prof

1. **Le plus simple** : ouvrir le workflow déjà en ligne (lien ci-dessus) et le présenter. Le canvas affiche tout le scénario, avec les deux notes (étapes IA, garde-fou humain).
2. **Sur une autre instance** : dans n8n → menu `...` → **Import from File** → choisir `relance-devis.n8n.json`.
3. **(Optionnel) le faire tourner** : créer une clé Mistral (console.mistral.ai, gratuite), puis la renseigner **une seule fois** dans la *credential* « Mistral API » (type **Bearer Auth**) partagée par les deux nœuds, et **Execute Workflow**. Sans clé, le canvas reste parfaitement présentable. La clé reste côté n8n, jamais dans le fichier ni exposée.

## Piloté depuis Claude Code (MCP)

Le workflow en ligne a été **construit directement depuis Claude Code via le serveur MCP n8n** (instance n8n Cloud + clé API n8n configurées dans `settings.json`). On peut donc le créer, le relire et le modifier sans quitter l'éditeur. Le fichier `.json` reste la copie de secours, importable partout en cas de besoin.

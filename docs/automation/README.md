# Automatisation n8n — relance des devis

Workflow **réel et importable** qui industrialise la relance des devis (la « fuite n°1 » du diagnostic) : `relance-devis.n8n.json`.

> À présenter honnêtement : c'est **l'automatisation qu'on industrialiserait après le POC**. Le prototype, lui, fait déjà les vrais appels IA. n8n n'est pas obligatoire au barème — c'est un plus qui rend le « process → outil → déclencheur » concret (critère 4) et montre le garde-fou humain (critère 7).

## Le scénario (6 étapes)

1. **Déclencheur** — un devis passe au statut « envoyé » (en prod : webhook depuis le CRM ; ici : déclencheur manuel + un devis d'exemple).
2. **Attente 72 h** — si pas de réponse ni d'activité (condition `IF`).
3. **Scoring IA** — appel Mistral (UE) : probabilité de signature → priorise.
4. **Brouillon de relance** — appel Mistral : courriel « dans le ton » de la marque.
5. **Validation humaine** — une tâche est créée pour le commercial : *il relit et envoie*. **Rien ne part tout seul** (garde-fou RGPD).
6. **Suivi KPI** — l'événement alimente le tableau de bord (taux et délai de relance).

## Montrer le scénario au prof

1. **Avoir un n8n** (au choix) :
   - **n8n Cloud** — `app.n8n.cloud`, essai gratuit, rien à installer (le plus simple pour une démo).
   - **En local** — `npx n8n` puis ouvrir `http://localhost:5678`.
   - **Docker** — `docker run -it --rm -p 5678:5678 n8nio/n8n`.
2. **Importer** : dans n8n → menu `⋯` → **Import from File** → choisir `relance-devis.n8n.json`. Le canvas s'affiche : on voit tout le scénario.
3. **(Optionnel) le faire tourner** : remplacer `REMPLACER_PAR_VOTRE_CLE_MISTRAL` dans les 2 nœuds Mistral par une clé (console.mistral.ai, gratuite), puis **Execute Workflow**. Sans clé, le canvas reste parfaitement présentable.

## Si on veut piloter n8n depuis Claude Code (MCP)

C'est possible mais il faut **votre instance n8n** : une URL n8n joignable + une **clé API n8n** (Settings → n8n API). Ensuite on configure le serveur MCP n8n dans Claude Code (`settings.json` → `mcpServers`) et on peut créer/modifier les workflows directement. Tant qu'on n'a pas d'instance + clé, le fichier `.json` importable ci-dessus reste la voie la plus simple pour la soutenance.

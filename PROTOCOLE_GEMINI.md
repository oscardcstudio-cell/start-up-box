# Protocole — support Gemini CLI

> **Statut : proposé (2026-09-02), non implémenté.** Phase 0 est une gate : rien ne se code avant.
> Objet : rendre la box installable et utilisable par un fondateur qui n'a pas Claude Code.

## Décision structurante

**La conversion vit dans le pipeline, jamais dans les fichiers.**

Convertir les fichiers à la main serait annulé au prochain passage : le gate hebdo côté mainteneur (`scripts/publish-to-box.mjs`) réécrit `meta-rules/` et `plugins/` depuis l'allowlist, sans conflit et sans bruit. Une conversion posée dans les fichiers disparaîtrait le lundi suivant sans que personne ne le voie.

Donc : **une source (la version Claude, seule commitée) → une table de conversion → deux cibles**. Aucun fichier `*-gemini.md` en double dans le repo. La version Gemini est **générée** — à l'install et à chaque mise à jour — par un script livré dans le clone. C'est aussi cohérent avec la dette « Sync double copy » déjà listée dans `CLAUDE.md` : on n'en crée pas une deuxième.

## Ce que Gemini CLI sait faire (vérifié le 2026-09-02)

L'architecture est reprise trait pour trait — c'est ce qui rend le portage petit.

| start-up-box (Claude Code) | Cible Gemini CLI |
|---|---|
| `~/.claude/agents/*.md` (md + frontmatter) | `~/.gemini/agents/*.md`, même format |
| `~/.claude/skills/<nom>/SKILL.md` | `~/.gemini/skills/` (alias `~/.agents/skills/`), même `SKILL.md` |
| `~/.claude/CLAUDE.md` + `@import` | `~/.gemini/GEMINI.md` + `@./import` |
| `settings.json` → `hooks` | `settings.json` → `hooks`, **même payload** (`tool_name`, `tool_input`, `cwd`, `session_id`) |
| `PreToolUse` / `PostToolUse` / `Stop` | `BeforeTool` / `AfterTool` / `AfterAgent` |
| `SessionStart` | `SessionStart` (identique) |
| Sous-agents (délégation auto) | Sous-agents (délégation auto + `@<nom>` explicite) |
| Skills auto-déclenchées | `activate_skill` + confirmation (réglable, cf. § À trancher) |

**Prérequis fondateur côté Gemini** : `npm install -g @google/gemini-cli`, puis connexion avec un compte Google. Palier gratuit : 60 requêtes/min, 1 000/jour, Gemini 3 Pro inclus. **Aucun abonnement payant** — c'est l'argument principal de ce portage.

## Phase 0 — Vérification terrain (GATE, ~30 min, avant toute ligne de code)

Trois inconnues sont version-dépendantes et casseraient en silence. Elles se lèvent sur une machine réelle, pas dans la doc.

1. **Noms d'outils réels.** La doc de référence liste `grep_search`, d'autres pages `search_file_content`. Lancer `gemini`, demander la liste des outils disponibles, **noter les noms exacts** et corriger la table de la Phase 1 en conséquence. Ne jamais figer un nom lu dans un article de blog.
2. **Import `@` au niveau user.** Créer `~/.gemini/GEMINI.md` contenant `@./startup-box/HARNESS.md` + le fichier cible, lancer `gemini`, taper `/memory show` : le harness apparaît-il dans le contexte concaténé ?
   *Gate dur.* Si non → le harness n'a pas de véhicule par import. Repli : écrire le harness **en clair** dans `GEMINI.md`, entre marqueurs (`<!-- startup-box:start -->` / `:end`), que l'auto-update réécrit. Fonctionne, mais l'update doit alors gérer un bloc et pas une ligne.
3. **Hook `SessionStart` depuis `~/.gemini/settings.json`.** Un bug a été rapporté sur la 0.24.0 (issue #16697) : les hooks user-level ne partaient pas. Test : un hook qui écrit un fichier témoin, deux lancements.
   *Gate dur.* Si le hook ne part pas au niveau user → **pas d'auto-update silencieux sur Gemini**. Repli documenté : le prompt de mise à jour manuel de `INSTALL.md` (l'état de la box avant le hook), et on le dit franchement au fondateur.
4. **Quota.** Mesurer les requêtes consommées par une phase complète de `build-company` (le palier gratuit est à 1 000/jour, et **une** demande = plusieurs requêtes). *Gate souple* : si une phase dépasse ~200, le documenter dans `INSTALL.md`.

Sortie de la Phase 0 : les 4 réponses écrites dans ce fichier, sous cette section. Sans elles, la suite est de la spéculation.

## Phase 1 — Table de conversion

Nouveau fichier `scripts/gemini-map.mjs` (livré dans le clone, donc disponible chez le fondateur — contrairement à `publish-manifest.mjs` qui reste maintainer-only). Même discipline que `NEUTRALIZE` : **ordre spécifique → générique**, appliqué **après** la neutralisation d'identité.

**Frontmatter des agents**
- `model: opus|sonnet` → **supprimer la ligne.** Le sous-agent hérite alors du modèle de session. Pourquoi ne pas mapper vers un id Gemini : ils sont en `-preview` et tournent (`gemini-3-flash-preview`, `gemini-3.1-pro-preview`) — les figer, c'est casser la box à la prochaine rotation. Et la distinction opus/sonnet est une optimisation de coût propre à Claude, sans objet sur un quota en requêtes/jour.
- `tools:` → liste traduite (ci-dessous). Concerne 2 agents sur 9 (`meta-gamification`, `meta-offre-pricing`) ; les 7 autres n'en déclarent pas et héritent de tout.

**Outils** (à confirmer en Phase 0)

| Claude | Gemini |
|---|---|
| `Read` | `read_file` |
| `Write` | `write_file` |
| `Edit` | `replace` |
| `Grep` | `grep_search` |
| `Glob` | `glob` |
| `Bash` | `run_shell_command` |
| `WebSearch` | `google_web_search` |
| `WebFetch` | `web_fetch` |
| `AskUserQuestion` | `ask_user` |
| `TodoWrite` | `write_todos` |
| `TaskCreate` / `TaskUpdate` | `tracker_create_task` / `tracker_update_task` |

**Hooks**
- Événements : `PreToolUse` → `BeforeTool`, `PostToolUse` → `AfterTool`, `Stop` → `AfterAgent`. `SessionStart` inchangé.
- `matcher: "Bash"` → `matcher: "run_shell_command"`.
- Sortie de blocage : `{"decision":"block","reason":…}` → `{"decision":"deny","reason":…}`, plus `systemMessage` pour le texte vu par le fondateur. **C'est la seule modification de fond du port-guard** — le reste du schéma `settings.json` est identique.

**Chemins et fichiers**
- `~/.claude` → `~/.gemini` · `CLAUDE.md` → `GEMINI.md` · `.claudeignore` → `.geminiignore`
- `@startup-box/HARNESS.md` → `@./startup-box/HARNESS.md`

**Prose** (8 occurrences sur 5 fichiers, mesurées sur 3 097 lignes)
- « via l'outil Skill » → activation par `activate_skill`
- « via l'outil Agent » → délégation `@<nom-agent>`
- « Claude Code », « Claude » → le nom du runtime, ou « l'assistant »
- Dans les doctrines : « `CLAUDE.md` » → « le fichier de contexte de l'agent ». **C'est le plus gros morceau de prose** : `CLAUDE_HEALTH_RULES.md` compte à lui seul ~40 occurrences et parle littéralement des fichiers `CLAUDE.md`. À traiter à la main une fois, pas au regex.

## Phase 2 — `scripts/to-gemini.mjs`

Un seul script, deux modes :
- `--install` : lit le clone, convertit à la volée, écrit dans `~/.gemini/{agents,skills,startup-box,hooks}` + `GEMINI.md` + `settings.json`.
- `--check` : convertit en mémoire et **assert** (pour la CI, cf. Phase 5).

Contraintes reprises de `startup-box-update.js`, non négociables (ce code tourne seul chez un non-développeur) : non bloquant, `exit 0` quoi qu'il arrive, ne touche que les dossiers qu'on possède, ne réécrit jamais un `GEMINI.md` perso hors de ses marqueurs.

## Phase 3 — `INSTALL.md` : détection du runtime

Le prompt d'install actuel ne devient pas conditionnel : on ajoute un **deuxième bloc**, entre marqueurs comme l'existant (la page d'onboarding lit ces marqueurs en live, donc elle publiera le nouveau prompt sans redéploiement).

Étape 0 du prompt Gemini : détecter l'OS **et** vérifier que `gemini` répond. Puis clone → `node ~/.start-up-box/scripts/to-gemini.mjs --install` → fusion de `settings.json` (hook `SessionStart` + `general.defaultApprovalMode`) → vérification des 4 fichiers témoins → « Installation terminée ✓ » → enchaîner `build-company`.

Prérequis à réécrire pour ce bloc : plus de Claude Code ni d'abonnement Max ; `npm install -g @google/gemini-cli` + compte Google.

## Phase 4 — Auto-update bi-cible

`hooks/startup-box-update.js` : remplacer la constante `CLAUDE_DIR` par une **détection** (`~/.claude` et/ou `~/.gemini` — les deux peuvent coexister sur la même machine) et boucler la resync sur chaque cible trouvée, en passant par le convertisseur pour la cible Gemini. Le reste de la mécanique ne bouge pas : pull ff-only, fail-silent, gate `hooks/VERSION` pour le code exécutable, health-check.

**Bumper `hooks/VERSION`** — sinon aucun fondateur ne reçoit la nouvelle version du hook.

## Phase 5 — CI

Étendre `scripts/scan-gate.mjs` et le workflow : ajouter `PROTOCOLE_GEMINI.md` à `SCAN_FILES`, et faire tourner `to-gemini.mjs --check` qui échoue si, dans la sortie convertie, il reste : `model: opus|sonnet`, `PreToolUse`, `"decision":"block"`, `~/.claude`, ou un nom d'outil hors table. Même logique que le scan-gate actuel : un build rouge visible depuis le mobile, rien n'atteint les fondateurs.

## Phase 6 — Recette manuelle (preuve avant « fait »)

Sur une machine propre, dans la peau du fondateur : installer via le prompt, dire « je veux lancer ma boîte », et vérifier **quatre** choses — le harness est bien chargé (`/memory show`), une skill s'active, un agent est délégué, et le hook resynchronise à la deuxième conversation. Tant que ces quatre-là ne sont pas vues, le support Gemini n'existe pas.

## À trancher (3 décisions, pas des tâches)

1. **Mode d'approbation.** Le harness promet que le fondateur ne valide jamais rien de technique ; Gemini demande confirmation à chaque activation de skill et à chaque outil. Réglable via `general.defaultApprovalMode` : `yolo` (tout est auto-approuvé — tient la promesse, supprime tous les garde-fous) ou `auto_edit` (les écritures de fichiers passent seules, le shell demande). **Reco : `auto_edit`** — le fondateur ne voit pas passer l'essentiel du travail, et la seule barrière qui reste est celle qui protège du destructeur, ce que le harness demande déjà (« tu confirmes avant l'irréversible »).
2. **Support officiel ou best-effort ?** Officiel = charge de maintenance ×2 (toute évolution se teste sur deux runtimes). Best-effort = on documente que Gemini est supporté sans garantie, et la recette Phase 6 ne tourne qu'aux versions majeures.
3. **Le double-writer `meta-rules/`** (le canal 2 du gate côté mainteneur écrit les mêmes 5 fichiers depuis une autre source, et pousse tout seul). **À trancher AVANT la Phase 2**, sinon il écrasera la sortie du nouveau pipeline comme il écraserait déjà la version actuelle.

## Risques connus

- **Quota** : 1 000 requêtes/jour, et une demande du fondateur = plusieurs requêtes. Un `build-company` complet peut le manger. À mesurer en Phase 0, à documenter dans `INSTALL.md`.
- **Rotation des ids de modèles** : neutralisée en supprimant `model:` (Phase 1).
- **Churn des noms d'outils** : neutralisé en vérifiant sur la machine cible (Phase 0) plutôt que dans la doc.
- **Bug hooks user-level** : c'est la Phase 0 point 3 ; sans lui, l'auto-update n'existe pas sur Gemini.

## Références externes

- Skills, subagents, hooks, quotas : documentation Gemini CLI (`geminicli.com/docs`) et `docs/` du dépôt `google-gemini/gemini-cli`.
- **GSD supporte déjà Gemini CLI nativement** (installeur multi-runtime, commandes namespacées en `/gsd:<commande>`). La phase 6 « Build » de `build-company` n'est donc **pas** un point bloquant : seule la commande d'install de GSD change de forme. À vérifier au moment d'écrire la Phase 3.

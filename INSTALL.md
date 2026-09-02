# Prompt-installeur start-up-box

La box s'installe sur **Claude Code** ou sur **Gemini CLI** — même agents, mêmes compétences, même parcours. Choisis ton assistant :

- **Claude Code** (abonnement Max) → prérequis + prompt ci-dessous.
- **Gemini CLI** (gratuit, compte Google) → [aller directement à la section Gemini](#installer-sur-gemini-cli-gratuit).

---

**Prérequis immédiats — Claude Code** (avant de lancer le prompt) :
- **Git** → https://git-scm.com/downloads (`git --version` pour vérifier)
- **Claude Code** → https://claude.ai/download
- **Abonnement Max** → https://claude.ai/upgrade

**Prérequis Phase 6 — Build** (tu n'en as pas besoin maintenant — et tu n'auras rien à configurer seul : à la phase Build, l'assistant te prend par la main pour chacun, avec les URLs) :
- **GSD** (moteur de build par phases) → `npx get-shit-done-cc --global` — l'assistant détecte s'il manque et l'installe pour toi ([repo](https://github.com/glittercowboy/get-shit-done))
- **Node.js ≥18** → https://nodejs.org (si app web ; requis aussi par GSD/Railway)
- **GitHub CLI (gh)** → https://cli.github.com (pour créer et versionner le repo)
- **Railway** → https://railway.app (déploiement, si app web)
- **Clé API IA** → Anthropic https://console.anthropic.com/settings/keys ou OpenRouter https://openrouter.ai/keys (si le produit appelle un LLM)

⚠ **Windows** : le prompt utilise des chemins Unix (`~/`). Claude Code les résout automatiquement via WSL ou Git Bash. Si ça échoue, lancer Claude Code depuis Git Bash.

---

## Le prompt à copier-coller (Claude Code)

Ouvre Claude Code (dans n'importe quel dossier), copie le bloc ci-dessous et colle-le :

<!-- PROMPT:START — la page d'onboarding lit ce bloc depuis ce fichier (source unique) -->
```
Installe start-up-box sur cette machine. C'est un toolkit IA pour créer une startup de A à Z. Je ne suis pas développeur : fais TOUT toi-même, ne me demande aucune commande.

Exécute ces étapes dans l'ordre avec tes outils bash :

0. Repère d'abord mon système (Mac/Linux ou Windows) et dis-le-moi en une ligne. Les commandes ci-dessous sont en syntaxe Unix (`~/`, `cp`, `mkdir -p`) : sur Mac/Linux elles marchent telles quelles ; sur Windows, exécute-les depuis Git Bash (livré avec Git) et, si l'une échoue, bascule sur son équivalent natif. Tu détectes et tu adaptes — aucune question technique à me poser.

1. Clone le repo :
   git clone https://github.com/oscardcstudio-cell/start-up-box.git ~/.start-up-box

2. Installe les agents :
   mkdir -p ~/.claude/agents
   cp ~/.start-up-box/plugins/startup-agents/agents/*.md ~/.claude/agents/

3. Installe les compétences :
   mkdir -p ~/.claude/skills
   cp -r ~/.start-up-box/plugins/startup-skills/skills/* ~/.claude/skills/

4. Installe la couche meta (harness fondateur + doctrines) — c'est ce qui te dit comment me parler :
   mkdir -p ~/.claude/startup-box
   cp -r ~/.start-up-box/meta-rules/* ~/.claude/startup-box/

5. Installe le mécanisme de mise à jour automatique :
   mkdir -p ~/.claude/hooks
   cp ~/.start-up-box/hooks/*.js ~/.claude/hooks/
   cp ~/.start-up-box/hooks/VERSION ~/.claude/startup-box/.hooks-version

6. Branche le harness au-dessus de tous mes projets, SANS écraser un CLAUDE.md perso existant :
   - Si ~/.claude/CLAUDE.md n'existe pas → crée-le avec, sur une ligne : @startup-box/HARNESS.md
   - S'il existe déjà et ne contient pas cette ligne → ajoute @startup-box/HARNESS.md à la fin.

7. Active la mise à jour auto à chaque conversation : ajoute (en fusionnant, sans casser l'existant) ce hook dans ~/.claude/settings.json :
   { "hooks": { "SessionStart": [ { "hooks": [ { "type": "command", "command": "node ~/.claude/hooks/startup-box-update.js" } ] } ] } }
   Si settings.json existe déjà, parse-le, ajoute cette entrée à hooks.SessionStart (crée les clés manquantes), et ne crée pas de doublon si elle est déjà là.

8. Vérifie que ces fichiers existent : ~/.claude/agents/meta-business.md, ~/.claude/skills/build-company/SKILL.md, ~/.claude/startup-box/HARNESS.md, ~/.claude/hooks/startup-box-update.js.

9. Dis-moi "Installation terminée ✓", puis propose de démarrer tout de suite : dès que je réponds (oui / "je veux lancer ma boîte" / etc.), lance toi-même la skill build-company (phase 0 : cadrage). Je n'ai aucune commande à taper — si le dossier company/ manque, tu le crées tout seul avant de continuer.
```
<!-- PROMPT:END -->

---

## Ce qui se passe ensuite

Une fois l'install terminée, ouvre Claude Code **dans le dossier de ton projet** et lance **une seule** commande :

```
/build-company      ← démarre tout : cadrage de ton idée (phase 0)
```

Ou écris-le en langage normal — par ex. _« je veux lancer ma boîte »_. C'est le seul truc à taper.

Le reste, Claude l'enchaîne tout seul : s'il manque le dossier `company/`, il le crée automatiquement avant de continuer (tu n'as pas à taper de commande pour ça). Il te posera des questions, écrira dans tes fichiers, et te demandera de valider chaque étape avant de passer à la suivante.

---

## Installer sur Gemini CLI (gratuit)

**Prérequis** :
- **Git** → https://git-scm.com/downloads
- **Node.js ≥18** → https://nodejs.org
- **Gemini CLI** → dans un terminal : `npm install -g @google/gemini-cli`, puis lancer `gemini` et se connecter avec un compte Google.

Pas d'abonnement payant : le palier gratuit donne 60 requêtes/minute et 1 000 par jour, Gemini 3 Pro inclus. Attention, **une** demande consomme plusieurs requêtes — sur une grosse journée de travail tu peux atteindre le plafond, il se réinitialise le lendemain.

Ouvre `gemini` (dans n'importe quel dossier), copie le bloc ci-dessous et colle-le :

<!-- GEMINI_PROMPT:START — la page d'onboarding peut lire ce bloc depuis ce fichier (source unique) -->
```
Installe start-up-box sur cette machine. C'est un toolkit IA pour créer une startup de A à Z. Je ne suis pas développeur : fais TOUT toi-même, ne me demande aucune commande, et ne me montre pas de détails techniques — dis-moi juste où tu en es en français normal.

1. Repère mon système (Mac/Linux ou Windows) et dis-le-moi en une ligne. Les commandes ci-dessous sont en syntaxe Unix ; sur Windows, exécute-les depuis Git Bash et bascule sur l'équivalent natif si l'une échoue. Tu détectes et tu adaptes.

2. Récupère la box :
   git clone https://github.com/oscardcstudio-cell/start-up-box.git ~/.start-up-box
   (si le dossier existe déjà : git -C ~/.start-up-box pull --ff-only)

3. Installe-la, convertie pour toi. La box est écrite pour un autre assistant ; ce script la traduit vers tes formats à toi (noms d'outils, événements de hook, fichier de contexte) et l'installe dans ~/.gemini :
   node ~/.start-up-box/scripts/to-gemini.mjs --install

   Il installe : les 9 agents dans ~/.gemini/agents, les compétences dans ~/.gemini/skills, la couche meta dans ~/.gemini/startup-box, le harness branché dans ~/.gemini/GEMINI.md, et deux hooks dans ~/.gemini/settings.json (mise à jour automatique + garde-fou sur les ports).

4. VÉRIFIE TOI-MÊME QUE LA TRADUCTION COLLE À TA VERSION (important — ne saute pas cette étape) :

   a. Outils : ouvre ~/.gemini/agents/meta-gamification.md et ~/.gemini/agents/meta-offre-pricing.md, regarde leur ligne "tools:". Compare chaque nom à TES outils réels. Si l'un n'existe pas chez toi (le cas connu : "grep_search" peut s'appeler "search_file_content" selon la version), corrige-le dans les deux fichiers ET dans ~/.start-up-box/scripts/gemini-map.mjs (dictionnaire TOOL_MAP), pour que la correction survive aux mises à jour. Dis-moi en une ligne si tu as dû corriger quelque chose.

   b. Harness : recharge ton contexte puis affiche-le. Tu dois y voir un texte qui commence par "Harness fondateur". Si tu ne le vois pas, l'import n'a pas fonctionné sur ta version : relance
      node ~/.start-up-box/scripts/to-gemini.mjs --install --inline-harness
      (ça écrit le texte directement dans GEMINI.md au lieu de l'importer), puis revérifie.

   c. Mise à jour automatique : confirme que ~/.gemini/settings.json contient bien un hook SessionStart pointant sur startup-box-update.js. Préviens-moi que si un jour la box ne se met plus à jour toute seule, il me suffira de te dire "mets à jour la box".

5. Vérifie que ces fichiers existent : ~/.gemini/agents/meta-business.md, ~/.gemini/skills/build-company/SKILL.md, ~/.gemini/startup-box/HARNESS.md, ~/.gemini/hooks/startup-box-update.js.

6. Dis-moi "Installation terminée ✓" et résume en 3 lignes ce que tu sais faire maintenant. Puis propose de démarrer tout de suite : dès que je réponds (oui / "je veux lancer ma boîte" / etc.), lance toi-même la compétence build-company (phase 0 : cadrage). Je n'ai aucune commande à taper — si le dossier company/ manque, tu le crées tout seul avant de continuer.
```
<!-- GEMINI_PROMPT:END -->

Ensuite, comme sur Claude Code : ouvre `gemini` **dans le dossier de ton projet** et dis simplement _« je veux lancer ma boîte »_. Tout le reste s'enchaîne.

### Mettre à jour sur Gemini

Normalement rien à faire — le hook installé à l'étape 3 met la box à jour à chaque conversation. Si ça ne se fait pas, colle ceci :

<!-- GEMINI_UPDATE_PROMPT:START -->
```
Mets à jour start-up-box. Je ne suis pas développeur : fais tout toi-même.
1. git -C ~/.start-up-box pull --ff-only (si le dossier n'existe pas, clone https://github.com/oscardcstudio-cell/start-up-box.git dans ~/.start-up-box)
2. node ~/.start-up-box/scripts/to-gemini.mjs --install
3. Vérifie que le harness est bien chargé dans ton contexte, et dis-moi "Mise à jour terminée ✓" avec un résumé de ce qui a changé.
```
<!-- GEMINI_UPDATE_PROMPT:END -->

### Désinstaller (Claude Code) (Gemini)

```bash
rm -rf ~/.start-up-box
rm -f ~/.gemini/agents/meta-*.md
rm -rf ~/.gemini/skills/build-company ~/.gemini/skills/create-company ~/.gemini/skills/design-director ~/.gemini/skills/autoresearch
rm -rf ~/.gemini/startup-box ~/.gemini/hooks/startup-box-update.js ~/.gemini/hooks/port-guard.js
```
(puis retirer le bloc `startup-box` de `~/.gemini/GEMINI.md` et les hooks de `~/.gemini/settings.json`)

---

## Mettre à jour sur Claude Code (une seule fois, ensuite c'est automatique)

Si tu as installé la box **avant** que la mise à jour automatique existe, fais cette mise à jour **une fois** : elle installe le mécanisme qui fera toutes les suivantes tout seul, à chaque conversation.

Ouvre Claude Code (n'importe quel dossier), colle ce prompt :

<!-- UPDATE_PROMPT:START — la page d'onboarding lit ce bloc depuis ce fichier (source unique) -->
```
Mets à jour start-up-box sur cette machine. Je ne suis pas développeur : fais tout toi-même, ne me demande aucune commande.

0. Repère mon système (Mac/Linux ou Windows). Commandes en syntaxe Unix ci-dessous : sur Windows, exécute-les depuis Git Bash et bascule sur l'équivalent natif si l'une échoue. Tu détectes et tu adaptes.
1. Mets ~/.start-up-box sur la dernière version distante : si le dossier existe, fais un git pull (ou, en cas de conflit local, un reset --hard sur la version distante) ; s'il n'existe pas, clone https://github.com/oscardcstudio-cell/start-up-box.git dans ~/.start-up-box.
2. Recopie les agents : cp ~/.start-up-box/plugins/startup-agents/agents/*.md ~/.claude/agents/
3. Recopie les compétences : cp -r ~/.start-up-box/plugins/startup-skills/skills/* ~/.claude/skills/
4. Installe la couche meta : mkdir -p ~/.claude/startup-box && cp -r ~/.start-up-box/meta-rules/* ~/.claude/startup-box/
5. Installe la mise à jour automatique : mkdir -p ~/.claude/hooks && cp ~/.start-up-box/hooks/*.js ~/.claude/hooks/ && cp ~/.start-up-box/hooks/VERSION ~/.claude/startup-box/.hooks-version
6. Branche le harness sans écraser mon CLAUDE.md perso : si ~/.claude/CLAUDE.md ne contient pas la ligne @startup-box/HARNESS.md, ajoute-la à la fin (crée le fichier s'il manque).
7. Active la mise à jour à chaque conversation : fusionne dans ~/.claude/settings.json (sans créer de doublon, sans casser l'existant) : { "hooks": { "SessionStart": [ { "hooks": [ { "type": "command", "command": "node ~/.claude/hooks/startup-box-update.js" } ] } ] } }
8. Dis "Mise à jour terminée ✓" et résume ce qui a changé. À partir de maintenant, les mises à jour se font toutes seules à chaque conversation — je n'aurai plus rien à coller.
```
<!-- UPDATE_PROMPT:END -->

> Une fois ce prompt passé, tu n'auras **plus jamais** à le refaire : le hook installé à l'étape 5+7 récupère les nouveautés à chaque démarrage de conversation.

---

## GitHub, Railway, clés API (optionnel — recommandé mais pas bloquant)

Rien à installer ni configurer **pour commencer** : tu peux travailler en local.

Quand tu arrives à la **phase 6 (Build)**, `/build-company` te **prend par la main** : pour chaque outil nécessaire à TON projet (GitHub + gh, clé API IA, Railway), il t'explique à quoi ça sert, te donne l'URL exacte, te dit ce que tu fais toi-même (créer le compte, copier une clé) — et fait **tout le reste à ta place** en ligne de commande (`gh auth login`, créer le repo, déployer). Tu n'as pas à chercher quoi que ce soit.

---

## Désinstaller

```bash
rm -rf ~/.start-up-box
rm ~/.claude/agents/meta-*.md
rm -rf ~/.claude/skills/build-company
rm -rf ~/.claude/skills/create-company
rm -rf ~/.claude/skills/design-director
rm -rf ~/.claude/skills/autoresearch
```

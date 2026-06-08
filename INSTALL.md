# Prompt-installeur start-up-box

**Prérequis immédiats** (avant de lancer le prompt) :
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

## Le prompt à copier-coller

Ouvre Claude Code (dans n'importe quel dossier), copie le bloc ci-dessous et colle-le :

```
Installe start-up-box sur cette machine. C'est un toolkit IA pour créer une startup de A à Z. Je ne suis pas développeur : fais TOUT toi-même, ne me demande aucune commande.

Exécute ces étapes dans l'ordre avec tes outils bash :

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

---

## Ce qui se passe ensuite

Une fois l'install terminée, ouvre Claude Code **dans le dossier de ton projet** et lance **une seule** commande :

```
/build-company      ← démarre tout : cadrage de ton idée (phase 0)
```

Ou écris-le en langage normal — par ex. _« je veux lancer ma boîte »_. C'est le seul truc à taper.

Le reste, Claude l'enchaîne tout seul : s'il manque le dossier `company/`, il le crée automatiquement avant de continuer (tu n'as pas à taper de commande pour ça). Il te posera des questions, écrira dans tes fichiers, et te demandera de valider chaque étape avant de passer à la suivante.

---

## Installer via le marketplace (alternative)

Si tu préfères utiliser le système de plugin officiel Claude Code :

```
/plugin marketplace add https://github.com/oscardcstudio-cell/start-up-box
/plugin install startup-agents@start-up-box
/plugin install startup-skills@start-up-box
```

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

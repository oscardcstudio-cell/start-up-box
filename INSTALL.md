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
Installe start-up-box sur cette machine. C'est un toolkit IA pour créer une startup de A à Z.

Exécute ces étapes dans l'ordre avec tes outils bash :

1. Clone le repo :
   git clone https://github.com/oscardcstudio-cell/start-up-box.git ~/.start-up-box

2. Installe les agents :
   mkdir -p ~/.claude/agents
   cp ~/.start-up-box/plugins/startup-agents/agents/*.md ~/.claude/agents/

3. Installe les skills (les 4 : build-company, create-company, design-director, autoresearch) :
   mkdir -p ~/.claude/skills
   cp -r ~/.start-up-box/plugins/startup-skills/skills/* ~/.claude/skills/

4. Vérifie que ces fichiers existent :
   ~/.claude/agents/meta-business.md
   ~/.claude/skills/build-company/SKILL.md

5. Dis-moi "Installation terminée ✓" et explique-moi les deux prochaines commandes à lancer.
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

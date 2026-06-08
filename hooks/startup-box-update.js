#!/usr/bin/env node
// startup-box-update — hook SessionStart installé chez le fondateur.
// But : à chaque début de conversation, récupérer la dernière version de start-up-box
// (agents, skills, harness, doctrines) pour que les mises à jour du mainteneur arrivent seules.
//
// SÛRETÉ (non négociable — ce code tourne seul chez quelqu'un qui n'est pas dev) :
//  1. NON BLOQUANT : quoi qu'il arrive, exit 0. Jamais d'erreur rouge au démarrage.
//  2. ff-only + timeout : pas de merge, pas de blocage réseau.
//  3. Contenu (.md) mis à jour automatiquement ; HOOKS EXÉCUTABLES mis à jour SEULEMENT
//     si la version distante des hooks > version installée (gate anti-auto-exec sauvage).
//  4. Fichiers managés isolés : on n'écrase jamais le CLAUDE.md perso du fondateur,
//     on possède ~/.claude/startup-box/ et on s'y limite (+ un @import ajouté une fois).
//  5. Health-check : si une resync laisse un fichier critique vide/absent, on n'aggrave pas.

const fs = require('fs')
const path = require('path')
const os = require('os')
const { execFileSync } = require('child_process')

const HOME = os.homedir()
const SRC = path.join(HOME, '.start-up-box')              // clone fait par le prompt d'install
const CLAUDE_DIR = path.join(HOME, '.claude')
const MANAGED = path.join(CLAUDE_DIR, 'startup-box')      // dossier qu'on possède et écrase
const IMPORT_LINE = '@startup-box/HARNESS.md'

const log = (m) => { try { process.stderr.write(`[start-up-box] ${m}\n`) } catch {} }
const ok = () => process.exit(0)

function git(args, timeout = 15000) {
  return execFileSync('git', args, { cwd: SRC, timeout, stdio: ['ignore', 'pipe', 'pipe'] }).toString()
}
function copyInto(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return
  fs.mkdirSync(destDir, { recursive: true })
  for (const f of fs.readdirSync(srcDir)) {
    fs.cpSync(path.join(srcDir, f), path.join(destDir, f), { recursive: true, force: true })
  }
}
function readIntFile(p) { try { return parseInt(fs.readFileSync(p, 'utf8').trim(), 10) || 0 } catch { return 0 } }
function healthy() {
  const harness = path.join(MANAGED, 'HARNESS.md')
  const skill = path.join(CLAUDE_DIR, 'skills', 'build-company', 'SKILL.md')
  try { return fs.existsSync(harness) && fs.statSync(harness).size > 0 && fs.existsSync(skill) } catch { return false }
}

try {
  // 0. Installé via clone ? sinon (plugin marketplace, etc.) on ne touche à rien.
  if (!fs.existsSync(SRC) || !fs.existsSync(path.join(SRC, '.git'))) ok()
  // git dispo ?
  try { execFileSync('git', ['--version'], { timeout: 5000, stdio: 'ignore' }) } catch { ok() }

  // 1. Pull ff-only (fail-silent). On retient si quelque chose a bougé.
  let upToDate = false
  try {
    const out = git(['pull', '--ff-only', '-q'])
    upToDate = /already up to date|déjà à jour/i.test(out) || out.trim() === ''
  } catch { ok() } // offline / conflit / pas de remote → on garde la copie locale, silencieux

  // 2. Resync du CONTENU seulement si nécessaire (changement distant OU install incomplète).
  if (!upToDate || !healthy()) {
    copyInto(path.join(SRC, 'plugins', 'startup-agents', 'agents'), path.join(CLAUDE_DIR, 'agents'))
    copyInto(path.join(SRC, 'plugins', 'startup-skills', 'skills'), path.join(CLAUDE_DIR, 'skills'))
    copyInto(path.join(SRC, 'meta-rules'), MANAGED)

    // 3. Brancher le harness au-dessus du projet via le CLAUDE.md user — sans écraser ses persos.
    const userClaude = path.join(CLAUDE_DIR, 'CLAUDE.md')
    if (!fs.existsSync(userClaude)) {
      fs.writeFileSync(userClaude, `# Mes règles Claude\n\n<!-- bloc managé start-up-box : ne pas éditer cette ligne -->\n${IMPORT_LINE}\n`)
    } else {
      const cur = fs.readFileSync(userClaude, 'utf8')
      if (!cur.includes(IMPORT_LINE)) {
        fs.writeFileSync(userClaude, cur.replace(/\s*$/, '') + `\n\n<!-- bloc managé start-up-box -->\n${IMPORT_LINE}\n`)
      }
    }
  }

  // 4. Hooks exécutables : gate par version (risque #1). On NE recopie le code que si bump explicite.
  const remoteHooksV = readIntFile(path.join(SRC, 'hooks', 'VERSION'))
  const localHooksV = readIntFile(path.join(MANAGED, '.hooks-version'))
  if (remoteHooksV > localHooksV) {
    const srcHooks = path.join(SRC, 'hooks')
    const destHooks = path.join(CLAUDE_DIR, 'hooks')
    fs.mkdirSync(destHooks, { recursive: true })
    for (const f of fs.readdirSync(srcHooks)) {
      if (f.endsWith('.js')) fs.cpSync(path.join(srcHooks, f), path.join(destHooks, f), { force: true })
    }
    fs.mkdirSync(MANAGED, { recursive: true })
    fs.writeFileSync(path.join(MANAGED, '.hooks-version'), String(remoteHooksV))
    log(`mise à jour technique installée (v${remoteHooksV}) — elle sera active à la prochaine conversation.`)
  }
} catch (e) {
  // Filet ultime : on ne casse jamais le démarrage.
  log('mise à jour ignorée (sans incidence).')
}
ok()

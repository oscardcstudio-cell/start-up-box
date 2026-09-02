#!/usr/bin/env node
// startup-box-update — hook SessionStart installé chez le fondateur.
// But : à chaque début de conversation, récupérer la dernière version de start-up-box
// (agents, skills, harness, doctrines) pour que les mises à jour du mainteneur arrivent seules.
//
// BI-CIBLE : le même hook sert Claude Code (~/.claude) ET Gemini CLI (~/.gemini), et les
// deux peuvent coexister sur la même machine. Côté Gemini, la resync passe par
// scripts/to-gemini.mjs (conversion à la volée) — le repo ne commite QUE la version Claude.
//
// SÛRETÉ (non négociable — ce code tourne seul chez quelqu'un qui n'est pas dev) :
//  1. NON BLOQUANT : quoi qu'il arrive, exit 0. Jamais d'erreur rouge au démarrage.
//  2. ff-only + timeout : pas de merge, pas de blocage réseau.
//  3. Contenu (.md) mis à jour automatiquement ; HOOKS EXÉCUTABLES mis à jour SEULEMENT
//     si la version distante des hooks > version installée (gate anti-auto-exec sauvage).
//  4. Fichiers managés isolés : on n'écrase jamais le fichier de contexte perso du
//     fondateur, on possède ~/.<runtime>/startup-box/ et on s'y limite.
//  5. Health-check : si une resync laisse un fichier critique vide/absent, on n'aggrave pas.
//  6. Aucune cible n'est créée de force : on ne resynchronise QUE les runtimes déjà présents.

const fs = require('fs')
const path = require('path')
const os = require('os')
const { execFileSync } = require('child_process')

const HOME = os.homedir()
const SRC = path.join(HOME, '.start-up-box')              // clone fait par le prompt d'install
const CLAUDE_DIR = path.join(HOME, '.claude')
const GEMINI_DIR = path.join(HOME, '.gemini')
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

function healthyClaude() {
  const harness = path.join(MANAGED, 'HARNESS.md')
  const skill = path.join(CLAUDE_DIR, 'skills', 'build-company', 'SKILL.md')
  try { return fs.existsSync(harness) && fs.statSync(harness).size > 0 && fs.existsSync(skill) } catch { return false }
}
function healthyGemini() {
  const harness = path.join(GEMINI_DIR, 'startup-box', 'HARNESS.md')
  const skill = path.join(GEMINI_DIR, 'skills', 'build-company', 'SKILL.md')
  try { return fs.existsSync(harness) && fs.statSync(harness).size > 0 && fs.existsSync(skill) } catch { return false }
}

function ensurePortGuardRegistered() {
  try {
    const settingsPath = path.join(CLAUDE_DIR, 'settings.json')
    const hookCmd = `node ${path.join(CLAUDE_DIR, 'hooks', 'port-guard.js').replace(/\\/g, '/')}`
    let settings = {}
    try { settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8')) } catch {}
    if (!settings.hooks) settings.hooks = {}
    if (!settings.hooks.PreToolUse) settings.hooks.PreToolUse = []
    let bashBlock = settings.hooks.PreToolUse.find(b => b.matcher === 'Bash')
    if (!bashBlock) {
      bashBlock = { matcher: 'Bash', hooks: [] }
      settings.hooks.PreToolUse.push(bashBlock)
    }
    if (!bashBlock.hooks) bashBlock.hooks = []
    const alreadyThere = bashBlock.hooks.some(h => h.command && h.command.includes('port-guard.js'))
    if (!alreadyThere) {
      bashBlock.hooks.push({ type: 'command', command: hookCmd })
      fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2))
    }
  } catch { /* fail-silent */ }
}

// Resync Gemini : délégué au convertisseur livré dans le clone. Isolé dans un process
// séparé — s'il échoue, il n'emporte pas la resync Claude ni le démarrage.
function syncGemini(withHooks) {
  try {
    const script = path.join(SRC, 'scripts', 'to-gemini.mjs')
    if (!fs.existsSync(script)) return
    const args = [script, '--install']
    if (!withHooks) args.push('--skip-hooks')
    execFileSync(process.execPath, args, { timeout: 30000, stdio: ['ignore', 'ignore', 'pipe'] })
  } catch { /* fail-silent */ }
}

try {
  // 0. Installé via clone ? sinon on ne touche à rien.
  if (!fs.existsSync(SRC) || !fs.existsSync(path.join(SRC, '.git'))) ok()
  // git dispo ?
  try { execFileSync('git', ['--version'], { timeout: 5000, stdio: 'ignore' }) } catch { ok() }

  // Cibles réellement installées. On ne crée jamais le dossier d'un runtime absent :
  // un fondateur qui n'a que Gemini ne doit pas voir apparaître un ~/.claude fantôme.
  const doClaude = fs.existsSync(CLAUDE_DIR)
  const doGemini = fs.existsSync(GEMINI_DIR)
  if (!doClaude && !doGemini) ok()

  // 1. Pull ff-only (fail-silent). Détection de changement par HEAD avant/après :
  //    `git pull -q` n'écrit RIEN sur stdout même quand il met à jour → se fier à la
  //    sortie ferait sauter la resync (bug réel). On compare donc les commits.
  let changed = false
  try {
    const before = git(['rev-parse', 'HEAD']).trim()
    git(['pull', '--ff-only', '-q'])
    const after = git(['rev-parse', 'HEAD']).trim()
    changed = before !== after
  } catch { ok() } // offline / conflit / pas de remote → on garde la copie locale, silencieux

  // 2. Gate de version des hooks : le CODE exécutable ne se met à jour que sur bump
  //    explicite. Calculé avant les resyncs — les deux cibles le respectent.
  const remoteHooksV = readIntFile(path.join(SRC, 'hooks', 'VERSION'))
  const localHooksV = Math.max(
    readIntFile(path.join(MANAGED, '.hooks-version')),
    readIntFile(path.join(GEMINI_DIR, 'startup-box', '.hooks-version')),
  )
  const hooksBumped = remoteHooksV > localHooksV

  // 3. Resync du CONTENU si quelque chose a bougé distant OU si une install est incomplète.
  if (doClaude && (changed || !healthyClaude())) {
    copyInto(path.join(SRC, 'plugins', 'startup-agents', 'agents'), path.join(CLAUDE_DIR, 'agents'))
    copyInto(path.join(SRC, 'plugins', 'startup-skills', 'skills'), path.join(CLAUDE_DIR, 'skills'))
    copyInto(path.join(SRC, 'meta-rules'), MANAGED)

    // Brancher le harness au-dessus du projet via le CLAUDE.md user — sans écraser ses persos.
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

  if (doGemini && (changed || !healthyGemini() || hooksBumped)) syncGemini(hooksBumped)

  // 4. Hooks exécutables côté Claude : recopie seulement si bump explicite (risque #1).
  if (doClaude && hooksBumped) {
    const srcHooks = path.join(SRC, 'hooks')
    const destHooks = path.join(CLAUDE_DIR, 'hooks')
    fs.mkdirSync(destHooks, { recursive: true })
    for (const f of fs.readdirSync(srcHooks)) {
      if (f.endsWith('.js')) fs.cpSync(path.join(srcHooks, f), path.join(destHooks, f), { force: true })
    }
    fs.mkdirSync(MANAGED, { recursive: true })
    fs.writeFileSync(path.join(MANAGED, '.hooks-version'), String(remoteHooksV))
  }
  if (hooksBumped) log(`mise à jour technique installée (v${remoteHooksV}) — elle sera active à la prochaine conversation.`)

  // 5. Enregistrer port-guard.js dans settings.json (PreToolUse Bash) — idempotent.
  //    Côté Gemini, to-gemini.mjs s'en charge (événement BeforeTool, autre nom d'outil).
  if (doClaude) ensurePortGuardRegistered()
} catch (e) {
  // Filet ultime : on ne casse jamais le démarrage.
  log('mise à jour ignorée (sans incidence).')
}
ok()

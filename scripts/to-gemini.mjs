#!/usr/bin/env node
// to-gemini — génère et installe la version Gemini CLI de la box depuis la version
// Claude (la seule commitée). Tourne CHEZ LE FONDATEUR : à l'install, puis à chaque
// conversation via le hook startup-box-update.
//
// Usage :
//   node scripts/to-gemini.mjs --install              # convertit + installe dans ~/.gemini
//   node scripts/to-gemini.mjs --install --inline-harness
//   node scripts/to-gemini.mjs --check                # CI : convertit en mémoire et assert
//   node scripts/to-gemini.mjs --dry-run              # liste ce qui serait écrit
//   (options de test : --home <dir>, --src <dir>)
//
// SÛRETÉ — mêmes contraintes que startup-box-update.js (ce code tourne seul chez
// quelqu'un qui n'est pas développeur) :
//   1. En mode --install : NON BLOQUANT, exit 0 quoi qu'il arrive.
//   2. On ne possède que ~/.gemini/{agents,skills,startup-box,hooks} — jamais le reste.
//   3. Le GEMINI.md perso n'est jamais écrasé : on ajoute une ligne (ou un bloc entre
//      marqueurs) et on ne touche à rien d'autre.
//   4. settings.json : fusion, jamais remplacement, jamais de doublon.

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync, cpSync } from 'fs'
import { join, dirname, relative } from 'path'
import { fileURLToPath } from 'url'
import { homedir } from 'os'
import { convert, RESIDUAL, GEMINI_TOOLS } from './gemini-map.mjs'

const argv = process.argv.slice(2)
const has = (f) => argv.includes(f)
const val = (f, d) => { const i = argv.indexOf(f); return i >= 0 && argv[i + 1] ? argv[i + 1] : d }

const SRC = val('--src', join(dirname(fileURLToPath(import.meta.url)), '..'))
const HOME = val('--home', homedir())
const GEM = join(HOME, '.gemini')
const MANAGED = join(GEM, 'startup-box')
const INSTALL = has('--install')
const CHECK = has('--check')
const DRY = has('--dry-run')
const INLINE = has('--inline-harness')
// Le CODE exécutable ne se met à jour que sur bump explicite de hooks/VERSION : le hook
// d'update passe --skip-hooks tant que la version distante n'est pas supérieure.
const SKIP_HOOKS = has('--skip-hooks')
const IMPORT_LINE = '@./startup-box/HARNESS.md'
const MARK_A = '<!-- startup-box:start — bloc managé, ne pas éditer -->'
const MARK_B = '<!-- startup-box:end -->'

const written = []
const log = (m) => { try { process.stderr.write(`[start-up-box:gemini] ${m}\n`) } catch {} }

// ── Sources à convertir ──────────────────────────────────────────────────────
// kind : comment convertir. dest : où poser le résultat sous ~/.gemini.
const UNITS = [
  { src: 'plugins/startup-agents/agents', dest: 'agents',       kind: 'agent' },
  { src: 'plugins/startup-skills/skills', dest: 'skills',       kind: 'md'    },
  { src: 'meta-rules',                    dest: 'startup-box',  kind: 'md'    },
  { src: 'hooks/port-guard.js',           dest: 'hooks/port-guard.js', kind: 'hook', file: true },
  // startup-box-update.js est bi-cible (il gère Claude ET Gemini) : copié tel quel.
  { src: 'hooks/startup-box-update.js',   dest: 'hooks/startup-box-update.js', kind: 'raw', file: true },
]

function listRel(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir).flatMap((f) => {
    if (f === '.git' || f === 'node_modules' || f === '__pycache__' || f.endsWith('.pyc')) return []
    const p = join(dir, f)
    return statSync(p).isDirectory() ? listRel(p).map((r) => join(f, r)) : [f]
  })
}

// Seuls les .md sont convertis en prose ; le reste (scripts .py, requirements.txt,
// images) est copié à l'octet — convertir du code casserait plus que ça ne porte.
const isProse = (f) => f.endsWith('.md')

function planUnit(u) {
  const out = []
  const srcAbs = join(SRC, u.src)
  if (u.file) {
    if (!existsSync(srcAbs)) return out
    out.push({ srcAbs, destAbs: join(GEM, u.dest), kind: u.kind, label: u.dest })
    return out
  }
  for (const rel of listRel(srcAbs)) {
    const kind = u.kind === 'raw' ? 'raw' : (isProse(rel) ? u.kind : 'raw')
    out.push({
      srcAbs: join(srcAbs, rel),
      destAbs: join(GEM, u.dest, rel),
      kind,
      label: join(u.dest, rel).replace(/\\/g, '/'),
    })
  }
  return out
}

const plan = UNITS.flatMap(planUnit).filter((p) => !(SKIP_HOOKS && p.label.startsWith('hooks/')))

// ── Mode --check : convertit en mémoire, assert, exit 1 si résidu ───────────
if (CHECK) {
  let bad = 0
  for (const p of plan) {
    if (p.kind === 'raw') continue
    const out = convert(readFileSync(p.srcAbs, 'utf8'), p.kind)
    for (const r of RESIDUAL) {
      if (r.re.test(out)) { console.error(`✗ ${p.label} — résidu : ${r.why}`); bad++ }
    }
    if (p.kind === 'agent') {
      const m = out.match(/^tools:\s*(.+)$/m)
      if (m) {
        for (const t of m[1].split(',').map((s) => s.trim())) {
          if (!GEMINI_TOOLS.has(t)) { console.error(`✗ ${p.label} — outil inconnu de Gemini : ${t}`); bad++ }
        }
      }
    }
  }
  console.log(bad
    ? `\nto-gemini --check : ${bad} problème(s). La conversion laisserait passer du Claude.`
    : `to-gemini --check : ${plan.length} fichier(s), conversion propre.`)
  process.exit(bad ? 1 : 0)
}

// ── Modes --dry-run / --install ─────────────────────────────────────────────
try {
  for (const p of plan) {
    if (DRY) { written.push(p.label); continue }
    mkdirSync(dirname(p.destAbs), { recursive: true })
    if (p.kind === 'raw') cpSync(p.srcAbs, p.destAbs, { force: true })
    else writeFileSync(p.destAbs, convert(readFileSync(p.srcAbs, 'utf8'), p.kind))
    written.push(p.label)
  }

  // Version des hooks (même gate que côté Claude : le code exécutable ne se met à
  // jour que sur bump explicite de hooks/VERSION).
  const vSrc = join(SRC, 'hooks', 'VERSION')
  if (!DRY && !SKIP_HOOKS && existsSync(vSrc)) {
    mkdirSync(MANAGED, { recursive: true })
    cpSync(vSrc, join(MANAGED, '.hooks-version'), { force: true })
  }

  // ── Brancher le harness dans GEMINI.md, sans écraser le perso ─────────────
  const gmd = join(GEM, 'GEMINI.md')
  if (!DRY) {
    const harnessPath = join(MANAGED, 'HARNESS.md')
    const block = INLINE && existsSync(harnessPath)
      ? `${MARK_A}\n${readFileSync(harnessPath, 'utf8')}\n${MARK_B}\n`
      : `${MARK_A}\n${IMPORT_LINE}\n${MARK_B}\n`
    if (!existsSync(gmd)) {
      mkdirSync(GEM, { recursive: true })
      writeFileSync(gmd, `# Mes règles Gemini\n\n${block}`)
    } else {
      const cur = readFileSync(gmd, 'utf8')
      const re = new RegExp(`${MARK_A.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${MARK_B.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\n?`)
      if (re.test(cur)) writeFileSync(gmd, cur.replace(re, block))
      else if (!cur.includes(IMPORT_LINE)) writeFileSync(gmd, cur.replace(/\s*$/, '') + `\n\n${block}`)
    }
    written.push('GEMINI.md')
  }

  // ── settings.json : hooks + mode d'approbation, en fusion ──────────────────
  if (!DRY) {
    const sPath = join(GEM, 'settings.json')
    let s = {}
    try { s = JSON.parse(readFileSync(sPath, 'utf8')) } catch {}
    const node = (f) => `node ${join(GEM, 'hooks', f).replace(/\\/g, '/')}`
    s.hooks ||= {}

    // SessionStart → auto-update (pas de matcher : l'événement n'est pas lié à un outil)
    s.hooks.SessionStart ||= []
    if (!JSON.stringify(s.hooks.SessionStart).includes('startup-box-update.js')) {
      s.hooks.SessionStart.push({ hooks: [{ type: 'command', command: node('startup-box-update.js') }] })
    }
    // BeforeTool sur le shell → port-guard
    s.hooks.BeforeTool ||= []
    let blk = s.hooks.BeforeTool.find((b) => b.matcher === 'run_shell_command')
    if (!blk) { blk = { matcher: 'run_shell_command', hooks: [] }; s.hooks.BeforeTool.push(blk) }
    blk.hooks ||= []
    if (!blk.hooks.some((h) => h.command && h.command.includes('port-guard.js'))) {
      blk.hooks.push({ type: 'command', command: node('port-guard.js') })
    }

    // Mode d'approbation : le harness promet que le fondateur ne valide rien de
    // technique. `auto_edit` laisse passer les écritures de fichiers et garde la
    // confirmation sur le shell — seule barrière avant l'irréversible, ce que le
    // harness demande déjà. On ne l'écrase JAMAIS s'il a déjà été réglé.
    s.general ||= {}
    if (!s.general.defaultApprovalMode) s.general.defaultApprovalMode = 'auto_edit'

    mkdirSync(GEM, { recursive: true })
    writeFileSync(sPath, JSON.stringify(s, null, 2))
    written.push('settings.json')
  }

  if (DRY) console.log(`to-gemini --dry-run : ${written.length} fichier(s)\n  ` + written.join('\n  '))
  else log(`installé/mis à jour : ${written.length} fichier(s) dans ${GEM}`)
} catch (e) {
  // En install, on ne casse jamais le démarrage d'une conversation.
  if (INSTALL) { log(`conversion ignorée (sans incidence) : ${e && e.message}`) }
  else { console.error(e); process.exit(1) }
}
process.exit(0)

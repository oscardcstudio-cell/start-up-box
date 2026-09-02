#!/usr/bin/env node
// scan-gate — garde-fou anti-fuite du repo PUBLIC start-up-box.
// Auto-contenu (aucune dépendance) : tourne en CI GitHub Actions ET en local.
// But : rendre l'édition à distance (web/mobile GitHub) SÛRE — si une fuite perso, un
// secret ou un chemin interne est introduit, le build échoue et rien n'atteint les fondateurs.
//
// Usage : node scripts/scan-gate.mjs   (exit 1 si fuite)

import { readFileSync, existsSync, readdirSync, statSync } from 'fs'
import { join, dirname, relative } from 'path'
import { fileURLToPath } from 'url'
import { execFileSync } from 'child_process'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

// Dossiers + fichiers publics distribués (on NE scanne PAS scripts/ ni .github/ : ils
// contiennent légitimement les motifs interdits en tant que règles du scanner).
const SCAN_DIRS = ['meta-rules', 'plugins', 'hooks']
const SCAN_FILES = ['README.md', 'INSTALL.md', 'CLAUDE.md', 'llms.txt', 'AGENTS.md', 'BACKLOG.md', 'PROTOCOLE_GEMINI.md']

// Exception légitime : le compte GitHub public du projet.
const RULES = [
  // perso
  { re: /oscar(?!dcstudio)/i, why: 'identité perso' },
  { re: /studio.?descartes/i, why: 'organisation privée' },
  { re: /\b(jules|florian|cynthia)\b/i, why: 'persona/humain privé' },
  { re: /\bm[ée]c[èe]ne\b/i, why: 'projet privé' },
  { re: /canecaude/i, why: 'nom de famille privé' },
  // secrets
  { re: /ghp_[A-Za-z0-9]{20,}/, why: 'GitHub PAT classic' },
  { re: /github_pat_[A-Za-z0-9_]{20,}/, why: 'GitHub fine-grained PAT' },
  { re: /gh[osru]_[A-Za-z0-9]{20,}/, why: 'GitHub token' },
  { re: /AKIA[0-9A-Z]{16}/, why: 'AWS access key id' },
  { re: /sk-[A-Za-z0-9]{20,}/, why: 'clé API style OpenAI/Stripe' },
  { re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/, why: 'clé privée' },
  { re: /xox[baprs]-[A-Za-z0-9-]{10,}/, why: 'token Slack' },
  // archi interne (repo public → ne doit pas exposer la structure privée du mainteneur)
  { re: /meta-claude-dev/i, why: 'nom de repo privé du mainteneur' },
  { re: /C:[\\/](users|dev)[\\/]/i, why: 'chemin local Windows du mainteneur' },
  { re: /\/Users\/[a-z]/i, why: 'chemin local macOS du mainteneur' },
]

// Caractères invisibles dangereux (ASCII smuggling / bidi / zero-width). Check AUTONOME
// (pas de dépendance → tourne en CI GitHub, qui ne peut pas atteindre le repo meta), même
// posture que security-scan --smuggling-only : on EXCLUT les sélecteurs de variation BMP
// (FE00–FE0F, bénins car pairés aux emojis) et on garde les vrais vecteurs. Doublon
// volontaire du package meta — comme les RULES, scan-gate se ré-implémente pour être portable.
function isSmugglingCodePoint(cp) {
  return (
    (cp >= 0x200B && cp <= 0x200F) || cp === 0x061C ||   // zero-width + LRM/RLM + ALM
    (cp >= 0x2060 && cp <= 0x2064) ||                    // word joiner + invisibles math
    (cp >= 0x202A && cp <= 0x202E) ||                    // bidi embeddings/overrides
    (cp >= 0x2066 && cp <= 0x2069) ||                    // bidi isolates
    cp === 0xFEFF || cp === 0x180E ||                    // BOM/ZWNBSP, Mongolian vowel sep
    cp === 0x00AD || cp === 0x034F ||                    // soft hyphen, combining grapheme joiner
    cp === 0x115F || cp === 0x1160 || cp === 0x3164 ||   // Hangul fillers
    (cp >= 0xE0000 && cp <= 0xE007F) ||                  // tag block — ASCII smuggling
    (cp >= 0xE0100 && cp <= 0xE01EF)                     // variation selectors supplément (smuggling)
  )
}

const TEXT_EXT = new Set(['.md', '.txt', '.json', '.mjs', '.js', '.ts', '.yml', '.yaml', '.html', '.css', ''])
const isText = (f) => { const d = f.lastIndexOf('.'); const e = d >= 0 ? f.slice(d) : ''; return (e === '' && /^[A-Z]/.test(f)) || TEXT_EXT.has(e) }

function walk(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir).flatMap(f => {
    if (f === '.git' || f === 'node_modules') return []
    const p = join(dir, f)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })
}

// On ne scanne QUE les fichiers suivis par git (= ce qui est réellement public).
// Évite les faux positifs sur des fichiers locaux gitignorés (ex. roadmap interne).
// Fallback filesystem si git indisponible.
function trackedSet() {
  try {
    return new Set(execFileSync('git', ['ls-files'], { cwd: ROOT }).toString().split('\n')
      .filter(Boolean).map(p => join(ROOT, p)))
  } catch { return null }
}
const tracked = trackedSet()
const inScope = (p) => SCAN_DIRS.some(d => p.startsWith(join(ROOT, d) + '/') || p.startsWith(join(ROOT, d) + '\\'))
  || SCAN_FILES.map(f => join(ROOT, f)).includes(p)

let candidates = [
  ...SCAN_DIRS.flatMap(d => walk(join(ROOT, d))),
  ...SCAN_FILES.map(f => join(ROOT, f)).filter(existsSync),
]
if (tracked) candidates = candidates.filter(p => tracked.has(p))
const files = candidates.filter(p => isText(p.split(/[\\/]/).pop()) && inScope(p))

let leaks = 0
for (const p of files) {
  const txt = readFileSync(p, 'utf8')
  for (const { re, why } of RULES) {
    const m = txt.match(re)
    if (m) {
      const line = txt.slice(0, m.index).split('\n').length
      console.error(`✗ ${relative(ROOT, p).split('\\').join('/')}:${line} — "${m[0]}" (${why})`)
      leaks++
    }
  }
  // Caractères invisibles dangereux (smuggling) — itère par code point (gère les surrogates).
  let idx = 0
  for (const ch of txt) {
    const cp = ch.codePointAt(0)
    if (isSmugglingCodePoint(cp)) {
      const line = txt.slice(0, idx).split('\n').length
      console.error(`✗ ${relative(ROOT, p).split('\\').join('/')}:${line} — U+${cp.toString(16).toUpperCase()} (caractère invisible / smuggling)`)
      leaks++
    }
    idx += ch.length
  }
}

console.log(`scan-gate : ${files.length} fichier(s), ${leaks} fuite(s)`)
if (leaks) { console.error('\n✗ Fuite détectée — build bloqué. Corriger avant que ça atteigne les fondateurs.'); process.exit(1) }
console.log('✓ Aucune fuite (perso / secret / chemin interne).')

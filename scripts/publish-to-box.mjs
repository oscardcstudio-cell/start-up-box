#!/usr/bin/env node
// publish-to-box — propage l'infra vivante d'Oscar vers la box PUBLIQUE, neutralisée.
// Le « gate de publication côté mainteneur » référencé dans CLAUDE.md, enfin réel.
//
// Usage :
//   node scripts/publish-to-box.mjs            # DRY-RUN : montre « voilà les changements »
//   node scripts/publish-to-box.mjs --write    # applique + bump VERSION + scan-gate final
//   node scripts/publish-to-box.mjs --verbose  # + diff ligne à ligne des fichiers modifiés
//
// Pipeline : pour chaque entrée d'ALLOWLIST → lit la source chez Oscar → NEUTRALIZE →
// compare au fichier box actuel → classe (identique / modifié / nouveau / source absente /
// FUITE résiduelle). En --write : n'écrit que si 0 fuite résiduelle sur l'ensemble, bump
// les VERSION concernées, puis lance scan-gate.mjs comme garde dur.

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';
import { MAINTAINER, ALLOWLIST, NEUTRALIZE, LEAK_RULES } from './publish-manifest.mjs';

const BOX = join(dirname(fileURLToPath(import.meta.url)), '..');
const WRITE = process.argv.includes('--write');
const VERBOSE = process.argv.includes('--verbose') || process.argv.includes('-v');
const C = { r:'\x1b[31m', g:'\x1b[32m', y:'\x1b[33m', b:'\x1b[34m', d:'\x1b[2m', x:'\x1b[0m' };

const neutralize = (s) => NEUTRALIZE.reduce((t,[re,rep]) => t.replace(re, rep), s);
const leaksIn = (s) => LEAK_RULES.filter(r => r.re.test(s)).map(r => r.why);

// Liste récursive des fichiers d'un dossier (chemins relatifs au dossier).
function listRel(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap(f => {
    if (f === '.git' || f === 'node_modules') return [];
    const p = join(dir, f);
    return statSync(p).isDirectory() ? listRel(p).map(r => join(f, r)) : [f];
  });
}

// Construit la liste des paires {srcAbs, destAbs, label} à partir d'une entrée ALLOWLIST.
function expand(entry) {
  const root = MAINTAINER[entry.root];
  if (entry.kind === 'dir') {
    const srcDir = join(root, entry.src), destDir = join(BOX, entry.dest);
    const rels = listRel(srcDir);
    if (rels.length === 0) return [{ srcAbs: srcDir, destAbs: destDir, label: entry.dest, missing: true }];
    return rels.map(r => ({ srcAbs: join(srcDir, r), destAbs: join(destDir, r), label: join(entry.dest, r).replace(/\\/g,'/') }));
  }
  return [{ srcAbs: join(root, entry.src), destAbs: join(BOX, entry.dest), label: entry.dest, bumpsHookVersion: entry.bumpsHookVersion }];
}

const units = ALLOWLIST.flatMap(expand);
const rows = [];
let nLeak = 0, nChanged = 0, nNew = 0, nMissing = 0, nSame = 0, hookChanged = false, doctrineChanged = false;

for (const u of units) {
  if (u.missing || !existsSync(u.srcAbs)) { rows.push({ ...u, status:'missing' }); nMissing++; continue; }
  const raw = readFileSync(u.srcAbs, 'utf8');
  const clean = neutralize(raw);
  const residual = leaksIn(clean);
  const cur = existsSync(u.destAbs) ? readFileSync(u.destAbs, 'utf8') : null;
  let status;
  if (residual.length) { status = 'leak'; nLeak++; }
  else if (cur === null) { status = 'new'; nNew++; }
  else if (cur === clean) { status = 'same'; nSame++; }
  else { status = 'changed'; nChanged++; }
  if (status === 'changed' || status === 'new') {
    if (u.label.startsWith('meta-rules/')) doctrineChanged = true;
    if (u.label.startsWith('hooks/') || u.bumpsHookVersion) hookChanged = true;
  }
  rows.push({ ...u, status, clean, cur, residual });
}

// ---- Rapport « voilà les changements » ----
console.log(`\n${C.b}publish-to-box${C.x} — infra Oscar → box publique  ${C.d}(${WRITE?'WRITE':'DRY-RUN'})${C.x}\n`);
const icon = { same:`${C.d}=${C.x}`, changed:`${C.y}~${C.x}`, new:`${C.g}+${C.x}`, missing:`${C.d}?${C.x}`, leak:`${C.r}!${C.x}` };
for (const r of rows) {
  if (r.status === 'same' && !VERBOSE) continue;
  let extra = '';
  if (r.status === 'missing') extra = `${C.d}(source absente: ${relative(BOX, r.srcAbs).replace(/\\/g,'/')})${C.x}`;
  if (r.status === 'leak') extra = `${C.r}FUITE résiduelle: ${[...new Set(r.residual)].join(', ')}${C.x}`;
  if (r.status === 'changed') {
    const a = r.cur.split('\n').length, b = r.clean.split('\n').length;
    extra = `${C.d}${a}→${b} lignes${C.x}`;
  }
  console.log(`  ${icon[r.status]} ${r.label}  ${extra}`);
  if (VERBOSE && r.status === 'changed') {
    // mini-diff : lignes neutralisées (présentes côté box ≠ côté clean)
    const curL = r.cur.split('\n'), clL = r.clean.split('\n');
    const max = Math.max(curL.length, clL.length);
    let shown = 0;
    for (let i=0; i<max && shown<6; i++) {
      if (curL[i] !== clL[i]) {
        if (curL[i] !== undefined) console.log(`      ${C.r}- ${curL[i].slice(0,100)}${C.x}`);
        if (clL[i] !== undefined) console.log(`      ${C.g}+ ${clL[i].slice(0,100)}${C.x}`);
        shown++;
      }
    }
  }
}

console.log(`\n  ${C.d}=${C.x} ${nSame} inchangés · ${C.y}~${C.x} ${nChanged} modifiés · ${C.g}+${C.x} ${nNew} nouveaux · ${C.d}?${C.x} ${nMissing} source absente · ${C.r}!${C.x} ${nLeak} fuites`);

if (nLeak > 0) {
  console.log(`\n${C.r}✗ ${nLeak} fuite(s) résiduelle(s) — la neutralisation ne couvre pas tout.${C.x}`);
  console.log(`  Ajoute la règle manquante dans NEUTRALIZE (publish-manifest.mjs) puis relance. Aucune écriture.\n`);
  process.exit(1);
}

if (!WRITE) {
  const todo = nChanged + nNew;
  console.log(todo
    ? `\n${C.y}→ ${todo} fichier(s) à publier.${C.x} Relance avec ${C.b}--write${C.x} pour appliquer (+ bump VERSION + scan-gate).\n`
    : `\n${C.g}✓ Box déjà à jour avec ton infra (neutralisée). Rien à publier.${C.x}\n`);
  process.exit(0);
}

// ---- WRITE ----
let written = 0;
for (const r of rows) {
  if (r.status !== 'changed' && r.status !== 'new') continue;
  mkdirSync(dirname(r.destAbs), { recursive: true });
  writeFileSync(r.destAbs, r.clean);
  written++;
}
// Bump VERSION (entier monotone) des couches modifiées.
function bump(versionFile) {
  const p = join(BOX, versionFile);
  const cur = existsSync(p) ? parseInt(readFileSync(p,'utf8').trim(), 10) || 0 : 0;
  writeFileSync(p, String(cur + 1) + '\n');
  console.log(`  ${C.b}VERSION${C.x} ${versionFile}: ${cur} → ${cur+1}`);
}
if (doctrineChanged) bump('meta-rules/VERSION');
if (hookChanged) bump('hooks/VERSION');
console.log(`\n  ${written} fichier(s) écrit(s).`);

// ---- Gardes FINAUX : scan-gate (fuites perso/secret/chemin) + unicode-safety (smuggling) ----
function runGate(label, cmd, args) {
  console.log(`\n  ${C.b}${label}${C.x}…`);
  try {
    const out = execFileSync(cmd, args, { cwd: BOX, encoding: 'utf8' });
    console.log(out.trim().split('\n').map(l => '  ' + l).join('\n'));
    return true;
  } catch (e) {
    console.log(((e.stdout || '') + (e.stderr || '')).toString().trim().split('\n').map(l => '  ' + l).join('\n'));
    return false;
  }
}

const okScan = runGate('scan-gate (fuites perso/secret/chemin)', 'node', [join(BOX, 'scripts', 'scan-gate.mjs')]);

// unicode-safety vit dans le repo meta (package security-scan) — invoqué EN DÉPENDANCE
// (jamais copié, règle no-vendoring). Couvre le manque de scan-gate : caractères invisibles
// dangereux / ASCII smuggling (tag block, zero-width, bidi) dans le contenu publié.
// --smuggling-only : ne bloque PAS sur les sélecteurs de variation des emojis légitimes ;
// --no-emoji : la présence d'emojis n'est pas une fuite de sécurité ici.
const uniScript = join(MAINTAINER.META, 'packages', 'security-scan', 'unicode-safety.js');
let okUni = true;
if (existsSync(uniScript)) {
  okUni = runGate('unicode-safety (ASCII smuggling / invisibles)', 'node', [uniScript, BOX, '--smuggling-only', '--no-emoji']);
} else {
  console.log(`\n  ${C.y}⚠ unicode-safety introuvable (${uniScript}) — gate smuggling SAUTÉE.${C.x}`);
}

if (okScan && okUni) {
  console.log(`\n${C.g}✓ Publié. Bump VERSION fait → les fondateurs recevront la màj au prochain SessionStart.${C.x}`);
  console.log(`  ${C.d}Pense à committer + push la box pour que le git pull des fondateurs la voie.${C.x}\n`);
} else {
  console.log(`\n${C.r}✗ Une gate finale a DÉTECTÉ un problème après écriture — NE PAS committer la box.${C.x}`);
  console.log(`  Fuite → corrige NEUTRALIZE ; caractère invisible → retire-le à la source, puis relance --write.\n`);
  process.exit(1);
}

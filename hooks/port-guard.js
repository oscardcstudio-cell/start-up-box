#!/usr/bin/env node
// port-guard.js — Hook PreToolUse (Bash) — installé par start-up-box
// Bloque toute commande qui démarre un serveur dev sur un port déjà occupé.
// Fournit le premier port libre pour que Claude relance immédiatement sans collision.
// Couverture : Vite, Next.js, Astro, Nuxt, Express/Node, Flask, serve, http-server…
// Cross-platform : Windows (netstat), macOS/Linux (lsof).

const fs = require('fs');
const { execSync } = require('child_process');

let event = {};
try { event = JSON.parse(fs.readFileSync(0, 'utf8')); } catch { process.exit(0); }
if (event.tool_name !== 'Bash') process.exit(0);

const cmd = (event.tool_input?.command || '').trim();
if (!cmd) process.exit(0);

// --- 1. Détecter les commandes de démarrage de serveur ---
const SERVER_RE = [
  /\bnpm\s+run\s+dev\b/,
  /\bnpm\s+run\s+start\b/,
  /\bnpm\s+start\b/,
  /\bvite(\s|$)/,
  /\bnext\s+dev\b/,
  /\byarn\s+(run\s+)?dev\b/,
  /\bpnpm\s+(run\s+)?dev\b/,
  /\bbun\s+(run\s+)?dev\b/,
  /\bastro\s+dev\b/,
  /\bnuxt\s+dev\b/,
  /\bsvelte-kit\s+dev\b/,
  /\bhttp-server\b/,
  /\bnpx\s+(--yes\s+)?serve\b/,
  /\bnode\b.*\b(server|app|index)\.(js|ts|mjs|cjs)\b/i,
  /\btsx?\s+.*\b(server|app|index)\.(ts|js)\b/i,
  /\bflask\s+run\b/,
  /\buvicorn\b/,
  /\bdeno\s+(run|serve)\b/,
];
if (!SERVER_RE.some(r => r.test(cmd))) process.exit(0);

// Exclure kill/stop/build/test — pas un démarrage de serveur
if (/\b(kill|pkill|fkill|stop|restart)\b/i.test(cmd)) process.exit(0);
if (/\b(build|lint|test|format)\b/.test(cmd) && !/\bdev\b/.test(cmd)) process.exit(0);

// --- 2. Port cible ---
function extractPort(cmd) {
  const m = cmd.match(/(?:--port[= ]|-p\s+)(\d{4,5})/i) || cmd.match(/\bPORT=(\d{4,5})/);
  return m ? parseInt(m[1], 10) : null;
}
function defaultPort(cmd) {
  if (/next\s+dev|nuxt\s+dev/.test(cmd)) return 3000;
  if (/astro\s+dev/.test(cmd)) return 4321;
  if (/flask|uvicorn/.test(cmd)) return 5000;
  if (/http-server/.test(cmd)) return 8080;
  if (/deno/.test(cmd)) return 8000;
  return 5173; // Vite / catch-all
}
const intendedPort = extractPort(cmd) ?? defaultPort(cmd);

// --- 3. Ports occupés (cross-platform) ---
function getOccupied() {
  const map = new Map();
  try {
    let out = '';
    if (process.platform === 'win32') {
      out = execSync('netstat -ano -p tcp', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'], timeout: 3000 });
      for (const line of out.split('\n')) {
        if (!/LISTENING/i.test(line)) continue;
        const parts = line.trim().split(/\s+/);
        const m = (parts[1] || '').match(/:(\d+)$/);
        if (!m) continue;
        if (!map.has(+m[1])) map.set(+m[1], parts[parts.length - 1]);
      }
    } else {
      // macOS + Linux : lsof (pré-installé macOS, courant Linux)
      out = execSync('lsof -i -P -n -sTCP:LISTEN', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'], timeout: 5000 });
      for (const line of out.split('\n')) {
        const m = line.match(/:(\d{4,5})\s+\(LISTEN\)/);
        if (!m) continue;
        const pidM = line.match(/^\S+\s+(\d+)/);
        if (!map.has(+m[1])) map.set(+m[1], pidM ? pidM[1] : '?');
      }
    }
  } catch { /* lsof absent ou timeout → fail-silent, on laisse passer */ }
  return map;
}

const occupied = getOccupied();
if (!occupied.has(intendedPort)) process.exit(0); // port libre → laisser passer

// --- 4. Premier port libre ---
let freePort = null;
for (let p = intendedPort + 1; p <= intendedPort + 30; p++) {
  if (!occupied.has(p)) { freePort = p; break; }
}

const pid = occupied.get(intendedPort);

function buildSuggestion(cmd, freePort) {
  if (!freePort) return 'Libère un port avant de relancer.';
  if (/next|nuxt|flask|uvicorn|deno|node\b|tsx?\b/.test(cmd))
    return `Relance avec PORT=${freePort} devant la commande.`;
  return `Relance avec --port ${freePort}.`;
}

const allBusy = [...occupied.keys()].filter(p => p >= 3000).sort((a, b) => a - b);

const reason = [
  `[port-guard] Port ${intendedPort} déjà occupé (PID ${pid}).`,
  buildSuggestion(cmd, freePort),
  `Ports occupés ≥3000 : ${allBusy.slice(0, 12).join(', ')}.`,
  `Ne pas tuer ce process sans confirmation — il appartient peut-être à une autre session Claude active.`,
].join('\n');

console.log(JSON.stringify({ decision: 'block', reason }));

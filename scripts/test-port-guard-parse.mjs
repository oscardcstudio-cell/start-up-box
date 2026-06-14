#!/usr/bin/env node
// Test du parsing de port-guard.js sur les DEUX OS, sans avoir besoin d'un vrai Mac.
// On nourrit les regexes de port-guard avec une sortie échantillon réaliste lsof (macOS/Linux)
// et netstat (Windows), et on vérifie que les bons ports sont extraits.
// ⚠ Les regexes ci-dessous DOIVENT rester identiques à celles de hooks/port-guard.js.

// --- parsers (copie EXACTE de la logique de getOccupied dans port-guard.js) ---
function parseLsof(out) {
  const map = new Map();
  for (const line of out.split('\n')) {
    const m = line.match(/:(\d{4,5})\s+\(LISTEN\)/);
    if (!m) continue;
    const pidM = line.match(/^\S+\s+(\d+)/);
    if (!map.has(+m[1])) map.set(+m[1], pidM ? pidM[1] : '?');
  }
  return map;
}
function parseNetstat(out) {
  const map = new Map();
  for (const line of out.split('\n')) {
    if (!/LISTENING/i.test(line)) continue;
    const parts = line.trim().split(/\s+/);
    const m = (parts[1] || '').match(/:(\d+)$/);
    if (!m) continue;
    if (!map.has(+m[1])) map.set(+m[1], parts[parts.length - 1]);
  }
  return map;
}

// --- échantillons réalistes ---
const LSOF = `COMMAND     PID  USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node       5678 user    23u  IPv4 0x1a2b3c4d5e6f7081      0t0  TCP *:5173 (LISTEN)
node       5678 user    24u  IPv6 0x1a2b3c4d5e6f7082      0t0  TCP [::1]:5173 (LISTEN)
Python     9012 user     5u  IPv4 0x1a2b3c4d5e6f7083      0t0  TCP 127.0.0.1:5000 (LISTEN)
com.docke   345 user    12u  IPv4 0x1a2b3c4d5e6f7084      0t0  TCP *:3000 (LISTEN)`;

const NETSTAT = `
Connexions actives

  Proto  Adresse locale         Adresse distante       État            PID
  TCP    0.0.0.0:5173           0.0.0.0:0              LISTENING       12345
  TCP    [::]:3000              [::]:0                LISTENING       678
  TCP    127.0.0.1:5000         0.0.0.0:0              LISTENING       9999
  TCP    192.168.1.10:55321     52.0.0.1:443          ESTABLISHED     4242`;

// --- assertions ---
let fail = 0;
function expect(label, got, want) {
  const g = JSON.stringify(got), w = JSON.stringify(want);
  if (g === w) { console.log(`  ✓ ${label}`); }
  else { console.log(`  ✗ ${label}\n      attendu ${w}\n      obtenu ${g}`); fail++; }
}

const lsof = parseLsof(LSOF);
expect('lsof (macOS/Linux) : ports détectés', [...lsof.keys()].sort((a,b)=>a-b), [3000, 5000, 5173]);
expect('lsof : PID du port 5173', lsof.get(5173), '5678');
expect('lsof : dédupe IPv4/IPv6 sur 5173 (1 seule entrée)', lsof.size, 3);

const net = parseNetstat(NETSTAT);
expect('netstat (Windows) : ports LISTENING seulement', [...net.keys()].sort((a,b)=>a-b), [3000, 5000, 5173]);
expect('netstat : PID du port 5173', net.get(5173), '12345');
expect('netstat : ignore les ESTABLISHED', net.has(55321), false);

console.log(fail === 0
  ? '\n✅ Parsing port-guard validé sur macOS/Linux (lsof) ET Windows (netstat).'
  : `\n❌ ${fail} assertion(s) en échec.`);
process.exit(fail === 0 ? 0 : 1);

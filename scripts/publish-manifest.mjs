// publish-manifest — source de vérité de la PUBLICATION (infra Oscar → box publique).
// Outil MAINTENEUR uniquement : vit dans scripts/ (jamais scanné par scan-gate, jamais
// copié par INSTALL.md chez les fondateurs). Contient donc légitimement les chemins locaux.
//
// Deux rôles :
//   1. ALLOWLIST — la liste EXPLICITE de ce qui est « box-public ». Tout ce qui n'est pas
//      ici n'est PAS publié (ex. avocat-corp, subventions-fr, hooks privés). C'est le
//      garde-fou amont : on n'exclut pas un agent privé en espérant que scan-gate le
//      rattrape, on ne l'inclut juste pas.
//   2. NEUTRALIZE — rend neutre chaque référence aux projets/identité d'Oscar avant écriture.
//      scan-gate reste le filet FINAL (bloque si une fuite passe au travers).

export const MAINTAINER = {
  META: 'C:/dev/claude',              // doctrines source
  USER: 'C:/Users/oscar/.claude',     // agents + skills + hooks source
};

// Chaque entrée : { kind, name, src (relatif au root), dest (relatif à la box) }
// root = 'META' ou 'USER'. kind 'dir' = copie récursive (skills). 'file' sinon.
// Les artefacts box-only (HARNESS.md, startup-box-update.js, create-company) ne sont PAS
// listés : ils n'ont pas de source amont, on ne les touche pas.
export const ALLOWLIST = [
  // --- Doctrines (meta-rules/) ---
  { kind: 'file', root: 'META', src: 'CONTEXT_ENGINEERING_DOCTRINE.md', dest: 'meta-rules/CONTEXT_ENGINEERING_DOCTRINE.md' },
  { kind: 'file', root: 'META', src: 'CLAUDE_HEALTH_RULES.md',          dest: 'meta-rules/CLAUDE_HEALTH_RULES.md' },
  { kind: 'file', root: 'META', src: 'CLAUDE_BUG_DOCTRINE.md',          dest: 'meta-rules/CLAUDE_BUG_DOCTRINE.md' },
  { kind: 'file', root: 'META', src: 'NEW_PROJECT.md',                  dest: 'meta-rules/NEW_PROJECT.md' },
  { kind: 'file', root: 'META', src: 'NEW_COMPANY.md',                  dest: 'meta-rules/NEW_COMPANY.md' },
  // --- Méta-agents génériques (plugins/startup-agents/agents/) ---
  ...['meta-business','meta-creation','meta-gamification','meta-marketing','meta-offre-pricing',
      'meta-philosophe','meta-redacteur','meta-ui-ux','meta-ux-conversion']
    .map(n => ({ kind:'file', root:'USER', src:`agents/${n}.md`, dest:`plugins/startup-agents/agents/${n}.md` })),
  // --- Skills (plugins/startup-skills/skills/) — seulement ceux sourcés en ~/.claude ---
  { kind: 'dir', root: 'USER', src: 'skills/autoresearch',     dest: 'plugins/startup-skills/skills/autoresearch' },
  { kind: 'dir', root: 'USER', src: 'skills/build-company',    dest: 'plugins/startup-skills/skills/build-company' },
  { kind: 'dir', root: 'USER', src: 'skills/design-director',  dest: 'plugins/startup-skills/skills/design-director' },
  // --- Hooks (hooks/) ---
  // port-guard.js EXCLU du sync auto : la version box est un FORK volontaire (adaptée
  // « installé par start-up-box »), pas une copie périmée. Auto-publier régresserait le
  // comportement chez les fondateurs. À réconcilier à la main si besoin. startup-box-update
  // est box-only. Les hooks (code à comportement) ne se syncent pas en aveugle, contrairement
  // aux docs. Décommenter SEULEMENT après réconciliation manuelle source ↔ fork.
  // { kind: 'file', root: 'USER', src: 'hooks/port-guard.js', dest: 'hooks/port-guard.js', bumpsHookVersion: true },
];

// Neutralisation : ordre = spécifique → générique. Remplacements lisibles dans un contexte
// de doctrine. Le filet final reste scan-gate (RULES) après écriture.
// Pour ajouter un projet : ajoute une ligne ici.
export const NEUTRALIZE = [
  // Remplacements STRUCTURELS (clause entière, pas juste un token) — à passer EN PREMIER,
  // avant les règles de chemin/identité qui transformeraient le motif sous-jacent.
  // meta-redacteur : la « voix perso d'Oscar » charge un fichier perso inexistant chez le
  // fondateur → guidance générique utile à sa place.
  [/charge `C:[\\/]Users[\\/]oscar[\\/]\.claude[\\/]agents[\\/]oscar_tone_of_voice\.md`/gi,
   "demande au fondateur 2-3 exemples de sa façon d'écrire (ou charge son guide de voix s'il en a un)"],

  // Projets perso d'Oscar → générique
  [/Auto[-_]?Polymarket/gi, 'un projet de trading'],
  [/subvention[-_ ]?match/gi, 'un outil de matching'],
  [/Nothing[-_ ]?But[-_ ]?Blue[-_ ]?Sky/gi, 'un projet créatif'],
  [/the[-_ ]?soft[-_ ]?war/gi, 'une app web'],
  [/sessions[-_ ]?atlas/gi, 'un outil interne'],
  [/U122AE[-_ ]?radio/gi, 'un projet perso'],
  [/video[-_ ]?studio/gi, 'un méta-outil'],
  [/Sync[-_ ]?Play/gi, 'une app'],
  [/\bM[ée]c[èe]ne\b/gi, 'un projet'],
  // IDs de routine / triggers
  [/trig_[A-Za-z0-9]+/g, '<routine>'],
  // Chemins locaux du mainteneur
  [/C:[\\/]Users[\\/]oscar[\\/]?\.claude/gi, '~/.claude'],
  [/C:[\\/]Users[\\/]oscar/gi, '~'],
  [/C:[\\/]dev[\\/]claude/gi, '~/projets'],
  // Studio Descartes (org privée) + personas brandées d'exemple → neutre
  [/studio[-_ ]?descartes/gi, 'une marque'],
  [/\bSD\b/g, 'la marque'],
  // Références structurelles au setup perso d'Oscar (token collé à un underscore) → placeholder
  [/oscar_tone_of_voice/gi, 'founder_tone_of_voice'],
  // Identité (case-insensitive : matche aussi 'jules-strategist', 'oscar-creation' en exemple
  // de persona ; oscardcstudio = compte public, conservé via le lookahead).
  [/\bCanecaude\b/gi, ''],
  [/\b(Jules|Florian|Cynthia)\b/gi, 'un collaborateur'],
  [/\bd'Oscar\b/gi, 'du fondateur'],  // contraction : évite « d'le fondateur »
  [/\bOscar(?!dcstudio)\b/gi, 'le fondateur'],
];

// Détection résiduelle (= règles scan-gate, dédupliquées ici pour un check AVANT écriture).
export const LEAK_RULES = [
  { re: /oscar(?!dcstudio)/i, why: 'identité perso' },
  { re: /studio.?descartes/i, why: 'organisation privée' },
  { re: /\b(jules|florian|cynthia)\b/i, why: 'persona/humain privé' },
  { re: /\bm[ée]c[èe]ne\b/i, why: 'projet privé' },
  { re: /canecaude/i, why: 'nom de famille privé' },
  { re: /trig_[A-Za-z0-9]+/, why: 'id de routine' },
  { re: /C:[\\/](users|dev)[\\/]/i, why: 'chemin local Windows' },
  { re: /Auto[-_]?Polymarket|subvention[-_ ]?match|Nothing[-_ ]?But[-_ ]?Blue[-_ ]?Sky/i, why: 'nom de projet perso' },
];

// gemini-map — table de conversion Claude Code → Gemini CLI.
//
// Livré dans le clone (contrairement à publish-manifest.mjs, maintainer-only) : le
// convertisseur tourne CHEZ LE FONDATEUR, à l'install et à chaque mise à jour.
//
// Principe (cf. PROTOCOLE_GEMINI.md) : le repo ne commite QUE la version Claude.
// La version Gemini est générée. Aucun fichier `*-gemini.md` en double — sinon la
// sync hebdo côté mainteneur réécrirait la copie Claude et la copie Gemini dériverait
// en silence.
//
// Ordre des règles : spécifique → générique. Une règle générique passée trop tôt
// détruit le motif que la suivante cherche (même piège que NEUTRALIZE).

// ── Outils ───────────────────────────────────────────────────────────────────
// Utilisé pour le frontmatter `tools:` des sous-agents ET pour les mentions en prose.
// `Grep` : la doc de référence de Gemini CLI liste `grep_search`, des guides plus
// anciens `search_file_content`. On émet `grep_search` et le prompt d'install fait
// vérifier la liste réelle par Gemini lui-même (il s'introspecte) — cf. INSTALL.md.
export const TOOL_MAP = {
  Read: 'read_file',
  Write: 'write_file',
  Edit: 'replace',
  MultiEdit: 'replace',
  Grep: 'grep_search',
  Glob: 'glob',
  LS: 'list_directory',
  Bash: 'run_shell_command',
  WebSearch: 'google_web_search',
  WebFetch: 'web_fetch',
  AskUserQuestion: 'ask_user',
  TodoWrite: 'write_todos',
  TaskCreate: 'tracker_create_task',
  TaskUpdate: 'tracker_update_task',
}

// Noms d'outils Gemini valides (pour --check). Source : docs/reference/tools.md.
export const GEMINI_TOOLS = new Set([
  'run_shell_command', 'glob', 'grep_search', 'search_file_content', 'list_directory',
  'read_file', 'read_many_files', 'replace', 'write_file', 'ask_user', 'write_todos',
  'tracker_create_task', 'tracker_update_task', 'tracker_get_task', 'tracker_list_tasks',
  'activate_skill', 'get_internal_docs', 'enter_plan_mode', 'exit_plan_mode',
  'list_mcp_resources', 'read_mcp_resource', 'google_web_search', 'web_fetch',
  'complete_task', 'update_topic',
])

// ── Prose (fichiers .md : agents, skills, doctrines, harness) ────────────────
export const PROSE = [
  // Chemins et fichiers de config — AVANT les règles d'identité, qui casseraient le motif.
  [/\.claudeignore/g, '.geminiignore'],
  [/~\/\.claude/g, '~/.gemini'],
  [/\.claude\/(agents|skills|hooks|startup-box)/g, '.gemini/$1'],
  // `CLAUDE.md` = le fichier de contexte. Match exact : ne touche PAS aux noms de
  // fichiers livrés (CLAUDE_HEALTH_RULES.md, CLAUDE_BUG_DOCTRINE.md), qui doivent
  // rester tels quels sur le disque sinon les liens internes cassent.
  [/\bCLAUDE\.md\b/g, 'GEMINI.md'],
  // L'import du harness : Gemini résout en relatif du fichier importeur.
  [/@startup-box\/HARNESS\.md/g, '@./startup-box/HARNESS.md'],

  // Mécanismes de hook cités en prose (les doctrines les documentent).
  [/\bPreToolUse\b/g, 'BeforeTool'],
  [/\bPostToolUse\b/g, 'AfterTool'],
  [/\bhook Stop\b/g, 'hook AfterAgent'],
  // `.claude/rules/*.md` (chargement conditionnel par glob) n'existe pas chez Gemini :
  // l'équivalent est un fichier de contexte local au dossier concerné. On nomme le vrai
  // mécanisme plutôt que de traduire le chemin et d'inventer une feature.
  [/`\.claude\/rules\/\*\.md` avec frontmatter `paths:` \(glob\)/g,
   'un `GEMINI.md` placé dans le sous-dossier concerné'],
  [/`\.claude\/rules\/[^`]*`/g, '`GEMINI.md` local au dossier'],
  // Frontmatter de modèle Claude cité en exemple dans un corps de fichier.
  [/^model:\s*(opus|sonnet|haiku)\s*\n/gm, ''],

  // Outils cités en prose.
  [/\bl'outil Skill\b/g, "l'outil activate_skill"],
  [/\boutil Skill\b/g, 'outil activate_skill'],
  [/\bl'outil Agent\b/g, "la délégation à un sous-agent"],
  [/\boutil Agent\b/g, 'délégation à un sous-agent'],
  [/\bAgent tool\b/g, 'sous-agent'],
  [/\bWebSearch\b/g, 'google_web_search'],
  [/\bWebFetch\b/g, 'web_fetch'],
  [/\bAskUserQuestion\b/g, 'ask_user'],
  [/\bTodoWrite\b/g, 'write_todos'],

  // GSD est multi-runtime : son installeur demande le runtime cible.
  [/npx get-shit-done-cc --global/g,
   'npx get-shit-done-cc --global (choisir Gemini CLI quand l\'installeur demande le runtime)'],

  // Identité du runtime — en DERNIER, du plus spécifique au plus générique.
  [/\bClaude Code\b/g, 'Gemini CLI'],
  [/\bClaude\b/g, 'Gemini'],
]

// ── Hooks (code JS) ──────────────────────────────────────────────────────────
// Le payload d'entrée est identique (tool_name, tool_input, cwd, session_id) ;
// seuls l'événement, le nom de l'outil shell et le verbe de blocage changent.
export const HOOK_CODE = [
  [/'PreToolUse'/g, "'BeforeTool'"], [/"PreToolUse"/g, '"BeforeTool"'],
  [/'PostToolUse'/g, "'AfterTool'"], [/"PostToolUse"/g, '"AfterTool"'],
  [/tool_name !== 'Bash'/g, "tool_name !== 'run_shell_command'"],
  [/tool_name === 'Bash'/g, "tool_name === 'run_shell_command'"],
  [/matcher: 'Bash'/g, "matcher: 'run_shell_command'"],
  [/matcher === 'Bash'/g, "matcher === 'run_shell_command'"],
  [/decision: 'block'/g, "decision: 'deny'"],
  [/"decision":\s*"block"/g, '"decision": "deny"'],
  [/\(Bash\)/g, '(run_shell_command)'],
  [/\.claude/g, '.gemini'],
  // Mentions en commentaire (le code n'a aucun identifiant contenant ces mots).
  [/\bPreToolUse\b/g, 'BeforeTool'],
  [/\bPostToolUse\b/g, 'AfterTool'],
  [/\bClaude Code\b/g, 'Gemini CLI'],
  [/\bClaude\b/g, 'Gemini'],
]

// ── Événements de hook (pour la génération de settings.json) ─────────────────
export const HOOK_EVENTS = {
  PreToolUse: 'BeforeTool',
  PostToolUse: 'AfterTool',
  Stop: 'AfterAgent',
  SessionStart: 'SessionStart',
  SessionEnd: 'SessionEnd',
}

// ── Résidus interdits après conversion (utilisé par --check) ────────────────
export const RESIDUAL = [
  { re: /^model:\s*(opus|sonnet|haiku)/m, why: 'modèle Claude dans un frontmatter' },
  { re: /PreToolUse|PostToolUse/, why: 'événement de hook Claude' },
  { re: /decision:\s*'block'|"decision":\s*"block"/, why: 'verbe de blocage Claude' },
  { re: /~\/\.claude/, why: 'chemin de config Claude' },
  { re: /\bClaude\b/, why: 'mention du runtime Claude' },
  { re: /\bCLAUDE\.md\b/, why: 'fichier de contexte Claude' },
]

const applyAll = (rules, s) => rules.reduce((t, [re, rep]) => t.replace(re, rep), s)

/** Convertit le frontmatter d'un sous-agent : `model:` supprimé, `tools:` traduit. */
export function convertAgentFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/)
  if (!m) return text
  const body = text.slice(m[0].length)
  const fm = m[1].split('\n').flatMap((line) => {
    // `model: opus|sonnet` → supprimé : le sous-agent hérite du modèle de session.
    // On ne mappe PAS vers un id Gemini : ils sont en -preview et tournent, les figer
    // casserait la box à la prochaine rotation.
    if (/^model:\s*(opus|sonnet|haiku)\s*$/i.test(line)) return []
    if (/^tools:\s*/.test(line)) {
      const names = line.replace(/^tools:\s*/, '').split(',').map((s) => s.trim()).filter(Boolean)
      const mapped = names.map((n) => TOOL_MAP[n] || n)
      return [`tools: ${mapped.join(', ')}`]
    }
    return [line]
  })
  return `---\n${fm.join('\n')}\n---\n${body}`
}

/** Convertit un fichier. kind : 'agent' | 'md' | 'hook'. */
export function convert(text, kind) {
  if (kind === 'hook') return applyAll(HOOK_CODE, text)
  const t = kind === 'agent' ? convertAgentFrontmatter(text) : text
  return applyAll(PROSE, t)
}

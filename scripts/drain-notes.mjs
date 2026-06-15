// Drain des notes (widget notes-backlog) → BACKLOG.md, catégorisées par phase.
// Aligné sur subvention_match/scripts/drain-notes.mjs : wrapper fin qui importe le
// cœur agnostique `notes-backlog/drain` et lui injecte la config du projet (ici le
// preset des 8 phases du COMPANY_PLAYBOOK via `notes-backlog/presets/company-phases`).
// Config par env : NOTES_BASE_URL (défaut localhost:5000), ADMIN_TOKEN (auth).
import { drainNotes } from "notes-backlog/drain";
import { companyPhases } from "notes-backlog/presets/company-phases";
import path from "path";

const token = process.env.ADMIN_TOKEN;
const baseUrl = process.env.NOTES_BASE_URL || "http://localhost:5000";
const root = process.cwd();

await drainNotes({
  baseUrl,
  backlogPath: path.resolve(root, "BACKLOG.md"),
  authHeaders: token ? { "x-admin-token": token } : {},
  categories: companyPhases,
  marker: "## À trier", // catch-all : doit exister verbatim dans BACKLOG.md
});

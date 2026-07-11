# Claude workflow entry point

Infer the workflow from user intent; never require the user to name internal guides, documentation files, checkpoints, verification commands, or Git operations.

- **Startup & Context Resets**: At the start of every session, context reset, or task initialization, search for and read `CLAUDE.md` and `AGENTS.md` in the workspace (including `expenseiq/` or other subfolders). These files outline critical project conventions, task routing, and verification policies that must govern all tasks; keep them active in context at all times.
- Plan creation/revision: start at `docs/plans/00-planning-guide.md`.
- Plan implementation/resumption/repair/status/finalization: start at `docs/plans/00-planning-guide.md` and update the matching active plan in place.
- Documentation creation/update/bootstrap: read `docs/01-writing-guide.md`.
- All other project work: read `docs/00-reading-guide.md` and follow its task routing.
- Database/schema/migration work: also read `docs/04-database.md`, the complete schema mirror at `docs/database/schema.sql`, and the newest-first migration ledger at `docs/database/migrations.sql`.

If project docs are marked `Template` or `Shared Next.js baseline`, automatically verify/populate them through `docs/01-writing-guide.md` before relying on them as project-specific truth.

Verification should be proportional to risk. For documentation, planning, copy, small styling, or narrowly local source edits, prefer source review plus targeted text/path checks; do not rebuild the app, start servers, run browser automation, or use Playwright just to be thorough. Use builds, broad suites, manual browser checks, or Playwright only when the change could realistically break that layer, when the active plan/user explicitly asks for it, or when diagnosing a reported runtime/UI defect.

During planned work, treat the active plan, source, initialized docs, and Git as durable state—not chat history. At checkpoint context boundaries, update the plan's handoff capsule and resume read set; use only context controls actually supported by the current agent surface, and never block work merely because an in-place context wipe is unavailable.

The planning agent must personally resolve and write every schema/migration decision and exact SQL contract before implementation; never delegate data design to a lower-capability executor. The executor follows that approved specification mechanically and records progress.

When the user explicitly confirms a planned implementation works/is verified, finalize automatically: synchronize permanent docs, delete the plan, generate a concise message from the final scoped diff, commit, and push the current branch to `origin` without another confirmation. Never include unrelated changes or force-push.

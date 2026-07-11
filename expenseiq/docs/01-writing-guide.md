# Documentation writing guide

This is the portable standard for initializing and maintaining project documentation. It is optimized for AI routing/retrieval first and human scanning second. Permanent docs must identify exact ownership, behavior, constraints, flows, risks, and verification without inventing functionality.

## Document directory

This exact directory intentionally repeats `docs/00-reading-guide.md`.

| Document | What it contains | Open it when |
| --- | --- | --- |
| `docs/00-reading-guide.md` | Documentation-state detection, task-to-document routing, directory descriptions, and common reading sets. | Start of ordinary project work. |
| `docs/01-writing-guide.md` | Portable bootstrap procedure, documentation update mapping, writing standards, feature-doc rules, verified-plan synchronization, and consistency review. | Initializing, writing, updating, or finalizing permanent docs. |
| `docs/VERSION.md` | Canonical source path, current reusable docs package version, copy/update contract, automatic bump rule, and version history. | Checking whether a copied docs folder is behind the source or updating reusable docs framework files. |
| `docs/02-architecture.md` | Runtime/system shape, boundaries, data/control flows, directory ownership, deployment topology, and architectural decisions. | Cross-boundary changes, new subsystems, responsibility moves, or unfamiliar system orientation. |
| `docs/03-tech-stack.md` | Languages, frameworks, direct dependencies, tools, commands, configuration ownership, environments, and version-sensitive references. | Dependency, framework, tooling, configuration, environment, or upgrade work. |
| `docs/04-database.md` | Persistence status, schema objects, constraints, migrations, queries, transactions, ownership, units, timestamps, and lifecycle rules. | Schema, migration, storage, query, transaction, data ownership, or retention work. |
| `docs/database/schema.sql` | Complete documented SQL schema snapshot or explicitly labeled active-plan target, including snapshot status, timestamp, ownership, and exact DDL. | Any data-model/query work or when exact current/target tables, constraints, indexes, and relationships matter. |
| `docs/database/migrations.sql` | Documentation-only, newest-first migration ledger with minute timestamps, purpose, status, source migration path, safety notes, and exact SQL. | Planning, implementing, reviewing, or diagnosing a schema migration; never execute the ledger as a batch. |
| `docs/05-auth-and-permissions.md` | Identity/session model, trust boundaries, route/server/data enforcement, ownership, roles, permissions, and failure behavior. | Login, sessions, protected behavior, ownership, roles, admin, or authorization work. |
| `docs/06-routes-and-pages.md` | User-facing route/screen inventory, layouts/shells, navigation, rendering/data mode, states, access, and metadata. | Adding/changing a page, screen, route, layout, navigation path, loading/error state, or metadata. |
| `docs/07-api-and-server-actions.md` | Server entry-point inventory and contracts: APIs, actions/functions, commands, jobs, webhooks, validation, side effects, errors, caching, and idempotency. | Adding/changing a server operation, endpoint, mutation, webhook, job, or integration boundary. |
| `docs/08-ui-patterns.md` | Design system, tokens, shared components, forms, interactions, responsiveness, accessibility, client-state boundaries, and reusable visual behavior. | Component, styling, interaction, form, responsive, theme, or accessibility work. |
| `docs/09-feature-map.md` | Feature router linking capabilities to routes/screens, components, server modules, data/migrations, tests, integrations, and feature dossiers. | You know the feature but need its complete implementation surface. |
| `docs/10-business-rules.md` | Verified user/domain invariants, validation, calculations, state transitions, units, failure outcomes, and enforcement locations. | Behavior, validation, calculations, lifecycle/state, or intended-outcome ambiguity. |
| `docs/11-known-issues.md` | Confirmed limitations, fragile areas, verification-needed risks, intentional design choices, and deferred work. | Debugging, adjacent planning, risk assessment, or surprising behavior. |
| `docs/12-coding-standards.md` | Repository-specific language, framework, file organization, imports, formatting, error, security, testing, and change-scope conventions. | Before implementation/review or when introducing a new code pattern. |
| `docs/13-testing-and-build.md` | Available checks, suite ownership, environments/fixtures, baseline limitations, deferred-verification policy, and change-specific final verification. | Planning/running final verification or changing tests/build/deployment checks. |
| `docs/14-change-log.md` | Newest-first, minute-stamped durable verified milestones that change future implementation context; not raw commit history. | Understanding why the system changed or recording a verified delivery. |
| `docs/features/00-feature-template.md` | Portable structure for creating a project-specific feature dossier. | Creating a new feature dossier during bootstrap or after a feature is verified. |
| `docs/features/*.md` (except the template) | Project-specific end-to-end dossier per major feature with behavior, rules, data, files, gotchas, safe-change, and verification details. | Working on the named initialized feature. |
| `docs/plans/00-planning-guide.md` | Compact automatic intent router, lifecycle, directory rules, authorization boundary, and context-efficiency rules. | Entry point for every plan-related request. |
| `docs/plans/01-authoring-guide.md` | Repository research, readiness gate, fixed-contract/checkpoint/task design, context-boundary design, deferred verification, and quality rules. | Creating or materially revising a plan. |
| `docs/plans/02-execution-guide.md` | Plan discovery, selective resume/handoff, progress, repair, end-only verification, docs finalization, commit-message generation, scoped commit, and push. | Implementing/resuming a plan or responding to user failure/success verification. |
| `docs/plans/03-plan-template.md` | Canonical plan structure with snapshot, contracts, coherent checkpoints, context handoff capsules, final verification, documentation manifest, and delivery record. | Creating a plan; copy into `docs/plans/plan<N>.md`. |
| `docs/plans/plan<N>.md` | Simple-numbered one-file temporary specifications and progress ledgers for active or awaiting-verification work. | Executing/resuming the matching plan or checking exactly where work stopped. |

## Documentation states

- The framework files `docs/VERSION.md`, `docs/00-reading-guide.md`, `docs/01-writing-guide.md`, `docs/features/00-feature-template.md`, and `docs/plans/00-` through `03-` remain portable/generic.
- Project documents may start as `Documentation state: Template` or `Documentation state: Shared Next.js baseline`.
- `Shared Next.js baseline` is the base-project marker for an unmodified Next.js/shadcn starter. Use it to avoid re-researching default scaffold behavior during startup; verify only cheap drift or task-relevant differences.
- When source changes turn the app into a project-specific product, replace the base-project state in affected docs with `Documentation state: Project-specific` and remove starter assumptions that no longer apply.
- When bootstrap is required, it replaces each project document's state with `Documentation state: Project-specific` and fills/updates it from source evidence.
- Simple-numbered active plans are temporary and are deleted after verified delivery.

## Source and version maintenance

`docs/VERSION.md` is the canonical source/version manifest for this reusable docs package. The original source path is `E:\Apps\Coding\VSCode\Personal\docs`.

Every copied docs folder must preserve `docs/VERSION.md`. To check for upstream docs updates, compare the copied file's `Current version` with the `Current version` in the canonical source. If the source version is newer, inspect the source version history and merge or recopy only the reusable files that apply. Preserve project-specific verified facts in copied projects; merge shared baseline docs from upstream only while the local docs are still generic/template or `Shared Next.js baseline`.

When changing this canonical docs package, also follow the downstream sync playbook in `docs/VERSION.md`: sync the listed maintained project roots, include root `AGENTS.md` and `CLAUDE.md` when they changed, direct-copy pure reusable files, selectively merge project-specific docs, and verify copied files by hash or content checks.

When changing reusable files in the canonical source, update `docs/VERSION.md` in the same edit. Use patch version bumps for wording/correction-only changes, minor version bumps for new backward-compatible files/sections/workflows/metadata, and major version bumps for breaking required document structure or workflow changes. Each bump updates `Current version`, `Last changed`, and the newest-first version history entry. This is an agent-maintained automation rule, not a runtime hook.

## Timestamp and newest-first standard

Use `YYYY-MM-DD HH:mm +/-HH:MM` for human-readable timestamps, including the numeric UTC offset. Use the repository/user's current local timezone unless the project defines one canonical operational timezone. Active plan filenames do not carry timestamps; use `docs/plans/plan<N>.md` and keep created/updated/status timestamps inside the plan.

Apply this standard to plan creation/updates, change-log milestones, migration-ledger entries, dated blockers/deviations, documented verification runs, and other chronological records. Use the time the event actually occurred; never substitute the documentation-edit time for an unknown historical event. Mark legacy evidence `time not recorded` when the minute cannot be verified.

Keep chronological ledgers newest first so the latest state appears immediately below the heading/instructions. This includes `docs/14-change-log.md` and `docs/database/migrations.sql`. Plans keep one current snapshot in place rather than accumulating a session log; if a short chronological deviation/blocker list is necessary, prepend entries newest first.

When two records occur in the same minute, retain the same timestamp and use a stable source migration ID, commit SHA, or `-02`, `-03` sequence suffix where uniqueness is required. Do not alter timestamps merely to control ordering.

## Automatic project bootstrap

Run this procedure when project docs are marked Template or Shared Next.js baseline and the user requests documentation initialization, a ready implementation plan, or substantial project work that would otherwise rely on them. If the repository is still the unmodified shared Next.js/shadcn base project, do not spend the bootstrap on explaining default scaffold behavior again; confirm the cheap facts needed for the task and leave the base-project marker in place until real product changes exist.

1. Inspect repository instructions, root files, directory tree, manifests/lockfiles, configuration, README/design notes, environment examples, schema/migrations, routes/screens, server interfaces, shared UI, tests, and deployment files. Exclude dependencies/build outputs.
2. Read repository-local/version-matched framework documentation required by project instructions.
3. Inspect current Git branch/status so bootstrap does not overwrite unrelated user changes.
4. Populate every project document `02`–`14` with verified current facts and exact repository-relative paths. Rebuild `docs/database/schema.sql` as the complete verified schema and `docs/database/migrations.sql` as the newest-first documented migration history; use accurate empty-state comments when persistence is absent.
5. State `Not implemented` when a relevant subsystem is absent. Use `TODO — needs verification` when source exists but intent/behavior cannot be established. Never infer features from the repository name.
6. Detect major implemented features. Copy `docs/features/00-feature-template.md` to one kebab-case dossier per major feature and fill it from end-to-end source evidence.
7. Populate `docs/09-feature-map.md` with links to all created feature dossiers and real route/component/server/data/test/integration paths.
8. Record a documentation-baseline milestone in `docs/14-change-log.md` only after the project-specific docs are coherent.
9. Compare all path references against the repository and all route/feature links against created docs.

Bootstrap is documentation work. Do not change production code, install dependencies, add automation, or run expensive application checks solely to populate docs. Use existing source/config/test evidence; run a command only when a factual claim cannot be established cheaply otherwise.

## Source-of-truth order

Use evidence in this order:

1. Checked-out source/configuration and executable schema/migrations; then reconcile the status-labeled mirrors in `docs/database/schema.sql` and `docs/database/migrations.sql`.
2. Tests that demonstrably reflect current intended behavior.
3. Initialized permanent project docs.
4. README/design/historical notes.
5. Active plan for intended future behavior and progress only—not shipped facts.

For framework claims, use repository-local/version-matched upstream docs. When evidence conflicts, state the conflict and prefer current executable/configured behavior.

## Update workflow after code changes

### Establish the change surface

Use read-only Git inspection to find modified, deleted, and untracked files. A normal diff may omit untracked files. Preserve unrelated changes. Read complete changed source where practical plus callers, downstream consumers, schema, and tests that define its contract.

### Map source changes to permanent docs

| Changed area | Documentation to evaluate |
| --- | --- |
| Routes/screens/layouts/navigation/metadata | `docs/06-routes-and-pages.md`, `docs/09-feature-map.md`, owning feature dossier, possibly `docs/08-ui-patterns.md` |
| Server endpoint/action/command/job/webhook/query | `docs/07-api-and-server-actions.md`, auth/data docs, owning feature dossier |
| Schema/migration/seed/repository/query/transaction | `docs/04-database.md`, `docs/database/schema.sql`, `docs/database/migrations.sql`, `docs/10-business-rules.md`, auth ownership rules, owning feature dossier |
| Session/identity/permission/ownership/role enforcement | `docs/05-auth-and-permissions.md`, affected server/route/data/feature docs, `docs/11-known-issues.md` if risk remains |
| Shared component/style/token/form/interaction | `docs/08-ui-patterns.md`, consuming feature dossiers, `docs/09-feature-map.md` if routing changes |
| Manifest/lockfile/framework/tool/config/environment | `docs/03-tech-stack.md`, `docs/12-coding-standards.md`, `docs/13-testing-and-build.md`, architecture if runtime changes |
| Validation/calculation/state transition/user-visible invariant | `docs/10-business-rules.md`, owning feature dossier, enforcement/data/server docs |
| Fixed/introduced limitation | `docs/11-known-issues.md`, owning feature/cross-cutting doc, change log when durable |
| New or substantially expanded capability | `docs/09-feature-map.md`, new/updated feature dossier, all implicated cross-cutting docs |

The mapping is a review prompt, not a requirement to change every listed file. Update documents whose facts, navigation, rules, risks, or verification guidance changed.

### Exact schema and migration mirrors

`docs/database/schema.sql` is a full snapshot, not a change log. It must contain every verified SQL object—or every object in the complete proposed target while an active plan owns it. Always update its status, minute timestamp with UTC offset, owning plan, and executable source path. Never leave a partial table subset that could be mistaken for the complete schema.

`docs/database/migrations.sql` is a retrieval ledger, not an executable migration bundle. Prepend the newest entry; never append it at the bottom. Every entry must include a stable migration ID, minute timestamp with UTC offset, lifecycle status, owning plan, real/proposed source migration path, purpose, enabled feature or fixed problem, dependency/order, exact forward SQL, data/backfill impact, locking/downtime risk, compatibility/rollback, and verification evidence.

During planning, the planning agent may advance these mirrors to an explicitly labeled `Proposed` target only after it personally resolves the complete data design. Do not delegate that design to a lower-capability subagent or executor. The plan must carry exact executable/ORM file changes and migration SQL so implementation requires no schema judgment.

During implementation, mark the owning target/entry `Implemented - awaiting verification`; do not call it verified. During success-triggered finalization, reconcile both SQL files against actual source/migrations, promote them to `Verified`, update `docs/04-database.md` and affected feature/rule/auth/server docs, then add the newest-first change-log milestone. If a proposed plan is abandoned or superseded, remove/revise its proposed ledger entry and restore a complete schema snapshot matching the surviving verified/proposed owner.

## Verified-plan documentation finalization

When the user confirms an active plan works:

1. Read `docs/plans/02-execution-guide.md`, the completed plan, verified source, and final diff.
2. Use the plan's permanent-document manifest plus the mapping above.
3. Document what exists—not merely what the plan intended.
4. Update/create the feature dossier and feature map for new/materially changed capabilities.
5. Reconcile `docs/database/schema.sql` and `docs/database/migrations.sql` for data changes; promote only user-verified targets/entries to `Verified`.
6. Replace stale `Not implemented`/TODO claims; update known issues and testing guidance.
7. Prepend a minute-stamped durable change-log milestone when future implementation context changed.
8. Delete the active plan, run this guide's consistency review, then return to the execution guide for scoped commit/push.

If user verification is pending, keep permanent behavior docs and the active plan as-is.

## AI-efficient writing rules

1. Lead with status: implemented, partial, not implemented, needs verification, or proposed.
2. Use search-friendly nouns: route/screen, symbol, schema/table, environment variable, command, error, integration name, and user terminology.
3. Name ownership: which file defines, calls, renders, validates, authorizes, persists, and tests behavior.
4. Describe flows in execution order from input through state/side effects to output/error.
5. Record invariants, failure behavior, permissions, and no-regression constraints.
6. Include useful negative facts (for example, “No persistence layer exists”) to prevent wasted searching.
7. Separate verified current facts from proposed future behavior.
8. Prefer maps/tables for repeated exact relationships; use prose for rationale and sequences.
9. Avoid copying large source blocks or generic framework tutorials.
10. For durable context/handoff summaries, preserve outcomes, contracts, exact paths/symbols, invariants, unresolved risks, and verification evidence; omit exploration, failed hypotheses, routine logs, and conversational narration.
11. Keep one canonical explanation per topic and link/summarize elsewhere.

## Referencing source

- Use repository-relative paths in backticks and verify they exist.
- Name exported symbols/commands/schema objects when a file has several responsibilities.
- Explicitly map public route/screen ownership to its source path.
- Reference configuration beside the behavior it controls.
- For flows, list paths in execution order.
- Label uncreated paths `Proposed new file`; never present them as current.
- Prefer stable paths/symbols over line numbers.

Bad: “The service handles item updates.”

Good: “`<route/controller path>` validates `<input schema>`, derives identity through `<auth helper>`, calls `<service symbol>`, writes `<schema objects>` in `<transaction>`, and returns `<success/error contract>` to `<caller path>`.”

## Canonical ownership and duplication control

- System boundaries/flows: `docs/02-architecture.md`
- Versions/config/environments: `docs/03-tech-stack.md`
- Data structure/lifecycle: `docs/04-database.md`
- Exact full schema/active target DDL: `docs/database/schema.sql`
- Exact chronological migration history/proposals: `docs/database/migrations.sql`
- Identity/authorization: `docs/05-auth-and-permissions.md`
- Routes/screens/navigation: `docs/06-routes-and-pages.md`
- Server entry points/contracts: `docs/07-api-and-server-actions.md`
- Reusable UI/interaction: `docs/08-ui-patterns.md`
- Feature-to-files navigation: `docs/09-feature-map.md`
- Cross-feature invariants: `docs/10-business-rules.md`
- Risks/limitations: `docs/11-known-issues.md`
- Repository code conventions: `docs/12-coding-standards.md`
- Checks/suites/final verification: `docs/13-testing-and-build.md`
- Durable verified milestones: `docs/14-change-log.md`
- End-to-end feature behavior: `docs/features/*.md`
- Temporary intended behavior/progress: simple-numbered `docs/plans/plan<N>.md`

Repeat only the context needed for a document to route correctly; link to the canonical detail instead of maintaining competing explanations.

## When not to update permanent docs

Do not update for formatting-only changes, removed temporary debugging, generated outputs, lockfile churn without relevant dependency/runtime effect, or local implementation details that do not improve routing/safety/verification. Do update stale paths after moves even when behavior is unchanged.

During active-plan implementation, maintain only the plan progress ledger. Defer permanent behavior updates until explicit user verification, then synchronize all affected docs once before commit/push.

## Feature dossiers

Create a dossier by copying `docs/features/00-feature-template.md` when a capability spans multiple implementation surfaces, has durable rules/risks, or needs end-to-end understanding. Add it to `docs/09-feature-map.md` in the same verified documentation update.

Every dossier must keep the template headings/order. Under **Key files**, group actual routes/screens, components, server operations, data/migrations, tests, and configuration/integrations. Write `None implemented` for absent groups. Do not create speculative dossiers from repository names or roadmap ideas.

## Risk and uncertainty labels

- **Known issue — confirmed:** reproducible behavior/evidence establishes a limitation.
- **Fragile area:** works, but coupling/missing coverage increases regression risk.
- **Intentional design:** surprising behavior is deliberate; state reason and enforcement source.
- **TODO — needs verification:** implementation exists but intent/edge behavior is unclear.
- **TODO — design decision required:** capability is absent and a future choice is unresolved.
- **Not implemented:** inspection found no implementation surface.

## Final consistency review

1. Confirm `AGENTS.md` and `CLAUDE.md` route intent without requiring internal filenames from the user.
2. Confirm the document directory here exactly matches `docs/00-reading-guide.md`.
3. Confirm `docs/VERSION.md` preserves the canonical source path, downstream sync targets, copy/merge surfaces, and was bumped in the same edit whenever reusable framework files changed.
4. Confirm initialized project docs use `Documentation state: Project-specific`; unverified reusable copies may use `Shared Next.js baseline`; portable prompt-only templates remain generic.
5. Confirm every feature-map dossier link exists and every dossier represents implemented behavior.
6. Verify backticked current paths; ignore explicitly proposed placeholders/templates.
7. Search for stale claims contradicted by source/diff.
8. Confirm uncertainty/plans are not described as shipped.
9. Confirm no product/domain-specific names/examples leaked into portable workflow/template files; verified shared Next.js baseline technology is allowed only in baseline-marked project docs.
10. Confirm no hooks/background automation were added; verified commit/push remains an explicit agent action.
11. When finalizing a plan, confirm permanent docs are synchronized and the plan is deleted before commit/push.
12. Confirm chronological records use minute timestamps with UTC offsets and newest-first ordering; unknown legacy times are labeled rather than invented.
13. For data-changing plans, confirm the planning agent authored the exact design, schema/migration statuses are truthful, the schema mirror is complete, and migration entries are newest first with real source paths/evidence.

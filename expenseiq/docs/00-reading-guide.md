# Documentation reading guide

> **Plan task?** For plan creation, implementation, resumption, repair, status, verification, or delivery, go directly to `docs/plans/00-planning-guide.md`. It routes the operation automatically.

> **Documentation task?** For documentation bootstrap, writing, updating, review, or reorganization, go directly to `docs/01-writing-guide.md`. Do not continue through the rest of this reading guide unless the writing guide or the documentation task requires it.

This is the entry point for ordinary project work. It routes an agent to the smallest set of permanent project docs needed for accurate implementation.

## Documentation-state check

Before relying on a copied docs package, inspect `docs/VERSION.md`.

- The canonical source for this reusable docs package is `E:\Apps\Coding\VSCode\Personal\docs`.
- Copied docs folders keep `docs/VERSION.md` so they can compare their `Current version` against the source version.
- When the source version is newer, merge or recopy the changed reusable files listed in `docs/VERSION.md`; preserve project-specific verified facts in the target project.

Before relying on project facts, inspect the state marker near the top of `docs/02-architecture.md`.

- `Documentation state: Template` means the portable framework contains prompts only.
- `Documentation state: Shared Next.js baseline` means it is the intentionally copied base-project marker for an unmodified Next.js/shadcn starter. Use those starter facts as sufficient orientation; do not spend startup context rediscovering ordinary framework scaffold behavior unless the repository has drifted or the task touches it. Replace this state with `Project-specific` once real project modifications supersede the base project.
- `Documentation state: Project-specific` means the permanent docs have been initialized from this repository. Read only the documents relevant to the task.

Never treat template prompts/placeholders as project behavior. Treat shared-baseline facts as base-project orientation, not durable product behavior. Once implementation adds or changes product/domain behavior, remove the base-project state from the affected docs instead of preserving starter assumptions indefinitely.

## How to choose documents

1. Identify the capability, route/screen, subsystem, data object, integration, or failure named by the task.
2. Open `docs/09-feature-map.md` when the task names a feature but not its implementation files.
3. Open the linked `docs/features/*.md` dossier, then follow its **Key files** map into source.
4. Add only the cross-cutting docs implicated by the change: architecture, stack, data, auth, routes, server interfaces, UI, business rules, issues, coding standards, or testing.
5. Read current source/configuration before editing. Docs route and explain; checked-out implementation remains authoritative.
6. Read repository-local/version-matched framework or dependency documentation when APIs/conventions may differ from general knowledge.

When code and initialized docs disagree, use source/config/schema/tests as evidence, then correct affected docs through `docs/01-writing-guide.md`. Preserve future designs only when clearly labeled proposed.

## Context-minimal reading

- Do not load the entire documentation tree or broad source directories by default.
- Start with the feature map/dossier and exact cross-cutting docs selected by the task.
- Prefer targeted symbol/file reads over repeated whole-file/tree output when the required section is known.
- Treat source paths in plans/docs as reload pointers: reread current source when needed instead of preserving large copied code/logs in conversation.
- On plan resume, load the execution snapshot, fixed contracts, active checkpoint, context handoff capsule, final acceptance criteria, consolidated verification, and documentation manifest. Load completed checkpoint bodies only for declared dependencies.
- Keep resolved debugging as a compact durable outcome (symptom, root cause, fix, invariant, regression evidence); discard failed hypotheses and raw logs from future handoffs.

## Document directory

This exact directory is repeated in `docs/01-writing-guide.md` so documentation work can enter there directly.

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

## Common task reading sets

These are starting sets. Add or remove documents based on the real change.

| Task type | Usually read |
| --- | --- |
| Existing feature change | `docs/09-feature-map.md`, owning feature dossier, implicated cross-cutting docs, `docs/13-testing-and-build.md` |
| New page/screen/navigation | `docs/06-routes-and-pages.md`, `docs/08-ui-patterns.md`, `docs/09-feature-map.md`, owning/new feature dossier |
| New feature | `docs/09-feature-map.md`, `docs/10-business-rules.md`, then architecture/data/auth/server/UI/testing docs implicated by the design |
| Data/query/migration | `docs/04-database.md`, `docs/database/schema.sql`, `docs/database/migrations.sql`, owning feature dossier, `docs/10-business-rules.md`, `docs/05-auth-and-permissions.md`, `docs/13-testing-and-build.md` |
| Authentication/access control | `docs/05-auth-and-permissions.md`, relevant server/route/data docs, affected feature dossiers, `docs/11-known-issues.md` |
| API/action/job/webhook | `docs/07-api-and-server-actions.md`, `docs/05-auth-and-permissions.md`, `docs/04-database.md`, owning feature dossier |
| Shared UI/design-system change | `docs/08-ui-patterns.md`, `docs/03-tech-stack.md`, affected feature dossiers, `docs/11-known-issues.md` |
| Dependency/configuration/upgrade | `docs/03-tech-stack.md`, `docs/02-architecture.md`, `docs/12-coding-standards.md`, `docs/13-testing-and-build.md`, relevant version-matched upstream docs |
| Bug investigation | Owning feature dossier, `docs/11-known-issues.md`, `docs/10-business-rules.md`, and owning cross-cutting docs |
| Plan creation/execution/finalization | `docs/plans/00-planning-guide.md`; it automatically selects authoring versus execution context |
| Documentation bootstrap/update | `docs/01-writing-guide.md`; open other files as evidence, not as assumed truth while marked Template |

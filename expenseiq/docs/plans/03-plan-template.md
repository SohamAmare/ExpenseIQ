# Active implementation plan template

This is portable workflow documentation, not an active plan. Copy the structure below into the lowest unused `docs/plans/plan<N>.md` and replace every placeholder from verified repository evidence.

---

# Plan: <specific outcome>

- Status: Draft | Ready for implementation | In progress | Blocked | Implementation complete — awaiting user verification
- Created: YYYY-MM-DD HH:mm ±HH:MM
- Last updated: YYYY-MM-DD HH:mm ±HH:MM
- Status updated: YYYY-MM-DD HH:mm ±HH:MM
- Planned against commit: `<HEAD SHA>`
- Relevant dirty files: `<paths or None>`
- Requested outcome: <one-sentence user/system result>
- User confirmations required before implementation: None | `<decision IDs/questions>`

## Instructions for implementing this plan

- Read `docs/plans/00-planning-guide.md`, `docs/plans/02-execution-guide.md`, and this plan before editing.
- If permanent project docs are Template, bootstrap them through `docs/01-writing-guide.md`. If they are Shared Next.js baseline and the repository is still the base project, use the base-project shortcut; bootstrap affected docs only when project-specific source changes or this plan needs facts beyond the baseline.
- On first implementation, read the whole plan. On resume, read the execution snapshot, baseline/scope, fixed contracts, final acceptance criteria, active checkpoint, its context boundary/handoff capsule/resume read set, final verification, and permanent-document manifest; read completed checkpoint bodies only for declared dependencies.
- Treat this plan, current source, initialized permanent docs, and Git state as durable; treat chat history as disposable. Before compaction or a fresh-context handoff, update the plan's snapshot, tasks, context boundary, and handoff capsule.
- If database impact is `Required`, treat the planning-authored data specification, `docs/database/schema.sql`, and the owning entry in `docs/database/migrations.sql` as exact. The executor must not make schema/migration decisions; contradictions block and return to planning.
- If client-side observable storage impact is `Required`, treat the observed-read and mutation-path contracts below as exact. The executor must not move writes, default seeding, lazy creation, sync, or readwrite transactions into observable query callbacks.
- If React/Next.js framework impact is `Required`, read `docs/12-coding-standards.md` and treat the framework contracts below as exact. The executor must not make hook, Server/Client boundary, cache, runtime, or stream/body decisions; contradictions block and return to planning.
- If UI impact is `Required`, read `docs/08-ui-patterns.md` and treat the visual, theme, and responsive UI contracts below as exact. The executor must not make visual direction, gradient/effect, theme-token, mobile layout, breakpoint, or responsive interaction decisions; contradictions block and return to planning.
- If user confirmations are required or the ambiguity status is not `None` or `Resolved`, do not implement. Ask the recorded questions and update this plan after the user answers.
- Implement only when status is `Ready for implementation` or `In progress`.
- Treat fixed decisions as authoritative. If source drift or a missing decision makes work unsafe, mark plan/checkpoint Blocked with evidence and ask rather than inventing architecture.
- Set plan/checkpoint In progress before work. Tick tasks immediately after their listed source behavior/substeps are implemented and reviewed; do not wait until session end.
- Do not routinely run typecheck, lint, build, test suites, manual smoke flows, browser automation, or Playwright after tasks/checkpoints. Implement all checkpoints first, then run the smallest consolidated final verification that proves the changed risk. Use an intermediate command only when later work cannot proceed safely without it, and record why.
- Keep partial work unchecked with a concise progress/blocker note.
- After consolidated verification passes, set `Implementation complete — awaiting user verification` and keep the plan while the user tests.
- When user explicitly confirms success, follow the execution guide: sync permanent docs, delete this plan, generate the commit subject, commit scoped changes, and push the current branch to `origin` without another confirmation.

## Execution snapshot

- Snapshot timestamp: YYYY-MM-DD HH:mm ±HH:MM
- Current checkpoint: Not started
- Next task: Begin Checkpoint 1
- Context action: Continue
- Context handoff ready: Not needed
- Completed checkpoints: None
- Checkpoints implemented but not final-verified: None
- Blockers: None
- Final verification: Not run (record `YYYY-MM-DD HH:mm ±HH:MM` with result)
- User verification: Pending (record confirmation timestamp)
- Final delivery: Pending (record commit/push timestamp)

## Objective

<Final outcome, why it is needed, and exact change boundary.>

## Source context

- `<existing path/symbol>` — <current responsibility and constraining behavior>
- `<caller/downstream path>` — <relationship>
- `<repository-local/version-matched documentation>` — <rule, if applicable>

## Fixed contracts and decisions

- D1: <Exact product/architecture/UX/data/security contract and evidence/rationale.>
- D2: <Another exact shared contract.>

## Ambiguities and user confirmations

- Status: None | Required before implementation | Resolved
- Ambiguity summary: <material unclear product/design/data/security/responsive/verification decisions, or None>.
- Evidence checked: <source/docs/patterns/user request inspected before asking, or None>.
- Confirmation questions: <short questions to ask before implementation; include recommended option first, alternatives after it, and allow a completely different user answer>.
- User decision: <confirmed choice and timestamp, or Pending>.
- Plan impact after confirmation: <contracts/checkpoints/files/acceptance criteria to update, or None>.

## React/Next.js framework contracts

- Framework impact: None | Required
- Version/source checked: `<installed docs path or official docs URL>` | None
- Touched route/layout files and rendering mode: `<path>` -> Server Component | Client Component | metadata/layout/route special file
- Client boundaries: `<path>` owns `<state/effects/events/browser APIs>`; parent receives/passes only serializable props.
- Server-only boundaries: `<path/module>` owns `<data/auth/secrets/fs/server SDK>` and must not be imported by Client Components except through type-only imports.
- Hooks/custom hooks: `<hook/path>` may be called only from `<allowed components/hooks>`; no conditional/loop/nested/after-return calls.
- Data fetching and mutation entry points: `<Server Component | Server Action/Function | Route Handler | client fetch>` with validation/auth/error contract.
- Cache/dynamic rendering/revalidation: `<static/dynamic/fetch cache/revalidate/tags/paths/cookies/headers/searchParams impact>`.
- Route Handler/runtime/body/stream ownership: `<Node.js | Edge | default>`, `<body read once | cloned | teed | buffered>`, `<stream response/abort/error handling>` | None.
- Rendered HTML and hydration invariants: no nested anchors/links, nested
  buttons, button/anchor nesting, nested forms, raw `<script>` tags from React
  render output, or nondeterministic first render from time/random/locale/browser
  state unless a serialized server snapshot or client-after-mount strategy is
  specified.
- Forbidden shortcuts: Do not make broad parents Client Components, import server runtime modules into clients, pass non-serializable props, use Pages Router handler signatures in `route.ts`, consume streams twice without an explicit strategy, nest interactive elements to make a whole card clickable, or silence hydration errors without removing the mismatch.

## Responsive UI contracts

- UI impact: None | Required
- Visual direction: Premium, minimal, classy, intentional, uncluttered unless explicitly requested otherwise.
- Gradients/effects: No gradients, gradient text, glow washes, faded/masked important words, or arbitrary glass effects unless the user explicitly requested them.
- Font contract: Geist for sans/display/body/headings and Geist Mono for monospace by default; approved customization choices only; route fonts through variables/tokens, not hard-coded component font families.
- Text scale: Comfortable and slightly larger than bare-minimum readability; small text only for truly secondary metadata with sufficient contrast/line-height.
- Radius scale: Consistent softly rounded corner system across related controls/surfaces; no arbitrary one-off radii unless justified.
- Theme token contract: <semantic CSS variables/tokens used or added for surfaces, text, brand/accent, states, charts, focus, shadows; no hard-coded component colors where tokens should apply>.
- Theme customization path: <how these tokens can later be surfaced in settings with swatches/previews/reset/contrast feedback, or why no new token is needed>.
- Mobile default: Single-column | Explicit user exception: `<quote/request>`
- Mobile layout contract: <how the affected page/section stacks content, preserves task flow, and avoids page-level horizontal scrolling>.
- Wider-screen enhancement: <desktop/tablet grids, rails, sidebars, split panes, dense tables, or `None`>.
- Affected responsive surfaces: navigation `<behavior>`, sidebars `<behavior>`, filters `<behavior>`, forms `<behavior>`, cards/grids `<behavior>`, tables/charts/media `<behavior>`, dialogs/sheets `<behavior>`, fixed/sticky/action bars `<behavior>`.
- Responsive ambiguity check: <confirmed both mobile and wider-screen behavior, or list pending question under Ambiguities and user confirmations>.
- Mobile verification plan: <source/style review only, or exact widths/devices/project standard when runtime viewport checks are warranted/requested>.

## Database change specification

- Impact: None | Required
- Planning ownership: The planning agent personally resolved this design; no schema/migration decisions are delegated to the executor.
- Current executable schema source: `<path(s)>` | None
- Current migration source/order: `<path/tool/last applied migration>` | None
- Target schema mirror: `docs/database/schema.sql` (`Verified` unchanged | `Proposed` owned by this plan)
- Migration ledger entry: `docs/database/migrations.sql#<Migration ID>` | None
- Proposed executable schema/migration paths: `<path(s), labeled Proposed new file where needed>` | None
- Provider/runtime assumptions verified from: `<source/config/version-matched docs>` | None

When impact is `Required`, replace the following placeholders with exact decisions and keep the full target/SQL in the linked mirrors:

- Objects/columns/types/defaults/nullability: <complete changed contract>.
- Keys/relationships/constraints/indexes/views/triggers/functions/policies: <complete changed contract>.
- Ownership/auth/validation/enforcement: <trusted identity and exact enforcement paths>.
- Units/precision/timezone/lifecycle/deletion: <exact semantics>.
- Forward migration and ORM/source edits: <exact ledger entry ID and exact symbols/files; no generation decisions left>.
- Existing-data backfill/transformation: <deterministic algorithm, batching, invalid data behavior, or None>.
- Transactions/locking/downtime: <exact boundary, risk, and mitigation>.
- Deployment/compatibility order: <expand/migrate/contract or other exact sequence>.
- Rollback/recovery/retry/idempotency: <exact procedure and limits>.
- Data verification: <exact validation queries/invariants to run in consolidated final verification>.
- Competing active schema plans checked: <paths and resolution, or None>.

## Client-side observable storage contracts

- Observable storage impact: None | Required
- Library/runtime: Dexie `liveQuery` | Dexie `useLiveQuery` | IndexedDB wrapper | Other | None
- Observable read paths: `<component/hook/repository>` -> `<read-only helpers called>`
- Mutation paths: `<action/effect/repository>` -> `<writes/readwrite transactions>`
- Default/init paths: `<migration/startup effect/action>` initializes `<records/settings>` outside observed queries, or None.
- Read-only invariant: Observable callbacks and every helper they call perform no writes, no default seeding, no lazy creation, no sync side effects, and no `readwrite` transactions.
- Naming/API split: read helpers are named `<get/read/list...>` and mutation helpers are named `<ensure/create/update/delete...>`, or document the project-specific equivalent.
- Runtime regression check: <render subscribing route, exercise startup/default state and mutation, confirm observer update after commit and no `ReadOnlyError`/readwrite transaction in live query>.

## Scope boundaries

### Must modify

- `<path or bounded glob>` — <why required>

### May modify

- `<path or bounded glob>` — <allowed supporting change>

### Must not modify

- `<path/behavior/subsystem>` — <protected boundary>

## Out of scope

- <Explicit adjacent work excluded.>

## Final acceptance criteria

- AC1: <Observable success result.>
- AC2: <Required failure/empty/loading/permission behavior.>
- AC3: <No-regression result.>

## Checkpoint summary

| Checkpoint | Coherent unit | Status | Depends on |
| --- | --- | --- | --- |
| 1 | <unit name> | Not started | None |

Use checkpoint statuses `Not started`, `In progress`, `Blocked`, `Implemented`, and `Complete`. `Implemented` means source tasks are done but consolidated final verification has not yet passed; `Complete` is assigned only after final verification.

## Checkpoint 1: <complete unit name>

### Checkpoint status

`Not started`

- Status timestamp: YYYY-MM-DD HH:mm ±HH:MM

### Unit outcome

<Complete behavior delivered and why this is one coherent independently understandable unit.>

### Deep context and fixed constraints

<Checkpoint-specific context. Reference decision IDs rather than duplicating plan-level prose. Do not depend on another checkpoint's unstated reasoning.>

### Framework constraints

- Component/runtime classification: <Server Component | Client Component | shared module | Route Handler | Server Action/Function | None>.
- Hook legality: <where hooks may/must not be called in this checkpoint>.
- Server/client import boundary: <server-only modules and client-safe/type-only imports>.
- Serialization/cache/stream constraints consumed: <exact framework contract IDs or None>.
- Valid HTML/hydration constraints: <anchors/buttons/forms/scripts/deterministic render invariants consumed, or None>.

### Responsive constraints

- Visual/theming behavior: <premium/minimal rule, Geist/Geist Mono or approved font option, comfortable text scale, consistent radius scale, token usage, no unrequested gradients/faded text, settings-customization impact>.
- Mobile behavior: <single-column stack or explicit user-approved exception>.
- Wider-screen behavior: <enhancement or None>.
- Responsive risks: <overflow/overlap/fixed element/table/media/dialog risk and mitigation, or None>.

### Dependencies and consumed contracts

- Decisions: `D1`, `D2`
- Prior/source contract: <exact contract or None>

### Files to create or modify

- `<existing path>` — <exact symbols/responsibility/change plus Server/Client/shared/route-handler classification>
- `<new path>` — **Proposed new file:** <exact responsibility plus Server/Client/shared/route-handler classification>

### Tasks

- [ ] <Behavior-sized implementation outcome and source-level completion condition.>
  - `<path/symbol>`: <exact substep/behavior>.
  - `<path/symbol>`: <integration/failure-state substep>.
- [ ] <Next behavior-sized implementation outcome.>
  - `<path/symbol>`: <exact substeps>.

If interrupted, add `Progress: <finished substeps>; next: <exact action>` under the still-unchecked task.

### Acceptance criteria covered

- Covers: `AC1`, `AC2`
- <Unit-specific observable/invariant result to assess in final verification>.

### Deferred verification requirements

- <Focused automated/manual behavior to include in consolidated final verification>.
- Intermediate prerequisite command: None. <If unavoidable, replace with exact narrow command and reason later work cannot safely proceed without it.>

### Context boundary

- Recommended action: Continue | Compact if supported | Fresh context if supported and explicitly authorized
- Reason: <Why this is the cheapest safe action and whether the next checkpoint depends on active reasoning.>
- Preserve: <Outcome, decision IDs, changed paths/symbols, new invariants, unresolved risks, next checkpoint/task, and consequential evidence.>
- Discard: <Raw logs, failed hypotheses, temporary debugging details, resolved errors, and narration no longer needed; or None.>
- Resume read set: <Exact plan sections, permanent docs, source paths/symbols/ranges, and Git evidence required next.>
- Handoff capsule: <Compact implementation-ready state summary; write `Not needed — continue with active context` when appropriate.>
- Handoff performed: Not performed | YYYY-MM-DD HH:mm ±HH:MM

## Deviations and blockers (newest first)

None.

When needed, prepend entries using:

```md
### YYYY-MM-DD HH:mm ±HH:MM — <short label>

- Status: Active | Resolved
- Evidence: <exact source/error/constraint>
- Impact: <checkpoint/tasks/contracts affected>
- Resolution/next action: <exact outcome or required decision>
```

## Consolidated final verification

Run only after every checkpoint is `Implemented`. Keep this proportional: documentation/simple local edits may use source review and path/link/text checks only; builds, servers, manual browser checks, and Playwright require touched risk, user request, or a reported runtime/UI defect.

| Order | Command/flow | What it proves | Required result |
| --- | --- | --- | --- |
| 1 | `<source review / path-link-text check / focused test / None>` | <lowest-cost local proof> | <pass condition> |
| 2 | `<project static/type/lint command(s) or None>` | <static correctness only if touched risk warrants it> | <pass/no-new-warning condition> |
| 3 | `<relevant full test/build/package command(s) or None>` | <integration/production readiness only if touched risk warrants it> | <pass condition> |
| 4 | `<manual/browser/Playwright flow or None>` | <runtime/visual/interaction proof only if warranted/requested> | <expected result> |

- [ ] Every checkpoint is `Implemented` and all tasks are checked.
- [ ] React/Next.js framework contracts were reviewed against changed source: hook order, Server/Client boundaries, serializable props, server-only imports, valid HTML nesting, raw script placement, hydration determinism, route-handler signatures, cache/revalidation behavior, and stream/body ownership where applicable.
- [ ] Client-side observable storage contracts were reviewed where applicable: live observed reads are read-only, writes/default seeding/readwrite transactions are outside observers, and the final runtime check covers the no-`ReadOnlyError` path.
- [ ] Visual/theme contracts were reviewed: premium/minimal finish, no unrequested gradients or faded important text, Geist/Geist Mono defaults or approved font overrides, comfortably readable text sizing, consistent rounded-corner scale, semantic token use instead of hard-coded colors, light/dark contrast, and future settings customization path.
- [ ] UI contracts were reviewed at narrow/mobile and wider breakpoints: mobile remains single-column unless explicitly exempted, with no page-level horizontal scrolling, overlap, clipping, or unusable fixed/sticky controls.
- [ ] Consolidated final verification passes, with pre-existing failures/warnings recorded precisely.
- [ ] All final acceptance criteria are satisfied without unplanned scope/architecture changes.
- [ ] Checkpoint statuses are promoted from `Implemented` to `Complete`.

## Permanent documentation updates after verification

| Document | Exact verified update required |
| --- | --- |
| `<docs/...>` | <fact/navigation/rule/risk/verification delta> |
| `docs/database/schema.sql` | <Complete target/status reconciliation if database impact is Required; otherwise remove row.> |
| `docs/database/migrations.sql` | <Owning entry/status/evidence reconciliation if database impact is Required; otherwise remove row.> |

Use one centralized table; do not repeat documentation impact inside checkpoints.

## Implementation completion record

- Completed checkpoints: None
- Implementation completed: Pending (`YYYY-MM-DD HH:mm ±HH:MM` when complete)
- Consolidated final verification: Not run (`YYYY-MM-DD HH:mm ±HH:MM` with result when run)
- Remaining work/blockers: All implementation pending
- User verification: Pending (`YYYY-MM-DD HH:mm ±HH:MM` when confirmed)
- Context handoffs performed (newest first): None; record `<timestamp> — <from checkpoint> → <next checkpoint/context>` when used
- Final documentation sync: Pending (`YYYY-MM-DD HH:mm ±HH:MM` when complete)
- Plan deletion: Pending
- Commit/push: Pending (`YYYY-MM-DD HH:mm ±HH:MM`, subject/SHA/branch/result when complete)

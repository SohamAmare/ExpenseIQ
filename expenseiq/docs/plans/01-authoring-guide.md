# Plan authoring guide

Use this file only to create or materially revise an implementation plan. Start with `docs/plans/00-planning-guide.md` and copy `docs/plans/03-plan-template.md` into one simple-numbered plan file.

## Automatic authoring workflow

1. Infer the requested outcome; do not ask the user to identify internal docs or implementation files.
2. Check `docs/02-architecture.md`. If project docs are `Template`, bootstrap them through `docs/01-writing-guide.md`. If they are `Shared Next.js baseline` and the repository is still the base project, use the base-project shortcut there instead of re-researching default scaffold behavior; bootstrap affected docs only when project-specific source changes or the plan needs facts beyond the baseline.
3. Use `docs/00-reading-guide.md` to select only task-relevant initialized docs.
4. Inspect actual entry points, routes/screens, UI, server/domain code, data/migrations, auth, configuration, callers, tests, working tree, branch, and HEAD involved. For any possible data change, also read `docs/04-database.md`, `docs/database/schema.sql`, `docs/database/migrations.sql`, and every affected executable schema/migration source.
5. Read repository-local/version-matched framework/dependency docs required by repository instructions or the planned APIs.
6. Trace current behavior end to end and resolve decisions from source, initialized docs, and explicit user direction.
7. Search `docs/plans/plan<N>.md` active plans by filename/title/objective/status; revise a matching plan instead of duplicating it.
8. Create the lowest unused `docs/plans/plan<N>.md` from the template. Record the descriptive title, `Created`, `Last updated`, and snapshot/status timestamps as `YYYY-MM-DD HH:mm +/-HH:MM` inside the plan.
9. Keep chronological blocker/deviation records newest first; do not create a routine session diary.
10. Set `Ready for implementation` only after the readiness gate passes.
11. Return the plan path, status, coherent checkpoint outcomes, and any truly blocking decision. A plan-only request does not change application source, except its explicitly proposed documentation-only schema/migration mirrors when data changes are planned.

## Readiness gate: no decisions left for the implementer

A ready plan fixes every relevant choice about:

- architecture, dependencies, paths, module/process boundaries;
- React/Next.js runtime boundaries: Server Component, Client Component, shared module, Route Handler, Server Action/Function, stream, cache, and runtime ownership;
- public routes/screens/interfaces, callers, inputs, outputs, and errors;
- data/schema, constraints, ownership, migrations, transactions, observable read/write boundaries, units, dates;
- identity, permissions, validation, failure, retry/idempotency, side effects;
- UI hierarchy, components, states, premium/minimal visual direction, typography
  defaults/options, theme tokens/customization readiness, mobile single-column
  behavior, wider-screen enhancements, accessibility, interaction;
- scope, acceptance criteria, proportionate final verification, permanent docs, and delivery.

If a material choice cannot be established, save the researched plan as `Draft`, record exact evidence/options, and ask. Never hide a decision behind “appropriate,” “as needed,” “properly,” “wire up,” or “handle edge cases.”

## Ambiguity confirmation gate

A plan cannot be `Ready for implementation` while a material ambiguity remains.
This applies to product behavior, architecture, data, auth/security, UI/design,
visual style, theme customization, mobile/desktop responsiveness, copy/content,
verification, rollout, and anything else that would force the implementer to
choose intent.

When ambiguity remains after checking source, docs, existing patterns, and the
user's request:

- Keep or set the plan to `Draft`.
- Record the unresolved decision, what evidence was checked, and why guessing
  would be risky.
- Pause and ask the user before implementation.
- Present a recommended option first, then reasonable alternatives, then allow
  the user to type a completely different answer.
- Prefer one to three focused questions at a time. Each question should be short
  and tied to a concrete implementation consequence.
- Do not ask the user to identify internal files, framework mechanisms, or
  implementation minutiae unless that is the actual decision they need to own.

Responsive ambiguity must be treated as material. If the user describes the
desktop experience but mobile is unclear, ask how mobile should behave before
marking the plan ready. If the user describes mobile but the wider-screen
experience is unclear, ask how desktop/tablet should use the extra space. If one
breakpoint can safely follow the existing project pattern, state that as the
recommended option and still offer alternatives when the result is user-visible.

## Database design ownership

The planning agent handling the user's plan request must perform the schema reasoning itself. Do not delegate schema/migration design to a lower-capability subagent, executor, code generator, or a placeholder task. An implementation agent may execute and report contradictions; it does not choose the data architecture.

For every plan, set database impact to `None` or `Required`. If `Required`, the plan cannot be `Ready for implementation` until the planner has:

1. verified the current executable schema, migration history/order, provider capabilities, and the complete current SQL mirror;
2. fixed every object/column/type/default/nullability, key/relationship, constraint, index, view, trigger/function, row-level policy, ownership rule, unit/time semantic, and deletion behavior implicated by the change;
3. chosen the real/proposed executable schema and migration file paths and the stable migration ID;
4. written exact forward SQL plus any ORM/schema-source edits—no pseudocode or “generate a migration” instruction;
5. specified deterministic backfill/data transformation, batching, locking/downtime, transaction, deployment ordering, forward/backward compatibility, rollback/recovery, retry/idempotency, and validation queries;
6. replaced `docs/database/schema.sql` with the complete post-change target, marked `Proposed`, minute-stamped, and owned by this plan;
7. prepended the exact `Proposed` entry to `docs/database/migrations.sql`, newest first, with the reason and enabled feature/fixed problem;
8. checked for another active schema-owning plan and resolved/serialized any conflict rather than creating competing targets.

The plan references the exact mirror entry/target instead of duplicating the full schema repeatedly. If the database impact is `None`, the planner must still say so explicitly after checking whether persistence, ownership, or stored data is affected.

## Client-side observable data ownership

For every plan that touches client-side persistence, subscriptions, repository functions, settings/defaults, or startup initialization, set observable storage impact to `None` or `Required`. This applies even when SQL database impact is `None`.

If impact is `Required`, the plan cannot be `Ready for implementation` until the planner has:

1. identified every observable read path, such as Dexie `liveQuery` or `useLiveQuery`, and every repository/helper it calls;
2. proven those observer callbacks are read-only and call only read-only helpers;
3. separated all writes, default seeding, lazy creation, sync, and `readwrite` transactions into mutation/startup paths outside observable query callbacks;
4. defined how defaults are initialized without writing from the observed query path;
5. named the focused runtime verification that renders the subscriber and confirms no `ReadOnlyError` or readwrite transaction occurs inside the live observer.

Do not leave "load or create", "ensure settings", "initialize if missing", or "sync in the query" as implementation details when that code can be reached from an observable read. Split the contract before implementation.

## Source baseline and scope

Record current HEAD, relevant pre-existing dirty files, must-modify paths, may-modify paths, must-not-modify areas, and out-of-scope outcomes. This lets resumed execution detect drift without repeating the whole investigation.

## Framework correctness ownership

For any React or Next.js work, the planner must read `docs/12-coding-standards.md`, the relevant route/UI/server docs, and version-matched Next.js or React documentation before marking the plan ready. The plan must remove framework judgment from the implementer by recording:

- which touched files are Server Components, Client Components, shared environment-neutral modules, Route Handlers, Server Actions/Functions, layouts, or metadata files;
- where hooks are allowed, which custom hooks exist or will be created, and which files must not call hooks;
- exact server-to-client prop shapes and confirmation that they are serializable;
- server-only modules that must not enter the client bundle;
- valid rendered HTML rules, especially avoiding nested anchors, nested buttons,
  button/anchor nesting, nested forms, raw `<script>` tags in React render
  output, and nondeterministic first render that can cause hydration mismatch;
- data-fetching, mutation, cache/revalidation, dynamic rendering, and auth/permission contracts;
- runtime and body/stream ownership for Route Handlers, streaming UI, file uploads/downloads, AI streams, or long-lived responses;
- the smallest verification command/flow that will catch realistic hook-order,
  invalid HTML, hydration, raw script tag, server/client import, build, route,
  and stream failures for the files actually touched.

Do not leave framework-sensitive instructions as "wire it up", "use hooks as needed", "make it client side", "add an API", or "stream the response". If these details are unknown, keep the plan `Draft` and ask or research before implementation.

## Responsive UX ownership

Any plan that touches UI must define the mobile experience before it can be
`Ready for implementation`.

- The planner must read `docs/08-ui-patterns.md` and any relevant route/screen
  or feature docs before setting UI impact to `Required`.
- The plan must preserve the premium visual direction: minimal, classy,
  uncluttered, no generic "vibe coded" treatment, no unrequested gradients, and
  no important text rendered as faded/masked/low-contrast decoration.
- The plan must prefer text sizing that is comfortably readable and slightly
  larger than bare-minimum legibility, and it must preserve a consistent
  rounded-corner scale across related controls and surfaces.
- The plan must keep Geist as the default sans/display/body/heading font and
  Geist Mono as the default monospace font unless the user or existing project
  theme explicitly chooses another approved option. Any font customization must
  use the approved font list and route through font variables/tokens.
- The plan must identify the semantic theme tokens being used or added and
  confirm component colors are not hard-coded when they should come from
  variables. Any new palette role needs light/dark values and a path to future
  settings customization.
- Mobile defaults to a single column, regardless of the desktop layout. Desktop
  may use grids, sidebars, rails, split panes, or denser dashboards, but mobile
  must stay readable and task-complete in one column unless the user explicitly
  requests a different mobile behavior.
- The plan must name how navigation, sidebars, filters, forms, cards, tables,
  dialogs, media, charts, action bars, and fixed/sticky elements behave on
  mobile when they are affected.
- If the user described only desktop or only mobile and the other breakpoint is
  not obvious from existing project patterns, apply the ambiguity confirmation
  gate before writing a ready plan.
- Acceptance criteria must include narrow viewport behavior: no page-level
  horizontal scrolling, overlap, clipped controls, unreadable text, or unusable
  tap targets.
- If the user explicitly wants a non-single-column mobile layout, record that
  instruction, the reason, and the manual viewport checks that prove it remains
  usable.

## Fixed contract IDs

Write shared decisions once:

```md
- D1: Mutations use `<mechanism>` in `<path>` with `<return/error contract>`.
- D2: Resource ownership comes from `<trusted identity source>`, never caller input.
- D3: Persisted quantities use `<unit/precision>`; conversion happens at `<boundary>`.
```

Checkpoints reference IDs and add only unit-specific context. They must not require another checkpoint's prose to understand shared rules.

## Checkpoint design

A checkpoint is one coherent implementation unit with a distinct outcome that can be understood and implemented as a whole.

Good boundaries include a complete feature across all required layers, an independently useful page subsection, an isolated migration/infrastructure capability with a stable consumer contract, or one bug fix plus regression work.

Bad boundaries include separate research/types/backend/frontend/test phases for one feature, equal-sized cosmetic sections, file-by-file checkpoints, incomplete layers, or slices created only because they could be separate commits.

Split only when each unit has its own outcome, file map, tasks, acceptance criteria, and declared dependencies; leaves a coherent repository state; and can resume from its section plus plan-level contracts. Merge units that require each other's unfinished reasoning.

## Behavior-sized tasks

Use roughly 5–12 checkbox tasks per checkpoint. One task represents one meaningful implementation outcome, not one import/file edit. Put exact file substeps beneath it as non-checkbox bullets:

```md
- [ ] Implement authorized resource creation and its validation/error contract.
  - `<screen/caller path>`: collect input and present returned states.
  - `<operation path>`: validate, authorize, persist, and return the fixed contract.
  - `<schema/type path>`: define accepted input and domain boundaries.
```

Tick a task when its implementation/substeps are complete based on source review. Routine commands are deliberately deferred. If interrupted mid-task, leave it unchecked and add a short `Progress:` note with completed substeps and next action.

## Context-boundary design

Design a context boundary after every checkpoint, but do not automatically request a reset. Choose the cheapest safe action:

- **Continue** when the next checkpoint shares deep reasoning, unresolved investigation, or closely coupled source.
- **Compact if supported** when settled decisions are still needed but exploration noise, failed attempts, raw output, or completed detail is no longer useful.
- **Fresh context if supported and explicitly authorized** only when the next checkpoint is independent enough to reconstruct from durable state without the earlier conversation.

For each checkpoint, complete the template's context-boundary fields:

- **Reason:** why the chosen action is cheaper and safe, including any dependency on prior reasoning.
- **Preserve:** outcome, decision IDs, changed files/symbols, new invariants, unresolved risks, active task, and evidence that affects later work.
- **Discard:** raw command output, failed hypotheses, temporary debugging detail, resolved error traces, and conversational narration.
- **Resume read set:** exact plan sections, permanent docs, files, and symbols/ranges needed next.
- **Handoff capsule:** a compact implementation-ready summary, normally about 100–300 words when a handoff is useful; omit filler rather than meeting a word target.

For a resolved defect, preserve only the symptom, verified root cause, implemented fix, resulting invariant, and regression evidence. Do not carry the entire debugging transcript.

No plan may assume that a specific agent can erase or replace its live context. Write context actions as conditional recommendations. The executor must update durable state before a transition and must continue without blocking when the surface provides no applicable control.

## Deferred final-verification design

Do not create routine task-level or checkpoint-level typecheck/lint/build/test commands. Design one consolidated final-verification section covering:

- source review plus path/link/text checks for documentation, planning, copy, comments, formatting-only, or other low-risk changes;
- focused tests that efficiently catch local defects when behavior changed;
- static/type/lint checks only when the touched code contract can realistically fail that layer;
- full relevant automated suites only when shared behavior or integration risk warrants them;
- production/build/package verification only when packaging, routing, generated output, framework boundaries, or deployment behavior changed;
- final manual/browser/Playwright flows only when the user asks, acceptance criteria depend on actual runtime/visual/interaction/responsive behavior, or a reported browser/UI defect cannot be confirmed cheaply from source.

Intermediate commands are specified only when later implementation cannot safely proceed without a prerequisite/generated result or when avoiding them risks substantial cascading rework. State the reason and choose the narrowest command.

## Central permanent-document manifest

Use one plan-wide table naming each permanent doc to update after user verification and its exact expected delta. Do not repeat documentation impact per checkpoint. The implementing agent maintains only the active plan until verification.

## Plan specificity and token efficiency

- Reference exact existing paths/symbols and label uncreated paths `Proposed new file`.
- Describe execution order, contracts, states, errors, permissions, side effects, and preservation requirements.
- Use plan-level fixed contracts instead of repeating shared context.
- Do not paste large source listings or generic tutorials.
- Keep snapshot/status/progress concise and update in place; no session diary.
- Include enough context to remove implementation decisions, not enough to duplicate the codebase.

## Ready-plan quality gate

- [ ] Project docs are initialized or the plan explicitly includes/handles bootstrap before implementation.
- [ ] Source, relevant docs, branch/HEAD, and dirty worktree were inspected.
- [ ] Existing paths are real; proposed paths are labeled.
- [ ] Material ambiguities were resolved from evidence or paused for user
  confirmation with a recommended option, alternatives, and room for a custom
  answer.
- [ ] Baseline and must/may/must-not boundaries are complete.
- [ ] Fixed contracts resolve product, architecture, data, security, UI, error, and delivery decisions.
- [ ] React/Next.js boundary contracts are explicit for every touched route/component/server module, including hook legality, serializable props, server-only imports, valid HTML nesting, raw script placement, hydration determinism, cache/revalidation, runtime, and stream/body ownership where relevant.
- [ ] UI plans preserve the premium/minimal visual direction, avoid unrequested gradients/faded text, use Geist/Geist Mono defaults or approved font overrides, use comfortably readable text sizing, keep border radii consistent, and route colors through semantic theme variables with future settings customization in mind.
- [ ] UI plans define mobile single-column behavior by default, wider-screen enhancements, and narrow viewport acceptance checks, or record the user's explicit mobile exception.
- [ ] Database impact is explicitly `None` or `Required`; required changes were personally designed by the planning agent with exact executable paths/SQL and no executor decisions remaining.
- [ ] A required data change has one complete `Proposed` schema mirror and one newest-first proposed migration entry with backfill, locking, compatibility, rollback, and verification contracts.
- [ ] Client-side observable storage impact is explicitly `None` or `Required`; required changes separate live observed reads from writes/default seeding/readwrite transactions and include a runtime `ReadOnlyError` regression check.
- [ ] Plan/status/blocker timestamps include minutes and UTC offsets; chronological records are newest first.
- [ ] Checkpoints are coherent units rather than technical phases.
- [ ] Tasks are behavior-sized with exact file substeps and implementation completion conditions.
- [ ] Acceptance criteria cover success, important failures, and regressions.
- [ ] Routine verification is consolidated at plan end, proportionate to the touched risk, and any intermediate or deep browser/build exception is justified.
- [ ] Permanent-document updates are centralized and exact.
- [ ] Every checkpoint has a deliberate context action, preserve/discard set, exact resume read set, and useful handoff capsule or an explicit `Not needed` value.
- [ ] Context guidance is conditional and does not assume an unsupported in-place wipe, command, or automatic fresh thread.
- [ ] No task delegates material judgment to the implementing agent.

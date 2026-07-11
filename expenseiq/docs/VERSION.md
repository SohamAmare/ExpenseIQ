# Documentation framework version

Canonical source: `E:\Apps\Coding\VSCode\Personal\docs`
Current version: `0.8.1`
Last changed: `2026-07-05 21:33 +05:30`

This file identifies the reusable docs package and gives copied docs folders a
fast way to compare themselves against the original source.

## Version scope

This version tracks the reusable docs package in the canonical source:

- framework routing and writing guides;
- plan workflow guides and templates;
- feature dossier templates;
- shared baseline project docs and placeholder database mirrors while they are
  still generic or baseline-marked;
- this manifest.

In a copied project, ordinary project-specific documentation changes do not bump
the upstream framework version. If a project needs its own local documentation or
product version, record that separately so it is not confused with this upstream
docs-framework version.

## Copy and update contract

- Every copied docs folder should keep this file.
- Copied folders should compare `Current version` here with `Current version`
  in the canonical source at `E:\Apps\Coding\VSCode\Personal\docs`.
- If the canonical source has a newer version, inspect the version history below
  and merge or recopy the changed reusable files.
- Merge shared baseline docs from upstream only when the copied project still
  uses generic/template or `Shared Next.js baseline` docs. When a copied project
  has `Project-specific` docs, preserve local verified facts and port only the
  relevant reusable instructions.
- After pulling a newer upstream docs package into a copied project, update this
  manifest in the copy to the pulled upstream version.

## Downstream sync targets

When a reusable framework file changes in this canonical source, sync or merge
the change into these maintained project roots unless the user explicitly scopes
the rollout smaller:

| Project root | Notes |
| --- | --- |
| `E:\Apps\Coding\VSCode\Freelance\portfolio` | Copied shared docs; preserve unrelated app/source changes. |
| `E:\Apps\Coding\VSCode\Personal\habit-tracker` | Copied shared docs; active project plans may exist under `docs/plans/`. |
| `E:\Apps\Coding\VSCode\Personal\portfolio` | Contains project-specific portfolio facts; merge carefully outside pure framework files. |
| `E:\Apps\Coding\VSCode\Personal\task-planner` | Contains project-specific docs; merge shared UI/standards/testing rules selectively. |
| `E:\Apps\Coding\VSCode\Personal\workout-tracker` | Contains project-specific docs and app history; merge shared rules selectively. |

Root instruction files are part of this maintenance surface:

- `AGENTS.md`
- `CLAUDE.md`

## Sync surfaces

Direct-copy these files when the canonical version changes, unless a target has
an explicit local exception:

- `AGENTS.md`
- `CLAUDE.md`
- `docs/VERSION.md`
- `docs/00-reading-guide.md`
- `docs/01-writing-guide.md`
- `docs/features/00-feature-template.md`
- `docs/plans/00-planning-guide.md`
- `docs/plans/01-authoring-guide.md`
- `docs/plans/02-execution-guide.md`
- `docs/plans/03-plan-template.md`

Direct-copy shared-baseline docs only while the target file is still generic,
template, or marked `Shared Next.js baseline`. If a target file is
`Project-specific`, preserve its verified local facts and merge only the relevant
shared instructions:

- `docs/08-ui-patterns.md`
- `docs/12-coding-standards.md`
- `docs/13-testing-and-build.md`
- other `docs/02-` through `docs/14-` files when the target has local facts

Do not overwrite active project plans such as `docs/plans/plan1.md`,
project-specific feature dossiers, or project-specific database mirrors unless
the user asks for a full rebuild and those facts have been preserved or
recreated deliberately.

## Sync procedure

1. Inspect the canonical source first and note the current `Current version`.
2. Inspect each target's Git status before copying so unrelated user work is not
   mistaken for docs-framework output.
3. Compare hashes for direct-copy files before and after the sync.
4. Copy pure reusable files directly.
5. Selectively merge project-specific files, keeping local verified facts and
   adding only the changed shared contract.
6. Confirm every target `docs/VERSION.md` reports the canonical version.
7. Report any target files intentionally not copied because they are
   project-specific.

## Automatic bump rule for agents

Whenever an agent changes any reusable file in the canonical source, it must
update this file in the same edit. This is the automation contract for the docs
workflow; it does not require a Git tag, package manifest, or background hook.

- Patch version: corrections, clarifications, typo fixes, or wording changes
  that do not change required structure or workflow.
- Minor version: new files, sections, metadata, workflows, or backward-compatible
  required behavior.
- Major version: breaking document structure, renamed/removed required files or
  headings, or incompatible workflow changes.

Each bump must update `Current version`, update `Last changed`, and prepend a
version history entry listing the changed reusable files.

## Version history

### 0.8.1 - 2026-07-05 21:33 +05:30

- Change type: Patch
- Changed reusable files: `AGENTS.md`, `CLAUDE.md`, `docs/VERSION.md`,
  `docs/12-coding-standards.md`, `docs/13-testing-and-build.md`,
  `docs/plans/01-authoring-guide.md`, `docs/plans/02-execution-guide.md`,
  `docs/plans/03-plan-template.md`
- Summary: Clarified proportional verification: simple documentation, copy,
  styling, and narrowly local edits should use source/text checks by default,
  while builds, servers, browser automation, manual smoke flows, and Playwright
  are reserved for touched risk, explicit user request, or reported runtime/UI
  defects.

### 0.8.0 - 2026-07-02 18:40 +05:30

- Change type: Minor
- Changed reusable files: `docs/VERSION.md`, `docs/01-writing-guide.md`
- Summary: Added the explicit downstream sync playbook: maintained project
  roots, root instruction files, direct-copy surfaces, selective-merge surfaces,
  active-plan/database-mirror cautions, and verification steps for future
  canonical docs updates.

### 0.7.0 - 2026-07-01 00:11 +05:30

- Change type: Minor
- Changed reusable files: `docs/VERSION.md`, `docs/08-ui-patterns.md`,
  `docs/12-coding-standards.md`, `docs/13-testing-and-build.md`,
  `docs/plans/01-authoring-guide.md`, `docs/plans/03-plan-template.md`
- Summary: Added the Ecommerce/StoreForge typography contract as the default
  app font guidance: Geist for body/sans/display/headings, Geist Mono for
  monospace, font-family routing through variables/tokens, and the approved
  theme-customizable font option list.

### 0.6.0 - 2026-07-01 00:05 +05:30

- Change type: Minor
- Changed reusable files: `docs/VERSION.md`, `docs/08-ui-patterns.md`,
  `docs/12-coding-standards.md`, `docs/13-testing-and-build.md`,
  `docs/plans/01-authoring-guide.md`, `docs/plans/03-plan-template.md`
- Summary: Added typography and radius preferences to the premium UI contract.
  UI work should favor comfortably readable text that is slightly larger than
  bare-minimum legibility and use a coherent, softly rounded radius scale across
  related components instead of arbitrary one-off corner values.

### 0.5.0 - 2026-07-01 00:00 +05:30

- Change type: Minor
- Changed reusable files: `docs/VERSION.md`, `docs/08-ui-patterns.md`,
  `docs/12-coding-standards.md`, `docs/13-testing-and-build.md`,
  `docs/plans/01-authoring-guide.md`, `docs/plans/03-plan-template.md`
- Summary: Added a premium visual direction and theme customization readiness
  contract. UI work should be minimal, classy, uncluttered, avoid generic
  template/vibe-coded styling, avoid unrequested gradients and faded important
  text, and route app colors through semantic variables that can later power a
  polished settings customization interface.

### 0.4.0 - 2026-06-30 23:17 +05:30

- Change type: Minor
- Changed reusable files: `docs/VERSION.md`, `docs/12-coding-standards.md`,
  `docs/13-testing-and-build.md`, `docs/plans/01-authoring-guide.md`,
  `docs/plans/03-plan-template.md`
- Summary: Added client-side observable storage guardrails for Dexie
  `liveQuery`/IndexedDB-style subscriptions. Plans must separate live observed
  read paths from writes, default seeding, lazy creation, sync side effects, and
  readwrite transactions, with final verification that catches `ReadOnlyError`
  regressions.

### 0.3.0 - 2026-06-30 22:12 +05:30

- Change type: Minor
- Changed reusable files: `docs/VERSION.md`,
  `docs/plans/01-authoring-guide.md`, `docs/plans/03-plan-template.md`
- Summary: Added a plan-readiness ambiguity confirmation gate requiring agents
  to pause and ask before implementation when mobile, desktop, design,
  product, architecture, data, security, or verification decisions are unclear.
  Confirmation prompts should present a recommended option first, alternatives
  after it, and allow the user to type a different answer.

### 0.2.0 - 2026-06-30 22:10 +05:30

- Change type: Minor
- Changed reusable files: `docs/VERSION.md`, `docs/08-ui-patterns.md`,
  `docs/12-coding-standards.md`, `docs/13-testing-and-build.md`,
  `docs/plans/01-authoring-guide.md`, `docs/plans/03-plan-template.md`
- Summary: Added mandatory mobile-friendly single-column defaults for UI work
  and planning contracts that prevent invalid HTML nesting, raw script tags in
  React render output, and hydration mismatch regressions.

### 0.1.0 - 2026-06-30 17:56 +05:30

- Change type: Minor
- Changed reusable files: `docs/VERSION.md`, `docs/00-reading-guide.md`,
  `docs/01-writing-guide.md`
- Summary: Added the canonical source path, upstream version manifest, copied
  folder comparison rules, and mandatory agent bump workflow.

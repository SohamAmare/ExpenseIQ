# Feature dossier template

> This is a portable template, not an implemented feature. Copy it to `docs/features/<kebab-case-feature-name>.md`, remove this note, and fill every section from verified project source.

# <Feature name>

## Purpose

State the user/system outcome, actors, boundaries, and implementation status. Distinguish full, partial, not implemented, and needs verification.

## Current behavior

Describe verified end-to-end behavior in execution order, including inputs, data/state, outputs, loading/empty/success/error states, and meaningful variants. Do not include roadmap behavior as current.

## Key user/admin flows

### <Flow name>

1. <Entry route/screen/caller and user action>.
2. <Component/input/validation path>.
3. <Server/domain/data/integration sequence>.
4. <Success/error/side-effect/result>.

State `No admin flow` when true; do not invent an admin actor.

## Important business rules

- <Precise invariant and enforcement paths>.
- <Validation/permission/state/unit/failure rule>.

Link cross-feature canonical rules to `docs/10-business-rules.md`.

## Data model

Document schema objects/fields/relationships/ownership/constraints/units/lifecycle used by this feature, with exact executable paths. State `None` for non-persistent features. Link narrative ownership/lifecycle detail to `docs/04-database.md`, exact full DDL to `docs/database/schema.sql`, and migration history/proposals to the newest-first `docs/database/migrations.sql`.

## Key files

### Routes/screens/entry points

- `<path>` — <responsibility>

### Components/UI

- `<path/symbol>` — <responsibility>

### Server operations/domain/services

- `<path/symbol>` — <contract>

### Data/schema/migrations

- `<path/object>` — <purpose>

### Tests

- `<path/test>` — <coverage>

### Configuration/other consumers

- `<path>` — <relevant ownership>

Write `None implemented` for absent categories.

## External integrations, if any

For each integration, name SDK/config/wrapper, environment variables (names only), request/event flow, authentication/signature, retry/idempotency/failure behavior, and source paths. Write `None` when absent.

## Known gotchas

- <Confirmed issue, fragile coupling, intentional design, edge case, migration/permission/cache/platform risk>.

Link canonical items to `docs/11-known-issues.md`.

## Safe change checklist

- Inspect all mapped callers/consumers and cross-cutting docs.
- Preserve stated business, data, auth, error, state, integration, and accessibility contracts.
- For data changes, follow the planning-authored exact schema/migration specification; do not make new data-design decisions during execution.
- Update feature map and affected permanent docs after user verification.
- Add final verification requirements to the active plan; do not run routine broad checks between checkpoints.

## Verification steps

- Final automated: `<real commands/tests>` — <what they prove>.
- Final manual/integration: <exact success/failure/permission/state flows>.
- Known unverified areas: <precise gap or None>.

Routine verification is consolidated at the end of the active plan unless an intermediate result is a hard prerequisite.

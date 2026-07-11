# Database and persistence

> **Documentation state: Shared Next.js baseline.** Base-project marker for an unmodified Next.js/shadcn starter. The common starter has no persistence layer; verify task-relevant drift after copying, then replace this state with `Project-specific` when source changes supersede it.

## Baseline status

**Not implemented.** The shared starter contains no detected database/ORM dependency, connection client, schema, migration, seed, query/repository layer, transaction helper, generated database types, or persistence-backed feature.

Evidence to recheck after copying:

- direct dependencies in `package.json`;
- repository schema/migration directories;
- `lib/`, server modules, and environment-variable consumers;
- route/server operation source.

Do not infer a data model from a project name or planned UI.

## Canonical documented SQL artifacts

- `docs/database/schema.sql` is the complete SQL schema mirror. Its header says whether it is the last `Verified` implementation, a `Proposed` complete target owned by one active plan, or `Implemented - awaiting verification`.
- `docs/database/migrations.sql` is the documentation-only migration ledger. Entries are minute-stamped with UTC offset and stored newest first for retrieval.
- Executable schema/ORM definitions, provider migration files, and the database migration table remain operational truth. Never run the newest-first documentation ledger as a migration batch.

The shared baseline currently has no verified database objects or migrations, so both SQL files contain accurate empty-state documentation rather than invented DDL.

## Schema-changing plan ownership

The planning agent—not a lower-capability implementation agent—must inspect all current data sources and make every schema decision. Before a data-changing plan becomes `Ready for implementation`, it must:

1. write exact forward DDL and safety/compatibility decisions in the active plan;
2. replace `docs/database/schema.sql` with the complete post-change target and mark it `Proposed` with the owning plan path/timestamp;
3. prepend the exact `Proposed` entry to `docs/database/migrations.sql` with purpose, feature/defect, dependencies, backfill, locking, rollback, source migration path, and pending verification;
4. prevent multiple active plans from independently owning conflicting target schemas.

The executor implements that specification mechanically and may flag contradictions, but must not redesign tables, types, constraints, indexes, policies, data transformations, transaction boundaries, or rollback behavior. Implementation changes the SQL document statuses to `Implemented - awaiting verification`; explicit user verification changes them to `Verified` during permanent-document synchronization. Abandoning/replacing a plan must remove its proposed migration entry and restore/recalculate the complete schema from verified source.

## Project-specific bootstrap requirements

When persistence exists, document:

- provider/engine, driver/ORM, connection ownership, runtime constraints;
- every schema object, identifiers, ownership, relationships, constraints, indexes;
- migration/seed/generated-type paths and environment safety;
- query/repository map and callers;
- transaction/atomicity/concurrency/retry/idempotency boundaries;
- units/precision/date/time-zone semantics;
- retention, archival, deletion, export, fixtures, and reset behavior;
- exact validation/auth enforcement and final verification.
- timestamp format/timezone and chronological ordering for data/migration records;
- full-mirror reconciliation among executable schema source, `docs/database/schema.sql`, and `docs/database/migrations.sql`.

Use the detailed schema/query formats already established by this document's future project-specific version. Link domain invariants to `docs/10-business-rules.md`, auth to `docs/05-auth-and-permissions.md`, and server operations to `docs/07-api-and-server-actions.md`.

## TODO — design decisions required

No shared baseline chooses persistence technology, schema/domain entities, ownership, identifiers, units, time semantics, migration policy, or deletion behavior. Resolve only from target-project requirements/source.

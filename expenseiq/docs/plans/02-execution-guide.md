# Plan execution and delivery guide

Use this file to find, implement, resume, repair, finally verify, document, commit, and push an active plan. Start with `docs/plans/00-planning-guide.md`.

## Locate and validate the plan

1. Search `plan<N>.md` filenames, titles, objectives, statuses, and checkpoints using the user's wording. Use the plan's `Last updated` and status fields when multiple matches are plausible.
2. Use one unambiguous match without asking for a path. Ask only if multiple active plans genuinely match.
3. Files `00-` through `03-` are permanent workflow guides, never active plans.
4. Implement only `Ready for implementation` or `In progress`. Resolve named decisions/blockers before a Draft/Blocked plan proceeds.

On first implementation, read the entire plan. On resume, read its execution snapshot, baseline/scope, fixed contracts, database change specification when relevant, final acceptance criteria, active checkpoint, its context boundary/handoff capsule/resume read set, consolidated verification, and permanent-document manifest. Read completed checkpoint bodies only for declared dependencies.

Compare current HEAD/dirty planned paths with the baseline. If drift invalidates a contract/task, mark Blocked with exact evidence instead of inventing architecture.

For React/Next.js work, read `docs/12-coding-standards.md` and the plan's React/Next.js framework contracts before editing. If the plan does not classify touched files or does not specify hook legality, Server/Client boundaries, serializable props, server-only imports, cache/revalidation, runtime, or stream/body ownership where relevant, mark the plan/checkpoint `Blocked` and return it to planning. Do not guess.

## Implement and maintain progress

1. Set the plan and active checkpoint to `In progress`; update date, current checkpoint, and next task.
2. Work unchecked tasks in dependency order. Do not perform unlisted material architecture work.
3. Tick `[x]` immediately after the behavior and listed source substeps are implemented and reviewed. Routine commands are not required before ticking.
4. Keep partial/failed work unchecked and add a concise `Progress:` note if a session stops mid-task.
5. Mark a checkpoint `Implemented` when its implementation tasks and source-level acceptance review are complete. This does **not** mean final verification has run.
6. Synchronize the checkpoint summary/snapshot; do not append a chronological work diary.
7. Update `Last updated`, snapshot time, and status time using `YYYY-MM-DD HH:mm ±HH:MM`. Prepend necessary blocker/deviation entries newest first.

For a data-changing plan, implement only the planning-owned exact specification in the active plan and `docs/database/*.sql`. Do not redesign schema objects, types, constraints, indexes, policies, backfills, migration order, transactions, compatibility, or rollback. If source/provider reality contradicts the specification, stop that work, mark the plan/checkpoint `Blocked`, and return the decision to the planning agent. When exact source work is implemented, set the owning SQL target/entry to `Implemented - awaiting verification`; do not mark it `Verified` before the user's success confirmation.

For React/Next.js contracts, implement only the planned boundary. Do not fix framework errors by broadening `"use client"`, moving server code into clients, importing server-only modules into client files, changing Route Handler API shape, changing cache behavior, or buffering streams unless the plan explicitly says to do so. If Next.js/React errors reveal a missing boundary decision, block and record the exact error plus affected files.

## Context handoff and selective reload

Chat history is not the implementation ledger. Before a context transition, make the active plan and source sufficient to resume:

1. Complete or accurately leave unchecked the current tasks; update the checkpoint status and execution snapshot.
2. Refresh the checkpoint's context boundary, handoff capsule, next task, unresolved risks, changed paths, and exact resume read set.
3. Apply the recorded action:
   - **Continue:** proceed normally and retain only task-relevant material in working notes.
   - **Compact if supported:** use only a context-compaction mechanism actually supported by the current surface. If the agent cannot invoke one, do not block or repeatedly ask the user; continue with the plan ready for platform-managed compaction.
   - **Fresh context if supported and explicitly authorized:** create/use a fresh execution context only when the current workflow and surface authorize it. Seed it with the active plan path, current checkpoint/task, and resume read set. Stop the old executor before edits continue so two contexts do not modify the same plan concurrently. A fork that preserves the complete prior history is not a token-saving reset.
4. After any fresh or compacted resume, reread the handoff capsule and named source pointers. Verify current source/Git state rather than trusting conversational memory.
5. Keep completed debugging context only as symptom, root cause, fix, invariant, and regression evidence. Remove obsolete hypotheses and raw logs from durable notes.

When a context handoff actually occurs, record its minute timestamp with UTC offset in the completion record and keep multiple handoff records newest first.

Do not force a transition after every checkpoint. Override a stale recommendation when the source has drifted or the next unit now depends on active reasoning, and record the changed action briefly.

## Deferred verification rule

Do not routinely run typecheck, lint, build, test suites, manual smoke flows, browser automation, or Playwright after tasks/checkpoints. Implement all checkpoints first, then run the plan's consolidated verification once at the smallest depth that proves the changed risk.

An intermediate command is allowed only when the next implementation cannot safely proceed without its generated/prerequisite result, a narrow failure would prevent major cascading rework, or the user explicitly asks. Run the smallest useful command and record why.

For documentation, planning, copy, small styling, or narrowly local source edits, final verification may be only source review plus path/link/text checks. Do not escalate to application rebuilds, dev/prod servers, manual browser checks, or Playwright unless the user asked, the acceptance criteria require that layer, or a reported runtime/UI defect needs it.

After every checkpoint is `Implemented`:

1. Run the final verification sequence from the active plan and `docs/13-testing-and-build.md` in an efficient order, pruning checks whose layer was not touched.
2. If it fails, reopen affected tasks/checkpoints, fix all related defects, then rerun only invalidated focused checks plus the consolidated final sequence once.
3. Record concise results and precise pre-existing warnings/failures with the actual verification timestamp.
4. When final verification passes, set checkpoints `Complete` and plan `Implementation complete — awaiting user verification`; keep the plan while the user tests.

## User-reported failure loop

When user testing finds a defect, reopen the owning checkpoint, add behavior-sized repair/regression tasks, implement them, and run consolidated verification after all repairs. Do not create a separate plan for defects inside the active acceptance boundary.

## Success-triggered finalization

An explicit user statement that the tested implementation works/passes/is verified triggers delivery. Do not ask for another commit/push confirmation.

### Synchronize permanent docs and remove the plan

1. If project docs are Template, bootstrap them through `docs/01-writing-guide.md` from current source. If they are Shared Next.js baseline, replace the affected docs with Project-specific state only for shipped project behavior; when the repository remains the base project, use the base-project shortcut instead of re-documenting default scaffold behavior.
2. Read the active plan's permanent-document manifest and final diff.
3. Update all affected feature/cross-cutting docs, feature map, issues, testing guidance, and durable change log from what actually shipped.
4. For data changes, reconcile executable source/migrations with the complete schema mirror, promote the owning schema/migration statuses to `Verified`, add exact verification evidence, and update `docs/04-database.md` plus affected rules/auth/server/feature docs.
5. Prepend the minute-stamped change-log milestone; keep all chronological ledgers newest first.
6. Validate doc states, paths, feature links, timestamps, ordering, and cross-document consistency.
7. Delete the completed simple-numbered plan; never archive it.

### Prepare a scoped delivery

- Inspect status, staged/unstaged diff, and untracked files.
- Identify exact plan-owned code/test/config/docs changes plus deleted plan.
- Exclude unrelated work. If unrelated and plan-owned edits overlap inseparably, stop and report ambiguity.
- Run only checks invalidated by final documentation/config cleanup. Documentation-only cleanup normally does not require another application build.

### Generate a concise commit subject

Derive it from the final verified diff:

- normally at most 72 characters;
- use the repository's convention or a clear type such as `feat`, `fix`, `refactor`, `docs`, `test`, or `chore`;
- type reflects the primary shipped outcome even when docs accompany it;
- optional scope only when clarifying;
- no AI/Codex wording, plan/checkpoint IDs, or low-level trivia;
- one line by default; body only for important migration/breaking context.

Generic examples:

```text
feat(accounts): add profile management
fix(search): preserve filters during pagination
docs: add portable planning and delivery workflow
```

### Commit and push automatically

1. Stage only identified plan-owned paths and finalized docs, including plan deletion; avoid broad staging when unrelated changes exist.
2. Review staged diff/stat against the verified outcome.
3. Commit with the generated subject; do not amend/rewrite another commit.
4. Push the current branch to `origin`; set upstream for that same branch if missing.
5. Never force-push. On rejection/failure, preserve the local commit and report the exact reason.
6. Report subject, SHA, branch, push result, final verification, docs updated, and removed plan.

The user's success statement authorizes these scoped Git actions. No hook, background job, or repository automation script is involved.

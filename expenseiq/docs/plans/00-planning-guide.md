# Planning workflow router

This file is the short entry point for the complete plan lifecycle. The user should only need to state the desired outcome, ask to implement/continue a plan, report a failure, or confirm that the result works. The agent owns document routing, source inspection, plan-file maintenance, verification, permanent-document synchronization, commit-message generation, commit, and push.

## Automatic intent routing

| User intent | Agent action |
| --- | --- |
| Create, make, research, revise, or save a plan | Read `docs/plans/01-authoring-guide.md` and `docs/plans/03-plan-template.md`; inspect relevant permanent docs/source; create or update a simple-numbered active plan. |
| Find, implement, continue, resume, or report status on a plan | Read `docs/plans/02-execution-guide.md`; locate the matching active plan; update its statuses, tasks, and evidence in place. |
| Report that an implementation is broken or incomplete | Read `docs/plans/02-execution-guide.md`; reopen the owning checkpoint, add repair tasks, implement, and return to awaiting verification. |
| Confirm that the implementation works/is verified | Read `docs/plans/02-execution-guide.md`; finalize permanent docs, delete the plan, generate a concise commit message from the final diff, commit scoped changes, and push the current branch to `origin`. Do not ask for another confirmation. |

Intent matters more than exact wording. Do not require the user to name a guide, path, checkpoint, verification command, documentation file, or Git operation.

## Directory layout

```text
docs/plans/
  00-planning-guide.md       This workflow router
  01-authoring-guide.md      Plan research and checkpoint design
  02-execution-guide.md      Implementation, progress, verification, commit/push
  03-plan-template.md        Structure copied into new active plans
  plan1.md                    One active or awaiting-verification plan
  plan2.md                    Next active plan when plan1.md already exists
```

Plans do **not** receive individual subfolders. One Markdown file is enough for decisions, checkpoints, task state, verification evidence, and documentation impact; per-plan directories would add navigation and cleanup overhead. Supporting implementation assets belong in their normal application/test/documentation locations and are referenced by the plan.

Files `00-` through `03-` are permanent workflow files. Every `plan<N>.md` file is an active plan. Create the lowest unused positive integer such as `plan1.md`, `plan2.md`, or `plan3.md`; keep the descriptive title, created time, updated time, status, objective, and all other detail inside the file. Use `YYYY-MM-DD HH:mm +/-HH:MM` inside plans, resolve matches by filename plus title/objective/status, and do not create an archive: verified plans are removed after their durable facts are transferred to permanent docs and the final changes are pushed.

For schema/migration work, the planning agent personally owns the data design. It must read `docs/04-database.md`, `docs/database/schema.sql`, `docs/database/migrations.sql`, and executable schema/migration source; write the complete proposed target schema and newest-first proposed migration entry; and resolve exact DDL, constraints, indexes, policies, backfill, compatibility, locking, and rollback before a plan is ready. Do not delegate these decisions to a lower-capability executor.

## Plan lifecycle

| Status | Meaning |
| --- | --- |
| `Draft` | Research or a user/product/architecture decision remains unresolved; implementation must not start. |
| `Ready for implementation` | The plan is decision-complete and safe to execute mechanically. |
| `In progress` | Tasks are actively being implemented and checked off. |
| `Blocked` | Source drift, failure, or a missing decision prevents faithful progress. |
| `Implementation complete — awaiting user verification` | Code and agent verification are complete; the active plan stays in place while the user tests. |

There is no persistent `Verified` plan. Explicit user confirmation triggers immediate finalization, commit, push, and plan removal.

## End-to-end automatic flow

1. **Plan request:** research the repository and save a simple-numbered `Draft` or `Ready for implementation` plan. A plan-only request does not change application source. A data-changing plan may update the documentation-only SQL mirrors to an explicitly labeled `Proposed` target/entry.
2. **Implementation request:** find the plan, validate its source baseline, set it/checkpoint to `In progress`, work through behavior-sized tasks, and update checkboxes immediately.
3. **Agent completion:** after all checkpoints are implemented, run consolidated final verification once and set the plan to `Implementation complete — awaiting user verification`.
4. **User test failure:** reopen the relevant checkpoint, record repair tasks and evidence, fix them, then rerun consolidated verification and await user verification again.
5. **User success confirmation:** update permanent docs from verified source, remove the plan, inspect the final diff, generate a concise descriptive commit subject, stage only plan-owned changes, commit, and push the current branch to `origin`.
6. **Handoff:** report verification, documentation changes, deleted plan, commit subject/SHA, branch, and push result.

## Authorization and safety boundary

The user's explicit statement that the implementation works/is verified authorizes the agent to commit and push the completed plan without another approval prompt. This authority covers:

- files created/modified/deleted by the plan implementation;
- permanent documentation updates required by `docs/01-writing-guide.md`;
- deletion of the completed active plan.

It does not authorize unrelated dirty files, force-push, history rewriting, amending another commit, destructive Git operations, or changing branches/remotes without task-specific need. If unrelated work cannot be separated safely, stop and report the exact ambiguity. If commit succeeds but push fails, preserve the local commit and report the failure; never retry with force.

This is agent-driven workflow behavior, not hooks or background automation. No repository script should perform plan progression, committing, or pushing.

## Context management and token efficiency

Markdown cannot erase context already loaded by an agent. This workflow instead makes chat history disposable: the active plan, current source, initialized permanent docs, and Git state are the durable record. An agent must be able to resume from those artifacts without replaying the previous conversation.

Route directly to the authoring or execution guide; do not load both unless the task crosses both roles. On first implementation, read the whole active plan. On resume, load only its execution snapshot, baseline/scope, fixed contracts, database change specification when relevant, final acceptance criteria, active checkpoint, context handoff capsule, consolidated verification, and permanent-document manifest. Load completed checkpoint bodies only for declared dependencies.

After a coherent checkpoint, choose one deliberate context action:

- **Continue:** use when the next checkpoint depends on active reasoning or the current context remains compact and relevant.
- **Compact if supported:** use when decisions must remain available but investigation, failed hypotheses, logs, or completed task detail have become noisy.
- **Fresh-context handoff if supported and explicitly authorized:** use only when the next unit is substantially independent and the updated plan plus source can fully reconstruct its starting state.

Before any compaction or fresh-context transition, update task checkboxes, the execution snapshot, the checkpoint context boundary, and its handoff capsule. A handoff preserves outcomes, fixed decisions, changed paths, new invariants, unresolved risks, the next task, and an exact resume read set. It discards raw logs, failed hypotheses, resolved error traces, and narration that no longer changes implementation.

Use a transition only when carrying the existing context is likely to cost more than rereading the capsule and named source files. Do not require a context wipe after every checkpoint. Do not block, invent commands, or repeatedly ask the user when the current surface cannot compact or start fresh; continue from the plan and allow any platform-managed compaction to occur naturally.

Additional rules:

- Read only permanent docs selected by `docs/00-reading-guide.md` or named by the plan.
- Keep one canonical explanation per decision; reference fixed-contract IDs instead of repeating deep context.
- Update progress in place. Do not append a session diary unless a dated blocker/deviation is needed.
- Treat source paths as reload pointers. Read targeted symbols/ranges instead of whole trees when resuming.

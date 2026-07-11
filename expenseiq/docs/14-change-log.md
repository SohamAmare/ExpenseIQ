# Documentation-relevant change log

> **Documentation state: Shared Next.js baseline.** Base-project marker for an unmodified Next.js/shadcn starter. This reusable copy intentionally omits product milestones; replace this state with `Project-specific` when real project milestones exist.

This records verified milestones that alter future implementation context: architecture, routes, data, permissions, server contracts, feature behavior, shared UI rules, integrations, deployment, testing strategy, or resolved major limitations. It is not raw commit history.

Keep entries **newest first**. Prepend each verified milestone immediately below `Recorded milestones`; never append it at the bottom. Use the actual event/verification time with minutes and numeric UTC offset. If a legacy minute is unknown, write `time not recorded` rather than inventing one.

## Entry format

```md
## YYYY-MM-DD HH:mm ±HH:MM — <milestone>

- Status: Shipped | Partial | Reverted
- Outcome: <user/system result>
- Architecture/behavior impact: <future implementation context>
- Key source files: `<paths>`
- Cross-cutting impact: <data/auth/API/UI/integration or None>
- Documentation updated: `<paths>`
- Verification: <consolidated final checks/result>
- Commit: `<SHA and subject>` (add when useful)
- Remaining limitations: <exact follow-up or None>
```

## Recorded milestones

No product milestones recorded in the shared baseline. During project-specific bootstrap, add an initial documentation baseline only after source paths/facts are verified.

## Entry threshold

Use for meaningful feature/contract/architecture/rule/UI/integration/deployment/testing/major-issue changes. Do not add formatting-only, non-contract refactor, lockfile-no-effect, temporary debugging, or wording entries.

Entries are prepended after user verification during permanent documentation synchronization, before automatic commit/push.

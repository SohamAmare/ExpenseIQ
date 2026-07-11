# API, Server Actions, and server operations

> **Documentation state: Shared Next.js baseline.** Base-project marker for an unmodified Next.js/shadcn starter. The common starter has no application server interfaces beyond framework page rendering; verify task-relevant drift after copying, then replace this state with `Project-specific` when source changes supersede it.

## Baseline status

**Not implemented:** no application `route.ts`, `"use server"` file, Server Action/Function, webhook, job, queue consumer, server query/repository module, or form submission.

Evidence:

- `app/page.tsx` renders a button without an action/form/event mutation;
- direct dependencies do not establish a database, validation, or external backend SDK;
- the baseline route tree contains no Route Handler.

## Entry-point inventory

| Kind | Trigger/method | Path | Auth | Contract | Status |
| --- | --- | --- | --- | --- | --- |
| Route Handler | — | None | — | — | Not implemented |
| Server Action/Function | — | None | — | — | Not implemented |
| Webhook/job/consumer | — | None | — | — | Not implemented |

## Next.js implementation rule

Before adding server behavior, read the installed Next.js guides for data fetching, mutations/Server Functions, Route Handlers, caching/revalidation, and authentication. Treat every reachable mutation as a direct server entry point: authenticate and authorize inside it, not only in client UI.

Route Handlers must use App Router `route.ts` method exports and Web `Request`/`Response` contracts. Do not use Pages Router API handler signatures in App Router files. When a server operation reads a request body or stream, consumes a response stream, or returns streaming output, document whether it is read once, cloned, teed, buffered, or recreated, plus runtime and memory/backpressure assumptions.

## Project-specific contract requirements

For each future server operation, document exact path/symbol/callers, trigger/method/address, validation, trusted identity, permission, reads/writes/transaction, side effects, success/error contract, cache/revalidation/dynamic-rendering impact, retry/idempotency, runtime limits, stream/body ownership, observability, and final coverage.

Update data/auth/routes/business/feature/testing docs together after verified delivery.

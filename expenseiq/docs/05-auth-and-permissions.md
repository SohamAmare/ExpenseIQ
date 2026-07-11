# Authentication and permissions

> **Documentation state: Shared Next.js baseline.** Base-project marker for an unmodified Next.js/shadcn starter. The common starter has no identity or authorization layer; verify task-relevant drift after copying, then replace this state with `Project-specific` when source changes supersede it.

## Baseline status

**Not implemented.** The starter has no detected authentication provider, account/session model, role/permission representation, protected route, server authorization helper, ownership check, or `proxy.ts`.

The public starter `/` route does not resolve identity. Theme preference behavior through `next-themes` is presentation state, not authentication.

## Baseline access inventory

| Surface | Authentication | Authorization | Source |
| --- | --- | --- | --- |
| `/` | None | None | `app/page.tsx` |

Verify/replace this table after copying.

## Project-specific bootstrap requirements

Document:

- identity/provider/session/token/cookie lifecycle;
- trusted server identity helper and client availability;
- exhaustive public/protected route/server-operation matrix;
- resource ownership predicates at server/data boundaries;
- role/permission assignment, enforcement, failure, and audit behavior;
- redirects versus `401`/`403`/`404`/domain errors;
- sensitive operations, CSRF/origin, rate limits, secret handling, recovery/deletion/export;
- client visibility separately from real security enforcement;
- negative-case final verification.

## TODO — design decisions required

The baseline does not choose single-user versus multi-user behavior, an identity provider, session strategy, ownership, admin roles, or access failure semantics.

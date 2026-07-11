# Testing, build, and verification

> **Documentation state: Shared Next.js baseline.** Base-project marker for an unmodified Next.js/shadcn starter. Commands/results below were verified on the common starter; recheck only before presenting them as current for a copied or modified project, then replace this state with `Project-specific` when source changes supersede it.

## Deferred verification policy

During plan execution, do not routinely run typecheck, lint, build, tests, manual smoke flows, browser automation, or Playwright after tasks/checkpoints. Implement every checkpoint first, then run the smallest consolidated verification that is justified by the actual risk. Intermediate commands are reserved for hard prerequisites/generated output, substantial cascading-rework risk, or explicit user request.

Verification depth is proportional:

- Documentation, planning, copy, comments, or formatting-only changes: use path/link/state/content consistency review. Do not run an application build, start a dev/production server, open a browser, or use Playwright.
- Narrow local source changes with low runtime risk: use source review and, only when useful, the smallest static or focused command that covers the touched contract.
- Code changes that can realistically break compile, routing, server/data behavior, hydration, or packaging: use one relevant final automated check or the project-standard final sequence.
- Manual browser checks or Playwright are opt-in for simple work. Use them only when the user asks, when the acceptance criteria are specifically runtime/visual/interaction/responsive, or when diagnosing a reported browser/UI defect that cannot be confirmed cheaply from source.
- If the user plans to validate the experience manually, record that deeper browser verification is deferred to the user instead of spending tokens on routine automation.

## Verification output context hygiene

Keep verification evidence durable but compact:

- Run broad checks once at consolidated final verification unless the active plan justifies an intermediate prerequisite.
- Capture the command/flow, pass/fail result, first actionable error, whether it is new or pre-existing, and the next action. Do not paste full routine logs into plans or permanent docs.
- Use bounded output or targeted reruns when a command is noisy. Preserve a log-file path only when exact later inspection is necessary, then reread the relevant portion rather than carrying it in chat.
- After a failure is fixed, replace exploration with the verified symptom, root cause, fix, invariant, and regression result.
- Keep complete raw output only outside durable documentation when required for local diagnosis; generated logs are not documentation artifacts and should not be committed unless the project explicitly requires them.

## Baseline commands

| Command | Scope | Limitation |
| --- | --- | --- |
| `pnpm typecheck` | `tsc --noEmit` | No runtime/style/accessibility proof |
| `pnpm lint` | Next/TypeScript ESLint | Can exit successfully with warnings |
| `pnpm build` | Production Next compile/type/page generation | No browser interaction proof |
| `pnpm dev` | Development runtime for manual testing | Not a pass/fail check |
| `pnpm start` | Serve production build | Requires completed build |

`pnpm format` writes source and is not verification.

## Recorded baseline — 2026-06-23 (time not recorded)

| Check | Result |
| --- | --- |
| `pnpm typecheck` | Passed |
| `pnpm lint` | Passed with one unused `Geist` warning in `app/layout.tsx` |
| `pnpm build` | Passed with Next.js `16.2.6`; `/` and generated `/_not-found` reported static |

This is historical shared-baseline evidence whose original minute was not captured. Re-run before presenting it as current after copying/code changes; future recorded runs use `YYYY-MM-DD HH:mm ±HH:MM` and appear newest first when multiple runs are retained.

## Automated test status

**Not implemented in the baseline.** No `test` script, test-runner dependency, test config, or source test file.

## Consolidated final verification by change

This table is a menu, not a checklist. Pick the lowest-cost check that proves the changed risk and skip deeper layers that were not touched.

| Change | Final automated | Final manual/focused |
| --- | --- | --- |
| TypeScript utility/component API | Source review; typecheck or focused test when the exported contract/compiler risk changed | All affected callers/variants when behavior changed |
| CSS/token/shared primitive | Source review; typecheck/lint/build only when the project toolchain or generated CSS risk warrants it | Light/dark/system, focus, disabled/invalid, narrow/wide only when visible behavior changed or user asks |
| Visual design, typography, or theme token change | Source review; static checks only when code risk warrants it | Confirm premium/minimal finish, no unrequested gradients or faded important text, Geist/Geist Mono defaults or approved font overrides, comfortably readable text sizing, consistent rounded-corner scale, semantic variable use instead of hard-coded component colors, light/dark contrast, and future settings customization path when the change is visual enough to warrant runtime review |
| Clickable affordance and global progress | Typecheck, lint, build as relevant | Hover every clickable surface for pointer cursor, including custom rows/cards/icons/`asChild`; trigger route transitions and async actions to confirm site-wide progress starts, completes, clears on error/cancel, and does not replace local pending states |
| Page/layout/metadata | Typecheck/lint/build only when routing, metadata generation, or render behavior changed | Direct URL/navigation/states/responsive/accessibility only when user-visible route/runtime behavior changed or user asks |
| Theme provider/shortcut | Typecheck, lint, build | Theme modes, key guards, editable targets, hydration/flash |
| React hooks, Server/Client boundary, or rendered markup | Typecheck, lint, build; include focused tests when available | Render affected route, exercise interactive client islands, confirm no hook-order/hydration/server-import errors, no nested anchors/buttons/forms, and no raw script tag overlay |
| Route Handler, Server Action, stream, cache/revalidation | Typecheck, lint, build plus focused endpoint/action tests when available | Success/error/auth/body-read/stream-abort/cache-refresh flow with exact runtime assumptions |
| Client-side observable storage, Dexie `liveQuery`, or IndexedDB repository change | Typecheck, lint, build plus focused repository/component tests when available | Render the subscribing route, exercise startup/default data and a mutation, confirm observers update after commits, and confirm no `ReadOnlyError` or readwrite transaction occurs inside an observable query callback |
| Future server/data/auth | Typecheck/lint/build plus introduced focused suites | Success/invalid/unauthorized/conflict/retry/data effects |
| Documentation/plan only | Path/link/state/consistency review | No application build, server, browser automation, or Playwright unless explicitly requested |

## Baseline manual smoke flow

While the docs are still the shared baseline, final verification opens `/` and confirms starter copy/default button, system theme, `d` toggle/guards, keyboard focus/contrast, and narrow-width overflow. After product UI exists, `/` should verify the app home/dashboard, a single-column mobile layout by default, pointer cursor on every enabled clickable surface, no invalid HTML/hydration/script development overlays, and the site-wide progress bar for delayed route/action transitions; promotional pages move to `/promo` or another explicit public route. Do not add temporary shipped UI solely for testing.

## After copying

Add real test suites/config/fixtures/environments/data safety and update the final-check matrix. Record timestamped baseline results only when actually run, with minutes/UTC offset and the newest run first.

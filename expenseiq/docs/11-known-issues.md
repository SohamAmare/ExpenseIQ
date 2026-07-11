# Known issues, fragile areas, and intentional choices

> **Documentation state: Shared Next.js baseline.** Base-project marker for an unmodified Next.js/shadcn starter. These items were observed in the common starter; recheck only task-relevant drift after copying, then replace this state with `Project-specific` when source changes supersede it.

## Confirmed baseline limitations

### Unused font import warning

- Classification: **Known issue — confirmed**
- Evidence: `app/layout.tsx` imports `Geist` but configures only `Inter` and `Geist_Mono`.
- Recorded lint result: one `@typescript-eslint/no-unused-vars` warning.
- Impact: lint is not warning-clean.

### Starter page is scaffold UI

- Classification: **Known issue — confirmed / intentional starting point**
- Evidence: `app/page.tsx` displays “Project ready!” and a button without an action.
- Impact: no product workflow exists until replaced/extended.

### No automated tests

- Classification: **Known issue — confirmed**
- Evidence: baseline `package.json` has no test script/framework and source has no project test files.
- Impact: theme shortcut/button contracts rely on final static/build checks and manual verification.

### Product metadata not configured

- Classification: **Known issue — confirmed / deferred setup**
- Evidence: no `metadata`/`generateMetadata`; only `app/favicon.ico` among product metadata assets.

## Fragile baseline areas

### Theme hydration coupling

`app/layout.tsx`, `components/theme-provider.tsx`, and `app/globals.css` form one theme/hydration surface. Review together to avoid flash/hydration/token regressions.

### Global `d` shortcut

Window-level single-key handling can collide with future custom editors/canvas/dialog/shortcut systems. Existing editable-target/modifier/repeat safeguards must be preserved or deliberately replaced.

### Lightly exercised button contract

The baseline page uses only the default button. Other variants, sizes, invalid behavior, icon sizing, and `asChild` have no baseline application coverage.

## Needs verification

- **Shift+D:** Shift is not rejected and key matching lowercases, so it likely toggles; intent needs confirmation.
- **Font token mapping:** `@theme inline` maps `--font-sans` through the same variable name while layout supplies it; necessity needs framework/style verification before cleanup.

## Intentional baseline choices

- Editable controls do not trigger the global theme shortcut.
- Theme follows system preference by default.
- Client interaction remains isolated in the theme provider.

## After copying

Reproduce every retained issue, remove resolved/non-applicable entries, and add target-project risks with evidence. Do not copy starter limitations indefinitely after product implementation supersedes them.

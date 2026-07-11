# Starter home and UI foundation

> **Documentation state: Shared Next.js baseline.** Base-project marker for an unmodified Next.js/shadcn starter. Verify only task-relevant drift after copying and replace this dossier when the starter page becomes product UI.

## Purpose

Expose the temporary root starter page and establish the first reusable `Button` primitive plus class-composition utility.

## Current behavior

`app/page.tsx` renders “Project ready!” copy, a default actionless `Button`, and theme-shortcut hint. `components/ui/button.tsx` provides variants/sizes/`asChild`; `lib/utils.ts` provides `cn`. No fetch, mutation, navigation, auth, or persistence exists.

## Key user/admin flows

### View starter page

1. Request `/`.
2. Root layout supplies shell/theme.
3. `app/page.tsx` renders scaffold copy/default button.
4. Button has no action.

### Render a shared button

1. Consumer imports `Button`.
2. `buttonVariants` resolves variant/size.
3. `cn` merges variant/caller classes.
4. Native button renders, or `Slot.Root` for `asChild`.

No admin flow exists.

## Important business rules

- `/` is public in the baseline, but reserved for the future app home/dashboard once product UI exists.
- Do not create `/app` as the main application home solely to keep `/` available for marketing; use `/promo` or another explicit public route for promotional pages.
- Button defaults are `default` variant/size.
- `asChild=false` uses native button; true delegates to the child.
- Disabled styling prevents pointer events/reduces opacity.
- Starter copy is scaffold behavior, not product behavior.

## Data model

None.

## Key files

- Routes/layouts: `app/page.tsx`, `app/layout.tsx`.
- Components/utilities: `components/ui/button.tsx`, `lib/utils.ts`, `app/globals.css`.
- Configuration: `components.json`, `.prettierrc`, `tsconfig.json`.
- API/server/data/tests: None implemented.

## External integrations, if any

`class-variance-authority`, `radix-ui` slot, `clsx`, `tailwind-merge`, and shadcn configuration; no runtime service.

## Known gotchas

- Only default button usage is exercised.
- `asChild` semantics depend on a suitable child.
- Icon-only sizes require caller-provided accessible names.
- Replace/update this dossier and feature map when `/` becomes product home/dashboard UI.

## Safe change checklist

- Inspect page, button, `cn`, global tokens, configuration, and all consumers.
- Preserve server compatibility, variant typing, focus/disabled/invalid/SVG behavior, and `asChild` semantics.
- Update route/feature/UI docs after verification.

## Verification steps

Run consolidated final project checks once after all checkpoints, then verify `/`, affected variants/sizes, themes, keyboard/focus/disabled/accessibility, and narrow/wide layout.

# Application shell and theming

> **Documentation state: Shared Next.js baseline.** Base-project marker for an unmodified Next.js/shadcn starter. Verify only task-relevant drift after copying and replace this state with `Project-specific` when source changes supersede it.

## Purpose

Provide the root HTML/body shell, global styles/fonts, system-aware light/dark theme, and global keyboard toggle shared by App Router routes.

## Current behavior

`app/layout.tsx` imports global CSS, applies Inter/Geist Mono variables, and wraps route content with `ThemeProvider`. The provider delegates to `next-themes`, uses a class, follows system preference, suppresses transitions, and installs `ThemeHotkey`. Light/dark tokens live in `app/globals.css`.

## Key user/admin flows

### Initial theme

1. `app/layout.tsx` renders the root with font classes and hydration-warning suppression.
2. `ThemeProvider` resolves system/configured theme client-side.
3. `next-themes` applies the class.
4. `app/globals.css` supplies semantic values.

### Keyboard toggle

1. `ThemeHotkey` subscribes to window keydown.
2. It rejects prevented/repeated, Meta/Control/Alt, non-`d`, and editable-target events.
3. It sets the opposite resolved theme and cleans up its listener.

No admin flow exists.

## Important business rules

- Theme follows system by default and uses class-based CSS.
- Unmodified `d` toggles outside editable controls.
- Repeated/prevented/Meta/Control/Alt events do nothing.
- Transitions are suppressed during switching.

## Data model

No application database. Theme state/persistence is delegated to `next-themes`; no custom storage key or account preference is configured.

## Key files

- Routes/layouts: `app/layout.tsx`, hint in `app/page.tsx`.
- Components/styles: `components/theme-provider.tsx`, `app/globals.css`, `lib/utils.ts`.
- Configuration: `package.json`, `postcss.config.mjs`, `.prettierrc`.
- API/server/data/tests: None implemented.

## External integrations, if any

`next-themes` and `next/font/google`; no external runtime API/credentials.

## Known gotchas

- Layout/provider/global CSS are hydration-coupled.
- Global `d` can conflict with future custom interactions.
- Shift+D likely toggles; intent needs verification.
- `suppressHydrationWarning` should not be removed without checking theme hydration.
- `Geist` import is unused; Geist Mono is used.
- Font token mapping needs verification before cleanup.

## Safe change checklist

- Read installed Next.js client/server/font guidance.
- Inspect layout, provider, and global CSS together.
- Keep client boundary small and tokens aligned.
- Update shortcut hint/rules when behavior changes.
- Add or preserve the root-mounted progress indicator when product navigation
  or delayed user-initiated actions exist.
- Preserve event/editable guards unless deliberately replaced.
- Update UI/rules/issues docs after verification.

## Verification steps

Run consolidated final project checks once after all checkpoints. Then verify system/light/dark, hydration/flash, `d` and modifier/repeat/editable guards, affected token contrast, and any shell-level progress indicator for route/action start, completion, error, and cancellation paths.

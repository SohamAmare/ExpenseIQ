# Business and behavioral rules

> **Documentation state: Shared Next.js baseline.** Base-project marker for an unmodified Next.js/shadcn starter. Contains only verified starter interaction contracts, not product/domain rules; replace this state with `Project-specific` when real rules supersede it.

## Domain status

**No product-domain rules are implemented in the baseline.** Do not infer entities, validation, calculations, states, units, ownership, or workflows from a repository name.

## Verified baseline interaction rules

### Theme selection

Source: `ThemeProvider` in `components/theme-provider.tsx`.

- Initial theme follows the operating system.
- Theme application is class-based.
- Transitions are disabled during theme switching.

### Theme keyboard shortcut

Source: `ThemeHotkey`/`isTypingTarget` in `components/theme-provider.tsx`; hint in `app/page.tsx`.

- Case-insensitive unmodified `d` toggles resolved light/dark.
- Prevented/repeated events do nothing.
- Meta/Control/Alt-modified events do nothing.
- Content-editable, input, textarea, and select targets do nothing.
- Listener is removed during effect cleanup.
- **TODO — needs verification:** Shift is not rejected, so Shift+D likely toggles; intent is not established.

### Button defaults

Source: `Button`/`buttonVariants` in `components/ui/button.tsx`.

- Default variant/size are `default`.
- Native button unless `asChild` uses Radix slot composition.
- Disabled style prevents pointer events/reduces opacity.
- Caller classes merge through `cn`.

These are UI contracts, not business-domain rules.

## After copying

Add only verified domain terminology/rules, enforcement paths, state transitions, calculations, units/dates, permissions, exceptions, and failure behavior. Use the rule-detail format defined by `docs/01-writing-guide.md` conventions and link owning feature dossiers.

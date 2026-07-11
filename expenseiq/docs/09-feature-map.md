# Feature map

> **Documentation state: Shared Next.js baseline.** Base-project marker for an unmodified Next.js/shadcn starter. Contains only reusable starter capabilities; when real product features exist, refresh paths and replace this state with `Project-specific`.

## How to use this router

Open the linked dossier, then inspect every implementation surface relevant to the task. Do not infer product capabilities from the repository/package name.

## Baseline feature inventory

| Feature/module | Status/entry | Routes | Components/UI | Server | Data | Tests | Detailed docs |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Application shell and theming | Implemented globally | `app/layout.tsx` | `components/theme-provider.tsx`, `app/globals.css` | None | None | None | `docs/features/application-shell-and-theming.md` |
| Starter home and UI foundation | Implemented scaffold, not product functionality; `/` is reserved for the future app home/dashboard | `app/page.tsx` | `components/ui/button.tsx`, `lib/utils.ts` | None | None | None | `docs/features/starter-home-and-ui-foundation.md` |

## Cross-cutting map

| Concern | Owning paths | Documentation |
| --- | --- | --- |
| Root document/layout | `app/layout.tsx`, `app/globals.css`, `app/favicon.ico` | `docs/02-architecture.md`, `docs/06-routes-and-pages.md`, `docs/08-ui-patterns.md` |
| Theme state/shortcut | `components/theme-provider.tsx`, `app/globals.css` | Theming dossier, `docs/10-business-rules.md`, `docs/11-known-issues.md` |
| Starter/root route | `app/page.tsx`; future app home/dashboard remains `/`, not `/app` | Starter dossier, routes doc |
| Promotional pages | Proposed convention: `/promo` or `/promo/<campaign>` when needed | Routes doc |
| Button/classes | `components/ui/button.tsx`, `lib/utils.ts`, `components.json` | Starter dossier, UI doc |
| Tooling | `package.json`, lockfile, root config files | Stack, standards, testing docs |
| Data model/migrations | No verified executable source in the shared baseline | `docs/04-database.md`, `docs/database/schema.sql`, `docs/database/migrations.sql` |

## Baseline absent capabilities

No product-domain routes/components/server/data/tests are established. Database, auth, APIs/actions, jobs, external integrations, product navigation/forms, and automated tests are absent until target source proves otherwise.

## Feature-dossier index

- `docs/features/application-shell-and-theming.md`
- `docs/features/starter-home-and-ui-foundation.md`

After copying, add/remove dossiers and paths in the same verified documentation update.

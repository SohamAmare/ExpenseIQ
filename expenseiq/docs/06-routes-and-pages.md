# Routes, pages, and navigation

> **Documentation state: Shared Next.js baseline.** This is the base-project marker for an unmodified App Router starter. Use it as starter orientation, then replace it with `Project-specific` when real routes supersede the scaffold.

## Router status

The baseline uses the Next.js App Router directly under the source folder `app/`. That folder name does not reserve or imply a public `/app` URL. The baseline has one application page and no Pages Router, nested segment, route group, dynamic route, parallel/intercepted route, or Route Handler.

Read installed conventions under `node_modules/next/dist/docs/` before changing routes.

## Route inventory

| URL | Route file | Layout | Rendering/data | Access | Feature dossier |
| --- | --- | --- | --- | --- | --- |
| `/` | `app/page.tsx` | `app/layout.tsx` | Server Component, no data fetch; baseline build reported static | Public | `docs/features/starter-home-and-ui-foundation.md` |

The framework supplies default not-found output; there is no custom `app/not-found.tsx` in the baseline.

## Root URL convention

`/` is reserved for the app home or dashboard once product UI exists. Do not move the main authenticated or operational application surface to `/app` just to preserve a promotional home page.

Promotional or marketing pages should use `/promo` and descendants such as `/promo/<campaign>`, or a similarly explicit public URL when the project needs one. In the pure base project, `/` is only a temporary scaffold placeholder; replace that route and its starter dossier when the dashboard/home is implemented.

## Root layout

`app/layout.tsx`:

- imports `app/globals.css`;
- configures Inter (`--font-sans`) and Geist Mono (`--font-mono`);
- renders `<html lang="en" suppressHydrationWarning>`;
- composes root classes with `cn` from `lib/utils.ts`;
- wraps body children with `ThemeProvider` from `components/theme-provider.tsx`.

The hydration-warning suppression and theme provider are coupled; see the theming dossier.

## Starter page

`app/page.tsx` renders “Project ready!” scaffold copy, the shared default `Button`, and the unmodified `d` theme-shortcut hint. It has no fetch, mutation, navigation, form, or domain behavior.

## Route-state inventory

| Convention | Baseline | Notes |
| --- | --- | --- |
| `layout.tsx` | `app/layout.tsx` | Root layout |
| `page.tsx` | `app/page.tsx` | `/` |
| `loading.tsx` | None | Framework/default behavior only |
| `error.tsx` / `global-error.tsx` | None | No custom recovery UI |
| `not-found.tsx` | None | Framework default |
| `template.tsx` | None | No remount boundary |
| `route.ts` | None | No API Route Handler |

## Navigation and metadata baseline

No application `Link`, menu, breadcrumb, redirect, or router usage exists. No `metadata`/`generateMetadata`, sitemap, robots, social image, or canonical policy exists; `app/favicon.ico` is present.

## After copying

Refresh the full route/layout/navigation/access/rendering/state/metadata inventory, update `docs/09-feature-map.md`, and create/adjust feature dossiers for real product routes.

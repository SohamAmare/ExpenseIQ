# Architecture

> **Documentation state: Shared Next.js baseline.** This is the base-project marker for an unmodified Next.js/shadcn starter. Use the verified starter facts below as orientation without re-explaining default framework behavior; replace this state with `Project-specific` when real project modifications supersede the base project.

## Current system status

The baseline is a minimal Next.js App Router shell for the base project. It contains one public starter page, global CSS/theme infrastructure, one shared button primitive, and a class-name utility. It does not establish a product/domain architecture, persistence, authentication, server mutations/endpoints, external integrations, or automated tests.

## Runtime shape

```text
Browser request for /
  -> Next.js App Router
  -> app/layout.tsx (root Server Component)
       -> next/font variables and app/globals.css
       -> components/theme-provider.tsx (Client Component boundary)
            -> next-themes provider
            -> global d-key theme interaction
            -> app/page.tsx route content (Server Component by default)
                 -> components/ui/button.tsx
                      -> lib/utils.ts class composition
```

The baseline page performs no runtime data fetch. The recorded production build reported `/` as statically prerendered.

## Directory responsibilities

| Path | Baseline responsibility | Important notes |
| --- | --- | --- |
| `app/` | App Router routes/layout and global CSS/metadata assets. | Contains root layout/page, global CSS, and favicon in the baseline. |
| `app/layout.tsx` | Root HTML/body, fonts, global CSS, theme-provider placement. | Wraps every App Router route; Server Component by default. |
| `app/page.tsx` | Public `/` starter route. | Scaffold/demo content rather than product UI. |
| `components/` | Shared application components. | Contains theme provider plus `ui/`. |
| `components/ui/` | Reusable shadcn-style primitives. | Baseline contains `button.tsx`. |
| `hooks/` | Reserved shared-hook location. | Baseline may contain only `.gitkeep`; verify after copying. |
| `lib/` | Shared non-component utilities. | Baseline contains `cn` in `lib/utils.ts`. |
| `docs/` | AI-first documentation, plans, and feature dossiers. | Routing begins at `docs/00-reading-guide.md`. |

## Server/client boundaries

- `app/layout.tsx` and `app/page.tsx` are Server Components by default.
- `components/theme-provider.tsx` is a Client Component because it uses theme hooks, effects, DOM events, and `HTMLElement`.
- `components/ui/button.tsx` has no client directive; a consuming Client Component is required when browser event props are attached.
- `lib/utils.ts` is environment-neutral class composition.

Before changing Next.js boundaries, read the relevant installed/version-matched guide under `node_modules/next/dist/docs/` when that path exists.

## Configuration boundaries

- `next.config.ts`: baseline exports an empty `NextConfig`.
- `tsconfig.json`: strict TypeScript, bundler resolution, root `@/*` alias.
- `postcss.config.mjs`: Tailwind CSS PostCSS integration.
- `components.json`: shadcn style, RSC, aliases, CSS entry, icon selection.
- `eslint.config.mjs`: Next.js Core Web Vitals and TypeScript linting.

## Data/backend/domain status

**Not implemented in the shared baseline:** ORM/database, schema/migrations, query layer, authentication, `proxy.ts`, Route Handlers, Server Actions/Functions, background jobs, environment-backed integrations, or product-domain modules.

After copying, replace this absence statement immediately when the target project implements any of those layers.

## Baseline architectural decisions

- **Direct source roots:** `app/`, `components/`, and `lib/` live at repository root rather than under `src/`.
- **Root route ownership:** the source folder `app/` is not the URL `/app`. Once the starter page becomes product UI, `/` is reserved for the app home/dashboard; promotional pages should live under `/promo` or another explicit public route.
- **Small client island:** theme interaction is isolated in `components/theme-provider.tsx` while layout/page remain server-compatible.
- **Semantic CSS tokens:** `app/globals.css` owns light/dark variables consumed by semantic utility classes.
- **System theme default:** the theme provider follows system preference and applies a class.

## Project-specific bootstrap additions

After copying, add real entry points/processes, module responsibilities, state ownership, data/control flows, deployment topology, external integrations, and durable architecture decisions. Do not preserve starter absences after implementation supersedes them.

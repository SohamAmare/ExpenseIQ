# Tech stack and configuration

> **Documentation state: Shared Next.js baseline.** Base-project marker for an unmodified Next.js/shadcn starter. Use the verified starter stack below without re-explaining default framework behavior; verify task-relevant manifest/config drift after copying, then replace this state with `Project-specific` when source changes supersede it.

## Baseline runtime stack

| Area | Package/version | Baseline usage |
| --- | --- | --- |
| Framework | `next` `16.2.6` | App Router under `app/`; `next.config.ts`. |
| View | `react`, `react-dom` `19.2.4` | Server/Client Components. |
| Language | `typescript` `^5` | Strict `.ts`/`.tsx`; `tsconfig.json`. |
| Package manager | pnpm | `pnpm-lock.yaml`, `pnpm-workspace.yaml`. |
| Styling | `tailwindcss`, `@tailwindcss/postcss` `^4` | `app/globals.css`, `postcss.config.mjs`. |
| UI system | `shadcn` `^4.11.0`, `radix-ui` `^1.5.0` | `components.json`, shared primitives. |
| Themes | `next-themes` `^0.4.6` | `components/theme-provider.tsx`. |
| Variants/classes | `class-variance-authority` `^0.7.1`, `clsx` `^2.1.1`, `tailwind-merge` `^3.6.0` | `components/ui/button.tsx`, `lib/utils.ts`. |
| Icons | `lucide-react` `^1.18.0` | Selected in `components.json`; verify actual consumers. |
| Animation utilities | `tw-animate-css` `^1.4.0` | Imported by `app/globals.css`. |
| Fonts | `next/font/google` | Inter and Geist Mono in `app/layout.tsx`. |

## Baseline development tooling

| Tool | Configuration | Role |
| --- | --- | --- |
| ESLint `^9` / `eslint-config-next` `16.2.6` | `eslint.config.mjs` | Core Web Vitals and TypeScript rules. |
| Prettier `^3.8.3` | `.prettierrc`, `.prettierignore` | Source formatting/Tailwind class sorting. |
| TypeScript | `tsconfig.json` | Strict type checking with no emitted output. |

## Baseline commands

| Command | Behavior | Writes? |
| --- | --- | --- |
| `pnpm dev` | `next dev` | Runtime/build cache |
| `pnpm build` | `next build` | Build output |
| `pnpm start` | `next start` | No source writes |
| `pnpm lint` | `eslint` | Normally read-only |
| `pnpm typecheck` | `tsc --noEmit` | Incremental metadata may be generated/updated |
| `pnpm format` | Prettier write for `.ts`/`.tsx` | Yes; not a verification command |

Verification policy is in `docs/13-testing-and-build.md`: routine broad commands run once after all plan checkpoints.

## Configuration ownership

- `next.config.ts`: Next.js behavior; empty baseline.
- `tsconfig.json`: compiler/module behavior and `@/*` root alias.
- `eslint.config.mjs`: static analysis and ignored outputs.
- `.prettierrc`: no semicolons, double quotes, two spaces, trailing commas, 80-column preference, LF, Tailwind sorting through `app/globals.css`, `cn`, and `cva`.
- `postcss.config.mjs`: `@tailwindcss/postcss`.
- `components.json`: `radix-luma`, RSC enabled, neutral CSS variables, Lucide, standard aliases.
- `pnpm-workspace.yaml`: workspace and dependency build permissions.

## Version-sensitive Next.js rule

Before coding a Next.js behavior, inspect the relevant installed guide under `node_modules/next/dist/docs/`. Useful baseline areas include project structure, layouts/pages, Server/Client Components, data fetching, mutations, Route Handlers, and authentication. Rediscover paths after upgrades.

## Baseline absent categories

No direct database/ORM, authentication SDK, validation library, form library, client query/cache library, test framework, analytics SDK, or deployment adapter was present. No checked-in source read application environment variables. Verify after copying.

## Project-specific bootstrap additions

Refresh versions, resolved package facts, commands, environments/variables, workspace packages, generated artifacts, deployment tooling, installed local docs, and new/removed dependency categories.

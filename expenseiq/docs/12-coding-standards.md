# Coding standards

> **Documentation state: Shared Next.js baseline.** Base-project marker for an unmodified Next.js/shadcn starter. Use the verified starter conventions below without re-explaining default framework behavior; verify task-relevant drift after copying, then replace this state with `Project-specific` when source changes supersede it.

## Sources of truth

- Next.js: installed `node_modules/next/dist/docs/` plus `next.config.ts`.
- Official fallback when installed docs are absent or incomplete: React rules at `https://react.dev/reference/rules` and current Next.js App Router docs at `https://nextjs.org/docs/app`.
- TypeScript: `tsconfig.json`.
- Lint: `eslint.config.mjs`.
- Format: `.prettierrc`, `.prettierignore`.
- shadcn/UI aliases: `components.json`.
- Tokens/styles: `app/globals.css`.
- Database behavior: executable schema/migration source plus `docs/04-database.md`; reconcile exact status-labeled mirrors in `docs/database/schema.sql` and `docs/database/migrations.sql`.

Repository config overrides generic ecosystem habits.

## TypeScript and modules

- Use `.ts`/`.tsx`; project is ESM (`"type": "module"`).
- `strict: true`, `noEmit: true`, bundler module resolution, React JSX.
- Prefer accurate types over `any`/broad assertions.
- Root alias `@/*` maps to repository root.
- Keep types near owners until a real shared boundary exists.

## React/Next.js

- App Router lives under `app/`; do not introduce Pages Router patterns without an explicit decision.
- Treat `app/` as a source folder, not a URL convention. The product home/dashboard belongs at `/`; promotional pages use `/promo` or another explicit public route instead of pushing the app to `/app`.
- Components are Server Components by default.
- Add `"use client"` only for browser APIs/state/effects/events and keep the boundary small.
- Read installed Next.js docs before using version-sensitive APIs/conventions.
- Authenticate/authorize inside every future server operation, not only UI/routes.

## React/Next.js correctness guardrails

These rules are mandatory for implementation plans and code review. A plan that touches React or Next.js must name the affected files as Server Components, Client Components, Route Handlers, Server Actions/Functions, layouts, metadata files, or plain shared modules. If the correct boundary is unclear, the plan stays `Draft` or the implementation blocks instead of guessing.

### Hooks and component purity

- Call React hooks only at the top level of function components or custom hooks. Never call hooks inside conditions, loops, nested functions, callbacks, `try`/`catch`, after an early return, or from ordinary utility functions.
- Name custom hooks with `use*`; keep them pure at call time and move conditional behavior inside the hook body after all hook calls.
- Do not use `useState`, `useReducer`, `useEffect`, `useLayoutEffect`, browser APIs, event handlers, or client-only third-party hooks in a Server Component.
- Do not make a broad parent such as `app/layout.tsx`, `app/page.tsx`, or an entire route tree a Client Component just to satisfy one hook. Extract the smallest interactive leaf to its own `"use client"` file and pass serializable props into it.
- Do not use effects for pure derivations from props/state. Prefer render-time calculation, memoization only when justified, and effects only for synchronizing with external systems.

### Server and client boundaries

- Server Components may fetch data, access backend resources, read trusted server configuration, and keep large/server-only dependencies out of the browser bundle.
- Client Components own interactivity, browser state, lifecycle effects, DOM/browser APIs, event handlers, and client-only hooks.
- Client Component props crossing the server-to-client boundary must be React-serializable. Do not pass functions, class instances, database clients, request objects, response objects, streams, or other runtime resources as props.
- Client Components must not import runtime values from server-only modules: database clients, secrets, `fs`, server SDKs, auth/session internals, server actions not intended for that import path, or modules that read `headers()`, `cookies()`, or environment secrets. Split server/client files or use type-only imports for shared TypeScript shapes.
- Shared modules imported by both sides must be environment-neutral: types, constants, schemas without server-only side effects, and pure utilities.
- Do not silence boundary errors by moving code wholesale across the boundary. Preserve the intended ownership and adjust the file split.

### Valid HTML, scripts, and hydration

- Do not nest interactive HTML in invalid ways. In particular, never render an
  `<a>` inside another `<a>`, a `Link` inside another `Link`, a button inside an
  anchor, an anchor inside a button, nested buttons, or nested forms.
- Remember that Next.js `Link` renders an anchor. A clickable card may have one
  link boundary, or separate sibling controls, but not secondary links/buttons
  nested inside the card's anchor. Use `Button asChild` with `Link` only when it
  creates a single anchor element, not a button inside a link or a link inside a
  link.
- Raw `<script>` tags must not be rendered from React components or providers.
  Use the framework-supported script mechanism, a static template/document
  location, or a focused Client Component effect for browser-only setup.
- Server-rendered and first client-rendered markup must be deterministic. Do not
  use `Date.now()`, `Math.random()`, locale/timezone-dependent formatting,
  browser extension state, `window`/`document`/`localStorage` branches, or
  viewport-only decisions during initial render unless the server and client get
  the same serialized value. Move client-only differences behind an effect,
  mounted flag, CSS media query, or server-provided snapshot.
- Plans touching rendered markup must name the invalid-nesting and hydration
  risks they checked. The expected result is no development overlay for
  `validateDOMNesting`, nested anchors, raw script tags, or hydration mismatch.

### Data fetching, mutations, and cache behavior

- Prefer Server Components for initial data reads when the data is needed to render the route. Use Client Component fetching only for truly client-owned state, live refresh, or browser-specific interactions.
- Every mutation must run through a documented server entry point: Server Action/Function or Route Handler. Validate input, derive trusted identity on the server, authorize there, perform side effects there, and return a typed success/error contract.
- Every read or mutation plan must state cache behavior: static/dynamic rendering impact, `fetch` cache/revalidate options, tags/paths to revalidate, and whether `cookies()`, `headers()`, `searchParams`, or auth/session access make the route dynamic.
- Use `redirect`, `notFound`, `cookies`, `headers`, `revalidatePath`, and `revalidateTag` only in contexts supported by the installed Next.js version. Plans must name the exact context before implementation.

### Client-side observable storage and transactions

- Observable query callbacks such as Dexie `liveQuery` or `useLiveQuery` queriers must be read-only. The callback and every helper it calls must not perform writes, default seeding, lazy record creation, sync side effects, or `readwrite` transactions.
- Split repository APIs by contract: `get`/`read`/`list` functions used by observers are read-only; `ensure`/`create`/`update`/`delete` functions are mutation paths and must run outside observable query callbacks.
- Initialize defaults through migrations, explicit startup effects/actions, or idempotent write transactions that complete before or independently of the subscription. Let the observer re-read the result after the write commits.
- Do not fix a `ReadOnlyError` by making the observable transaction writable or by hiding the write in a helper. Fix the call graph so observed reads and writes are separate.
- Plans touching client-side persistence must identify observable read paths, mutation paths, initialization/default-seeding paths, and the runtime check that proves no readwrite transaction runs inside a live observer.

### Route Handlers, streams, and runtime APIs

- Route Handlers use the Web `Request`/`Response` APIs and supported HTTP method exports. Do not mix Pages Router API shapes such as `req`, `res`, `NextApiRequest`, or `NextApiResponse` into App Router `route.ts` files.
- Document the runtime when it matters: Node.js versus Edge, available APIs, binary/body limits, streaming support, and unsupported packages.
- Request and response bodies/streams are consumable resources. Do not read a body or stream twice unless the implementation deliberately clones, tees, buffers, or recreates it and documents the memory/backpressure impact.
- Streaming UI should use `loading.tsx`, `Suspense`, or documented streaming primitives with explicit fallback/error behavior. Streaming Route Handlers must return a valid `Response` around the stream and handle abort/error cleanup.
- Do not introduce ad hoc stream wrappers, cache handlers, or long-lived connections without version-matched docs and a final manual/runtime verification flow.

## Baseline organization

- `app/`: routes/layouts/route-level files/global CSS.
- `components/`: shared application components.
- `components/ui/`: reusable primitives.
- `hooks/`: reserved shared hooks.
- `lib/`: shared non-component utilities.
- `docs/features/`: feature dossiers; `docs/plans/`: temporary plans plus permanent workflow guides.

Do not create speculative empty abstractions. Document new ownership after source establishes it.

## Imports/exports

- Match configured aliases and existing import grouping.
- Reusable primitives/utilities prefer named exports; framework route/layout files use required defaults.
- Remove unused imports; the baseline `Geist` warning is debt, not a convention.
- Avoid barrel files until real consumers justify them and client/server implications are understood.

## Formatting

`.prettierrc` specifies no semicolons, double quotes, two spaces, trailing commas, 80 columns, LF, and Tailwind sorting using `app/globals.css`, `cn`, and `cva`. `pnpm format` writes all `.ts`/`.tsx`; do not use it as a check or broaden formatting scope casually.

## UI baseline

- Use semantic tokens from `app/globals.css`.
- Keep the interface premium, minimal, classy, and intentional. Avoid generic
  "vibe coded" visual treatments.
- Do not use gradients, glowing color washes, gradient text, faded/masked words,
  decorative low-opacity labels, or arbitrary glass effects unless the user
  explicitly asks for them.
- Favor text sizing that is comfortably readable and a touch larger than the
  smallest acceptable size. Avoid cramped labels, buttons, metadata, and body
  copy.
- Use Geist as the default sans/display/body/heading font and Geist Mono as the
  default monospace font. Route typography through font variables/tokens such as
  `--font-sans`, `--font-display`, and `--font-mono` instead of hard-coded
  component font families.
- Theme customization may expose only the approved app font choices: Geist,
  Inter, Manrope, DM Sans, Plus Jakarta Sans, Space Grotesk, Outfit, Playfair
  Display, Cormorant Garamond, Fraunces, Lora, EB Garamond, Geist Mono,
  JetBrains Mono, and IBM Plex Mono.
- Use a consistent rounded-corner system across related UI elements. Prefer
  softly rounded corners, but reuse shared radius tokens/classes instead of
  inventing arbitrary per-component radii.
- Use CSS variables/tokens for app colors so future theme customization can
  change palettes from settings without rewriting components.
- Treat theme customization as a design constraint: new colors need semantic
  roles, light/dark values, contrast checks, and a path to a polished settings
  UI with swatches/previews/reset behavior.
- Compose classes with `cn`; use `cva` for stable variant APIs.
- Reuse/extend `components/ui/button.tsx` before adding competing buttons.
- Preserve focus/disabled/invalid/keyboard semantics; label icon-only controls.
- Build mobile-friendly UI by default. The mobile layout is single column unless
  the user explicitly requests a different mobile layout, and the desktop layout
  may enhance into multi-column or wider-screen patterns only after the mobile
  flow remains usable.
- UI implementation must avoid mobile overlap, clipping, inaccessible tap
  targets, and page-level horizontal scrolling. Name the mobile behavior for
  sidebars, grids, cards, tables, dialogs, filters, action bars, and fixed or
  sticky elements.
- Every enabled clickable element must advertise clickability with a pointer
  cursor through shared primitives, variants, or interaction utilities. Do not
  apply pointer cursor to disabled, unavailable, decorative, or noninteractive
  elements.
- Product apps need a site-wide progress indicator for route transitions and
  delayed user-initiated actions. Mount it from the root shell/layout, start it
  immediately on navigation/action intent, complete or clear it on success,
  error, redirect, or cancellation, and keep local pending states for
  double-submit-prone controls.

## Future server/data/security code

No validation/query/action/error/auth convention exists yet. The first implementation must choose a coherent project-specific pattern, validate untrusted input, derive trusted identity, enforce permissions server-side, and update canonical docs after verification.

For planned schema/migration work, the planning agent makes every data-design choice and writes exact DDL, full target schema, migration source path, backfill, locking, compatibility, rollback, and verification contracts before implementation. The executor must not improvise those decisions. Documentation migration entries are newest first and must never be executed as one batch.

## Timestamps and chronological records

Use `YYYY-MM-DD HH:mm +/-HH:MM` for durable event/status records. Use `docs/plans/plan<N>.md` for active-plan filenames and keep chronological details inside the plan. Keep chronological ledgers newest first. Never invent an unknown historical minute; label it `time not recorded`.

## Verification discipline

Implement all planned checkpoints before routine typecheck/lint/build/test commands. Run consolidated final verification once at the smallest depth that proves the changed risk; intermediate commands require a hard prerequisite or substantial cascading-risk reason.

Documentation, planning, copy, comments, formatting-only work, small styling edits, and narrowly local source changes normally need only source review plus targeted path/link/text checks. Do not rebuild the app, start dev/prod servers, open browsers, run manual smoke flows, or use Playwright for simple changes unless the user asks, the acceptance criteria depend on that layer, or a reported runtime/UI defect cannot be diagnosed cheaply from source.

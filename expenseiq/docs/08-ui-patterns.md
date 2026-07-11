# UI and interaction patterns

> **Documentation state: Shared Next.js baseline.** Base-project marker for an unmodified Next.js/shadcn starter. Use the verified Tailwind/shadcn starter facts below without re-explaining default scaffold behavior; verify task-relevant drift after copying, then replace this state with `Project-specific` when source changes supersede it.

## Baseline UI system

The baseline provides Tailwind CSS v4 semantic variables, shadcn configuration, a global `next-themes` provider, one shared button primitive, and `cn`. It does not establish application navigation, forms, tables, charts, dialogs, toasts, or product-specific components.

## Styling pipeline

1. `postcss.config.mjs` enables `@tailwindcss/postcss`.
2. `app/globals.css` imports Tailwind, `tw-animate-css`, and `shadcn/tailwind.css`.
3. `@theme inline` maps semantic variables into utilities.
4. `:root` and `.dark` define light/dark values.
5. Base styles apply border/outline and document background/foreground/font.
6. `components/theme-provider.tsx` applies the theme through an HTML class.

Use semantic tokens such as background/foreground/primary/muted/border rather than hard-coded light/dark values when extending the shared system.

## Theme behavior

`ThemeProvider` in `components/theme-provider.tsx`:

- uses `attribute="class"`;
- follows the system by default (`defaultTheme="system"`, `enableSystem`);
- disables transitions during theme change;
- forwards caller props after defaults;
- renders `ThemeHotkey`.

The unmodified `d` shortcut toggles resolved light/dark only when the event is not prevented/repeated, Meta/Control/Alt are absent, and the target is not content-editable, `INPUT`, `TEXTAREA`, or `SELECT`. The effect removes its window listener on cleanup.

## Premium visual direction

Every app should feel premium, calm, intentional, and built by hand. Avoid the
generic "vibe coded" look: oversized gradient hero treatments, glowing blobs,
random glass panels, low-contrast gray-on-black labels, excessive letter
spacing, and decorative effects that do not help the task.

Default visual rules:

- No gradients by default. Do not use gradient backgrounds, gradient text,
  gradient borders, glow washes, or color-fade hero treatments unless the user
  explicitly asks for that direction.
- Do not render important words as faded, translucent, masked, gradient-clipped,
  or low-opacity text. Muted text is allowed only when it remains clearly
  legible and secondary.
- Keep layouts creative but minimalistic: generous spacing, precise alignment,
  strong hierarchy, restrained motion, and no clutter unless the user asks for a
  dense or maximal interface.
- Prefer classy, artful restraint over decorative novelty. If a visual element
  does not clarify hierarchy, reinforce brand/product identity, or improve task
  flow, remove it.
- Use high-quality typography and spacing rather than effects to create polish.
  Avoid all-caps tracking-heavy labels unless they are a deliberate, sparing
  product convention and remain readable.
- Prefer comfortably readable text that is slightly larger than the smallest
  acceptable size. Do not shrink body copy, labels, buttons, or metadata to the
  edge of legibility just to fit more on screen. Compact can still be premium,
  but cramped should be treated as a defect.
- Use rounded corners with a consistent radius system. Corners should generally
  feel softly rounded, but related surfaces and controls must share a coherent
  radius scale instead of mixing arbitrary values.

## Theme customization readiness

Build every app with future theme customization in mind, even before the
settings UI exists.

- Use semantic CSS variables/tokens for product colors: background, foreground,
  surface, surface-raised, border, muted, primary/accent, success, warning,
  danger, info, chart/data colors, focus rings, and shadows where applicable.
- Do not hard-code brand or state colors in components when a token can express
  the role. Component variants should consume variables, not raw hex/HSL values,
  except while defining the token palette itself.
- Theme tokens should support light, dark, and later user-customized palettes
  without rewriting components.
- When a settings/customization feature is introduced, the interface should feel
  premium: swatches, previews, accessible contrast feedback, reset controls, and
  clear apply/cancel behavior rather than raw color inputs alone.
- Plans that touch app-wide visuals must name which tokens are being added or
  reused and how they can later be surfaced in settings.

## Typography

Use the Ecommerce/StoreForge typography system as the preferred default:

- normal/body text and headings use Geist by default;
- display/heading tokens map to Geist by default;
- monospace text uses Geist Mono by default;
- font variables should expose at least `--font-sans`, `--font-display`, and
  `--font-mono`;
- heading styles should resolve through a heading/display token rather than a
  hard-coded font family.

Theme customization may override those defaults from settings and load supported
Google Fonts at runtime. Keep the supported choices aligned with this list:
Geist, Inter, Manrope, DM Sans, Plus Jakarta Sans, Space Grotesk, Outfit,
Playfair Display, Cormorant Garamond, Fraunces, Lora, EB Garamond, Geist Mono,
JetBrains Mono, and IBM Plex Mono.

Emails, PDFs, image exports, and other isolated rendering contexts should use
robust inline/system fallbacks when webfont loading is unreliable. Do not assume
app runtime font variables are available inside transactional email markup.

Typography should favor clear, confident sizing. Default text should sit a step
above bare-minimum readability, with smaller text reserved for genuinely
secondary metadata. If text must be small, increase supporting clarity through
contrast, spacing, and line height rather than opacity tricks.

## Radius System

Use a small, consistent border-radius scale across cards, buttons, inputs,
dialogs, menus, pills, and panels. Prefer slightly rounded corners as the
default feel, then reserve sharper or fully pill-shaped corners for deliberate
semantic differences. When adding a new component, reuse the closest existing
radius token or class before inventing a new value.

## Button primitive

`components/ui/button.tsx` exports `Button` and `buttonVariants`.

- Variants: `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`.
- Sizes: `default`, `xs`, `sm`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`.
- Native `<button>` by default; `Slot.Root` when `asChild`.
- Emits `data-slot`, `data-variant`, `data-size`.
- Merges classes through `cn` from `lib/utils.ts`.
- Includes focus-visible, invalid, disabled, active, and SVG descendant styling.

Callers remain responsible for correct `asChild` semantics and accessible names for icon-only controls.

## Global interaction feedback

The shared baseline has no app navigation or async feedback yet. Once a
product app introduces navigation, mutations, or custom clickable surfaces,
establish these app-wide contracts:

- Every enabled clickable element must show a clickable pointer cursor on
  hover. This applies to links, buttons, `asChild` wrappers, menu items, tabs,
  clickable rows/cards, icon controls, labels/upload zones that trigger a
  control, and custom elements with click or keyboard handlers.
- Disabled, `aria-disabled`, loading-only, unavailable, or purely decorative
  elements must not advertise clickability with a pointer cursor.
- Prefer enforcing pointer affordance through shared primitives, variant APIs,
  and global interaction utilities instead of scattered one-off classes.
  Custom clickable wrappers still need keyboard semantics, accessible names or
  roles, focus states, and disabled behavior.
- Product apps with route transitions, async actions, or delayed page/shell
  updates need a site-wide progress indicator mounted from the root shell or
  layout. It starts immediately after the user initiates navigation or an
  action and stays visible until the destination content, modal, mutation
  result, or error state is committed.
- The progress indicator must handle fast transitions, cancellations, errors,
  redirects, prefetch hits, and repeated clicks without getting stuck. It does
  not replace local pending states for buttons/forms that can be submitted or
  triggered more than once.
- When a source project already has this behavior, such as Ecommerce/StoreForge
  at `E:\Apps\Coding\VSCode\Freelance\Ecommerce`, preserve it as a required
  interaction pattern during UI work.

## Responsive and mobile contract

Every website, app, page, and interactive surface must have a mobile-friendly
version unless the user explicitly says a mobile experience is out of scope.
Desktop and tablet layouts may take advantage of wider screens with sidebars,
multi-column grids, rails, dashboards, comparison views, and richer density, but
mobile must default to a single-column experience regardless of the desktop
layout.

For UI plans and implementation:

- Start from the mobile layout, then enhance for larger breakpoints.
- Mobile content, forms, cards, feature sections, dashboards, and page bodies
  should flow in one readable column. Avoid side-by-side columns, horizontal
  rails, split hero/content layouts, or multi-column card grids on mobile unless
  the user explicitly requests that mobile exception.
- Navigation, filters, sidebars, tabs, action bars, tables, dialogs, media,
  charts, and dense data views need named mobile behavior: stack, collapse,
  scroll within a controlled container, become a drawer/sheet, or use a compact
  single-column alternative.
- Text, buttons, icons, badges, counters, inputs, and fixed/sticky elements must
  not overlap, clip, or force page-level horizontal scrolling on common narrow
  widths.
- Mobile can be a different experience from desktop, but it must preserve the
  same core task path and enough information for the user to complete the flow.
- Any intentional mobile exception must be recorded in the plan or docs with the
  user's instruction and the manual verification viewport.

## shadcn baseline

`components.json` selects `radix-luma`, RSC, neutral CSS variables, `app/globals.css`, Lucide icons, and aliases for components/UI/lib/hooks.

## Server/client guidance

Keep presentational primitives server-compatible. Add `"use client"` at the smallest boundary requiring state/effects/browser events; the theme provider is the baseline example.

Before implementing UI, classify every touched component as one of:

- Server Component: data read/rendering, no client hooks, no event handlers, no browser globals.
- Client Component: local state/effects/events/browser APIs/client-only hooks, with serializable props from its server parent.
- Shared primitive: environment-neutral rendering only, safe to import from either side.

Do not promote a route, layout, or whole feature tree to Client Component status to fix one interactive control. Extract a focused client island and leave data reads, metadata, and server-only dependencies on the server side.

## Known baseline risks

- Root layout, theme provider, and global CSS are coupled for hydration/theme behavior.
- The global single-key shortcut may collide with future custom controls.
- Most button variants/sizes and `asChild` are not exercised by baseline application usage.
- Verify Shift+D intent and the font token mapping before “cleanup.”

## After copying

Add real shared layouts/navigation/forms/feedback/overlays/data display/responsiveness/accessibility/client-state patterns only after source establishes them.

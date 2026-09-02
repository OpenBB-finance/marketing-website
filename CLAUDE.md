# Astro Landing Page — Project Rules

## Main Priorities

- **Performance** — no unnecessary JS, no bloated dependencies, no lazy-loading where it isn't needed. Our goal is to hit 100-100-100-100 on Lighthouse.
- **Mobile-first design** — all breakpoints start at mobile, then `md:` and `lg:` for larger screens.
- **Accessibility** — all interactive elements have proper ARIA attributes, keyboard navigation works.
- **SEO** — semantic HTML, proper heading hierarchy, meta tags, structured data.

## Layout & Containers

- **Always use `page-container`** for section content width. Never use `container`, `max-w-7xl`, or raw `max-w-[1440px] px-5 lg:px-[80px]`.
- `page-container` is defined in `src/styles/global.css`: max-width 1440px, 20px inline padding on mobile, 80px on lg+.
- Full-bleed backgrounds go on the `<section>` wrapper; `page-container` goes on the inner content div.

## Styling

- Tailwind v4 with CSS-based config (`@theme` directive in `global.css`).
- Custom typography classes: `text-title-{xl|l|m|s|xs}-{bold|medium|regular}` and `body-{xs|sm|md|lg|xl}-{bold|medium|regular}`.
- No Tailwind `container` class — it has unpredictable breakpoint-based widths.

## Components

- All components are `.astro` files. Zero JS frameworks (no React, no Svelte).
- Interactive sections use inline `<script>` with vanilla JS and `data-*` attributes for DOM selection. Do NOT use `client:` directives — those require framework components (React/Svelte) and add runtime overhead. Use IntersectionObserver to defer work until sections are visible.
- SVG icons via `SvgIcon.astro` referencing `/sprite.svg`.
- `Button.astro` for all CTA buttons (variants: `accent`, `primary`).

## Code Quality

- No comments unless they explain non-obvious logic.
- No dead code, no unused variables.
- Minimize mobile/desktop duplication — prefer responsive Tailwind classes over `hidden md:block` / `md:hidden` pairs where possible.

## Package Manager

- Use `bun`, not npm/npx/yarn/pnpm.

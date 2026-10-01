# OpenBB Marketing Website

Source code for [openbb.co](https://openbb.co), the OpenBB marketing site, released under the
[Apache License 2.0](LICENSE).

It is a fully static site built with [Astro](https://astro.build/) and
[Tailwind CSS v4](https://tailwindcss.com/). There are no client-side frameworks: every
component is an `.astro` file, and the little interactivity that exists is plain vanilla JS.

## Quick start

The only prerequisite is [Bun](https://bun.sh/) 1.2 or newer.

```bash
git clone https://github.com/OpenBB-finance/marketing-website.git
cd marketing-website
bun install
bun run dev
```

Open <http://localhost:4321>. That is it. **No secrets or environment variables are required**:
every page builds and renders without them. Features that depend on OpenBB's private services
are simply switched off (see [Optional integrations](#optional-integrations)).

## Scripts

| Command           | What it does                                                        |
| ----------------- | ------------------------------------------------------------------- |
| `bun run dev`     | Dev server with hot reload on port 4321                             |
| `bun run build`   | Production build into `./dist/`                                     |
| `bun run preview` | Serve the production build locally                                  |
| `bun run lint`    | Biome lint on `src/` plus `astro check` (type-checks `.astro` files) |
| `bun run format`  | Auto-format `src/` with Biome (`.astro` files are left untouched)   |

## Optional integrations

Copy `.env.example` to `.env` and fill in only what you need. Every variable is optional.

| Variable                          | Browser-exposed | Enables                                                                                    |
| --------------------------------- | --------------- | ------------------------------------------------------------------------------------------ |
| `DIRECTUS_TOKEN`                  | no              | Any non-public Directus content at build time (published posts and the letter are readable anonymously) |
| `PUBLIC_DIRECTUS_PREVIEW_TOKEN`   | yes             | Draft preview at `/blog/preview?slug=...` (fetched client-side)                            |
| `PUBLIC_POSTHOG_API_KEY`          | yes             | PostHog analytics (both PostHog vars must be set)                                          |
| `PUBLIC_POSTHOG_API_HOST`         | yes             | PostHog ingestion host                                                                     |
| `PUBLIC_STRIPE_LITE_CHECKOUT_URL` | yes             | Overrides the Stripe Payment Link used on `/lite`                                          |

Astro inlines any variable prefixed with `PUBLIC_` into the browser bundle; everything else stays
build-time only. Never commit `.env`. The `.gitignore` already excludes every `.env*` file except
`.env.example`.

What you get without any of them:

- Every page renders normally, including the blog and the wind-down letter overlay. Published
  posts are fetched anonymously from OpenBB's Directus instance at build time.
- No analytics script is loaded.
- The build prints a single warning from `src/lib/directus.ts` noting that the CMS token is unset.

If the Directus instance ever becomes unreachable, the site still builds: `/blog` is empty, no
`/blog/<slug>` pages are generated, and the letter overlay is skipped with a warning.

## Project layout

```
astro.config.mjs        Site URL, redirects, sitemap filter, Tailwind/Vite plugins
biome.json              Lint and format rules
public/                 Static assets served as-is (favicons, OG image, robots.txt, llms.txt, SVG sprite)
scripts/
  lighthouse-report.py  Summarise a Lighthouse HTML report in the terminal
src/
  assets/images/        Images processed by Astro's image pipeline
  components/           Reusable .astro components (Hero*, Cta*, Navbar, Footer, Button, SvgIcon, ...)
  content/              example-apps.json, data behind the app showcase
  data/                 Typed data modules: nav.ts, videos.ts, contact.ts (Formbricks forms), lite.ts (Stripe)
  layouts/Layout.astro  HTML shell: meta tags, fonts, PostHog, page-load animations, wind-down letter
  lib/directus.ts       Directus CMS client and blog helpers
  lib/marked.ts         Markdown to HTML for blog bodies
  pages/                One file per route (Astro file-based routing)
  styles/global.css     Tailwind v4 theme (@theme), typography utilities, page-container
```

## Where content lives

| Content                  | Source                                                          |
| ------------------------ | --------------------------------------------------------------- |
| Page copy and layout     | The `.astro` file under `src/pages/` for that route             |
| Navigation and footer    | `src/data/nav.ts`                                               |
| Videos page              | `src/data/videos.ts`                                            |
| App showcase             | `src/content/example-apps.json`                                 |
| Contact forms            | `src/data/contact.ts` (Formbricks embed URLs)                   |
| Lite pricing and checkout | `src/data/lite.ts`                                             |
| Blog posts               | Directus CMS, collection `Blog` (see `src/lib/directus.ts`)     |
| Homepage banner          | `src/components/Hero.astro`                                     |
| Redirects                | `redirects` in `astro.config.mjs`                               |
| Icons                    | `public/sprite.svg`, referenced through `SvgIcon.astro`          |

### Pointing at your own CMS

The Directus base URL is hard-coded in `src/lib/directus.ts` and referenced once more in
`src/pages/blog/preview/index.astro`. Change both to use a different Directus instance. The
`DirectusBlogItem` interface in `directus.ts` documents the fields the `Blog` collection is
expected to have. If you do not want a CMS at all, replace `getPublishedPosts` and
`getPostBySlug` with an Astro content collection or static data.

## Conventions

The full set of rules lives in [`CLAUDE.md`](CLAUDE.md) and applies to human and AI contributors
alike. The short version:

- Mobile-first Tailwind, with `md:` and `lg:` breakpoints only.
- Use the `page-container` class for content width. Never Tailwind's `container`.
- Typography goes through the custom `text-title-*` and `body-*` utilities defined in `global.css`.
- No JS frameworks and no `client:` directives. Interactive sections use inline `<script>` tags
  with `data-*` attribute hooks and defer work with `IntersectionObserver`.
- All CTA buttons use `Button.astro`; all icons use `SvgIcon.astro`.
- Lighthouse target is 100 across the board. `bun run build`, run Lighthouse against
  `bun run preview`, then `python3 scripts/lighthouse-report.py report.html` to read the results.

Run `bun run lint` before opening a pull request. CI runs the same command on every PR.

## Deployment

`bun run build` produces a plain static site in `dist/` that can be hosted anywhere (GitHub Pages,
Cloudflare Pages, Netlify, Vercel, S3, nginx).

`.github/workflows/deploy-pages.yml` deploys to GitHub Pages when triggered manually from the
Actions tab. Add the optional variables above as repository secrets if you want the CMS and
analytics enabled in the deployed build.

If you host the site on a different domain, update `site` in `astro.config.mjs` and the
`Sitemap:` line in `public/robots.txt`. Canonical and Open Graph URLs in `Layout.astro` are also
built from `https://openbb.co`.

## License

Copyright 2026 OpenBB Inc. Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE)
and [NOTICE](NOTICE).

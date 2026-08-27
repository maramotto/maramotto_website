# maramotto.com

My personal space on the internet — built with [Eleventy](https://www.11ty.dev/), one build producing the whole site: the 3 main pages and the blog.

## Structure

```
.
├── .eleventy.js              # Eleventy config (dir.input is the repo root)
├── .eleventyignore            # docs/scratch files Eleventy must not render as pages
├── index.njk                  # homepage (hero, projects, about, contact)
├── cuerposonoro.njk            # project page: CuerpoSonoro
├── universo-punzadas.njk       # project page: Universo Punzadas
├── _includes/
│   ├── layouts/
│   │   ├── base.njk             # shared <head> + <nav> + <footer>, used by every page
│   │   ├── root-page.njk        # defaults for the 3 main pages (client-side i18n, full titles)
│   │   ├── list.njk / post.njk  # blog layouts
│   ├── partials/
│   │   ├── nav.njk              # one nav for the whole site (main pages + blog)
│   │   └── footer.njk           # one footer for the whole site
├── eleventy/filters/           # Nunjucks filters shared by every template (unit-tested)
├── css/style.css               # single stylesheet for the whole site
├── css/blog.css                 # blog-only additions, loaded only on blog pages
├── js/
│   ├── i18n.js                 # translations (ES/EN) + i18n engine — main pages only
│   └── nav.js                   # nav interactions (dropdown, mobile menu, logo animation)
├── img/                        # images and SVG illustrations
├── robots.txt / sitemap.xml    # SEO for the main pages (static, passthrough-copied)
├── blog/                       # the blog subsystem — see blog/README.md
│   ├── posts/<date>-<slug>/     # one folder per post, both languages + cover image
│   ├── deploy.sh / publish.sh    # deploy/publish automation, repo-root relative paths
│   └── *.njk                    # blog-specific pages (listing, tags, feeds, sitemap)
├── tests/e2e/                   # Playwright: root-pages.spec.js + blog.spec.js
├── Dockerfile / docker-compose.yml / nginx.conf   # deployment
└── LICENSE                      # CC0
```

The main pages and the blog share one templating system now: one `<head>`
(`base.njk`), one nav, one footer. What still differs between them is i18n —
see "Languages" below — not layout or markup.

## Local development

```bash
npm install
npm run serve   # Eleventy dev server with live reload, http://localhost:8080
```

`npm run build` writes the full site to `_site/` without starting a server —
useful before a Docker build.

## Languages

Two different i18n mechanisms coexist, one per subsystem — deliberately not
unified yet (see the site audit's B-1 for that follow-up):

- **Main pages** (`/`, `/cuerposonoro.html`, `/universo-punzadas.html`):
  client-side, via `js/i18n.js`. Same URL for both languages.
  Translatable elements use `data-i18n="key"` (plain text) or
  `data-i18n-html="key"` (rich markup) attributes; a language toggle in the
  nav calls `window.i18n.setLang()`; the choice persists in `localStorage`.
  Every string needs **three** copies kept in sync: the Spanish fallback
  hardcoded in the `.njk` (shown before JS runs), `TRANSLATIONS.es[key]`,
  and `TRANSLATIONS.en[key]` in `js/i18n.js`. SEO metadata (`<title>`,
  `<meta description>`, Open Graph, JSON-LD) is only ever served in
  Spanish for these pages — it does not go through `i18n.js`.
- **Blog**: real URLs per language (`/blog/`, `/blog/en/`), resolved at
  build time via each post's `translationKey`. No client-side JS involved;
  see `blog/README.md`.

The shared `_includes/partials/nav.njk` and `footer.njk` branch on a
`clientI18n` template flag to render the right variant of each — main-page
templates set it via `layouts/root-page.njk`, blog templates don't.

## SEO

- `robots.txt` — allows all crawlers, points to both sitemaps (static
  `sitemap.xml` for the main pages, Eleventy-generated `/blog/sitemap.xml`)
- `sitemap.xml` — lists the 3 main pages; add a new `<url>` entry whenever
  you add one
- JSON-LD structured data per page, via each template's `structuredData`
  front matter field
- Open Graph / Twitter Card meta tags for social sharing

## Adding a new project page

1. Copy `universo-punzadas.njk` as a starting point — front matter fields:
   `layout: layouts/root-page.njk`, `permalink`, `title`, `description`,
   optionally `socialDescription` (if it should differ from `description`),
   `ogType: article`, `image`, `themeColor`, `structuredData`.
2. Add its translation keys to **both** the `es` and `en` blocks in
   `js/i18n.js`, under a short namespace to avoid collisions.
3. Add the new page's link to `_includes/partials/nav.njk`'s dropdown —
   **one edit**, it reaches every page on the site (main pages and blog).
4. Add a card/entry for it on the homepage (`index.njk`, the "En qué ando"
   section).
5. Add a `<url>` entry to `sitemap.xml`.

You still do **not** need to touch the `Dockerfile` — it copies whatever
Eleventy writes to `_site/` wholesale.

## Deployment

The site is a static nginx container; Eleventy builds it in a Docker build
stage.

```bash
docker compose up -d --build
```

`nginx.conf` serves clean URLs (`/cuerposonoro` resolves to
`cuerposonoro.html`), caches static assets, and falls back unknown routes
to `index.html`. See `blog/README.md` for the actual deploy/publish
workflow (`blog/deploy.sh`, `blog/publish.sh`) — those scripts are
unaffected by the template restructuring and unchanged.

## License

[CC0 1.0](LICENSE) — public domain.

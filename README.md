# maramotto.com

My personal space on the internet — built with [Eleventy](https://www.11ty.dev/), one build producing the whole site: the 3 main pages and the blog.

## Structure

```
.
├── .eleventy.js              # Eleventy config (dir.input is the repo root)
├── .eleventyignore            # docs/scratch files Eleventy must not render as pages
├── index.njk / cuerposonoro.njk / universo-punzadas.njk   # main pages, paginated es/en
├── index.11tydata.js / cuerposonoro.11tydata.js / universo-punzadas.11tydata.js
│                               # per-page title/description/structuredData, one file
│                               # per language since front matter can't vary by lang
├── _data/
│   ├── i18n.js                 # all translated strings, es + en, keyed by dot-notation
│   └── languages.js             # ["es", "en"] — what the main pages paginate over
├── _includes/
│   ├── layouts/
│   │   ├── base.njk             # shared <head> + <nav> + <footer>, used by every page
│   │   ├── root-page.njk        # defaults for the 3 main pages (pagination, hreflang)
│   │   ├── list.njk / post.njk  # blog layouts
│   ├── partials/
│   │   ├── nav.njk              # one nav for the whole site (main pages + blog)
│   │   └── footer.njk           # one footer for the whole site
├── eleventy/filters/           # Nunjucks filters shared by every template (unit-tested)
│   └── t.js                     # {{ "key" | t(lang) }} — looks up _data/i18n.js
├── css/style.css               # single stylesheet for the whole site
├── css/blog.css                 # blog-only additions, loaded only on blog pages
├── js/nav.js                    # nav interactions (dropdown, mobile menu, logo animation)
├── img/                        # images and SVG illustrations
├── robots.txt                  # SEO — points to both sitemaps
├── sitemap.njk                  # generates /sitemap.xml with es+en URLs for the 3 main pages
├── blog/                       # the blog subsystem — see blog/README.md
│   ├── posts/<date>-<slug>/     # one folder per post, both languages + cover image
│   ├── deploy.sh / publish.sh    # deploy/publish automation, repo-root relative paths
│   └── *.njk                    # blog-specific pages (listing, tags, feeds, sitemap)
├── tests/e2e/                   # Playwright: root-pages.spec.js + blog.spec.js
├── Dockerfile / docker-compose.yml / nginx.conf   # deployment
└── LICENSE                      # CC0
```

The main pages and the blog share one templating system and one i18n
mechanism: real per-language URLs, resolved at build time, no client-side
translation JS anywhere on the site.

## Local development

```bash
npm install
npm run serve   # Eleventy dev server with live reload, http://localhost:8080
```

`npm run build` writes the full site to `_site/` without starting a server —
useful before a Docker build.

## Languages

Every page on the site — main pages and blog — has a real URL per language,
generated at build time, no client-side JS involved:

- **Main pages**: `/`, `/en/`; `/cuerposonoro.html`, `/en/cuerposonoro.html`;
  `/universo-punzadas.html`, `/en/universo-punzadas.html`. Each of the 3
  `.njk` files paginates over `_data/languages.js` (`pagination: {data:
  languages, size: 1, alias: lang}` in `layouts/root-page.njk`), and the
  `permalink` there derives the output path from `lang` + a per-page `slug`
  front-matter field. Body copy uses the `t` filter — `{{ "key" | t(lang)
  }}` for plain text, `{{ "key" | t(lang) | safe }}` when the stored string
  contains inline markup — looking keys up in `_data/i18n.js`. `title`,
  `description`, `socialDescription` and `structuredData` vary by language
  too, but front-matter fields aren't re-rendered by Eleventy (only
  `permalink` is), so those live in each page's `<name>.11tydata.js` as
  `eleventyComputed` functions instead of plain front matter.
- **Blog**: `/blog/`, `/blog/en/`, and one physical `.es.md`/`.en.md` pair
  per post, cross-linked via `translationKey`. See `blog/README.md`.

`_includes/partials/nav.njk` and `footer.njk` are used by both, and resolve
each page's sibling-language URL via `esUrl`/`enUrl` (set in
`root-page.njk` for main pages) or the `translationUrl` filter (for blog
posts, which don't have a fixed `esUrl`/`enUrl` — the sibling depends on
which post it is).

## SEO

- `robots.txt` — allows all crawlers, points to both sitemaps (`sitemap.njk`
  for the main pages, `blog/sitemap.njk` for the blog)
- `sitemap.njk` — loops a small hardcoded array of `{slug, lastmod,
  priority}` and emits both the `/slug` and `/en/slug` URL for each; add an
  entry here when you add a main page (same manual step as before, now
  covering both languages automatically once added)
- `<link rel="alternate" hreflang="...">` (es/en/x-default) on every main
  page, via `esUrl`/`enUrl` in `base.njk` — not on blog pages, that's a
  separate future improvement
- JSON-LD structured data per page, via each template's `<name>.11tydata.js`
- Open Graph / Twitter Card meta tags for social sharing

## Adding a new project page

1. Copy `universo-punzadas.njk` and `universo-punzadas.11tydata.js` as a
   starting point. In the `.njk`: `layout: layouts/root-page.njk`, `slug`
   (no leading slash, e.g. `"my-project.html"`), `ogType: article`, `image`,
   `themeColor`. In the `.11tydata.js`: `TITLES`/`DESCRIPTIONS`/
   `SOCIAL_DESCRIPTIONS`/the JSON-LD template, each keyed by `es`/`en`.
2. Add the page's body-copy translation keys to **both** the `es` and `en`
   blocks in `_data/i18n.js`, under a short namespace to avoid collisions.
3. Add the new page's link to `_includes/partials/nav.njk`'s dropdown —
   **one edit**, it reaches every page on the site (main pages and blog),
   already lang-aware.
4. Add a card/entry for it on the homepage (`index.njk`, the "En qué ando"
   section).
5. Add an entry to the `pages` array in `sitemap.njk`.

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

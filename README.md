# maramotto.com

My personal space on the internet — plain HTML, CSS and JavaScript, no build step, no framework, no dependencies.

## Structure

```
.
├── index.html               # homepage (hero, projects, about, contact)
├── cuerposonoro.html         # project page: CuerpoSonoro
├── universo-punzadas.html    # project page: Universo Punzadas
├── css/style.css             # single stylesheet for the whole site
├── js/
│   ├── i18n.js                # translations (ES/EN) + i18n engine
│   └── nav.js                 # nav interactions (dropdown, mobile menu, logo animation)
├── img/                       # images and SVG illustrations
├── robots.txt / sitemap.xml   # SEO
├── Dockerfile / docker-compose.yml / nginx.conf   # deployment
└── LICENSE                    # CC0
```

There is no shared layout or templating: each `.html` page repeats its own `<nav>` and `<footer>` markup. Keep that in mind when editing the nav — a change has to be applied to every page by hand (see "Adding a new project page" below).

## Local development

No build step needed. Serve the folder with any static file server, for example:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Languages

The site supports **Spanish** (default) and **English**. Translations are managed client-side with `js/i18n.js`.

- Translatable elements use `data-i18n="key"` (plain text) or `data-i18n-html="key"` (rich markup: `<em>`, `<strong>`, `<span>`, etc.) attributes
- A language toggle (ES | EN) is available in the navigation bar
- The user's language preference is saved in `localStorage`
- Every string needs **three** copies kept in sync: the Spanish fallback hardcoded in the `.html` (shown before JS runs), `TRANSLATIONS.es[key]`, and `TRANSLATIONS.en[key]` in `js/i18n.js`

To add or edit translations, update the `TRANSLATIONS` object in `js/i18n.js`.

Note: SEO metadata (`<title>`, `<meta description>`, Open Graph, JSON-LD) is only ever served in Spanish — it's hardcoded in each page's `<head>` and does not go through `i18n.js`.

## SEO

- `robots.txt` — allows all crawlers and points to the sitemap
- `sitemap.xml` — lists all pages; add a new `<url>` entry whenever you add a page
- JSON-LD structured data in each page's `<head>`
- Open Graph meta tags for social sharing

## Adding a new project page

There's a template to follow — `cuerposonoro.html` and `universo-punzadas.html` share the same structure (`.project-hero`, `.project-body` sections, `.tech-stack`, optional `.pipeline`). To add another one:

1. Copy an existing project page (e.g. `universo-punzadas.html`) as a starting point.
2. Add its translation keys to **both** the `es` and `en` blocks in `js/i18n.js`, under a short namespace (e.g. `up.*` for Universo Punzadas) to avoid collisions.
3. Link the new page from every page's nav dropdown (`.nav__dropdown` — it's duplicated per page, see "Structure" above).
4. Add a card/entry for it on the homepage (`index.html`, the "En qué ando" section).
5. Add a `<url>` entry to `sitemap.xml`.

You do **not** need to touch the `Dockerfile` — it copies `*.html` automatically.

## Deployment

The site is a static nginx container.

```bash
docker compose up -d --build
```

`nginx.conf` serves clean URLs (`/cuerposonoro` resolves to `cuerposonoro.html`), caches static assets for 30 days, and falls back unknown routes to `index.html`.

## License

[CC0 1.0](LICENSE) — public domain.

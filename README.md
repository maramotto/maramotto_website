**maramotto.com**

My personal space on the internet

## Languages

The site supports **Spanish** (default) and **English**. Translations are managed client-side with `js/i18n.js`.

- Translatable elements use `data-i18n` (text) or `data-i18n-html` (rich markup) attributes
- A language toggle (ES | EN) is available in the navigation bar
- The user's language preference is saved in `localStorage`

To add or edit translations, update the `TRANSLATIONS` object in `js/i18n.js`.

## SEO

- `robots.txt` — allows all crawlers and points to the sitemap
- `sitemap.xml` — lists all pages
- JSON-LD structured data in each page
- Open Graph meta tags for social sharing

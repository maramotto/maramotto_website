# Blog authoring workflow

1. Write the post in Spanish: `blog/posts/<date>-<slug>.es.md`.
   Required front matter: `title`, `date`, `lang: es`, `translationKey`
   (shared between the ES/EN pair), `tags`, `image`, `imageRatio`
   (`square` or `wide`), `excerpt`.
2. Add the cover image under `blog/images/<slug>/`.
3. Ask Claude to translate the post into English — it will create
   `blog/posts/<date>-<slug>.en.md` with the same `translationKey` and
   `imageRatio`, and `lang: en`.
4. Review the translation, adjust tone if needed.
5. Build locally: `cd blog && npx eleventy`.
6. Commit both language files together.

## Local development

```bash
cd blog
npm install
npm run serve   # http://localhost:8080, live-reloads on file changes
```

## Running the filter tests

```bash
cd blog
npm test
```

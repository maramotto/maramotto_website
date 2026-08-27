# B-5: Confianza — legal y prueba social — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** cerrar la exposición legal identificada en el audit (F-051) y el brand-review (3 flags), y dar los primeros pasos honestos de prueba social (F-050) — sin fabricar nada que no exista.

**Architecture:** dos páginas legales nuevas (`aviso-legal` / `legal-notice`, `privacidad` / `privacy`) usando el mismo patrón de paginación ES/EN que ya usan `index.njk`/`cuerposonoro.njk`/`universo-punzadas.njk` desde B-1. Self-hosting de fuentes: descargar los `.woff2` de Syne y DM Sans, servirlos desde `/fonts/`, quitar los `<link>` a Google — cambio de un solo punto porque desde B-2 el snippet de fuentes vive una vez en `_includes/layouts/base.njk`. Disclaimer de Universo Punzadas y atribución de la cita: ediciones de copy puntuales, en el idioma y tono ya establecidos.

**Tech Stack:** Eleventy 2.0.1 (Nunjucks + paginación), CSS, sin dependencias nuevas.

**Spec:** `website-audit.md` F-050, F-051; `brand-review.md` → "Legal and compliance flags" §1-3.

## Global Constraints

- **No fabricar prueba social.** El brand-review confirma "no testimonials exist" — inventar una cita atribuida sería peor que no tener ninguna (lo dice el propio audit: "anonymous testimonials read as invented and are worse than none"). Este plan construye la infraestructura (componente CSS) pero no rellena contenido falso.
- **No inventar la fuente de la cita de Concha Velasco.** El título de la canción y su autoría son datos verificables que Mara debe confirmar — no adivinar. Si al llegar a la Task 4 el valor sigue en `<<PENDIENTE>>`, para y pide el dato en vez de dejar la atribución como está o inventar un título.
- **No soy abogada, y este plan tampoco lo es.** El texto legal generado es un borrador razonable, no asesoría — el propio audit lo marca así (F-051, "not legal advice"). Recomienda a Mara una revisión antes de publicar si el uso comercial es real.
- No tocar `blog/deploy.sh`, `blog/publish.sh` ni `nginx.conf` (ya cachea `woff/woff2` — no hace falta tocarlo para el self-hosting de fuentes).
- `npx playwright test` en verde al final. Si alguna snapshot de `blog.spec.js-snapshots` cambia tras el self-hosting de fuentes, es señal de que el fallback de fuente difiere — no regrabes sin comparar antes/después.

---

### Task 1: Self-hosting de Google Fonts

**Files:**
- Create: `fonts/syne-400.woff2`, `fonts/syne-600.woff2`, `fonts/syne-700.woff2`, `fonts/syne-800.woff2`
- Create: `fonts/dm-sans-400.woff2`, `fonts/dm-sans-500.woff2`, `fonts/dm-sans-700.woff2`, `fonts/dm-sans-400-italic.woff2`
- Create: `css/fonts.css`
- Modify: `_includes/layouts/base.njk:31-34`
- Modify: `.eleventy.js` (passthrough copy para `fonts/`)

- [ ] **Paso 1: Descargar los `.woff2`.** La CSS de Google sirve URLs de fuente distintas según el `User-Agent` — hay que pedirla con uno moderno para obtener woff2 (no woff/ttf):

```bash
mkdir -p fonts
curl -s -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36" \
  "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap" \
  > /tmp/google-fonts.css
cat /tmp/google-fonts.css | grep -oE 'https://fonts.gstatic.com/[^)]+\.woff2'
```

Descarga cada URL listada con `curl -s -o fonts/<nombre-descriptivo>.woff2 "<url>"`, nombrando cada archivo según su familia/peso/estilo para que el CSS del Paso 2 sea legible (8 archivos: Syne 400/600/700/800, DM Sans 400/500/700/400-italic).

- [ ] **Paso 2: Escribir `css/fonts.css`** con `@font-face` para cada peso, copiando los rangos `unicode-range` del CSS descargado en el Paso 1 (Google los subdivide por script — copiar tal cual evita romper caracteres acentuados):

```css
@font-face {
  font-family: 'Syne';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/syne-400.woff2') format('woff2');
}
/* Repetir para 600, 700, 800, y las 4 variantes de DM Sans.
   Copiar el bloque unicode-range de /tmp/google-fonts.css si el
   subset original cubre latin-ext — de lo contrario, omitirlo
   (el navegador usa el archivo para todo el texto sin restricción). */
```

- [ ] **Paso 3: Actualizar `_includes/layouts/base.njk`** — quitar los `preconnect` y el `<link>` de Google, añadir el CSS local antes de `style.css`:

```diff
-  <link rel="preconnect" href="https://fonts.googleapis.com">
-  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
-  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet">
+  <link rel="preload" href="/fonts/syne-800.woff2" as="font" type="font/woff2" crossorigin>
+  <link rel="preload" href="/fonts/dm-sans-400.woff2" as="font" type="font/woff2" crossorigin>
+  <link rel="stylesheet" href="/css/fonts.css">
   <link rel="stylesheet" href="/css/style.css">
```

Los dos `preload` son las caras críticas above-the-fold: `.hero__title` usa Syne 800, el body usa DM Sans 400.

- [ ] **Paso 4: Servir `fonts/` en el build** — añadir el passthrough en `.eleventy.js` junto a los demás (`css`, `js`, `img`):

```diff
   eleventyConfig.addPassthroughCopy("css");
   eleventyConfig.addPassthroughCopy("js");
   eleventyConfig.addPassthroughCopy("img");
+  eleventyConfig.addPassthroughCopy("fonts");
   eleventyConfig.addPassthroughCopy("favicon.ico");
```

- [ ] **Paso 5: Verificar que no queda ninguna referencia a Google Fonts**

```bash
npm run build
grep -rn "fonts.googleapis.com\|fonts.gstatic.com" _site/ _includes/ css/ || echo "limpio"
ls _site/fonts/*.woff2 | wc -l
```

Esperado: "limpio", y 8 archivos `.woff2` en `_site/fonts/`.

- [ ] **Paso 6: Smoke visual** — el texto no debe saltar de fuente (FOUT) de forma distinta a antes; comparar visualmente `_site/index.html` contra la versión previa al cambio. Confirmar que `npx playwright test` no rompe ninguna snapshot existente:

```bash
npx playwright test
```

Si alguna snapshot cambia, compara el diff — un cambio de 1-2px por métricas de fuente ligeramente distintas entre el CSS de Google y el `@font-face` propio es esperable y aceptable; un salto visual grande no lo es.

- [ ] **Paso 7: Commit**

```bash
git add fonts/ css/fonts.css _includes/layouts/base.njk .eleventy.js
git commit -m "fix: self-host Syne y DM Sans, retirar Google Fonts (F-051)"
```

---

### Task 2: Disclaimer de afiliación en Universo Punzadas

**Files:**
- Modify: `_data/i18n.js` (nueva clave `up.disclaimer`, ES y EN)
- Modify: `universo-punzadas.njk`

- [ ] **Paso 1: Añadir la clave en `_data/i18n.js`**, junto a las demás claves `up.*` (buscar `'up.tagline'` en ambos bloques de idioma):

```diff
     'up.tagline':         '<em>Punzadas Sonoras</em> es mi podcast favorito: ...',
+    'up.disclaimer':      'Proyecto independiente de admiradora, sin relación oficial con <em>Punzadas Sonoras</em> ni con sus autoras.',
```

```diff
     'up.tagline':         '<em>Punzadas Sonoras</em> is my favourite podcast: ...',
+    'up.disclaimer':      'An independent fan project, unaffiliated with <em>Punzadas Sonoras</em> or its hosts.',
```

Si Mara confirma que tiene el visto bueno de Inés y Paula antes de desplegar esto, sustituye el texto por uno que lo diga — es un mensaje más fuerte y mejor contenido (ver `brand-review.md` §1). Sin confirmación, usa el texto de arriba tal cual.

- [ ] **Paso 2: Insertar en la plantilla**, justo debajo de la tagline del hero, en `universo-punzadas.njk`:

```diff
         <p class="project-hero__tagline">{{ "up.tagline" | t(lang) | safe }}</p>
+        <p class="project-hero__disclaimer">{{ "up.disclaimer" | t(lang) | safe }}</p>
         <div class="tags">
```

- [ ] **Paso 3: Estilo discreto pero legible** — añadir en `css/style.css`, cerca de `.project-hero__tagline` (`css/style.css:933-939`):

```css
.project-hero__disclaimer {
  font-size: var(--fs-xs, 0.8rem);
  color: rgba(255, 255, 255, 0.65);
  font-style: italic;
  max-width: 520px;
  margin-bottom: 1.5rem;
}
```

(Usa `--fs-xs` si B-4 ya está mergeada en esta rama; si no, el valor literal `0.8rem` de respaldo funciona igual.)

- [ ] **Paso 4: Build y verificar en ambos idiomas**

```bash
npm run build
grep -o 'project-hero__disclaimer">[^<]*' _site/universo-punzadas.html _site/en/universo-punzadas.html
```

Esperado: una línea por archivo, con el texto correspondiente a cada idioma.

- [ ] **Paso 5: Commit**

```bash
git add _data/i18n.js universo-punzadas.njk css/style.css
git commit -m "feat: disclaimer de afiliación independiente en Universo Punzadas (brand-review #1)"
```

---

### Task 3: Aviso legal y privacidad — páginas nuevas

Se construyen porque este mismo tramo de trabajo incluye B-3 (talleres), que trata los talleres como oferta real — eso activa el requisito de LSSI-CE art. 10 (`brand-review.md` §3). Si al ejecutar este plan B-3 no se ha hecho o los talleres no son comerciales, este task sigue siendo bajo riesgo (la página de privacidad es buena práctica de todas formas) pero el aviso legal pasa a ser opcional — pregunta a Mara antes de saltarlo.

**Files:**
- Create: `legal.njk` (aviso legal, slug `aviso-legal.html` / `legal-notice.html`)
- Create: `privacidad.njk` (slug `privacidad.html` / `privacy.html`)
- Create: `legal.11tydata.js`, `privacidad.11tydata.js` (igual patrón que `index.11tydata.js`)
- Modify: `_data/i18n.js` (claves `footer.legal`, `footer.privacy`)
- Modify: `_includes/partials/footer.njk`
- Modify: `sitemap.njk`

**Interfaces:**
- Consumes: el patrón de paginación de `_includes/layouts/root-page.njk` (`pagination.data: languages`, `permalink` condicionado por `lang`) — mismo mecanismo que `index.njk`.
- Produces: dos URLs nuevas por idioma (`/aviso-legal.html`, `/en/legal-notice.html`, `/privacidad.html`, `/en/privacy.html`) que Task 4 (tests) y el sitemap consumen.

- [ ] **Paso 1: `legal.njk`** — front matter igual al de `index.njk` pero con slug propio en cada idioma (los slugs no coinciden entre ES/EN, así que no puede reusar el `permalink` genérico de `root-page.njk` sin más — usa un `eleventyComputed.permalink` local... **más simple:** define el slug ya traducido como dato de paginación):

```njk
---
layout: layouts/base.njk
fullTitle: true
eleventyExcludeFromCollections: true
pagination:
  data: languages
  size: 1
  alias: lang
permalink: "{{ '/en/legal-notice.html' if lang == 'en' else '/aviso-legal.html' }}"
eleventyComputed:
  esUrl: "/aviso-legal.html"
  enUrl: "/en/legal-notice.html"
  ogLocaleAlternate: "{{ 'es_ES' if lang == 'en' else 'en_GB' }}"
---
<section class="section section--white">
  <div class="container--narrow">
    <h1>{{ "legal.title" | t(lang) }}</h1>
    <p>{{ "legal.intro" | t(lang) }}</p>
    <h2>{{ "legal.owner.title" | t(lang) }}</h2>
    <p>{{ "legal.owner.body" | t(lang) }}</p>
    <h2>{{ "legal.purpose.title" | t(lang) }}</h2>
    <p>{{ "legal.purpose.body" | t(lang) }}</p>
  </div>
</section>
```

- [ ] **Paso 2: `legal.11tydata.js`** (mismo patrón que `index.11tydata.js`, sin `structuredData` — una página legal no necesita JSON-LD):

```js
const TITLES = {
  es: "Aviso legal — maramotto",
  en: "Legal notice — maramotto",
};
const DESCRIPTIONS = {
  es: "Información legal del sitio maramotto.com.",
  en: "Legal information for maramotto.com.",
};
module.exports = {
  eleventyComputed: {
    title: (data) => TITLES[data.lang],
    description: (data) => DESCRIPTIONS[data.lang],
  },
};
```

- [ ] **Paso 3: Añadir las claves de contenido en `_data/i18n.js`** — bloque nuevo, junto a los demás bloques por página (buscar dónde termina el bloque `es` para insertar antes del cierre):

```js
'legal.title':        'Aviso legal',
'legal.intro':        'Este sitio es un proyecto personal de Mara <<PENDIENTE: apellido completo>>.',
'legal.owner.title':  'Titular',
'legal.owner.body':   'Mara <<PENDIENTE: apellido>>, contacto: hello@maramotto.com. <<PENDIENTE: ¿NIF/CIF si aplica, domicilio si los talleres presenciales lo requieren?>>',
'legal.purpose.title': 'Objeto',
'legal.purpose.body': 'maramotto.com presenta proyectos personales de arte y tecnología, y ofrece información de contacto para talleres y colaboraciones.',
```

Y su equivalente en inglés. **Los valores `<<PENDIENTE>>` son intencionados** — un aviso legal con datos identificativos incompletos no cumple su función; no los rellenes con datos inventados. Deja el sitio funcionando con el placeholder visible y avisa a Mara explícitamente de que faltan antes de desplegar esta página a producción.

- [ ] **Paso 4: `privacidad.njk` y `privacidad.11tydata.js`** — mismo patrón que legal, contenido honesto sobre lo que el sitio realmente hace (cotejar contra `README.md` § Analytics si B-6 ya está mergeada en esta rama, y contra F-051 del audit):

```njk
---
layout: layouts/base.njk
fullTitle: true
eleventyExcludeFromCollections: true
pagination:
  data: languages
  size: 1
  alias: lang
permalink: "{{ '/en/privacy.html' if lang == 'en' else '/privacidad.html' }}"
eleventyComputed:
  esUrl: "/privacidad.html"
  enUrl: "/en/privacy.html"
  ogLocaleAlternate: "{{ 'es_ES' if lang == 'en' else 'en_GB' }}"
---
<section class="section section--white">
  <div class="container--narrow">
    <h1>{{ "privacy.title" | t(lang) }}</h1>
    <p>{{ "privacy.intro" | t(lang) }}</p>
    <h2>{{ "privacy.analytics.title" | t(lang) }}</h2>
    <p>{{ "privacy.analytics.body" | t(lang) }}</p>
    <h2>{{ "privacy.storage.title" | t(lang) }}</h2>
    <p>{{ "privacy.storage.body" | t(lang) }}</p>
  </div>
</section>
```

Claves ES a añadir en `_data/i18n.js`:

```js
'privacy.title':            'Privacidad',
'privacy.intro':            'Este sitio no usa cookies ni recopila datos personales más allá de lo estrictamente necesario para funcionar.',
'privacy.analytics.title':  'Analítica',
'privacy.analytics.body':   'Se usa Umami, una herramienta de analítica sin cookies y sin datos personales, alojada en servidor propio. No se comparten datos con terceros.',
'privacy.storage.title':    'Almacenamiento local',
'privacy.storage.body':     'El sitio guarda tu idioma preferido en el almacenamiento local del navegador (localStorage). No es una cookie y no sale de tu navegador.',
```

Si B-6 (analítica) todavía no está mergeada en esta rama cuando ejecutes esta task, ajusta `privacy.analytics.body` para reflejar que la analítica está planeada, no activa — no describas una herramienta que el sitio aún no usa.

Y su equivalente en inglés.

- [ ] **Paso 5: Enlazar desde el footer** — modificar `_includes/partials/footer.njk`:

```diff
 <footer class="footer">
   &copy; 2026 <span>maramotto</span>.com &mdash;
   <span>{{ "footer.text" | t(lang) }}</span>
   {% if not isHome %}<a href="{{ '/en/' if lang == 'en' else '/' }}">{{ "footer.home" | t(lang) }}</a>{% endif %}
+  &middot; <a href="{{ '/en/legal-notice.html' if lang == 'en' else '/aviso-legal.html' }}">{{ "footer.legal" | t(lang) }}</a>
+  &middot; <a href="{{ '/en/privacy.html' if lang == 'en' else '/privacidad.html' }}">{{ "footer.privacy" | t(lang) }}</a>
 </footer>
```

Claves nuevas: `'footer.legal': 'Aviso legal'` / `'Legal notice'`, `'footer.privacy': 'Privacidad'` / `'Privacy'`.

- [ ] **Paso 6: Añadir al sitemap** — `sitemap.njk` usa un array manual de `{slug, lastmod, priority}` (mismo patrón para las 3 páginas raíz existentes). Añadir dos entradas con prioridad baja (`0.3` — páginas legales, no de conversión):

```diff
 {% set pages = [
   {slug: "", lastmod: "2026-08-26", priority: "1.0"},
   {slug: "cuerposonoro.html", lastmod: "2026-08-26", priority: "0.8"},
-  {slug: "universo-punzadas.html", lastmod: "2026-08-26", priority: "0.8"}
+  {slug: "universo-punzadas.html", lastmod: "2026-08-26", priority: "0.8"},
+  {slug: "aviso-legal.html", lastmod: "2026-08-27", priority: "0.3"},
+  {slug: "privacidad.html", lastmod: "2026-08-27", priority: "0.3"}
 ] %}
```

Nota: el bucle de `sitemap.njk` genera automáticamente la URL `/en/` de cada slug — pero los slugs EN de estas dos páginas son distintos (`legal-notice.html`, `privacy.html`), no `/en/aviso-legal.html`. Revisa el bucle: si asume `/en/{{ slug }}` literal, necesitas un campo `enSlug` opcional en cada entrada y ajustar el `{% for %}` para usarlo cuando exista. Verifica generando el sitemap y comparando con las URLs reales que produce Task 3 Paso 1/4.

- [ ] **Paso 7: Build y verificar las 4 URLs nuevas**

```bash
npm run build
ls _site/aviso-legal.html _site/en/legal-notice.html _site/privacidad.html _site/en/privacy.html
grep -c 'aviso-legal\|legal-notice\|privacidad\|privacy' _site/sitemap.xml
```

Esperado: los 4 archivos existen; el sitemap contiene las 4 URLs nuevas con el slug correcto por idioma.

- [ ] **Paso 8: Commit**

```bash
git add legal.njk privacidad.njk legal.11tydata.js privacidad.11tydata.js \
        _data/i18n.js _includes/partials/footer.njk sitemap.njk
git commit -m "feat: añadir aviso legal y política de privacidad (F-051)"
```

---

### Task 4: Atribución de la cita de Concha Velasco

**Files:**
- Modify: `blog/posts/2026-08-24-mama-quiero-ser-artista/mama-quiero-ser-artista.es.md:15`
- Modify: `blog/posts/2026-08-24-mama-quiero-ser-artista/mama-quiero-ser-artista.en.md:15` (línea equivalente)

**No adivines el título de la canción ni la autoría.** Es un dato verificable, no una inferencia de estilo — una atribución incorrecta es peor que la actual (incompleta pero honesta).

- [ ] **Paso 1: Pedir el dato antes de tocar el archivo.** Deja constancia explícita en tu respuesta: *"Necesito el título de la canción y, si lo sabes, quién la escribió (no siempre es quien la canta) antes de poder cerrar esta task."* No continúes con un valor inventado.

- [ ] **Paso 2: Una vez confirmado el título/autoría**, editar la línea 15 de ambos archivos para nombrar la canción explícitamente:

```diff
-Porque como dijo la gran Concha Velasco:
+Porque como dice <<TÍTULO DE LA CANCIÓN>>, de <<AUTOR/A>>, en la voz de la gran Concha Velasco:
```

(Ajustar la redacción al tono ya establecido del post — es una frase suelta en medio de un texto personal, no una ficha bibliográfica; que suene natural.)

- [ ] **Paso 3: Verificar que el post sigue renderizando igual** salvo esa línea

```bash
npm run build
diff <(grep -A2 "Concha Velasco" _site/blog/mama-quiero-ser-artista/index.html) /dev/null || true
```

(Comparación manual — no hay snapshot automatizado para el contenido de blockquotes individuales; revisar visualmente el post renderizado.)

- [ ] **Paso 4: Commit**

```bash
git add blog/posts/2026-08-24-mama-quiero-ser-artista/
git commit -m "fix: completar atribución de la cita de canción (brand-review #2)"
```

---

### Task 5: Prueba social — solo la ubicación, sin fabricar testimonios

El audit señala dos huecos bajo F-050: cero prueba social (no se resuelve aquí — necesita que Mara consiga una cita real de alguien, ver "Fuera de alcance") y **ausencia de ubicación**, que si es un dato que Mara puede dar, es un fix real y barato.

**Files:**
- Modify: `_data/i18n.js` (clave `about.location`, opcional)
- Modify: `index.njk` (sección `#about`)

- [ ] **Paso 1: Preguntar a Mara la ciudad/país** si no se ha dado ya en esta conversación. Si la respuesta es "prefiero no decirlo", cierra esta task sin cambios y anótalo — es una decisión legítima (el propio audit lo dice: "Some people deliberately don't [share a photo]... it's a real choice either way", mismo razonamiento aplica a la ubicación).

- [ ] **Paso 2: Si hay ubicación**, añadir una frase corta al final de la sección `#about` en `index.njk` (después de `about.p5`):

```diff
     <p class="about-text">{{ "about.p5" | t(lang) }}</p>
+    <p class="about-text about-text--location">{{ "about.location" | t(lang) }}</p>
```

Clave en `_data/i18n.js`, ES: `'about.location': 'Vivo y trabajo en <<CIUDAD>>.'`; EN: `'about.location': 'Based in <<CITY>>.'` — con el valor real, no el placeholder, una vez Mara lo confirme.

- [ ] **Paso 3: Build y commit** (solo si el Paso 1 dio una ubicación real)

```bash
npm run build
git add _data/i18n.js index.njk
git commit -m "feat: añadir ubicación a la sección Sobre mí (F-050)"
```

---

## Fuera de alcance (decidido, no olvidado)

- **Testimonios reales.** El audit es explícito: "One testimonial would do more than a page of copy... anonymous testimonials read as invented and are worse than none." Este plan no fabrica ninguno. Cuando Mara consiga una cita atribuible (un colaborador, un participante de taller, los hosts de Punzadas Sonoras si la relación lo permite), el componente a construir es sencillo — una variante de `.card` con nombre y rol — pero no antes de tener contenido real que poner en él.
- **Verificación legal formal.** El aviso legal y la privacidad de Task 3 son un borrador razonable, no una revisión de abogado. Si los talleres generan ingresos reales, recomienda a Mara una revisión profesional antes de confiar en este texto como cumplimiento.
- **CSP / cabeceras de seguridad.** Fuera de alcance de "confianza" en el sentido de este audit — es infraestructura de servidor (nginx), no de este repo.

# B-6: Instrumentar el sitio con Umami — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** medir visitas y unos pocos clics clave en maramotto.com (home, páginas de proyecto, talleres si B-3 ya está mergeada, y blog) con la instancia de Umami que ya corre en el servidor Hetzner, sin cookies, sin banner de consentimiento y sin build step nuevo.

**Architecture:** Umami ya está desplegado como servicio Docker en el mismo host que `maramotto-web` (`blog/README.md` → "Deploying" lista los servicios `universopunzadas`, `umami`, `mujereshistoria`). La integración es puramente cliente: un `<script defer>` apuntando al host de Umami. Desde B-1/B-2, **las páginas raíz y el blog comparten un único layout** (`_includes/layouts/base.njk`), así que a diferencia del plan original de 2026-08-24 (escrito cuando las 3 páginas raíz eran `.html` sueltos), el snippet solo se toca **una vez**. Los eventos de clic se declaran con `data-umami-event`, que el script de Umami detecta solo — cero JS propio.

**Tech Stack:** Eleventy 2.0.1 (Nunjucks), Playwright para e2e, sin dependencias nuevas.

**Spec:** `website-audit.md` §9 Bet 5 ("Instrument the site"); reemplaza y actualiza `docs/superpowers/plans/2026-08-24-umami.md`, cuyo contexto de repo quedó obsoleto tras B-1/B-2 (esa versión asumía `index.html`/`cuerposonoro.html`/`universo-punzadas.html` como archivos planos sin templating — ya no es así).

## Global Constraints

- Sin cookies ni almacenamiento local nuevo. No añadir banner de consentimiento.
- `data-domains="maramotto.com"` en el snippet — no debe registrar tráfico desde `localhost` ni desde la IP del servidor.
- Sin build step nuevo para nada que hoy no lo tenga.
- Un solo `data-website-id` para todo el dominio (root pages + blog).
- Nombres de evento en kebab-case y en español neutro, estables e independientes del idioma de la interfaz.
- No tocar `blog/deploy.sh`, `blog/publish.sh` ni `nginx.conf` en este plan.
- No inventar `UMAMI_SRC` ni `UMAMI_WEBSITE_ID` — son prerequisitos manuales de Mara (ver abajo). Si al empezar siguen en `<<PENDIENTE>>`, para y pide los valores antes de tocar código.

---

## Requisitos previos (manuales, antes de lanzar a un agente)

- [ ] Dar de alta `maramotto.com` en el panel de Umami (Settings → Websites → Add website; Name/Domain: `maramotto.com`). Copiar el **Website ID** (UUID).
- [ ] Anotar la URL pública del panel de Umami.
- [ ] Confirmar la ruta del script: abrir `https://<host-umami>/script.js` en el navegador — si devuelve JS, esa es la ruta (Umami v2). Si da 404, probar `/umami.js` (v1).

Valores a fijar antes de empezar:

```
UMAMI_SRC        = https://<<PENDIENTE>>/script.js
UMAMI_WEBSITE_ID = <<PENDIENTE>>
```

---

### Task 1: Snippet en el layout compartido

**Files:**
- Modify: `_includes/layouts/base.njk:33-35` (justo después de `<link rel="stylesheet" href="/css/style.css">` y antes de `</head>`)

**Interfaces:**
- Consumes: nada — es HTML estático en el `<head>`, no depende de ninguna variable de plantilla.
- Produces: el script se renderiza en **toda** página que use `layouts/base.njk` — root pages (vía `layouts/root-page.njk` que extiende `base.njk`... revisar: en este repo `root-page.njk` fija `layout: layouts/base.njk` en su propio front matter, así que ambos comparten `base.njk` directamente), blog listings, posts, tags, feeds.

- [ ] **Paso 1: Insertar el snippet**

```njk
  <link rel="stylesheet" href="/css/style.css">
  {% if blogAssets %}<link rel="stylesheet" href="/css/blog.css">{% endif %}
  <!-- Analytics (Umami, sin cookies) -->
  <script defer src="UMAMI_SRC"
          data-website-id="UMAMI_WEBSITE_ID"
          data-domains="maramotto.com"></script>
</head>
```

Sustituye `UMAMI_SRC` y `UMAMI_WEBSITE_ID` por los valores reales fijados arriba.

- [ ] **Paso 2: Build y verificar cobertura**

```bash
npm run build
grep -rlc 'data-website-id' _site --include='*.html' | wc -l
find _site -name '*.html' | wc -l
```

Esperado: los dos números coinciden — el script sale en cada HTML generado (home ES/EN, cuerposonoro ES/EN, universo-punzadas ES/EN, blog index ES/EN, cada post, cada página de tag, sitemap no cuenta porque `layout: false`).

- [ ] **Paso 3: Commit**

```bash
git add _includes/layouts/base.njk
git commit -m "feat: instrumentar el sitio con Umami (pageviews, sin cookies)"
```

---

### Task 2: Eventos de clic en CTAs de proyectos y contacto

Umami dispara un evento en cualquier elemento con `data-umami-event`, sin JS propio. `t()` (el filtro de i18n) escribe `textContent` vía Nunjucks en build time, así que conviven sin conflicto con cualquier atributo estático.

**Files:**
- Modify: `index.njk`
- Modify: `cuerposonoro.njk`
- Modify: `universo-punzadas.njk`

**Interfaces:**
- Consumes: nada nuevo — son atributos añadidos a elementos `<a>` ya existentes.
- Produces: atributos `data-umami-event="<nombre>"` que Task 3 verifica están presentes.

- [ ] **Paso 1: `index.njk`** — localizar por `href`/clase (no por número de línea, puede haber cambiado) y añadir:

| Elemento (buscar por) | Atributo a añadir |
|---|---|
| `<a href="/cuerposonoro.html" class="btn btn--primary btn--small">` | `data-umami-event="proyecto-cuerposonoro"` |
| `<a href="/universo-punzadas.html" class="card__link">` | `data-umami-event="proyecto-universo-punzadas"` |
| `<a href="mailto:hello@maramotto.com" class="btn btn--primary">` (sección contacto) | `data-umami-event="contacto-email"` |
| `<a href="https://github.com/maramotto" class="social-link">` | `data-umami-event="social-github"` |
| `<a href="https://www.linkedin.com/in/mara-crespo/" class="social-link">` | `data-umami-event="social-linkedin"` |

No instrumentes los enlaces del `<nav>` ni el dropdown — ruido, y la navegación ya se ve en pageviews.

- [ ] **Paso 2: `cuerposonoro.njk` y `universo-punzadas.njk`** — localizar los `mailto:` y los enlaces externos (repo/demo) y aplicar:
      - `mailto:` → `data-umami-event="contacto-email"`
      - enlace a GitHub del proyecto → `data-umami-event="codigo-cuerposonoro"` / `data-umami-event="codigo-universo-punzadas"`
      - enlace a la demo/web del proyecto → `data-umami-event="demo-cuerposonoro"` / `data-umami-event="demo-universo-punzadas"`

- [ ] **Paso 3: Verificar que no hay duplicados con significado distinto**

```bash
npm run build
grep -rho 'data-umami-event="[^"]*"' _site/*.html _site/en/*.html 2>/dev/null | sort | uniq -c
```

Cada nombre debe apuntar siempre al mismo tipo de acción en ambos idiomas (el atributo es estático, así que `contacto-email` debe salir el mismo número de veces en `_site/index.html` y `_site/en/index.html`).

- [ ] **Paso 4: Commit**

```bash
git add index.njk cuerposonoro.njk universo-punzadas.njk
git commit -m "feat: eventos de Umami en CTAs de proyectos y contacto"
```

---

### Task 3: Test E2E que protege el snippet y los eventos

**Files:**
- Create: `tests/e2e/analytics.spec.js`

- [ ] **Paso 1: Escribir el test**

```js
const { test, expect } = require("@playwright/test");

const WEBSITE_ID = "UMAMI_WEBSITE_ID"; // sustituir por el valor real fijado en este plan

const PAGES = [
  "/",
  "/en/",
  "/cuerposonoro.html",
  "/en/cuerposonoro.html",
  "/universo-punzadas.html",
  "/en/universo-punzadas.html",
  "/blog/",
  "/blog/en/",
  "/blog/hola-mundo/",
];

for (const path of PAGES) {
  test(`${path} carga el script de Umami`, async ({ page }) => {
    await page.goto(path);
    const script = page.locator("script[data-website-id]");
    await expect(script).toHaveCount(1);
    await expect(script).toHaveAttribute("data-website-id", WEBSITE_ID);
    await expect(script).toHaveAttribute("data-domains", "maramotto.com");
  });
}

test("los CTA de la home tienen evento", async ({ page }) => {
  await page.goto("/");
  for (const name of [
    "proyecto-cuerposonoro",
    "proyecto-universo-punzadas",
    "contacto-email",
    "social-github",
    "social-linkedin",
  ]) {
    await expect(page.locator(`[data-umami-event="${name}"]`)).toHaveCount(1);
  }
});
```

- [ ] **Paso 2: Levantar el contenedor y correr el test**

```bash
docker compose up -d --build
npx playwright test tests/e2e/analytics.spec.js
```

Esperado: todos en verde. Si el test de `data-domains` falla en alguna página, falta el snippet ahí — revisa que esa página realmente use `layouts/base.njk`.

- [ ] **Paso 3: Confirmar que la suite existente sigue pasando**

```bash
npx playwright test
```

El snippet no debería mover ningún píxel (`defer`, no bloquea render). **Si alguna captura de `blog.spec.js-snapshots` falla, para y avisa** — significaría que el script afecta al layout.

- [ ] **Paso 4: Commit**

```bash
git add tests/e2e/analytics.spec.js
git commit -m "test: cobertura e2e del snippet y eventos de Umami"
```

---

### Task 4: Documentar

**Files:**
- Modify: `README.md`

- [ ] **Paso 1:** añadir una sección `## Analytics` después de `## SEO`:

```markdown
## Analytics

El sitio usa [Umami](https://umami.is) self-hosted (mismo servidor, servicio
`umami`). Sin cookies y sin datos personales, por eso no hay banner de
consentimiento.

El snippet vive una sola vez en `_includes/layouts/base.njk` — desde B-1/B-2
las páginas raíz y el blog comparten layout, así que no hay que duplicarlo
por archivo. `tests/e2e/analytics.spec.js` falla si el snippet desaparece de
alguna página generada.

`data-domains="maramotto.com"` hace que el script no envíe nada desde
`localhost`, así que el desarrollo local no ensucia las métricas.

Para medir un clic nuevo, añade `data-umami-event="nombre-del-evento"` al
elemento. No hace falta JavaScript. Nombres en kebab-case y en español,
independientes del idioma de la interfaz.
```

- [ ] **Paso 2:** en la sección "Adding a new project page", añadir al listado: *"El snippet de Umami ya viene incluido vía `base.njk` — no hay que copiarlo. Si el CTA principal de la página nueva merece su propio evento, añade `data-umami-event` siguiendo la tabla de Task 2 de este plan."*

- [ ] **Paso 3: Commit**

```bash
git add README.md
git commit -m "docs: documentar analytics con Umami"
```

---

### Task 5: Desplegar y verificar en producción

- [ ] **Paso 1: Desplegar**

```bash
./blog/deploy.sh
```

- [ ] **Paso 2: Verificar que el script se sirve**

```bash
curl -sI https://<host-umami>/script.js | head -1
```

Esperado: `HTTP/2 200`.

- [ ] **Paso 3: Verificación manual en el navegador** (la hace Mara, no el agente):
      1. Abrir `https://maramotto.com` en ventana normal (sin bloqueador agresivo).
      2. DevTools → Network → filtrar `script.js`: 200, y al cargar debe salir un POST a `/api/send`.
      3. Panel de Umami → Realtime: la visita debe aparecer en segundos.
      4. Pulsar "Escríbeme" → Umami → Events debe registrar `contacto-email`.
      5. Visitar `https://maramotto.com/blog/` y confirmar que también registra.

- [ ] **Paso 4:** si Realtime no muestra nada pero el script carga 200, revisar en orden: (a) `data-website-id` coincide exactamente con el panel, (b) el dominio dado de alta en Umami es `maramotto.com` y coincide con `data-domains`, (c) no hay bloqueador de anuncios activo en el navegador de prueba.

---

## Fuera de alcance (decidido, no olvidado)

- **Proxy del script bajo `maramotto.com`** para esquivar bloqueadores — añade nginx y superficie de rotura; siguiente palanca si las cifras parecen bajas.
- **Evento del toggle ES/EN** — desde B-1 el toggle cambia de URL de verdad (`/en/...`), así que ya es un pageview distinto; no hace falta evento adicional.
- **Aviso de privacidad** — cubierto en B-5 (confianza), no en este plan.

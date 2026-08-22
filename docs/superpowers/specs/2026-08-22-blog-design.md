# Diseño: Blog para maramotto.com

**Fecha:** 2026-08-22
**Rama:** `feature/blog`
**Estado:** Aprobado para implementación

## Contexto

maramotto.com es hoy un sitio 100% estático (HTML/CSS/JS vanilla, sin
build), bilingüe ES/EN mediante reescritura de texto en cliente
(`js/i18n.js`, objeto `TRANSLATIONS` + atributos `data-i18n`), servido
por nginx dentro de un contenedor Docker (`Dockerfile` copia los
archivos tal cual). Las páginas de proyecto (`cuerposonoro.html`) son
HTML escrito a mano.

Se quiere añadir un blog con una mezcla de artículos largos y notas
cortas, publicado con cierta frecuencia. Escribir cada post a mano en
HTML (como `cuerposonoro.html`) sería tedioso y duplicaría mucho
boilerplate (nav, SEO, i18n) en cada publicación.

El patrón de i18n actual (reescritura de texto en la misma URL) no es
viable para contenido largo: duplicaría el post completo en el HTML
servido y mezclaría dos idiomas bajo una sola URL indexable, dañando
el SEO. El blog necesita, por tanto, un patrón distinto: **una URL por
idioma**, con las dos versiones de un post enlazadas mediante un
identificador compartido.

## Objetivo

Añadir un blog en `/blog/` que permita:
- Publicar posts en Markdown (mezcla de artículos largos y notas
  cortas) sin escribir HTML a mano por publicación.
- Escribir cada post en español y generar su traducción al inglés
  como paso de autoría asistido por IA (sin llamadas a APIs de
  traducción en el build, sin secretos que gestionar).
- Acompañar cada post de una imagen de portada, en formato cuadrado o
  16:9 a elección del autor.
- Filtrar posts por tags libres y navegar por fecha.
- Ofrecer feed RSS por idioma.
- Mantener el resto del sitio (`index.html`, `cuerposonoro.html`)
  exactamente como está hoy: sin build, sin cambios de comportamiento.

## Fuera de alcance

- Comentarios o cualquier interactividad server-side (el sitio sigue
  sin backend).
- CMS o interfaz de administración: los posts se escriben como
  archivos Markdown en el repo.
- Traducción automática vía API en tiempo de build.
- Cambios de diseño/estilo fuera de lo necesario para el blog (no se
  toca la home ni `cuerposonoro.html` más allá de añadir el enlace de
  navegación).

## Arquitectura general

[Eleventy (11ty)](https://www.11ty.dev/) construye el contenido de
`blog/` (Markdown + plantillas Nunjucks) a HTML estático en tiempo de
build. Eleventy es un generador ligero en Node sin framework de
frontend — su salida es HTML plano, coherente con el resto del sitio,
que no usa ningún framework de UI.

El resto del sitio no pasa por ningún build: `index.html` y
`cuerposonoro.html` se siguen copiando tal cual en el `Dockerfile`,
sin cambios de comportamiento ni de proceso.

## Estructura de directorios

```
blog/
  posts/
    2026-08-22-mi-primer-post.es.md
    2026-08-22-mi-primer-post.en.md
  _includes/
    layouts/
      post.njk          # plantilla de un post individual
      list.njk           # plantilla del listado / tags
    partials/
      nav.njk             # mismo markup que el nav de index.html/cuerposonoro.html
  images/
    2026-08-22-mi-primer-post/
      cover.jpg
  .eleventy.js            # config: colecciones, permalinks, plugin RSS
  package.json             # dependencia de @11ty/eleventy y plugin RSS
```

La salida de Eleventy va a `blog/_site/` (directorio de build, no se
comitea — se añade a `.gitignore`).

## Modelo de contenido (front matter)

Cada post existe como **dos archivos Markdown pareados**, uno por
idioma, compartiendo un `translationKey`:

```yaml
---
title: "Título del post"
date: 2026-08-22
lang: es                      # "es" o "en"
translationKey: mi-primer-post   # mismo valor en ambas versiones del post
tags: ["nota", "creative-coding"]
image: "/blog/images/mi-primer-post/cover.jpg"
imageRatio: square             # "square" (1:1) o "wide" (16:9)
excerpt: "Resumen corto para el listado y las meta tags."
---

Contenido del post en Markdown...
```

`translationKey` es el campo clave: permite que Eleventy empareje la
versión ES y EN de un mismo post para generar los enlaces cruzados del
selector de idioma (ver sección de navegación).

## URLs

- Listado: `/blog/` (ES, idioma por defecto del sitio) y `/blog/en/`
  (EN).
- Post: `/blog/<slug>/` (ES) y `/blog/en/<slug>/` (EN).
- Tags: `/blog/tags/<tag>/` (generado automáticamente por Eleventy
  vía `pagination` sobre la colección de tags, patrón estándar de
  11ty).
- Feed RSS: `/blog/feed.xml` (ES) y `/blog/en/feed.xml` (EN).

Las URLs limpias ya funcionan con la configuración actual de nginx
(`try_files $uri $uri.html $uri/ =404`), no requiere cambios en
`nginx.conf`.

## Flujo de traducción (autoría asistida por IA)

1. El post se escribe en español: `blog/posts/<slug>.es.md`.
2. Se pide a Claude que traduzca el post; genera
   `blog/posts/<slug>.en.md` con el mismo `translationKey`, mismo
   front matter salvo `lang` (y `tags`/`title`/`excerpt` traducidos).
3. La persona autora revisa y ajusta la traducción antes de comitear.

No hay llamadas a APIs de traducción externas durante el build, ni
claves/secretos que gestionar en el despliegue. El build de Eleventy
es determinista y offline.

## Imagen de portada

Campo `image` (ruta) + `imageRatio: square|wide` en el front matter.
Las plantillas (`post.njk`, `list.njk`) y `css/blog.css` aplican:

- `aspect-ratio: 1 / 1` (square) o `aspect-ratio: 16 / 9` (wide).
- `object-fit: cover`.
- `width`/`height` explícitos en el `<img>` para evitar layout shift
  (CLS).
- `loading="lazy"` en las imágenes del listado y de posts
  relacionados; la imagen de portada del post individual (visible
  above-the-fold) puede ir `loading="eager"` +
  `fetchpriority="high"` si es la imagen principal de la página.

## Navegación e i18n de interfaz

- El nav global (markup compartido entre `index.html` y
  `cuerposonoro.html`, gestionado por `js/nav.js`) gana un enlace
  **"Blog"** → `/blog/` (versión ES, idioma por defecto del sitio).
- Dentro de las páginas del blog, el botón de idioma reutiliza el
  mismo componente visual (`.lang-toggle__btn`) pero **no** usa
  `window.i18n.setLang()` — en vez de reescribir texto en la misma
  URL, navega a la URL hermana del post/listado actual. Eleventy
  inyecta esa URL en el HTML generado (ej. atributos `data-href-es` /
  `data-href-en` en los botones), resuelta a partir del
  `translationKey` en tiempo de build.
- Los textos fijos de interfaz del blog ("Volver al blog", "Leer
  más", "X min de lectura", etc.) viven directamente en las
  plantillas Nunjucks, ya en el idioma correspondiente — no pasan por
  el objeto `TRANSLATIONS` de `js/i18n.js`, porque Eleventy ya genera
  cada página HTML en su idioma final.

## Listado, tags y RSS

- Colección Eleventy `posts`, filtrable por `lang`; cada listado
  (`/blog/` y `/blog/en/`) muestra solo los posts de su propio
  idioma.
- Filtro por tag mediante páginas generadas automáticamente
  (`/blog/tags/<tag>/`), patrón estándar de paginación sobre tags de
  11ty.
- Cada tarjeta del listado muestra: imagen de portada, título, fecha,
  tags (badges) y excerpt.
- RSS con el plugin oficial `@11ty/eleventy-plugin-rss`: un feed por
  idioma (`/blog/feed.xml`, `/blog/en/feed.xml`).

## SEO

- Cada post y cada listado llevan su propio `<title>`, meta
  description, `<link rel="canonical">`, Open Graph (`og:type:
  article` para posts) y JSON-LD `BlogPosting`, siguiendo el mismo
  patrón que ya usa `cuerposonoro.html` para `SoftwareApplication`.
- Se genera `blog-sitemap.xml` con Eleventy (el contenido del blog
  cambia con frecuencia, a diferencia del `sitemap.xml` estático
  actual, que se mantiene a mano para las páginas fijas). Se añade una
  referencia a `blog-sitemap.xml` en `robots.txt`.

## Estilo visual

- Reutiliza `css/style.css` (tipografía Syne/DM Sans, paleta y
  variables existentes).
- Nuevo `css/blog.css` con estilos específicos: cards del listado,
  tipografía de artículo largo, badges de tags, aspect-ratio de
  imagen de portada.

## Cambios de despliegue (Docker)

`Dockerfile` pasa a **multi-stage build**:

```dockerfile
FROM node:20-alpine AS blog-build
WORKDIR /blog
COPY blog/ .
RUN npm ci && npx eleventy

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html cuerposonoro.html robots.txt sitemap.xml /usr/share/nginx/html/
COPY img/ /usr/share/nginx/html/img/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY --from=blog-build /blog/_site/blog/ /usr/share/nginx/html/blog/
```

El resto del sitio sigue siendo estático puro; solo `blog/` pasa por
un paso de build. `nginx.conf` no necesita cambios.

## Testing

Según las reglas de testing web del proyecto:

- **Visual regression:** capturas Playwright en 320/768/1024/1440 del
  listado (`/blog/`) y de un post de ejemplo con imagen cuadrada, y
  otro con imagen 16:9.
- **Accesibilidad:** contraste, navegación por teclado, foco visible
  en tarjetas del listado y en el selector de idioma.
- **Performance:** Lighthouse en `/blog/` y en un post individual,
  contra los objetivos de Core Web Vitals ya definidos para el sitio.
- **Funcional:** verificar que el toggle ES/EN dentro del blog navega
  correctamente entre la URL ES y EN de un mismo post (usando
  `translationKey`), no que reescribe texto in-place.

## Riesgos y decisiones abiertas

- **Tamaño del build:** cada build de Docker ahora requiere una etapa
  Node adicional. Impacto aceptado dado que sigue siendo un build
  multi-stage estándar, sin afectar el runtime (la imagen final sigue
  siendo `nginx:alpine` sirviendo archivos estáticos).
- **Calidad de la traducción asistida por IA:** al ser un paso manual
  revisado por la autora antes de comitear, el riesgo de traducciones
  de baja calidad publicadas sin revisión es bajo, pero depende de que
  el paso de revisión se siga en cada post.

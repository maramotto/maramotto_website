# B-4: Sistema de diseño — tokens y consistencia de UI — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** consolidar F-017 (tipografía), F-018 (color), F-019 (iconografía) y F-020 (cards blanco-sobre-blanco) del audit, más B05/B06/B08/B15 del brand-review (casing), en un pase de disciplina visual — sin rediseñar nada, sin arte nuevo, sin tocar copy salvo casing.

**Architecture:** el sitio ya tiene un sistema de tokens de color en `css/style.css:9-28` (`:root`), bien usado (cero hex crudo en reglas de componente, verificado por el audit). Este plan lo extiende con una escala tipográfica siguiendo el mismo patrón, corrige dos usos de color que fallan contraste (F-001, F-030 — mismo token, `--yellow`, mal aplicado sobre fondos claros), y aplica arreglos mecánicos de CSS/copy que no requieren arte nuevo. **No** hace la migración completa de las ~17 tallas tipográficas existentes a los tokens nuevos — el propio audit desaconseja el big-bang y pide migrar "según se toque cada componente" (F-017, "Implementation notes"); este plan introduce la escala y la aplica solo donde ya está tocando CSS por otro motivo.

**Tech Stack:** CSS puro (custom properties), Nunjucks para las cadenas i18n en `_data/i18n.js`.

**Spec:** `website-audit.md` F-017, F-018, F-019, F-020, F-001, F-030; `brand-review.md` B05, B06, B08, B15.

## Global Constraints

- No fabricar artwork nuevo (los dos SVG de iconos que F-019 pide comisionar están fuera de alcance — solo el arreglo interino de alineación).
- No tocar el contenido/copy salvo los 7 strings de casing identificados abajo — nada de reescribir frases.
- No migrar las ~17 tallas tipográficas existentes de golpe — solo introducir la escala y usarla en lo que este plan ya toca.
- Cualquier cambio de color debe verificarse por contraste (WCAG AA: 4.5:1 texto normal, 3:1 texto grande ≥18.66px bold / ≥24px regular) antes de commitear.
- `npm run test:unit` en verde tras cada tarea que toque `eleventy/filters/`. `npx playwright test` en verde al final — si alguna snapshot de `blog.spec.js-snapshots` cambia, es señal de regresión visual no buscada: para y avisa, no regrabes sin mirar el diff.

---

### Task 1: Escala tipográfica — introducir tokens, sin migrar lo existente

**Files:**
- Modify: `css/style.css:9-28` (bloque `:root`)

**Interfaces:**
- Produces: 8 custom properties nuevas (`--fs-xs` … `--fs-3xl`) que las Tasks 3-4 de este plan usan para los componentes que sí tocan.

- [ ] **Paso 1: Añadir la escala al `:root`**, ratio 1.25 (major third), ancla en `1rem` = el tamaño base de `.hero__description`/body copy:

```css
:root {
  --yellow: #FFD93D;
  --yellow-light: #FFF3C4;
  --yellow-muted: #E8CC4A;
  --yellow-deep: #8A6A00; /* únicamente para texto sobre fondos claros (cream/white) — --yellow normal falla contraste ahí, ver F-001 */
  --purple: #7B2D8E;
  --purple-dark: #5C1F6A;
  --purple-light: #F3E8F9;
  --teal: #1E6B7B;
  --teal-dark: #155460;
  --teal-light: #E6F3F5;
  --dark: #1A1A2E;
  --text: #2D2D3A;
  --text-light: #6B6B80;
  --white: #FFFEF8;
  --cream: #FDF5E6;
  --cream-dark: #F7ECDA;

  /* Type scale — ratio 1.25. Introducida en B-4; migrar el resto de la
     hoja de estilos "según se toque", no de golpe (ver website-audit.md F-017). */
  --fs-xs: 0.8rem;
  --fs-sm: 0.9rem;
  --fs-base: 1rem;
  --fs-md: 1.15rem;
  --fs-lg: 1.35rem;
  --fs-xl: 1.8rem;
  --fs-2xl: 2.5rem;
  --fs-3xl: 3.5rem;
}
```

Nota: `--blue-light`, `--blue`, `--blue-dark` (antes en `:root`) se eliminan en este paso — grep confirma cero usos (`grep -rn "var(--blue" css/`). Si el grep de verificación del Paso 2 encuentra algún uso, no los borres; documenta en un comentario para qué estaban reservados en su lugar.

- [ ] **Paso 2: Verificar que no queda ninguna referencia a los tokens azules eliminados**

```bash
grep -rn "var(--blue" css/
```

Esperado: sin resultados.

- [ ] **Paso 3: Build y smoke visual**

```bash
npm run build
npx playwright test tests/e2e/root-pages.spec.js
```

Esperado: verde — este paso solo añade tokens, no cambia ningún valor computado todavía.

- [ ] **Paso 4: Commit**

```bash
git add css/style.css
git commit -m "feat: introducir escala tipográfica y --yellow-deep, retirar tokens azules sin uso"
```

---

### Task 2: F-001 y F-030 — corregir los dos usos de `--yellow` que fallan contraste

**Files:**
- Modify: `css/style.css:439` (`.hero__title`)
- Modify: `css/style.css:946-949` (`.project-hero .tag`)

**Interfaces:**
- Consumes: `--yellow-deep` de Task 1.

- [ ] **Paso 1: `.hero__title` (F-001, 1.27:1 sobre `--cream`)** — cambiar a `--yellow-deep`:

```css
.hero__title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2.2rem, 8vw, 5.5rem);
  font-weight: 800;
  color: var(--yellow-deep);
  line-height: 1;
  margin-bottom: 1rem;
  letter-spacing: -0.03em;
  position: relative;
  z-index: 1;
  overflow-wrap: break-word;
}
```

- [ ] **Paso 2: `.project-hero .tag` (F-030, 3.40:1 sobre `--teal-dark`)** — `--yellow-deep` es para fondos *claros*, no sirve aquí (fondo oscuro). Usar `--white`, consistente con el resto de texto secundario del `.project-hero` (`.hero-stat__label`, `.project-hero__tagline` ya usan blanco a distinta opacidad):

```css
.project-hero .tag {
  background: var(--teal-dark);
  color: var(--white);
  border-color: rgba(255, 255, 255, 0.15);
}
```

- [ ] **Paso 3: Verificar contraste con un cálculo directo** (no hace falta herramienta externa — fórmula de luminancia relativa WCAG):

```bash
node -e "
function lum(hex) {
  const [r,g,b] = hex.match(/\w\w/g).map(h => {
    const c = parseInt(h,16)/255;
    return c <= 0.03928 ? c/12.92 : ((c+0.055)/1.055)**2.4;
  });
  return 0.2126*r + 0.7152*g + 0.0722*b;
}
function ratio(a,b) {
  const [l1,l2] = [lum(a), lum(b)].sort((x,y)=>y-x);
  return (l1+0.05)/(l2+0.05);
}
console.log('hero__title (yellow-deep on cream):', ratio('8A6A00','FDF5E6').toFixed(2));
console.log('project-hero .tag (white on teal-dark):', ratio('FFFEF8','155460').toFixed(2));
"
```

Esperado: ambos ≥ 4.5. Si `hero__title` no llega, oscurece `--yellow-deep` (p.ej. `#7A5C00`) y repite el cálculo antes de continuar.

- [ ] **Paso 4: Smoke visual y commit**

```bash
npm run build
npx playwright test tests/e2e/root-pages.spec.js
git add css/style.css
git commit -m "fix: contraste de --yellow sobre cream y teal-dark (F-001, F-030)"
```

---

### Task 3: F-020 — las cards dejan de ser blanco-sobre-blanco

**Files:**
- Modify: `css/style.css:494-502` (`.card`)

**Interfaces:**
- Consumes: nada nuevo.
- Produces: `.card` con fondo distinguible; `.tag` (que hereda el `background: var(--white)` de `css/style.css:582`) queda automáticamente con contraste al estar dentro de una card `--cream` — no toca `.tag` directamente.

- [ ] **Paso 1: Cambiar el fondo de `.card`** — mismo valor que ya usa `.skill-card` en la sección inmediatamente inferior de la misma página (prueba de que el ajuste no desentona):

```css
.card {
  background: var(--cream);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  transition: all 0.35s;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}
```

- [ ] **Paso 2: Verificar visualmente que `.card__icon--purple`/`--yellow` y `.tag` siguen legibles** sobre el nuevo fondo `--cream` — ambos ya usan colores con contraste propio (`--purple-light`/`--yellow-light` de fondo con texto oscuro; `.tag` blanco con borde sutil), así que deberían mejorar, no empeorar. Confirmar con capturas:

```bash
npm run build
npx playwright test tests/e2e/root-pages.spec.js --update-snapshots=none
```

Abrir `_site/index.html` en un navegador y mirar la sección `#projects` — las cards de Estratos y Universo Punzadas deben tener un borde visual claro contra el fondo blanco de la sección, sin necesidad de hover.

- [ ] **Paso 3: Commit**

```bash
git add css/style.css
git commit -m "fix: fondo cream en .card para separarla visualmente de la sección (F-020)"
```

---

### Task 4: F-019 — arreglo interino de alineación en el grid de skills

El arreglo real (dos SVG nuevos a juego con `skill-code.svg`/`skill-music.svg`/`skill-visual.svg`) necesita arte que este plan no puede producir. Se aplica el arreglo interino que el audit describe explícitamente: dar a `.skill-card__emoji` la misma caja que `.skill-card__img`, para que las cinco cards del grid compartan línea base.

**Files:**
- Modify: `css/style.css:733-737` (`.skill-card__emoji`)

- [ ] **Paso 1: Igualar la caja**

```css
.skill-card__emoji {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin: 0 auto 1.2rem;
  font-size: 3rem;
}
```

- [ ] **Paso 2: Verificar visualmente** — abrir `_site/index.html`, sección "Lo que hago": las cinco `.skill-card__h3` deben alinearse en la misma línea horizontal ahora. Antes del cambio no lo hacían (diferencia de ~43px, ver F-019).

- [ ] **Paso 3: Commit**

```bash
git add css/style.css
git commit -m "fix: alinear iconos emoji con los SVG en el grid de skills (F-019, arreglo interino)"
```

Deja constancia en el mensaje de commit o en un comentario CSS de que el arreglo definitivo (dos SVG nuevos) sigue pendiente de arte — no lo cierres como resuelto en el audit tracker sin decirlo.

---

### Task 5: Casing consistency — B05, B06, B08, B15 del brand-review

**Files:**
- Modify: `_data/i18n.js`

- [ ] **Paso 1: B05 — sentence case en títulos de skill cards (ES, líneas 57-65)**

```diff
-    'skill.code.title':       'Código y Software',
+    'skill.code.title':       'Código y software',
-    'skill.music.title':      'Música y Audio',
+    'skill.music.title':      'Música y audio',
     'skill.techart.title':    'Instalaciones tech-art',
-    'skill.visual.title':     'Arte Visual',
+    'skill.visual.title':     'Arte visual',
     'skill.workshops.title':  'Talleres',
```

- [ ] **Paso 2: B05 + B15 — mismo cambio en EN (líneas 318-326), y "&" → "and" (B15)**

```diff
-    'skill.code.title':       'Code & Software',
+    'skill.code.title':       'Code and software',
-    'skill.music.title':      'Music & Audio',
+    'skill.music.title':      'Music and audio',
     'skill.techart.title':    'Tech-art installations',
-    'skill.visual.title':     'Visual Art',
+    'skill.visual.title':     'Visual art',
     'skill.workshops.title':  'Workshops',
```

- [ ] **Paso 3: B06 — "Live Demo" → "Live demo" (EN, línea 455)**

```diff
-    'cs.code.demo':       'Live Demo',
+    'cs.code.demo':       'Live demo',
```

(La versión ES en línea 194, `'Demo en vivo'`, ya está en minúsculas — no toca.)

- [ ] **Paso 4: B08 — "Creative Coding" en minúsculas dentro de prosa española (línea 58)**. La etiqueta (`featured.tag.creative`, líneas 24 y 285) se queda tal cual — es un tag/badge, no prosa, y Title Case es razonable ahí en ambos idiomas:

```diff
-    'skill.code.desc':        'Desarrollo de software e IA, aplicaciones web, análisis de datos, creative coding.',
+    'skill.code.desc':        'Desarrollo de software e IA, aplicaciones web, análisis de datos, creative coding.',
```

Confirmar que ya está en minúsculas en el archivo actual — si el grep de verificación (Paso 5) lo encuentra ya correcto, no hay diff que hacer aquí; el hallazgo B08 puede estar ya resuelto de una pasada anterior.

- [ ] **Paso 5: Verificar que no quedan mezclas de casing en los strings tocados**

```bash
grep -n "'skill\.\(code\|music\|visual\)\.title'\|'cs\.code\.demo'" _data/i18n.js
```

Revisar a ojo: los 3 títulos de skill deben leer en sentence case en ambos idiomas, `cs.code.demo` debe leer "Live demo" en EN.

- [ ] **Paso 6: Test unitario del filtro `t` sigue en verde** (los strings cambiaron de valor, no de clave, así que no debería romper nada, pero confírmalo):

```bash
npm run test:unit
```

- [ ] **Paso 7: Rebuild y smoke test**

```bash
npm run build
npx playwright test tests/e2e/root-pages.spec.js
```

- [ ] **Paso 8: Commit**

```bash
git add _data/i18n.js
git commit -m "fix: unificar sentence case en títulos de skills y CTA de demo (brand-review B05/B06/B08/B15)"
```

---

## Fuera de alcance (decidido, no olvidado)

- **Migración completa de las ~17 tallas tipográficas a la escala nueva** — el audit pide hacerlo oportunistamente, no de golpe. Queda para cuando se toque cada componente por otro motivo (p.ej. al construir la página de talleres en B-3, usar `--fs-*` en vez de literales nuevos).
- **Dos SVG nuevos para tech-art/talleres** (arreglo definitivo de F-019) — necesita arte, no código. Pídelo a Mara como tarea aparte.
- **B01, B02, B03, B04, B07, B09-B14, B16, B17 del brand-review** — no son de casing/consistencia mecánica; B03 (copy de talleres) está cubierto por B-3, el resto queda fuera de este plan.

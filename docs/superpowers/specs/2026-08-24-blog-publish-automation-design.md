# Diseño: Publicación autónoma de posts del blog

**Fecha:** 2026-08-24
**Rama:** `master` (se implementa directamente; no es contenido del blog)
**Estado:** Aprobado para implementación

## Contexto

El blog de maramotto.com usa el flujo de "una carpeta por post"
(`blog/posts/<fecha>-<slug>/<slug>.es.md`, `<slug>.en.md`,
`cover.<ext>`) descrito en `blog/README.md` y en
`2026-08-22-blog-design.md`. Hasta ahora, la traducción al inglés y el
despliegue (`./blog/deploy.sh`) dependían de pedírselo a Claude en una
sesión de chat: la autora escribía el texto en español y la imagen, y
Claude generaba la carpeta completa, traducía, verificaba y desplegaba.

La autora quiere dejar de depender de esa sesión de chat para publicar.
Quiere poder abrir una rama, meter su texto en español y la imagen,
commitear, pushear, y ejecutar un único comando que genere la
traducción al inglés y publique el post, sin intervención de Claude en
el momento de publicar.

No existe todavía ningún pipeline de CI/CD en este repo
(`.github/workflows` no existe). El despliegue actual es enteramente
manual: `./blog/deploy.sh`, ejecutado desde el Mac de la autora, hace
push a `origin/master` y luego SSH **como root** al servidor Hetzner
usando su clave personal (`~/.ssh/id_ed25519`) para reconstruir y
recrear el contenedor Docker. Esa clave nunca sale de su máquina hoy.

## Objetivo

Añadir `blog/publish.sh`, un script bash que, ejecutado desde una rama
de trabajo con un post nuevo ya commiteado:

1. Detecta qué post(s) de esa rama no tienen todavía su `.en.md`.
2. Traduce título, excerpt, tags y cuerpo de cada uno usando el CLI
   `claude` ya instalado en la máquina de la autora (sin API keys
   nuevas que gestionar).
3. Enseña el resultado y pide confirmación antes de continuar.
4. Mezcla la rama en `master`.
5. Llama al `./blog/deploy.sh` existente (sin modificarlo) para
   publicar.
6. Borra la rama local ya mezclada.

## Fuera de alcance

- Cualquier automatización en GitHub Actions o CI remoto. Todo corre
  en local, en la máquina de la autora — decisión explícita para no
  tener que sacar la clave SSH root del servidor ni ninguna API key de
  traducción de su máquina.
- Cambios en `./blog/deploy.sh`: se reutiliza tal cual.
- Traducción de posts existentes que ya tienen su `.en.md` — el script
  solo traduce lo que falta.
- Interfaz de administración o UI: sigue siendo un flujo de terminal +
  git.
- Revisión editorial automática de calidad de la traducción más allá
  de la confirmación manual descrita abajo.

## Arquitectura general

Un único script bash, `blog/publish.sh`, orquesta tres fases ya
existentes por separado (traducir, mezclar, desplegar) sin introducir
ningún servicio nuevo ni credenciales nuevas. La traducción se hace
invocando el CLI `claude -p` como subproceso — la misma autenticación
que la autora ya usa en su terminal — pidiéndole una salida con
marcadores fijos para poder trocearla de forma determinista en bash,
en vez de depender de que la respuesta libre de Claude tenga un
formato parseable.

La consistencia de tags entre idiomas (para que las páginas
`/blog/tags/<tag>/` y `/blog/en/tags/<tag>/` no acumulen variantes
distintas del mismo concepto) se resuelve con un fichero de mapeo
versionado, `blog/posts/tags.map`, en vez de traducir el tag de cero
cada vez.

## Detección de posts a traducir

```bash
git diff --name-only master...HEAD -- blog/posts/
```

De esa lista se extraen las carpetas de post (`blog/posts/<carpeta>/`)
presentes en la rama actual y ausentes o distintas en `master`. Para
cada una, si existe `<slug>.es.md` pero no `<slug>.en.md`, esa carpeta
entra en la cola de traducción.

Se compara contra `master` (no se barre todo `blog/posts/`) para no
arrastrar borradores antiguos a medio traducir que no tienen relación
con la rama actual.

Si una carpeta detectada ya tiene su `.en.md` (por ejemplo, porque el
script ya se ejecutó una vez y la autora respondió "no" a la
confirmación tras editarlo a mano), se salta la traducción para esa
carpeta y se usa el archivo tal cual está en disco.

## Mecánica de traducción

Para cada post en la cola:

1. Se extrae del `.es.md` el bloque de front matter (entre las dos
   líneas `---`) y el cuerpo (todo lo posterior a la segunda `---`).
2. De ese front matter se leen `title`, `excerpt` y `tags` con
   `grep`/`sed` sobre el patrón `clave: "valor"` (o `clave: [...]`
   para `tags`). `date`, `translationKey`, `imageFile` e `imageRatio`
   **no se traducen**: se copian literalmente al `.en.md`.
3. Se invoca `claude -p` una sola vez por post con un prompt que
   incluye el título, el excerpt y el cuerpo en español, y pide como
   única respuesta:

   ```
   ###TITLE###
   <título traducido>
   ###EXCERPT###
   <excerpt traducido>
   ###BODY###
   <cuerpo traducido en markdown>
   ```

   El script valida que las tres marcas aparecen en ese orden antes de
   seguir; si no, aborta sin escribir nada (ver "Manejo de errores").
4. Para cada tag del post: si ya existe en `blog/posts/tags.map`
   (formato `es=en` por línea, una entrada por tag, sembrado
   inicialmente con `nota=note`, `arte=art`,
   `creative-coding=creative-coding`), se reutiliza esa traducción. Si
   no existe, se le pide a `claude -p` una traducción de una sola
   palabra/kebab-case, se añade al mapa y se usa.
5. Se construye `<slug>.en.md` con el mismo front matter que el
   `.es.md` salvo `lang: en`, título/excerpt/tags traducidos, y el
   cuerpo traducido.
6. Se escribe el archivo y se hace `git add` de ese archivo y de
   `tags.map` si cambió (todavía sin commitear).

### Limitación conocida

El parseo de front matter con `sed`/`grep` asume que `title` y
`excerpt` están entre comillas dobles simples, sin comillas dobles
literales dentro del valor (p. ej. `title: "Una cita \"famosa\""`
rompería el parseo). Es una limitación aceptada de usar bash en vez de
un parser YAML real (ver spec anterior, sección de alternativas
descartadas) — se documenta en cabecera del propio script y en
`blog/README.md`. Si aparece, el workaround es editar el `.md` para no
usar comillas dobles dentro del valor (comillas simples o sin
comillas van bien).

## Validación de imagen

Antes de traducir nada, por cada post de la cola el script comprueba
que el archivo declarado en `imageFile` existe en la misma carpeta que
el `.es.md`. Si falta, aborta esa carpeta con un error explícito
(`falta <carpeta>/<imageFile>`) sin llamar a `claude` ni escribir
ningún `.en.md` — publicar un post con la imagen de portada rota es
peor que no publicarlo. Si hay varios posts en la cola y solo uno
tiene la imagen que falta, el script aborta entero (misma política que
el resto de fallos: no publicar una tanda a medias).

## Confirmación antes de publicar

El caso normal es un post por rama, pero el script admite varios en la
misma pasada (por ejemplo, si la rama trae dos carpetas de post
nuevas). Tras procesar **toda** la cola — generando o localizando el
`.en.md` de cada una — el script, una sola vez para el conjunto:

1. Imprime el contenido completo de cada `.en.md` de la cola, uno
   detrás de otro, con su nombre de archivo como cabecera.
2. Imprime `git diff --stat` de todo lo que está en stage.
3. Pregunta `¿Publicar? [s/N]`.

No hay una confirmación por post individual: es una sola pregunta para
toda la tanda, y el commit posterior también agrupa todos los
`.en.md` generados en esta pasada.

Si la respuesta no es `s`/`S`, el script termina ahí sin commitear ni
mezclar. El `.en.md` generado queda escrito en disco y en stage, para
que la autora lo edite a mano y vuelva a lanzar `blog/publish.sh` —
que en esa segunda pasada detecta que el `.en.md` ya existe y salta
directo al commit + merge + deploy.

Si la respuesta es `s`/`S`, continúa con la fase de publicación.

## Publicación: commit, merge, deploy, limpieza

1. `git commit` de todos los `.en.md` generados en esta pasada (y
   `tags.map` si cambió), en la rama actual de la autora.
2. `git checkout master && git pull --ff-only origin master`.
3. `git merge --no-ff <rama-original> -m "merge: publicar <slugs>"`.
4. `./blog/deploy.sh`, sin modificar — hace push de `master` y
   despliega en el servidor tal como ya hace hoy.
5. Si el deploy fue bien: `git branch -d <rama-original>` (solo local;
   si la rama se había pusheado a GitHub, esa copia remota no se
   toca).

## Manejo de errores

| Situación | Comportamiento |
|---|---|
| `claude` no está en el PATH | Aborta antes de tocar ningún archivo, con mensaje explicando cómo instalarlo. |
| La llamada a `claude -p` falla o no devuelve los tres marcadores esperados | Aborta sin escribir el `.en.md`, no dejar archivos a medias. |
| El script se lanza estando ya en `master` | Aborta inmediatamente: no hay rama de la que mezclar. |
| La rama tiene cambios sin commitear al lanzar el script | Aborta: exige que el post ya esté commiteado en la rama, igual que `deploy.sh` exige árbol limpio antes de desplegar. |
| El merge a `master` da conflicto | El script para ahí; dejar el conflicto para resolución manual (como cualquier merge normal); no se llega a llamar a `deploy.sh`. |
| `deploy.sh` falla tras el merge | El merge a `master` ya quedó hecho (el contenido está a salvo en el historial de git); el script avisa del fallo e indica que se puede reintentar solo el despliegue con `./blog/deploy.sh`. |

## Testing

- Prueba manual end-to-end con un post real: rama nueva → post ES +
  imagen → `blog/publish.sh` → revisar la traducción mostrada →
  confirmar → verificar que `master` tiene ambos idiomas y que
  `https://maramotto.com/blog/` sirve el post en ambas rutas de
  idioma.
- Prueba manual del camino de error: lanzar el script en `master`
  directamente y comprobar que aborta con el mensaje esperado, sin
  tocar nada.
- Prueba manual del camino de "no confirmar": responder `n` en el
  prompt de confirmación y comprobar que no hay commit ni merge, y que
  relanzar el script no vuelve a traducir.
- No se añaden tests automatizados (`npm test`) para este script: es
  un script bash de orquestación de procesos externos (`claude`,
  `git`, `deploy.sh`), no lógica de negocio aislable como los filtros
  de Eleventy que sí tienen cobertura hoy.

## Documentación

`blog/README.md` se actualiza para presentar `blog/publish.sh` como el
flujo principal de publicación (rama → post → `publish.sh`), dejando
el flujo manual paso a paso que ya existe como alternativa para casos
en los que la traducción automática no sea adecuada.

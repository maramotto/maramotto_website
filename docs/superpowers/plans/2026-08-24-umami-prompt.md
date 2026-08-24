Integra Umami analytics en este sitio siguiendo el plan que hay en
`docs/superpowers/plans/2026-08-24-umami.md`. Léelo entero antes de tocar nada.

Valores reales (sustituye los placeholders del plan por estos):
- UMAMI_SRC        = https://PEGA_AQUI_TU_HOST/script.js
- UMAMI_WEBSITE_ID = PEGA_AQUI_TU_UUID

Contexto que necesitas y no se ve a simple vista:

- Umami ya está corriendo en el servidor Hetzner como servicio Docker junto a
  `maramotto-web`. No hay que instalar ni desplegar nada nuevo en el servidor:
  esto es solo integración en el cliente.
- Las páginas raíz (`index.html`, `cuerposonoro.html`, `universo-punzadas.html`)
  no tienen templating: repiten `<head>` y `<nav>` a mano. El snippet va en las
  tres, idéntico.
- El blog sí tiene layout compartido: `blog/_includes/layouts/base.njk` cubre
  listados, posts y páginas de tag de golpe.
- Los eventos de clic se declaran con el atributo `data-umami-event`, que el
  script de Umami detecta solo. No escribas listeners ni JavaScript propio.
- `data-i18n` reescribe `textContent`, nunca atributos, así que puede convivir
  con `data-umami-event` en el mismo elemento.
- El `Dockerfile` es multi-stage: un cambio en `base.njk` solo llega a
  producción tras `docker compose build`.

Cómo quiero que trabajes:

1. Ve tarea por tarea del plan, marcando los checkbox conforme avances.
2. Ejecuta los comandos de verificación de cada tarea y enséñame la salida
   real. No des un paso por bueno sin haberlo comprobado.
3. En la Task 3 Paso 2, antes de editar `cuerposonoro.html` y
   `universo-punzadas.html`, lístame los enlaces candidatos con el nombre de
   evento que propones para cada uno y espera mi visto bueno.
4. Si alguna captura de referencia de Playwright falla, para y avísame en vez
   de regenerar los snapshots.
5. No toques `nginx.conf` en esta tarea.
6. Haz un único commit al final, con el mensaje que indica el plan. No
   despliegues tú: el `./blog/deploy.sh` lo lanzo yo cuando revise el diff.

Empieza confirmándome que el sitio ya está dado de alta en el panel de Umami y
que tienes los dos valores de arriba. Si alguno sigue siendo un placeholder,
para ahí y dímelo.

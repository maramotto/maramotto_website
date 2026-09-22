# Proxy de OAuth para Decap CMS

Pequeño Cloudflare Worker que hace de intermediario entre `admin/` y
GitHub para el login real (fase 2 del panel de edición). No depende de
nada — es un único fichero, sin `npm install`.

Necesitas una cuenta de Cloudflare (el plan gratuito sobra de sobra
para esto) y una cuenta de GitHub con permisos de escritura sobre
`maramotto/maramotto_website`.

## 1. Desplegar el worker

Desde esta carpeta (`oauth-worker/`), en tu propia terminal:

```bash
npx wrangler login      # abre el navegador, autoriza tu cuenta de Cloudflare
npx wrangler deploy
```

Al terminar, `wrangler` imprime la URL pública del worker, algo como:

```
https://maramotto-decap-oauth.<tu-subdominio>.workers.dev
```

Apunta esa URL — la necesitas en los dos pasos siguientes.

## 2. Crear la GitHub OAuth App

En <https://github.com/settings/developers> → **New OAuth App**:

- **Application name**: `maramotto blog admin` (o lo que prefieras)
- **Homepage URL**: `https://maramotto.com`
- **Authorization callback URL**: `<URL del worker>/callback`
  (p.ej. `https://maramotto-decap-oauth.tu-subdominio.workers.dev/callback`)

Al crearla, GitHub te da un **Client ID**. Genera también un **Client
secret** (botón "Generate a new client secret") y cópialo — solo se
muestra una vez.

## 3. Configurar los secrets del worker

Todavía desde `oauth-worker/`:

```bash
npx wrangler secret put GITHUB_CLIENT_ID
# pega el Client ID cuando lo pida

npx wrangler secret put GITHUB_CLIENT_SECRET
# pega el Client secret cuando lo pida
```

## 4. Conectar `admin/config.yml` al worker real

Dime la URL del worker (del paso 1) y actualizo
`admin/config.yml` → `backend.base_url` con ese valor. `local_backend:
true` se queda tal cual: solo se activa en `localhost`, así que no
interfiere con el login real en producción.

## 5. Probarlo

Una vez desplegado el sitio con `admin/config.yml` actualizado, entra
en `https://maramotto.com/admin/` y pulsa "Login with GitHub". Debería
abrir una ventana emergente, pedirte autorizar la GitHub OAuth App (la
primera vez) y volver ya autenticada.

Si algo falla, revisa los logs del worker con:

```bash
npx wrangler tail
```

## Actualizar el worker más adelante

Cualquier cambio en `worker.js` se despliega con `npx wrangler deploy`
desde esta carpeta — no hace falta tocar los secrets de nuevo.

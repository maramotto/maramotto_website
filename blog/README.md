# Blog authoring workflow

1. Crea la carpeta del post: `blog/posts/<date>-<slug>/`. Cada post
   vive en su propia carpeta, con los dos idiomas y la imagen juntos:

   ```
   blog/posts/2026-09-01-mi-nuevo-post/
     mi-nuevo-post.es.md
     mi-nuevo-post.en.md
     cover.jpg
   ```

2. Escribe la versión en español, `mi-nuevo-post.es.md`. Required
   front matter: `title`, `date`, `lang: es`, `translationKey`
   (shared between the ES/EN pair), `tags`, `imageFile` (nombre del
   archivo de imagen dentro de la misma carpeta), `imageRatio`
   (`square` o `wide`), `excerpt`.

   ```markdown
   ---
   title: "Mi nuevo post"
   date: 2026-09-01
   lang: es
   translationKey: mi-nuevo-post
   tags: ["nota", "creative-coding"]
   imageFile: "cover.jpg"
   imageRatio: square
   excerpt: "Resumen corto para el listado y las meta tags."
   ---

   Contenido en Markdown normal.
   ```

   `translationKey` debe coincidir exactamente entre la versión ES y EN
   de un mismo post — es lo que enlaza ambas URLs en el selector de
   idioma. `imageRatio` es `square` (1:1) o `wide` (16:9), según la
   imagen que prepares. `imageFile` solo lleva el nombre del archivo
   (no la ruta) — Eleventy construye la URL pública automáticamente a
   partir de `translationKey` + `imageFile`. Cualquier `tag` nuevo
   genera automáticamente su propia página en `/blog/tags/<tag>/`.

3. Añade la imagen de portada en la misma carpeta del post (`.jpg`,
   `.png` o `.svg`), con el mismo nombre que declaraste en
   `imageFile`.

4. Pide la traducción al inglés (a Claude, o tradúcela tú) — debe crear
   `mi-nuevo-post.en.md` en la misma carpeta, con el mismo
   `translationKey`, `imageFile` e `imageRatio`, y `lang: en`.

5. Revisa la traducción y ajusta el tono si hace falta.

6. Previsualiza en local (ver "Local development" abajo) antes de
   publicar: revisa el post, el listado y la página de su(s) tag(s).

7. Commitea la carpeta del post completa (los dos `.md` y la imagen).

8. Despliega con `./blog/deploy.sh` (ver "Deploying" abajo).

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

## Deploying

El sitio no tiene CI/CD: el despliegue es manual, a un contenedor
Docker en un servidor Hetzner. `./blog/deploy.sh` hace todo el
proceso en un paso:

```bash
./blog/deploy.sh
```

Requiere:
- Estar en la rama `master`, sin cambios sin commitear.
- Acceso SSH configurado al host `maramotto` (ver `~/.ssh/config`).

El script:
1. Sincroniza tu `master` local con `origin/master` (pull + push).
2. Se conecta por SSH al servidor, hace `git pull`, reconstruye la
   imagen (`docker compose build`) y recrea solo el contenedor
   `maramotto-web` (`docker compose up -d`) — sin tocar los demás
   servicios que corren en el mismo servidor (`universopunzadas`,
   `umami`, `mujereshistoria`).
3. Verifica que la home, el blog y el contenedor respondan
   correctamente antes de terminar.

Si prefieres hacerlo a mano paso a paso:

```bash
# En tu máquina, desde la raíz del repo, en master y sin cambios pendientes
git push origin master

# En el servidor
ssh maramotto
cd /opt/maramotto_website
git pull origin master
docker compose build
docker compose up -d
```

### Nota de seguridad

El remoto de git en el servidor (`/opt/maramotto_website`) usa HTTPS
con un GitHub Personal Access Token embebido en la URL. Si lo rotas,
actualiza el remoto en el servidor:

```bash
ssh maramotto
cd /opt/maramotto_website
git remote set-url origin <nueva-url>
```

Considera cambiar a un remoto SSH o a un credential helper para no
tener el token en texto plano en `.git/config`.

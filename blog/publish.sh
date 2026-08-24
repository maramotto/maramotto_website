#!/usr/bin/env bash
set -euo pipefail

# publish.sh — publish the blog post(s) added on the current branch.
#
# Usage: ./blog/publish.sh
#
# Run this from a working branch (not master) that already has a
# committed post (blog/posts/<date>-<slug>/<slug>.es.md + cover image).
# It translates any post on this branch that doesn't have its .en.md
# yet (via the local `claude` CLI), shows you the result, and — once
# you confirm — merges the branch into master and runs ./blog/deploy.sh
# to publish.
#
# See docs/superpowers/specs/2026-08-24-blog-publish-automation-design.md
# for the full design.
#
# Known limitation: front matter parsing is done with plain
# grep/sed/awk, not a real YAML parser. `title` and `excerpt` values
# must not contain literal double quotes (use single quotes or none).

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

TAGS_MAP="blog/posts/tags.map"

# ---------------------------------------------------------------------------
# Preflight
# ---------------------------------------------------------------------------

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$BRANCH" = "master" ]; then
  echo "Error: estás en 'master'. Lanza este script desde la rama donde" >&2
  echo "commiteaste el post nuevo." >&2
  exit 1
fi

if [ -n "$(git status --porcelain -- blog/)" ]; then
  echo "Error: hay cambios sin commitear en blog/:" >&2
  git status --short -- blog/ >&2
  echo "Commitea el post antes de lanzar publish.sh." >&2
  exit 1
fi

if ! command -v claude >/dev/null 2>&1; then
  echo "Error: no encuentro el CLI 'claude' en el PATH." >&2
  echo "Instálalo (https://claude.com/claude-code) o revisa tu PATH." >&2
  exit 1
fi

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

strip_quotes() {
  local s="$1"
  s="${s%\"}"
  s="${s#\"}"
  printf '%s' "$s"
}

get_field() {
  local file="$1" key="$2"
  awk -v key="$key" '
    BEGIN { front = 0 }
    /^---$/ { front++; next }
    front == 1 && $0 ~ "^" key ": " {
      sub("^" key ": *", "")
      print
      exit
    }
  ' "$file"
}

get_tags() {
  local file="$1" raw
  raw="$(get_field "$file" "tags")"
  raw="${raw#\[}"
  raw="${raw%\]}"
  printf '%s' "$raw" | tr ',' '\n' | sed -E 's/^[[:space:]]*"?//; s/"?[[:space:]]*$//' | sed '/^$/d'
}

get_body() {
  local file="$1"
  awk '
    BEGIN { delim = 0; insection = 0 }
    /^---$/ { delim++; if (delim == 2) { insection = 1 }; next }
    insection { print }
  ' "$file"
}

# es_tag -> en_tag, translating and caching new ones in $TAGS_MAP
translate_tag() {
  local tag="$1" match
  if [ -f "$TAGS_MAP" ]; then
    match="$(grep -m1 "^${tag}=" "$TAGS_MAP" || true)"
    if [ -n "$match" ]; then
      printf '%s' "${match#*=}"
      return
    fi
  fi
  local translated
  translated="$(claude -p "Traduce esta única etiqueta de español a inglés. Responde solo con la palabra traducida, en minúsculas, sin comillas, sin explicación, en kebab-case si son varias palabras: ${tag}" | tr -d '\n' | xargs)"
  echo "${tag}=${translated}" >> "$TAGS_MAP"
  git add "$TAGS_MAP"
  printf '%s' "$translated"
}

# Translate title + excerpt + body of an .es.md in one claude call.
# Prints three lines to stdout as TSV-ish blocks separated by \x01,
# consumed by the caller with IFS.
translate_post() {
  local title="$1" excerpt="$2" body="$3"
  local prompt response
  prompt="Traduce este post de blog de español a inglés, manteniendo el tono personal y directo del original. No añadas comentarios, notas ni explicaciones tuyas. Responde EXACTAMENTE con este formato, nada antes ni después:

###TITLE###
<título traducido>
###EXCERPT###
<excerpt traducido>
###BODY###
<cuerpo traducido en markdown>

TÍTULO ORIGINAL:
${title}

EXCERPT ORIGINAL:
${excerpt}

CUERPO ORIGINAL:
${body}"

  response="$(claude -p "$prompt")"

  if ! grep -q '^###TITLE###$' <<<"$response" || \
     ! grep -q '^###EXCERPT###$' <<<"$response" || \
     ! grep -q '^###BODY###$' <<<"$response"; then
    echo "Error: la respuesta de claude no trae el formato esperado." >&2
    echo "--- respuesta ---" >&2
    echo "$response" >&2
    exit 1
  fi

  printf '%s' "$response"
}

join_tags_quoted() {
  local out="" tag first=1
  while IFS= read -r tag; do
    [ -z "$tag" ] && continue
    if [ "$first" = 1 ]; then
      out="\"${tag}\""
      first=0
    else
      out="${out}, \"${tag}\""
    fi
  done
  printf '%s' "$out"
}

# ---------------------------------------------------------------------------
# Detect post folders touched on this branch
# ---------------------------------------------------------------------------

CHANGED_FILES="$(git diff --name-only master...HEAD -- blog/posts/ || true)"

if [ -z "$CHANGED_FILES" ]; then
  echo "No hay cambios en blog/posts/ en esta rama respecto a master. Nada que publicar."
  exit 0
fi

POST_DIRS="$(printf '%s\n' "$CHANGED_FILES" | xargs -n1 dirname | sort -u | grep -v '^blog/posts$' || true)"

if [ -z "$POST_DIRS" ]; then
  echo "No hay carpetas de post nuevas en esta rama. Nada que publicar."
  exit 0
fi

# ---------------------------------------------------------------------------
# Validate + translate
# ---------------------------------------------------------------------------

VALID_DIRS=()

while IFS= read -r dir; do
  es_file="$(ls "$dir"/*.es.md 2>/dev/null | head -n1 || true)"
  if [ -z "$es_file" ]; then
    continue
  fi

  image_file="$(strip_quotes "$(get_field "$es_file" "imageFile")")"
  if [ -z "$image_file" ] || [ ! -f "$dir/$image_file" ]; then
    echo "Error: falta ${dir}/${image_file:-<imageFile no declarado>}." >&2
    echo "Añade la imagen de portada antes de publicar." >&2
    exit 1
  fi

  VALID_DIRS+=("$dir")
done <<<"$POST_DIRS"

if [ ${#VALID_DIRS[@]} -eq 0 ]; then
  echo "No hay posts válidos que publicar en esta rama."
  exit 0
fi

for dir in "${VALID_DIRS[@]}"; do
  es_file="$(ls "$dir"/*.es.md | head -n1)"
  slug="$(basename "$es_file" .es.md)"
  en_file="${dir}/${slug}.en.md"

  if [ -f "$en_file" ]; then
    echo "==> ${slug}: ya tiene .en.md, la reutilizo tal cual."
    continue
  fi

  echo "==> ${slug}: traduciendo con claude..."

  title="$(strip_quotes "$(get_field "$es_file" "title")")"
  excerpt="$(strip_quotes "$(get_field "$es_file" "excerpt")")"
  date_val="$(get_field "$es_file" "date")"
  translation_key="$(get_field "$es_file" "translationKey")"
  image_ratio="$(get_field "$es_file" "imageRatio")"
  image_file="$(strip_quotes "$(get_field "$es_file" "imageFile")")"
  body="$(get_body "$es_file")"

  response="$(translate_post "$title" "$excerpt" "$body")"

  en_title="$(awk '/^###TITLE###$/{f=1;next} /^###EXCERPT###$/{f=0} f' <<<"$response" | sed '$!N;s/\n$//')"
  en_excerpt="$(awk '/^###EXCERPT###$/{f=1;next} /^###BODY###$/{f=0} f' <<<"$response" | sed '$!N;s/\n$//')"
  en_body="$(awk '/^###BODY###$/{f=1;next} f' <<<"$response")"

  en_tags=""
  while IFS= read -r tag; do
    [ -z "$tag" ] && continue
    translated_tag="$(translate_tag "$tag")"
    en_tags="${en_tags}${translated_tag}"$'\n'
  done < <(get_tags "$es_file")
  en_tags_joined="$(printf '%s' "$en_tags" | join_tags_quoted)"

  {
    echo "---"
    echo "title: \"${en_title}\""
    echo "date: ${date_val}"
    echo "lang: en"
    echo "translationKey: ${translation_key}"
    echo "tags: [${en_tags_joined}]"
    echo "imageFile: \"${image_file}\""
    echo "imageRatio: ${image_ratio}"
    echo "excerpt: \"${en_excerpt}\""
    echo "---"
    echo ""
    printf '%s\n' "$en_body"
  } > "$en_file"

  git add "$en_file"
  echo "==> ${slug}: .en.md generado."
done

# ---------------------------------------------------------------------------
# Confirmation
# ---------------------------------------------------------------------------

echo ""
echo "=========================================="
echo " Posts a publicar"
echo "=========================================="

for dir in "${VALID_DIRS[@]}"; do
  es_file="$(ls "$dir"/*.es.md | head -n1)"
  slug="$(basename "$es_file" .es.md)"
  en_file="${dir}/${slug}.en.md"
  echo ""
  echo "--- ${en_file} ---"
  cat "$en_file"
done

echo ""
git diff --stat --cached -- blog/

echo ""
read -r -p "¿Publicar? [s/N] " CONFIRM
case "$CONFIRM" in
  s|S) ;;
  *)
    echo "Cancelado. Los .en.md generados quedan en disco y en stage."
    echo "Edítalos si hace falta y vuelve a lanzar ./blog/publish.sh."
    exit 0
    ;;
esac

# ---------------------------------------------------------------------------
# Commit, merge, deploy, cleanup
# ---------------------------------------------------------------------------

SLUGS=()
for dir in "${VALID_DIRS[@]}"; do
  es_file="$(ls "$dir"/*.es.md | head -n1)"
  SLUGS+=("$(basename "$es_file" .es.md)")
done
SLUGS_JOINED="$(IFS=', '; echo "${SLUGS[*]}")"

if [ -n "$(git status --porcelain --cached -- blog/)" ]; then
  git commit -m "feat(blog): traducción automática de ${SLUGS_JOINED}"
fi

echo "==> Mezclando ${BRANCH} en master..."
git checkout master
git pull --ff-only origin master
git merge --no-ff "$BRANCH" -m "merge: publicar ${SLUGS_JOINED}"

echo "==> Desplegando..."
./blog/deploy.sh

echo "==> Borrando rama local ${BRANCH}..."
git branch -d "$BRANCH"

echo ""
echo "Publicado: ${SLUGS_JOINED}"

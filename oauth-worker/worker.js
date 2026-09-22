// Proxy de OAuth de GitHub para el backend "github" de Decap CMS.
//
// Decap no puede hablar con GitHub directamente porque el intercambio
// del código de autorización por un token requiere el client secret,
// que nunca debe llegar al navegador. Este worker hace ese intercambio
// server-side y expone los dos endpoints que Decap espera:
//
//   GET /auth       -> redirige a la pantalla de autorización de GitHub
//   GET /callback   -> intercambia el código por un token y se lo pasa
//                      de vuelta a admin/ vía window.postMessage
//
// Variables de entorno requeridas (ver README.md de esta carpeta):
//   GITHUB_CLIENT_ID      (secret)
//   GITHUB_CLIENT_SECRET  (secret)
//   ALLOWED_ORIGIN        (var)  — origen exacto de la web, p.ej.
//                                  "https://maramotto.com". Solo ese
//                                  origen puede recibir el token.

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") return handleAuth(url, env);
    if (url.pathname === "/callback") return handleCallback(url, env);

    return new Response("Not found", { status: 404 });
  },
};

function handleAuth(url, env) {
  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  authorizeUrl.searchParams.set("redirect_uri", `${url.origin}/callback`);
  authorizeUrl.searchParams.set("scope", "repo,user");
  authorizeUrl.searchParams.set("state", crypto.randomUUID());

  return Response.redirect(authorizeUrl.toString(), 302);
}

async function handleCallback(url, env) {
  const code = url.searchParams.get("code");
  if (!code) {
    return new Response("Falta el parámetro 'code' en la respuesta de GitHub.", { status: 400 });
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/callback`,
    }),
  });

  const data = await tokenResponse.json();

  if (data.error || !data.access_token) {
    return new Response(
      `Error al obtener el token de GitHub: ${data.error_description || data.error || "respuesta inesperada"}. Puedes cerrar esta ventana e intentarlo de nuevo.`,
      { status: 502 }
    );
  }

  return htmlResponse(successScript(data.access_token, env.ALLOWED_ORIGIN));
}

// Protocolo que espera Decap: la ventana emergente escucha un mensaje
// del "opener" (la pestaña de admin/) para confirmar que puede
// comunicarse con él, y entonces le devuelve el token con este formato
// exacto: 'authorization:github:success:{"token":"...","provider":"github"}'
function successScript(token, allowedOrigin) {
  const payload = JSON.stringify({ token, provider: "github" });
  const originLiteral = JSON.stringify(allowedOrigin || "");

  return `<!doctype html>
<script>
(function() {
  function receiveMessage(e) {
    if (e.origin !== ${originLiteral}) return;
    window.opener.postMessage('authorization:github:success:${payload}', e.origin);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
<p>Autenticado. Puedes cerrar esta ventana si no se cierra sola.</p>`;
}

function htmlResponse(html) {
  return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
}

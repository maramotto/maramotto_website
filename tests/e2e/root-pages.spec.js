const { test, expect } = require("@playwright/test");

// Smoke coverage for the 3 main-site pages. They moved twice: first from
// hand-written HTML to Eleventy templates sharing nav/footer/head with the
// blog (B-2), then from client-side i18n to real per-language URLs (B-1,
// same pattern the blog already used). No visual snapshots here (see
// blog.spec.js's existing snapshot tests for why: they're sensitive to
// font-rendering differences across environments) — these assert behavior.

const PAGES = [
  {
    es: "/",
    en: "/en/",
    titleEs: "maramotto — Arte, código y curiosidad",
    titleEn: "maramotto — Art, code and curiosity",
    h1: "maramotto",
    hasHomeLink: false,
    translatedSelector: ".hero__subtitle",
  },
  {
    es: "/cuerposonoro.html",
    en: "/en/cuerposonoro.html",
    titleEs: "CuerpoSonoro — Arte Interactivo | Movimiento Corporal y Sonido en Tiempo Real",
    titleEn: "CuerpoSonoro — Interactive Art | Real-Time Body Movement and Sound",
    h1: "CuerpoSonoro",
    hasHomeLink: true,
    translatedSelector: ".project-hero__tagline",
  },
  {
    es: "/universo-punzadas.html",
    en: "/en/universo-punzadas.html",
    titleEs: "Universo Punzadas — Catálogo de referencias culturales de Punzadas Sonoras",
    titleEn: "Universo Punzadas — Cultural Reference Catalogue for the Punzadas Sonoras Podcast",
    h1: "Universo Punzadas",
    hasHomeLink: true,
    translatedSelector: ".project-hero__tagline",
  },
];

for (const { es, en, titleEs, titleEn, h1, hasHomeLink, translatedSelector } of PAGES) {
  test.describe(`Root page ${es}`, () => {
    for (const [url, title, lang] of [
      [es, titleEs, "es"],
      [en, titleEn, "en"],
    ]) {
      test(`${lang}: loads with correct title, heading, lang, nav, footer and hreflang`, async ({ page }) => {
        await page.goto(url);
        await expect(page).toHaveTitle(title);
        await expect(page.locator("h1")).toHaveText(h1);
        await expect(page.locator("html")).toHaveAttribute("lang", lang);
        await expect(page.locator(".nav__logo")).toBeVisible();
        await expect(page.locator("footer.footer")).toBeVisible();

        const home = lang === "es" ? "/" : "/en/";
        const homeText = lang === "es" ? "Inicio" : "Home";
        // "Inicio"/"Home" legitimately appears twice on non-home pages: nav + footer.
        await expect(
          page.locator(`a[href='${home}']:has-text('${homeText}')`)
        ).toHaveCount(hasHomeLink ? 2 : 0);

        await expect(page.locator('link[rel="alternate"][hreflang="es"]')).toHaveAttribute(
          "href",
          `https://maramotto.com${es}`
        );
        await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
          "href",
          `https://maramotto.com${en}`
        );
        await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
      });
    }

    test("project dropdown links stay in the same language", async ({ page }) => {
      await page.goto(en);
      await expect(page.locator(".nav__dropdown a[href='/en/cuerposonoro.html']")).toHaveCount(1);
      await expect(page.locator(".nav__dropdown a[href='/en/universo-punzadas.html']")).toHaveCount(1);
    });

    test("language toggle navigates to the real English URL", async ({ page }) => {
      await page.goto(es);
      const before = await page.locator(translatedSelector).textContent();
      await page.click(`.lang-toggle__btn[href='${en}']`);
      await expect(page).toHaveURL(new RegExp(`${en.replace(/\./g, "\\.")}$`));
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      const after = await page.locator(translatedSelector).textContent();
      expect(after).not.toBe(before);
    });
  });
}

test("contact mailto link on the homepage carries no stray subject", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("a[href='mailto:hello@maramotto.com']").first()).toBeVisible();
});

test("project pages carry a pre-filled contact subject", async ({ page }) => {
  await page.goto("/cuerposonoro.html");
  await expect(page.locator("a[href*='mailto:hello@maramotto.com?subject=CuerpoSonoro']").first()).toBeVisible();
});

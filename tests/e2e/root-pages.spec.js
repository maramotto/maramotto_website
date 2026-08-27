const { test, expect } = require("@playwright/test");

// Smoke coverage for the 3 main-site pages, added when they moved from
// hand-written HTML to Eleventy templates sharing nav/footer/head with the
// blog. No visual snapshots here (see blog.spec.js's existing snapshot
// tests for why: they're sensitive to font-rendering differences across
// environments) — these assert behavior instead.

const PAGES = [
  { url: "/", title: "maramotto — Arte, código y curiosidad", h1: "maramotto", hasHomeLink: false },
  {
    url: "/cuerposonoro.html",
    title: "CuerpoSonoro — Arte Interactivo | Movimiento Corporal y Sonido en Tiempo Real",
    h1: "CuerpoSonoro",
    hasHomeLink: true,
  },
  {
    url: "/universo-punzadas.html",
    title: "Universo Punzadas — Catálogo de referencias culturales de Punzadas Sonoras",
    h1: "Universo Punzadas",
    hasHomeLink: true,
  },
];

for (const { url, title, h1, hasHomeLink } of PAGES) {
  test.describe(`Root page ${url}`, () => {
    test("loads with correct title, heading, nav and footer", async ({ page }) => {
      await page.goto(url);
      await expect(page).toHaveTitle(title);
      await expect(page.locator("h1")).toHaveText(h1);
      await expect(page.locator(".nav__logo")).toBeVisible();
      await expect(page.locator(".nav__dropdown a[href='/cuerposonoro.html']")).toHaveCount(1);
      await expect(page.locator(".nav__dropdown a[href='/universo-punzadas.html']")).toHaveCount(1);
      await expect(page.locator("footer.footer")).toBeVisible();
      // "Inicio" legitimately appears twice on non-home pages: nav + footer.
      await expect(page.locator("a[href='/']:has-text('Inicio')")).toHaveCount(hasHomeLink ? 2 : 0);
    });

    test("language toggle switches visible text client-side", async ({ page }) => {
      await page.goto(url);
      const heading = page.locator("h1, .project-hero__tagline, .hero__subtitle").first();
      const before = await heading.textContent();
      await page.click(".lang-toggle__btn[data-lang='en']");
      await expect(page).toHaveURL(new RegExp(`${url.replace(".", "\\.")}$`));
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      const after = await heading.textContent();
      if (h1 === "maramotto") {
        // The wordmark itself isn't translated; check the subtitle instead.
        const subtitle = await page.locator(".hero__subtitle").textContent();
        expect(subtitle).not.toBe(before);
      } else {
        expect(after).toBe(before); // project names aren't translated
      }
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

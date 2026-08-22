const { test, expect } = require("@playwright/test");

const BREAKPOINTS = [320, 768, 1024, 1440];

test.describe("Blog listing", () => {
  for (const width of BREAKPOINTS) {
    test(`renders at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/blog/");
      await expect(page.locator("h1")).toBeVisible();
      await expect(page).toHaveScreenshot(`blog-list-${width}.png`);
    });
  }
});

test.describe("Blog post — square cover", () => {
  for (const width of BREAKPOINTS) {
    test(`renders at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/blog/hola-mundo/");
      await expect(page.locator("h1")).toBeVisible();
      await expect(page).toHaveScreenshot(`blog-post-square-${width}.png`);
    });
  }
});

test.describe("Blog post — wide cover", () => {
  for (const width of BREAKPOINTS) {
    test(`renders at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/blog/segunda-nota/");
      await expect(page.locator("h1")).toBeVisible();
      await expect(page).toHaveScreenshot(`blog-post-wide-${width}.png`);
    });
  }
});

test("language toggle navigates between paired posts", async ({ page }) => {
  await page.goto("/blog/hola-mundo/");
  await page.click(".lang-toggle__btn[href='/blog/en/hola-mundo/']");
  await expect(page).toHaveURL(/\/blog\/en\/hola-mundo\/$/);
  await expect(page.locator("h1")).toHaveText("Hello, world");
});

test("keyboard navigation reaches the first nav link", async ({ page }) => {
  await page.goto("/blog/");
  await page.keyboard.press("Tab");
  const tag = await page.evaluate(() => document.activeElement.tagName);
  expect(tag).toBe("A");
});

test("ES RSS feed is reachable and well-formed", async ({ request }) => {
  const res = await request.get("/blog/feed.xml");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("xml");
});

test("tag page lists only posts with that tag", async ({ page }) => {
  await page.goto("/blog/tags/creative-coding/");
  await expect(page.locator(".post-card")).toHaveCount(1);
  await expect(page.locator(".post-card__title")).toHaveText("Segunda nota");
});

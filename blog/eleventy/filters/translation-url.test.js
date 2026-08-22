const test = require("node:test");
const assert = require("node:assert/strict");
const translationUrl = require("./translation-url.js");

const posts = [
  { data: { lang: "es", translationKey: "hola-mundo" }, url: "/blog/hola-mundo/" },
  { data: { lang: "en", translationKey: "hola-mundo" }, url: "/blog/en/hola-mundo/" },
  { data: { lang: "es", translationKey: "otro-post" }, url: "/blog/otro-post/" },
];

test("finds the sibling post URL in the target language", () => {
  assert.equal(translationUrl(posts, "hola-mundo", "en"), "/blog/en/hola-mundo/");
});

test("returns null when no sibling exists in the target language", () => {
  assert.equal(translationUrl(posts, "otro-post", "en"), null);
});

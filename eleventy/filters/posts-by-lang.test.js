const test = require("node:test");
const assert = require("node:assert/strict");
const postsByLang = require("./posts-by-lang.js");

test("keeps only posts matching the given language", () => {
  const posts = [
    { data: { lang: "es", title: "Uno" } },
    { data: { lang: "en", title: "One" } },
    { data: { lang: "es", title: "Dos" } },
  ];
  const result = postsByLang(posts, "es");
  assert.equal(result.length, 2);
  assert.deepEqual(result.map((p) => p.data.title), ["Uno", "Dos"]);
});

test("returns an empty array when no post matches", () => {
  const posts = [{ data: { lang: "en" } }];
  assert.deepEqual(postsByLang(posts, "es"), []);
});

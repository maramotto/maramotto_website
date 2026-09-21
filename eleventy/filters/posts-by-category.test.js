const test = require("node:test");
const assert = require("node:assert/strict");
const postsByCategory = require("./posts-by-category.js");

test("keeps only posts matching the given category", () => {
  const posts = [
    { data: { category: "thoughts", title: "Uno" } },
    { data: { category: "art", title: "Dos" } },
  ];
  const result = postsByCategory(posts, "thoughts");
  assert.deepEqual(result.map((p) => p.data.title), ["Uno"]);
});

test("returns an empty array when a post has no category", () => {
  const posts = [{ data: { title: "Sin categoría" } }];
  assert.deepEqual(postsByCategory(posts, "thoughts"), []);
});

const test = require("node:test");
const assert = require("node:assert/strict");
const postsByTag = require("./posts-by-tag.js");

test("keeps only posts that include the given tag", () => {
  const posts = [
    { data: { tags: ["nota", "creative-coding"], title: "Uno" } },
    { data: { tags: ["articulo"], title: "Dos" } },
  ];
  const result = postsByTag(posts, "nota");
  assert.deepEqual(result.map((p) => p.data.title), ["Uno"]);
});

test("returns an empty array when a post has no tags", () => {
  const posts = [{ data: { title: "Sin tags" } }];
  assert.deepEqual(postsByTag(posts, "nota"), []);
});

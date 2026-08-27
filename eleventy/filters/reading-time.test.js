const test = require("node:test");
const assert = require("node:assert/strict");
const readingTime = require("./reading-time.js");

test("returns 1 minute for short content", () => {
  assert.equal(readingTime("hola mundo"), 1);
});

test("rounds to the nearest minute for longer content", () => {
  const words = new Array(450).fill("palabra").join(" ");
  assert.equal(readingTime(words), 2); // 450 / 200 = 2.25 -> rounds to 2
});

test("strips HTML tags before counting words", () => {
  const html = "<p>" + new Array(200).fill("word").join(" ") + "</p>";
  assert.equal(readingTime(html), 1);
});

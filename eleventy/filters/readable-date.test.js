const test = require("node:test");
const assert = require("node:assert/strict");
const readableDate = require("./readable-date.js");

test("formats a Spanish date", () => {
  assert.equal(readableDate("2026-08-22", "es"), "22 de agosto de 2026");
});

test("formats an English date", () => {
  assert.equal(readableDate("2026-08-22", "en"), "August 22, 2026");
});

test("defaults to Spanish for unknown languages", () => {
  assert.equal(readableDate("2026-01-05", "fr"), "5 de enero de 2026");
});

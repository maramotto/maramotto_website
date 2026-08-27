const test = require("node:test");
const assert = require("node:assert/strict");
const isoDate = require("./iso-date.js");

test("converts a date string to full ISO 8601", () => {
  assert.equal(isoDate("2026-08-22"), "2026-08-22T00:00:00.000Z");
});

test("accepts a Date instance", () => {
  assert.equal(isoDate(new Date("2026-01-05T00:00:00.000Z")), "2026-01-05T00:00:00.000Z");
});

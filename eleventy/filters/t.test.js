const test = require("node:test");
const assert = require("node:assert/strict");
const t = require("./t.js");

const i18n = {
  es: { "nav.contact": "Contacto", "only.in.es": "Solo en español" },
  en: { "nav.contact": "Contact" },
};

test("resolves a known key in the requested language", () => {
  assert.equal(t(i18n, "nav.contact", "en"), "Contact");
});

test("resolves the same key in Spanish", () => {
  assert.equal(t(i18n, "nav.contact", "es"), "Contacto");
});

test("falls back to Spanish when the requested language has no entry for the key", () => {
  assert.equal(t(i18n, "only.in.es", "en"), "Solo en español");
});

test("returns the key itself when it exists in neither language", () => {
  assert.equal(t(i18n, "this.key.does.not.exist", "en"), "this.key.does.not.exist");
});

const fs = require("fs");
const path = require("path");
const readingTime = require("./eleventy/filters/reading-time.js");
const postsByLang = require("./eleventy/filters/posts-by-lang.js");
const translationUrl = require("./eleventy/filters/translation-url.js");
const postsByTag = require("./eleventy/filters/posts-by-tag.js");
const readableDate = require("./eleventy/filters/readable-date.js");
const isoDate = require("./eleventy/filters/iso-date.js");
const t = require("./eleventy/filters/t.js");
const i18nData = require("./_data/i18n.js");
const pluginRss = require("@11ty/eleventy-plugin-rss");

function uniqueSortedTags(posts) {
  const tags = new Set();
  posts.forEach((post) => (post.data.tags || []).forEach((tag) => tags.add(tag)));
  return [...tags].sort();
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  // Each post folder (blog/posts/<date>-<slug>/) holds its own cover image
  // alongside its .md files. Copy every non-markdown file to
  // blog/images/<slug>/, stripping the date prefix so the folder's date
  // never leaks into the public image URL.
  const postsDir = path.join(__dirname, "blog", "posts");
  for (const entry of fs.readdirSync(postsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const slug = entry.name.replace(/^\d{4}-\d{2}-\d{2}-/, "");
    for (const file of fs.readdirSync(path.join(postsDir, entry.name))) {
      if (file.endsWith(".md")) continue;
      eleventyConfig.addPassthroughCopy({
        [`blog/posts/${entry.name}/${file}`]: `blog/images/${slug}/${file}`,
      });
    }
  }

  // Root pages' static assets — the main site has no build step of its
  // own, so these just need to land in _site/ unchanged.
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("favicon.svg");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");

  eleventyConfig.addFilter("readingTime", readingTime);
  eleventyConfig.addFilter("postsByLang", postsByLang);
  eleventyConfig.addFilter("translationUrl", translationUrl);
  eleventyConfig.addFilter("postsByTag", postsByTag);
  eleventyConfig.addFilter("readableDate", readableDate);
  eleventyConfig.addFilter("isoDate", isoDate);
  eleventyConfig.addFilter("t", (key, lang) => t(i18nData, key, lang));

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getFilteredByGlob("blog/posts/*/*.md").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("tagListEs", (collectionApi) =>
    uniqueSortedTags(collectionApi.getFilteredByGlob("blog/posts/*/*.md").filter((p) => p.data.lang === "es"))
  );

  eleventyConfig.addCollection("tagListEn", (collectionApi) =>
    uniqueSortedTags(collectionApi.getFilteredByGlob("blog/posts/*/*.md").filter((p) => p.data.lang === "en"))
  );

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};

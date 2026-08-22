const readingTime = require("./eleventy/filters/reading-time.js");
const postsByLang = require("./eleventy/filters/posts-by-lang.js");
const translationUrl = require("./eleventy/filters/translation-url.js");
const postsByTag = require("./eleventy/filters/posts-by-tag.js");
const readableDate = require("./eleventy/filters/readable-date.js");

function uniqueSortedTags(posts) {
  const tags = new Set();
  posts.forEach((post) => (post.data.tags || []).forEach((tag) => tags.add(tag)));
  return [...tags].sort();
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("readingTime", readingTime);
  eleventyConfig.addFilter("postsByLang", postsByLang);
  eleventyConfig.addFilter("translationUrl", translationUrl);
  eleventyConfig.addFilter("postsByTag", postsByTag);
  eleventyConfig.addFilter("readableDate", readableDate);

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getFilteredByGlob("posts/*.md").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("tagListEs", (collectionApi) =>
    uniqueSortedTags(collectionApi.getFilteredByGlob("posts/*.md").filter((p) => p.data.lang === "es"))
  );

  eleventyConfig.addCollection("tagListEn", (collectionApi) =>
    uniqueSortedTags(collectionApi.getFilteredByGlob("posts/*.md").filter((p) => p.data.lang === "en"))
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

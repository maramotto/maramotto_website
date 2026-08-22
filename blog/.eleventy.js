const readingTime = require("./eleventy/filters/reading-time.js");
const postsByLang = require("./eleventy/filters/posts-by-lang.js");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("readingTime", readingTime);
  eleventyConfig.addFilter("postsByLang", postsByLang);

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getFilteredByGlob("posts/*.md").sort((a, b) => b.date - a.date)
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

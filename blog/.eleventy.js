const readingTime = require("./eleventy/filters/reading-time.js");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("readingTime", readingTime);

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

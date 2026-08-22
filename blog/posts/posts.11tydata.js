module.exports = {
  layout: "layouts/post.njk",
  ogType: "article",
  eleventyComputed: {
    permalink: (data) => `/blog/${data.lang === "en" ? "en/" : ""}${data.translationKey}/`,
    description: (data) => data.excerpt,
  },
};

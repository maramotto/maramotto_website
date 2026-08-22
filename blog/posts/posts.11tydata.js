const isoDate = require("../eleventy/filters/iso-date.js");

function postUrl(data) {
  return `/blog/${data.lang === "en" ? "en/" : ""}${data.translationKey}/`;
}

module.exports = {
  layout: "layouts/post.njk",
  ogType: "article",
  eleventyComputed: {
    permalink: (data) => postUrl(data),
    description: (data) => data.excerpt,
    structuredData: (data) => `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": ${JSON.stringify(data.title)},
  "description": ${JSON.stringify(data.excerpt)},
  "datePublished": "${isoDate(data.date)}",
  "image": ${JSON.stringify(`https://maramotto.com${data.image}`)},
  "author": {
    "@type": "Person",
    "name": "Mara",
    "alternateName": "maramotto",
    "url": "https://maramotto.com"
  },
  "url": ${JSON.stringify(`https://maramotto.com${postUrl(data)}`)}
}
</script>`,
  },
};

const path = require("path");
const isoDate = require("../../eleventy/filters/iso-date.js");

function postUrl(data) {
  return `/blog/${data.lang === "en" ? "en/" : ""}${data.translationKey}/`;
}

module.exports = {
  layout: "layouts/post.njk",
  ogType: "article",
  eleventyComputed: {
    // Falls back to the post's own folder name when the front matter
    // omits translationKey — lets Decap-authored posts (which don't fill
    // that field in) resolve it the same way hand-written ones do.
    translationKey: (data) => data.translationKey || path.basename(path.dirname(data.page.inputPath)),
    permalink: (data) => postUrl(data),
    // Hand-written posts store a bare filename ("cover.svg"). Decap's
    // image widget stores the full public_folder path instead
    // ("/blog/images/<slug>/cover.svg") — pass that through as-is.
    image: (data) =>
      data.imageFile.startsWith("/") ? data.imageFile : `/blog/images/${data.translationKey}/${data.imageFile}`,
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

// Front matter fields aren't re-rendered by Eleventy (only `permalink` is),
// so anything that must vary by `lang` — title, description, structuredData —
// can't just live as a plain string in the .njk file's front matter. This
// file scopes eleventyComputed to this one template (same mechanism
// blog/posts/posts.11tydata.js uses, but file-scoped instead of
// directory-scoped).

const TITLES = {
  es: "maramotto — Arte, código y curiosidad",
  en: "maramotto — Art, code and curiosity",
};

const DESCRIPTIONS = {
  es: "Artista, ingeniera de software y tecnóloga creativa. Instalaciones que convierten datos en sonido, software a medida y talleres de creatividad.",
  en: "Artist, software engineer and creative technologist. Installations that turn data into sound, custom software, and creativity workshops.",
};

module.exports = {
  eleventyComputed: {
    title: (data) => TITLES[data.lang],
    description: (data) => DESCRIPTIONS[data.lang],
    structuredData: (data) => `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": "Mara",
    "alternateName": "maramotto",
    "url": "https://maramotto.com${data.page.url}",
    "jobTitle": ["Artist", "Software Engineer", "Creative Technologist", "Tecnóloga Creativa"],
    "description": ${JSON.stringify(DESCRIPTIONS[data.lang])},
    "knowsAbout": ["Creative Coding", "Software Development", "Tech Art Installations", "Data Sonification", "Music Production", "Data Science", "Creativity Workshops", "Python", "JavaScript"],
    "sameAs": [
      "https://github.com/maramotto",
      "https://www.linkedin.com/in/mara-crespo/"
    ]
  }
}
</script>
`,
  },
};

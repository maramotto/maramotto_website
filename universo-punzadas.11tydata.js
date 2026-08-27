const TITLES = {
  es: "Universo Punzadas — Catálogo de referencias culturales de Punzadas Sonoras",
  en: "Universo Punzadas — Cultural Reference Catalogue for the Punzadas Sonoras Podcast",
};

const DESCRIPTIONS = {
  es: "Universo Punzadas cataloga las obras, autoras y referencias citadas en el podcast Punzadas Sonoras: buscador, gráficos y una ficha por cada autor, obra y episodio.",
  en: "Universo Punzadas catalogues the works, authors and references cited in the Punzadas Sonoras podcast: a search engine, charts and a profile for every author, work and episode.",
};

const SOCIAL_DESCRIPTIONS = {
  es: "Un catálogo navegable de las obras, autoras y referencias citadas en el podcast Punzadas Sonoras, con buscador y gráficos.",
  en: "A browsable catalogue of the works, authors and references cited in the Punzadas Sonoras podcast, with search and charts.",
};

const JSONLD_DESCRIPTIONS = {
  es: "Catálogo navegable de las referencias culturales citadas en el podcast Punzadas Sonoras: qué se cita, quién lo cita y en qué episodio.",
  en: "Browsable catalogue of the cultural references cited in the Punzadas Sonoras podcast: what's cited, who cites it, and in which episode.",
};

module.exports = {
  eleventyComputed: {
    title: (data) => TITLES[data.lang],
    description: (data) => DESCRIPTIONS[data.lang],
    socialDescription: (data) => SOCIAL_DESCRIPTIONS[data.lang],
    structuredData: (data) => `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Universo Punzadas",
  "description": ${JSON.stringify(JSONLD_DESCRIPTIONS[data.lang])},
  "applicationCategory": "WebApplication",
  "operatingSystem": "Web",
  "url": "https://maramotto.com${data.page.url}",
  "author": {
    "@type": "Person",
    "name": "Mara",
    "alternateName": "maramotto",
    "url": "https://maramotto.com"
  },
  "license": "https://opensource.org/licenses/MIT",
  "codeRepository": "https://github.com/maramotto/punzadassonoras",
  "sameAs": ["https://universopunzadas.com"],
  "keywords": ["podcast catalogue", "data sonification", "cultural references", "Astro", "React", "creative technologist"]
}
</script>
`,
  },
};

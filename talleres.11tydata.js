const TITLES = {
  es: "Talleres — maramotto",
  en: "Workshops — maramotto",
};

const DESCRIPTIONS = {
  es: "Talleres de creatividad para adultos con Mara — arte, código y curiosidad.",
  en: "Creativity workshops for adults with Mara — art, code and curiosity.",
};

module.exports = {
  eleventyComputed: {
    title: (data) => TITLES[data.lang],
    description: (data) => DESCRIPTIONS[data.lang],
  },
};

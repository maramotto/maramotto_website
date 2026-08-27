const TITLES = {
  es: "Aviso legal — maramotto",
  en: "Legal notice — maramotto",
};
const DESCRIPTIONS = {
  es: "Información legal del sitio maramotto.com.",
  en: "Legal information for maramotto.com.",
};
module.exports = {
  eleventyComputed: {
    title: (data) => TITLES[data.lang],
    description: (data) => DESCRIPTIONS[data.lang],
  },
};

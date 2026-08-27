const TITLES = {
  es: "Privacidad — maramotto",
  en: "Privacy — maramotto",
};
const DESCRIPTIONS = {
  es: "Política de privacidad del sitio maramotto.com.",
  en: "Privacy policy for maramotto.com.",
};
module.exports = {
  eleventyComputed: {
    title: (data) => TITLES[data.lang],
    description: (data) => DESCRIPTIONS[data.lang],
  },
};

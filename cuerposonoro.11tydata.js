const TITLES = {
  es: "CuerpoSonoro — Arte Interactivo | Movimiento Corporal y Sonido en Tiempo Real",
  en: "CuerpoSonoro — Interactive Art | Real-Time Body Movement and Sound",
};

const DESCRIPTIONS = {
  es: "CuerpoSonoro: arte interactivo que transforma el movimiento del cuerpo humano en sonido en tiempo real. Un proyecto de creative coding y tecnología creativa por maramotto, en la intersección del arte, la tecnología y el cuerpo.",
  en: "CuerpoSonoro: interactive art that turns human body movement into real-time sound. A creative coding and creative technology project by maramotto, at the intersection of art, technology and the body.",
};

const SOCIAL_DESCRIPTIONS = {
  es: "Arte interactivo que transforma el movimiento del cuerpo humano en sonido en tiempo real. Creative coding y tecnología creativa por maramotto.",
  en: "Interactive art that turns human body movement into real-time sound. Creative coding and creative technology by maramotto.",
};

const JSONLD_DESCRIPTIONS = {
  es: "Arte interactivo que transforma el movimiento del cuerpo humano en sonido en tiempo real. Creative coding, tecnología creativa y arte interactivo.",
  en: "Interactive art that turns human body movement into real-time sound. Creative coding, creative technology and interactive art.",
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
  "name": "CuerpoSonoro",
  "description": ${JSON.stringify(JSONLD_DESCRIPTIONS[data.lang])},
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Web, Linux",
  "url": "https://maramotto.com${data.page.url}",
  "author": {
    "@type": "Person",
    "name": "Mara",
    "alternateName": "maramotto",
    "url": "https://maramotto.com"
  },
  "license": "https://opensource.org/licenses/MIT",
  "codeRepository": "https://github.com/maramotto/cuerposonoro",
  "keywords": ["interactive art", "creative coding", "body interaction", "real-time sound", "computer vision", "arte interactivo", "tecnología creativa"]
}
</script>
`,
  },
};

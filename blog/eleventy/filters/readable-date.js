const MONTHS_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
const MONTHS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function readableDate(date, lang) {
  const d = new Date(date);
  const day = d.getUTCDate();
  const year = d.getUTCFullYear();
  if (lang === "en") {
    return `${MONTHS_EN[d.getUTCMonth()]} ${day}, ${year}`;
  }
  return `${day} de ${MONTHS_ES[d.getUTCMonth()]} de ${year}`;
}

module.exports = readableDate;

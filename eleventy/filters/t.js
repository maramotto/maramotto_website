function t(i18nData, key, lang) {
  return i18nData[lang]?.[key] ?? i18nData.es?.[key] ?? key;
}

module.exports = t;

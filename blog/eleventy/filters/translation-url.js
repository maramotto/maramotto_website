function translationUrl(posts, translationKey, targetLang) {
  const match = posts.find(
    (post) => post.data.translationKey === translationKey && post.data.lang === targetLang
  );
  return match ? match.url : null;
}

module.exports = translationUrl;

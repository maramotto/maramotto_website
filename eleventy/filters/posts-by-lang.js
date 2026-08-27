function postsByLang(posts, lang) {
  return posts.filter((post) => post.data.lang === lang);
}

module.exports = postsByLang;

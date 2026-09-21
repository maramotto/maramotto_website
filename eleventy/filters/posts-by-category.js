function postsByCategory(posts, category) {
  return posts.filter((post) => post.data.category === category);
}

module.exports = postsByCategory;

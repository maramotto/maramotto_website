function postsByTag(posts, tag) {
  return posts.filter((post) => Array.isArray(post.data.tags) && post.data.tags.includes(tag));
}

module.exports = postsByTag;

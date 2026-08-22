const WORDS_PER_MINUTE = 200;

function readingTime(content) {
  const text = String(content).replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean);
  return Math.max(1, Math.round(words.length / WORDS_PER_MINUTE));
}

module.exports = readingTime;

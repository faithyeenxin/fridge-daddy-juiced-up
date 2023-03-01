export function wordContainsSubstring(word: string, substring: string) {
  // Convert both the word and substring to lowercase
  word = word.toLowerCase();
  substring = substring.toLowerCase();
  // If the substring is longer than the word, it cannot be a substring
  if (substring.length > word.length) {
    return false;
  }

  // Loop through the word and check if the substring is present
  for (let i = 0; i < word.length - substring.length + 1; i++) {
    if (word.substring(i, i + substring.length) === substring) {
      // If the substring is found, return true
      return true;
    }
  }

  // If the substring is not found, return false
  return false;
}

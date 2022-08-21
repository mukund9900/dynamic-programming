/* 
Word break (problem)
Given a string s and a list of words, check if we can break s into words from the list (A same word can be used multiple times).



Example:

input:
s = "catsandogsareanimals"
words = ["cats", "dog", "sand", "and", "cat", "mals", "san", "dogs", "are", "animal", "ani", "og", "sar"]

output: true

explanation: s is also equal to "cat"+"san"+"dogs"+"are"+"ani"+"mals", and all of these parts are in words
*/

function word_break(s, words) {
  function rec(s, words, i = 0) {
    if (i == s.length) return true;
    else {
      for (let j = i + 1; j < s.length + 1; j++) {
        if (words.includes(s.substring(i, j) && rec(s, words, j))) {
          return true;
        }
      }
      return false;
    }
  }
  return rec(s, words);
}
// use memoization
function word_break(s, words) {
  function rec(s, words, i = 0, lookup = {}) {
    if (lookup[i]) return lookup[i];
    if (i == s.length) return true;
    else {
      for (let j = i + 1; j < s.length + 1; j++) {
        if (words.includes(s.substring(i, j) && rec(s, words, j, lookup))) {
          lookup[i] = true;
          return lookup[i];
        }
      }
      lookup[i] = false;
      return lookup[i];
    }
  }
  return rec(s, words);
}
/*
["cats", "dog", "sand", "and", "cat", "mals", "san", "dogs",
 "are", "animal", "ani", "og", "sar"] 
 */
// use tabulation

// S  [c  a  t  s  a  n  d  o  g  s  a  r  e  a  n  i  m  a  l  s]
// DP
// [T  F  F  T  T  F  T  T  F  T  T  F  T  T  F  F  T  F  F  T  T

function dp_wordBreak(s, words) {
  let n = s.length;
  dp[0] = true;
  for (let i = 1; i < n + 1; i++) {
    for (let j = 0; j < i; j++) {
      if (words.includes(s.substring(j, i)) && dp[j]) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[n];
}

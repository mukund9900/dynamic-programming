"use strict";
/* 
w1 = 'I N S I D E'
W2 = 'I N D E X'

The edit distance in this problem is defined as the 
minimum number of insertions, deletions, and substitutions of characters 
to go from word1 to word2.

HERE REMOVING S, I AND INSERTING X IN w1 MAKES IT AS TOTAL OF 3 MOVES OR MINIMUM DISTANCE;

*/

function minOperations(s1, s2, i = 0, j = 0, lookup = {}) {
  if (lookup[`${i}${j}`]) return lookup[`${i}${j}`];
  if (i == s1.length) return s2.length - j;
  else if (j == s2.length) return s1.length - i;
  else if (s1[i] == s2[j]) {
    lookup[`${i}${j}`] = minOperations(s1, s2, i + 1, j + 1);
    return lookup[`${i}${j}`];
  } else {
    lookup[`${i}${j}`] =
      1 +
      Math.min(
        minOperations(s1, s2, i + 1, j, lookup),
        minOperations(s1, s2, i, j + 1, lookup),
        minOperations(s1, s2, i + 1, j + 1, lookup)
      );
    return lookup[`${i}${j}`];
  }
}

function minOperations_tabulation(s1, s2) {
  let n = s1.length;
  let m = s2.length;

  let dp = Array.prototype.generateMatrix(n + 1, m + 1);

  dp[0].forEach((ele, i) => {
    dp[0][i] = i;
  });
  dp.forEach((ele, i) => {
    dp[i][0] = i;
  });

  for (let i = 1; i < n + 1; i++) {
    for (let j = 0; j < m; j++) {
      if (s1[i - 1] == s2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else
        dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]);
    }
  }
  return dp[n][m];
}

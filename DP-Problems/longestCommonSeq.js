"use strict";

/* 
lcs(i,j):
  0 if(i = |s1| or j = |s2|);
  1 + lcs(i+1, j+1)  if(s1(i) = s2(j));
  max(lcs(i+1, j) , lcs(i, j+1)) otherwise;
*/
/* 
abcdaf
acbcf

==> abcf

*/

/* 
                        lcs(0,0)
                            |    
                        /         \
                lcs(0,1)       lcs(1,0)
                /     \            /     \
            lcs(1,2)  lcs(1,1)  lcs(2,1)  lcs(1,1)
            .
            .
            . 
*/
function longestCommonSequence(s1, s2, i = 0, j = 0, lookup = {}) {
  if (lookup[`${i}${j}`]) return lookup[`${i}${j}`];

  if (i == s1.length || j == s2.length) return 0;
  else if (s1[i] == s2[j]) {
    lookup[`${i}${j}`] = 1 + longestCommonSequence(s1, s2, i + 1, j + 1);
    return lookup[`${i}${j}`];
  } else {
    lookup[`${i}${j}`] = Math.max(
      longestCommonSequence(s1, s2, i, j + 1),
      longestCommonSequence(s1, s2, i + 1, j)
    );
    return lookup[`${i}${j}`];
  }
} /* 
TC: n+1 m+1 * o(1) = o(nm);
SC: o(nm);
*/

// top down method;

function lcs_topDown(s1, s2) {
  let n = s1.length;
  let m = s2.length;

  let lookup = Array(m).fill(Array(n + 1));
  lookup.unshift(Array(n + 1).fill(0)); //first row zero;
  lookup.map((o) => (o[0] = 0)); // first column zero;

  /* 
  First column and first row is zeros because
   |lcs("", s)| = 0
  */

  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      if (s1[i] == s2[j]) {
        lookup[i][j] = 1 + lookup[i - 1][j - 1];
      } else {
        lookup[i][j] = Math.max(lookup[i][j - 1], lookup[i - 1][j]);
      }
    }
  }
  return lookup[n][m]
}

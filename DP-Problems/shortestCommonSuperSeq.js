/* 
shortest common supersequence;

ex:

a g g t a b
g x t x a y b

1. merging => aggtabgxtxayb; this is a super sequence of the both string above.
2. we need to get the shortest sequence
3. **it should maintain the order of character of s1 and  s1 in supersequence**
4. **it need not to be continous**
                                        ___________
so we cna take the common chars; => a g g x t x a y b
                                   ``````   `   `   `
**length of common supersequence is s1 + s2 -lcs(s1,s2);

*/
/*       
         |s2| - j  if i = |s1|

         |s1| - i  if j = |s2|
SCS ==>         
         1 + SCS(i+1, j+1) if(s1[i] == s2[j])

         1+ Min(SCS(i, j+1), SCS(i+1, j))  otherwise
  
*/
function SCS(s1, s2, i = 0, j = 0, lookup = {}) {
  if (lookup[`${i}${j}`]) return lookup[`${i}${j}`];

  if (i == s1.length) return s2.length - j;
  else if (j == s2.length) return s1.length - i;
  else if (s1[i] == s2[j]) {
    lookup[`${i}${j}`] = 1 + SCS(s1, s2, i + 1, j + 1);
    return lookup[`${i}${j}`];
  } else {
    lookup[`${i}${j}`] =
      1 + Math.min(SCS(s1, s2, i, j + 1), SCS(s1, s2, i + 1, j));
    return lookup[`${i}${j}`];
  }
}
/* 
recursive TC: 2^n+m
Memoization TC: n*m
tabulation TC: n*m
*/

function scs_topDown(s1, s2) {
  let n = s1.length;
  let m = s2.length;

  let lookup = Array.prototype.generateMatrix(n + 1, m + 1);

  // first row scs of empty string and length ;
  lookup[0].map((o, i) => (lookup[0][i] = i));
  // first column scs of empty string and length;
  lookup.map((o, i) => (o[0] = i));
  /* 
  First column and first row is zeros because
   |scs("", s)| = |s|
  */

  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      if (s1[i] == s2[j]) {
        lookup[i][j] = 1 + lookup[i - 1][j - 1];
      } else {
        lookup[i][j] = 1 + Math.min(lookup[i][j - 1], lookup[i - 1][j]);
      }
    }
  }
  return lookup[n][m];
}

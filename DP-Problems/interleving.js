/* 
Interleaving string (problem)
Given 3 strings s1, s2, and s3, check if s3 can be formed by an interleaving of s1 and s2.

An interleaving of two strings s and t is a configuration
 where they are divided into non-empty substrings such that:

s = s1 + s2 + ... + sn

t = t1 + t2 + ... + tm

|n - m| <= 1

The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2 + t3 + s3 + ...

Example:

input:
s1 = "aabcc"
s2 = "dbbca"
s3 = "aadbbcbcac"

output: true

explanation:
s1 = "aabcc" = "aa" + "bc" + "c"
s2 = "dbbca" = "dbbc" + "a"
s3 = "aadbbcbcac" = "aa" + "dbbc" + "bc" + "a" + "c"
You can see that we could make s3 by taking "aa" from s1, "dbbc" from s2, "bc" from s1, "a" from s2, and "c" from s1


*/

/* 
if i = |s1| |s2| = j true;
if s1[i] =! s3[i+j] != s2[j] false;

if s1[i] = s3[i+j] != s2[j] inter(i+1, j)
if s1[i] != s3[i+j] = s2[j] inter(i, j+1)
if s1[i] = s3[i+j] = s2[j] inter(i+1, j) || inter(i, j+1)
*/

function interleaving(s1, s2, s3, i = 0, j = 0) {
  if (s1.length + s2.length != s3.length) return false;
  if (i == s1.length && j == s2.length) return true;

  let check_s1 =
    i < s1.length && s1[i] == s3[i + j] && interleaving(s1, s2, s3, i + 1, j);
  let check_s2 =
    j < s2.length && s2[i] == s3[i + j] && interleaving(s1, s2, s3, i, j + 1);

  return check_s1 || check_s2;
}

/* 

Number of sub problem is 2 n,m
tc 2^n+m

overlaping sub problems
inter(0,0) =inter(1,0)

inter (2,0)

inter (2,1)  here both s1 and s2 has 'b'

inter (3,1) or inter(2,2)

from 3,1 we have 3,2

from 2,2 we have 3,2 or 2,3

here we founf 3,2 and 3,2 as overlapped

... we may have multiple over laping issues

*/

// memoization

function inter(s1, s2, s3, i = 0, j = 0, lookup = {}) {
  if (lookup[`${i}${j}`]) return lookup[`${i}${j}`];

  if (s1.length + s2.length != s3.length) return false;
  if (i == s1.length && j == s2.length) return true;

  let check_s1 =
    i < s1.length &&
    s1[i] == s3[i + j] &&
    interleaving(s1, s2, s3, i + 1, j, lookup);

  let check_s2 =
    j < s2.length &&
    s2[i] == s3[i + j] &&
    interleaving(s1, s2, s3, i, j + 1, lookup);

  lookup[`${i}${j}`] = check_s1 || check_s2;
  return lookup[`${i}${j}`];
}

//////////////////////////
// tabulation

function interlev(s1, s2, s3) {
  let n = s1.length;
  let m = s2.length;

  let dp = Array.prototype.generateMatrix(n + 1, m + 1);

  dp[0][0] = true; //since we can interleave an empty string out of 2 empty strings

  // column
  for (let i = 1; i < n + 1; i++)
    dp[i][0] = s1[i - 1] == s3[i - 1] && dp[i - 1][0];

  for (let j = 1; j < m + 1; j++)
    dp[0][j] = s2[j - 1] == s3[j - 1] && dp[j - 1][0];

  for (let i = 0; i < n + 1; i++) {
    for (let j = 0; j < m + 1; j++) {
      let check_s1 = s1[i - 1] == s3[i + j - 1] && dp[i - 1][j];
      let check_s2 = s2[j - 1] == s3[i + j - 1] && dp[i][j - 1];
      dp[i][j] = check_s1 || check_s2;
    }
  }
  dp[n][m];
}

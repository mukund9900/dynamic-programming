/* 

Count sorted vowel strings (problem).

Given an integer n, return the number of strings of length n that consist only of vowels (a, e, i, o, u) and are lexicographically sorted.
A string s is lexicographically sorted if each character comes before or same as the next one in the alphabet.

Example 1:
Input: n = 2
Output: 15

Explanation: sorted vowel strings of size 2 are:

aa, ae, ai, ao, au, ea, ee, ei, eo, eu, ii, io, iu, oo, ou, uu

Example 2:
Input: n = 9
Output: 715

*/
function counter(n, last = "") {
  if (n == 0) return 1;

  let nb = 0;
  for (let vowel of ["a", "e", "i", "o", "u"]) {
    if (last <= vowel) {
      nb += counter(n - 1, vowel);
    }
  }
  return nb;
}
// this method has o(5^n)

// memoization
function counter(n, last = "", lookup) {
  if (lookup[`${n}${last}`]) return lookup[`${n}${last}`];

  if (n == 0) return 1;

  let nb = 0;
  for (let vowel of ["a", "e", "i", "o", "u"]) {
    if (last <= vowel) {
      nb += counter(n - 1, vowel, lookup);
    }
  }
  lookup[`${n}${last}`] = nb;
  return lookup[`${n}${last}`];
}
/* 

the number of strings of k size that start woth vowel, 
is sum of the strings of k-1 size that start with same vowel
  as beginning with out breaking the order 

_________________________
n)  a  e  i  o  u
________________________
1)  1  1  1  1  1       == sum 5
------------------------
2)  5  4  3  2  1       == sum 15
-------------------------
3)  15 10 6  3  1       == sum 35
-------------------------
4)  35 20 10 4  1       == sum 70
*/

function dp_vowel(n) {
  const No_VOWEL = 5;
  let dp = Array.prototype.generateMatrix(n, 5);
  dp[0].fill(1);
  for (let i = 1; i < n; i++) {
    dp[i][0] =
      dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][2] + dp[i - 1][3] + dp[i - 1][4];
    dp[i][1] = dp[i - 1][1] + dp[i - 1][2] + dp[i - 1][3] + dp[i - 1][4];
    dp[i][2] = dp[i - 1][2] + dp[i - 1][3] + dp[i - 1][4];
    dp[i][3] = dp[i - 1][3] + dp[i - 1][4];
    dp[i][4] = dp[i - 1][4];
  }
  return dp[n - 1].reduce((a, b) => a + b, 0);
}

/////////////////////////////
// using mathematics
// here we are doing combinations with out repetations

/* 
nCn-r  =  (n + r -1)! / r! (n-1)! here n is size of vowels, r is the combination string size;
       =   (5+ r-1)! / r! (4!) = (r+4)!/4!
       = (r+4)(r+3)(r+2)(r+1)/24

       THANK YOU MATHEMATICS
*/
function vowelCombination(r) {
  return ((r + 4) * (r + 3) * (r + 2) * (r + 1)) / 24;
}

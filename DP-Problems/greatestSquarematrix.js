/* 
Square matrix of ones (problem)
Given a matrix of ones and zeros, find the area of the greatest square submatrix full of ones.

A square matrix is a matrix whose the number of rows is equal to the number of columns.

Example:

intput:
m = [
   [0, 0, 1, 1, 1, 0],
   [1, 0, 1, 1, 1, 1],
   [0, 1, 1, 1, 1, 0],
   [1, 1, 1, 1, 0, 1],
   [0, 1, 0, 1, 1, 1]
]

output: 9

solution:
here in m the j2 till j4 with i0 till i2 have full of ones.

how to decide a greatest matrix.

=> lets take i, j and see if i-1 and j-1 is 1s 
=> let see if i-1 j and j-1 i is 1s 1s

0                ..........    if i<0 or j<0 or m[i][j] is 0

1 + min(         ..........    otherwise
    rec(i-1,j-1)
    rec(i-1,j)
    rec(i,j-1)
)                   
*/
//recursive;
function rec(m, i, j, lookup) {
  if (i < 0 || j < 0 || m[i][j] == 0) return 0;
  else {
    return (
      1 + Math.min(rec(m, i - 1, j - 1), rec(m, i - 1, j), rec(m, i, j - 1))
    );
  }
}
// memoization;
function recOfOnes(m, i, j, lookup) {
  if (lookup[`${i}${j}`]) return lookup[`${i}${j}`];
  if (i < 0 || j < 0 || m[i][j] == 0) return 0;
  else {
    lookup[`${i}${j}`] =
      1 +
      Math.min(
        recOfOnes(m, i - 1, j, lookup),
        recOfOnes(m, i, j - 1, lookup),
        recOfOnes(m, i - 1, j - 1, lookup)
      );
    return lookup[`${i}${j}`];
  }
}
//finding square
function greatestSquare(matrix) {
  let n = matrix.length;
  let m = matrix[0].length;
  let max_size = 0;
  let lookup = {};

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      max_size = Math.max(max_size, recOfOnes(matrix, i, j, lookup));
    }
  }
  return Math.pow(max_size, 2);
}
//TC = 3^n+m;

// tabulation

// first row and first column will always have dp [i][j] either 1 or 0 because of ize

function greatestSquare_v2(matrix) {
  let n = matrix.length;
  let m = matrix[0].length;

  let dp = Array.prototype.generateMatrix(n, m);

  dp[0][0] = matrix[0][0];
  for (let j = 1; j < m; j++) {
    dp[0][j] = matrix[0][j];
  }
  for (let i = 1; i < n; i++) {
    dp[i][0] = matrix[i][0];
  }
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      if (matrix[i][j] == 0) dp[i][j] = 0;
      else
        dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  console.log(dp);
  return Math.max.apply(null, [].concat(...dp)) ** 2;
}

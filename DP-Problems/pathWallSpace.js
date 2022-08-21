"use strict";

// lets start with recursive way and with memoization;
function possiblePaths(matrix, i = 0, j = 0, lookup) {
  const m = matrix[0].length;
  const n = matrix.length;

  if (!lookup) lookup = {};
  if (lookup[`${i}${j}`]) return lookup[`${i}${j}`];

  // n*m matrix;

  if (i == n || j == m || matrix[i][j] == 1) return 0;
  else if (i == n - 1 && j == m - 1) return 1;
  else {
    lookup[`${i}${j}`] =
      possiblePaths(matrix, i + 1, j, lookup) +
      possiblePaths(matrix, i, j + 1, lookup);
    return lookup[`${i}${j}`];
  }
}
/* 
TC: o(1) * nm = o(nm);
SC: o(1);
*/

// let try with tabulation with bottom-up aproach;
function possiblePaths(matrix) {
  const m = matrix[0].length;
  const n = matrix.length;
  let lookup = Array(n).fill(Array(m));
  if (matrix[0][0] == 0) lookup[0][0] = 1;
  else lookup[0][0] = 0;

  for (let j = 1; j < m; j++) {
    lookup[0][j] = matrix[0][j] == 0 ? lookup[0][j - 1] : 0;
  }
  for (leti = 1; i < n; i++) {
    lookup[i][0] = matrix[i][0] == 0 ? lookup[i - 1][0] : 0;
  }
  for (leti = 1; i < n; i++) {
    for (letj = 1; j < m; j++) {
      lookup[i][j] =
        matrix[i][j] == 0 ? lookup[i - 1][j] + lookup[i][j - 1] : 0;
    }
  }
  return lookup[n - 1][m - 1];
}

//reduing sc:

//////////////////////////////////

function paths(arr, i = 0, j = 0) {
  if (i == n || j == m || arr[i][j] == 0) return 0;
  if (i == n - 1 || j == n - 1) return 1;
  else return paths(arr, i + 1, j) + paths(arr, i, j + 1);
}

/* 
initially take the smallest dp value if 0,0 is 0 then dp(0,0)=1 else 0;
then read the first dp row by check i.e., dp[0][j] = dp[0][j-1] if matrix[0][j] else 0
similarly to column also dp[0][i] = dp[0][i-1] if matrix[0][i] else 0


*/
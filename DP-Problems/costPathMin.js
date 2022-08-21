"use strict";
/* 
finding the cost of the minimun path in matrix

starting from 0,0 to n-1,m-1


cost (i, j) ==>

  if(i=n-1 && j=n-1) then matrix[i][j];

  if(j=m-1) matrix[][] + cost(i+1, j);
  if(i=n-1) matrix[][] + cost(i, j+1);
  else matrix[i][j] + min (cost(i,j+1), cost(i+1, j));

*/
//Top-down method;
function cost_topDown(matrix, i = 0, j = 0, lookup) {
  const m = matrix[0].length;
  const n = matrix.length;

  if (!lookup) lookup = {};
  if (lookup[`${i}${j}`]) return lookup[`${i}${j}`];

  if (i == n && j == m) return matrix[i][j];
  if (i == n - 1 && j == m - 1) return matrix[i][j];
  else if (j == m - 1) {
    lookup[`${i}${j}`] = matrix[i][j] + cost(matrix, i + 1, j, lookup);
    return lookup[`${i}${j}`];
  } else if (i == n - 1) {
    lookup[`${i}${j}`] = matrix[i][j] + cost(matrix, i, j + 1, lookup);
    return lookup[`${i}${j}`];
  } else {
    lookup[`${i}${j}`] =
      matrix[i][j] +
      Math.min(cost(matrix, i + 1, j, lookup), cost(matrix, i, j + 1, lookup));
    return lookup[`${i}${j}`];
  }
}

/* 
with recursive:
time complexity ==> (2^n+m) which is too bad;
space compexity ==> o(n+m);

with memoization:
time complexity is m*n+o(1);
Space complexity is o(m*n);
*/

/////////////////////////////////////////////////////////////////////////////////////

/* Bottom-up method */
function cost_bottomUp(matrix) {
  const m = matrix[0].length;
  const n = matrix.length;
  let lookup = Array(n).fill(Array(m));

  lookup[0][0] = matrix[0][0];
  for (let j = 1; j < m; j++) {
    lookup[0][j] = matrix[0][j - 1] + lookup[0][j - 1];
  }
  for (let i = 1; i < n; i++) {
    lookup[i][0] = matrix[i - 1][0] + lookup[i - 1][0];
  }
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      lookup[i][j] =
        matrix[i][j] + Math.min(lookup[i - 1][j], lookup[i][j - 1]);
    }
  }
  return lookup[n - 1][m - 1];
}
/* 
with tabulation technique:

time complexity: o(m-1) + o(n-1) + o(n-1)*o(m-1) => 2o(n) + o(n^2) => o(n^2);
space complexity: o(n*m);

*/
// to maintain space complexity, lets use the same matrix given as input for looking up
function cost_bottomUp_maintain_spaceComplex(matrix) {
  const m = matrix[0].length;
  const n = matrix.length;

  for (let j = 1; j < m; j++) {
    matrix[0][j] += matrix[0][j - 1];
  }
  for (let i = 1; i < n; i++) {
    matrix[i][0] += matrix[i - 1][0];
  }
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      matrix[i][j] += Math.min(
        matrix[i - 1][j],
        matrix[i][j - 1],
        matrix[i - 1][j - 1]
      );
    }
  }
  return matrix[n - 1][m - 1];
}

//////////////////////////////

/* 
cost(0,0 )
cost (0,1) + cost (1,0)


*/

function costMin(arr, i = 0, j = 0) {
  if (i == n - 1) return arr[i][j] + costMin(arr, i, j + 1);
  if (j == m - 1) return arr[i][j] + costMin(arr, i + 1, j);
  if (i == n - 1 && j == m - 1) return arr[i][j];
  return arr[i][j] + Math.min(costMin(arr, i + 1, j), costMin(arr, i, j + 1));
}

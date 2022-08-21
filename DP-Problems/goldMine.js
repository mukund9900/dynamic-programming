/* 
[
[3,2,12,15,10],
[6,19,7,11,17],
[8,5,12,32,21],
[3,20,2,9,7]
]
*/
// ex for above mine => i5=>17=>32=>9;
/*
each cell/mine represents the amount of gold.

can start from any where in the top row and has to exit from any where in the bottom row.
can move ONLY one step: digonally as right left and bottom;

solve for maximum gold to steal while exiting.
*/
/*

               j
        ----------------
        3, 2, 12, 15, 10
        ----------------
i       6, 19, 7, 11, 17
        ----------------
        8, 5, 12, 32, 21
        ----------------
        3, 20, 2, 9, 7
        ----------------
*/

function miner(mine, i, j, lookup = {}) {
  // console.log(lookup)
  let n = mine.length,
    m = mine[0].length;
  if (lookup[`${i}${j}`]) return lookup[`${i}${j}`];
  if (i == n || j < 0 || j == m) return 0;
  else {
    lookup[`${i}${j}`] =
      mine[i][j] +
      Math.max(
        miner(mine, i + 1, j + 1, lookup), //right
        miner(mine, i + 1, j, lookup), //bottom
        miner(mine, i + 1, j - 1, lookup) //left
      );
    return lookup[`${i}${j}`];
  }
}

function goldMine(mine) {
  let max_mine = 0;
  for (let n = 0; n < mine[0].length; n++) {
    max_mine = Math.max(max_mine, miner(mine, 0, n));
  }
  return max_mine;
}
/* 
for recursive time complx.. = 3^n;
stack is o(n)

using memoization
TC = o(nm);
SC = o(n);
*/

//top down approach;

/* 
               j
        -------------------------------------------
        3,           2,     12,    15,      10
        --------------------------------------------
i       6+3,       19+12,        7+15,  11+15,      17+15
        --------------------------------------------
        8+(19+12),       5+(19+12), 12+(19+12), 32+(17+15), 21+(17+15)
        --------------------------------------------
        3+(5+(19+12)), 20+12+(19+12), 2+32+(17+15), 9+32+(17+15), 7+32+(17+15)
        ---------------------------------------------

*/

function mxGoldMine(mine) {
  let n = mine.length,
    m = mine[0].length;

  let dp = Array.from({ length: n });
  dp.forEach((v, i) => {
    dp[i] = Array.from({ length: m });
  });
  dp[0] = mine[0];

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < m; j++) {
      dp[i][j] =
        mine[i][j] +
        Math.max(
          j - 1 >= 0 ? dp[i - 1][j - 1] : 0,
          dp[i - 1][j],
          j + 1 < m ? dp[i - 1][j + 1] : 0
        );
    }
  }
  return dp;
}

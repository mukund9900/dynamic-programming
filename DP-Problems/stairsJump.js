/* 
                    __ (nth step)
                 __|   
              __|
           __|
        __|  
      __| (0th step)

      ways(n) = sumation of ways(n-jumps);
*/
/* 
given nth step
jumps in an array

ex: n = 10; jumps = [2,4,5,8];
finds possible ways to reach n using these jumps
jump[i] = 4 means its a 4 steps jump.
*/

function ways(n, jumps) {
  let noWays = 0;
  if (n == 0) return 1;
  else {
    for (let jump of jumps) {
      if (n - jump >= 0) {
        noWays += ways(n - jump, jumps);
      }
    }
  }
  return noWays;
}
// add memoization;
function ways_memo(n, jumps, lookup = {}) {
  let noWays = 0;
  if (lookup[n]) return lookup[n];
  if (n == 0) return 1;
  else {
    for (let jump of jumps) {
      if (n - jump >= 0) {
        noWays += ways_memo(n - jump, jumps, lookup);
      }
    }
    lookup[n] = noWays;
    return lookup[n];
  }
}
// [2,4,5,8]
/* 
[                           ]

*/

function ways_tabulation(n, jumps) {
  let dp = [];
  dp[0] = 1;

  for (let i = 0; i < n + 1; i++) {
    for (let jump of jumps) {
      if (i - jump >= 0) dp[i] += dp[i - jump];
    }
  }
}

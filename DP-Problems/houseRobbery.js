"use strict";

function houseRobbery(arr, i = 0, lookup = []) {
  if (i >= arr.length) return 0;
  if (lookup[i]) return lookup[i];

  lookup[i] = Math.max(
    houseRobbery(arr, i + 2, lookup) + arr[i],
    houseRobbery(arr, i + 1, lookup)
  );
  return lookup[i];
}

//ex
//[4, 8, 12, 1, 2, 10, 3, 6, 8];

// tabulation method
function houseRobbery(arr) {
  arr[1] = Math.max(arr[0], arr[1]);
  for (let i = 2; i < arr.length; i++) {
    arr[i] = Math.max(arr[i] + arr[i - 2], arr[i - 1]);
  }
  return arr[arr.length - 1];
}
// TC = o(n) = SC

function houseRobbery(arr) {
  let before_prev = arr[0];
  let prev_dp = Math.max(arr[0], arr[1]);
  for (let i = 2; i < arr.length; i++) {
    dp = Math.max(arr[i] + before_prev, prev_dp);
    before_prev = prev_dp;
    prev_dp = dp;
  }
  return prev_dp;
}

//////////////////////////////////////

function rob(arr, i = 0) {
  if (i >= arr.length) return 0;
  return Math.max(arr[i] + rob(arr, i + 2), rob(arr, i + 1));
}

// tabulation

//[   4   8   12   1   2    2    10   ]

// dp[0] can be only arr[0] robber doesnt have any house to rob
// he cannot rob arr[0], during robbery of arr[1] as per the rules.
// so dp[1] = arr[1]
// now dp[i] = max(arr[i] + dp[i-2] , dp[i-1]);


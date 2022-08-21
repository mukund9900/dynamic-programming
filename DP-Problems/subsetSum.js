/* 
values = [1,2,3,1];

sum = 4

output = [1,2,1] [3,1] [1,3]

*/

/* 

ss(arr, k) => if i =|arr| then return 0;
             if k  < 0 return 0;
             if k = 0 return 1;

             ss(arr, k, i) = ss(arr, k-arr[i], i+1) + ss(arr, k, i+1);

*/
function subsetSum(arr, k, i = 0) {
  if (i == arr.length || k < 0) {
    return 0;
  } else if (k == 0) {
    return 1;
  } else {
    return subsetSum(arr, k - arr[i], i + 1), subsetSum(arr, k, i + 1);
  }
}

// memoization
function subsetSumMemo(arr, k, i = 0, lookup = {}) {
  if (lookup[`${i}${k}`]) return lookup[`${i}${k}`];
  if (i == arr.length || k < 0) {
    return 0;
  } else if (k == 0) {
    return 1;
  } else {
    lookup[`${i}${k}`] =
      subsetSumMemo(arr, k - arr[i], i + 1, lookup) +
      subsetSumMemo(arr, k, i + 1, lookup);
    return lookup[`${i}${k}`];
  }
}

// tabulation
function subsetSumTab(arr, k) {
  let n = arr.length;
  let m = k + 1;

  let dp = Array.prototype.generateMatrix(n, m);
  dp[0].fill(0);
  dp[0][0] = 1; //sum is zero
  if (arr[0] <= k) dp[0][arr[0]] = 1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      dp[i][j] = (j - arr[i] >= 0 ? dp[i - 1][j - arr[i]] : 0) + dp[i - 1][j];
      //   else
    }
  }
  dp[n - 1][m - 1];
}

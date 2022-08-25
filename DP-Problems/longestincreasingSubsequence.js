/* 
[7 5 2 4 7 2 3 6 4 5 12 1 7]

longest subseq = 2 3 4 5 12.

solution is to consider the prev as -Inf
consider:
here we can consider the next element and also not consider it so we have 2 ways for each node.

lis(0, -Inf) 
/\ 

lis(1, 7)    lis(1, -Inf) 
               /           \
                lis(2, 5)   lis(2, -Inf)
.
.
lis(2, 7)
^ because 5 is less than 7

finally the lis(i, prev) = Max(1 + lis(i+1, arr[i]), lis(i+1, prev))
*/

function lisRecusive(arr, i = 0, prev = -Infinity) {
  if (i == arr.length) return 0;
  if (arr[i] <= prev) return lisRecusive(arr, i + 1, prev);
  else return Math.max(1 + lisRecusive(arr, i + 1, arr[i]), lis(i + 1, prev));
}

// TC = o(2^n )  SC = o(n + 1) = o(n);

// different approach

/* 

val = [7  5  2  4  7  2  3  6  4  5   12  1   7]
ind = [0  1  2  3  4  5  6  7  8  9   10 11  12]

                       lis(arr)
                  (2)        |(3)
         (1)   rec(0)       rec(1)            ...................
              | >7           >5 |    >5
       (1)   rec(10)        rec(4) rec(7)
                             >7 |    >6|
                           rec(10) rec(10)
                                    |  >6 
                                   rec(12)

 in above exapmle from ind 0 the lis is 7,12 = 2 as length
 from ind 1 the lis is 5, 7, 12 = 3 as length
 
 rec(i) = 1 + Max(rec(j))  i+1 < j < |arr|  arr[j] > arr[i]
 lis(arr) = max rec(i)     0<i<|arr|

*/

function lis_rec(arr) {
  function rec(arr, i) {
    let maxLen = 0;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > arr[i]) {
        maxLen = Math.max(maxLen, rec(arr, j));
      }
    }
    return 1 + maxLen;
  }
  let maxArr = [];

  for (let i = 0; i < arr.length; i++) {
    maxArr.push(rec(arr, i));
  }
  return Math.max(maxArr);
}

/* 
TC: rec=> 2^n
lis => 2^n  

sc => o(n)
*/
// memoization
function lis(arr) {
  function rec(arr, i, lookup) {
    if (lookup[i]) return lookup[i];
    let maxLen = 0;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > arr[i]) {
        maxLen = Math.max(maxLen, rec(arr, j, lookup));
      }
    }
    lookup[i] = 1 + maxLen;
    return lookup[i];
  }
  let lookup = [];
  let maxLen = 0;

  for (let i = 0; i < arr.length; i++) {
    maxLen = Math.max(maxLen, rec(arr, i, lookup));
  }
  return maxLen;
}

// using dynamic programing Table method

function lis_dp(arr) {
  let dp = [];
  dp[0] = 1;
  let maxLis = 1;
  for (let i = 1; i < arr.length; i++) {
    let maxLen = 0;
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i] && dp[j] > maxLen) {
        maxLen = dp[j];
      }
    }
    dp[i] = 1 + maxLen;
    maxLis = Math.max(maxLis, dp[i]);
  }
  console.log(dp);
  return maxLis;
}

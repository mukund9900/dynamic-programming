/* 
Rod cutting (problem)
We want to sell a rod of size n, and to maximize the profit, we can cut it into multiple pieces. The price of a piece depends on its length, to know it, we are given an array prices where prices[i] represents the price of a piece of length i.

You are asked to find the maximum price that we can get by cutting it into pieces.

Note that you are allowed to sell it as a single piece of length n if it's the most profitable choice.



Example:

input:
n = 8
prices = [0, 1, 3, 5, 6, 7, 9, 10, 11]

output: 13

explanation: The most profitable way of cutting a rod of length 8 with the given prices is by cutting it into a piece of length 2 and two pieces of length 3
prices[2]+prices[2]+prices[3] = 3+5+5 = 13



Constraints:

n > 0
len(prices) == n+1
prices[0] == 0
prices[i] >= 0

*/

/* 
solution usally we were trying was like in ss or lis or scs we add or remove and see we get the value
but we were incrementing the i and we never look back
here we need to see if the same item by repeating and get the result
*/

/* 
maxPrice would be
   Maximun of [ ...
    price(i) + rob(n-i) 
   ]


0 if n=0
else maximun(price(i) + rod(i-1))

*/
// n is length of rod.
function rod(prices, n) {
  let maxPrice = 0;
  for (let length = 1; length < n + 1; length++) {
    maxPrice = Math.max(maxPrice, prices[length] + rod(prices, n - length));
  }
  return maxPrice;
}

function rod(prices, n, lookup = {}) {
  if (lookup[n]) return lookup[n];
  let maxPrice = 0;
  for (let length = 1; length < n + 1; length++) {
    maxPrice = Math.max(
      maxPrice,
      prices[length] + rod(prices, n - length, lookup)
    );
  }
  lookup[n] = maxPrice;
  return lookup[n];
}

//tabulation
//[0, p(1) + rod(0) + 0                                       ]
// dp[0]=0 and dp[1] = price(1)

function rod_dp(prices, n) {
  let dp = [];
  for (let i = 0; i < n + 1; i++) {
    for (let length = 0; length < i + 1; length++) {
      dp[i] = Math.max(dp[i], prices[length] + dp[i - length]);
    }
  }
  return dp[n - 1];
}

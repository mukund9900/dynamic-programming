/* 
Minimum cost for tickets (problem)
We are about to travel for a period of n days, during which we will use the train in some days that you can find in a given set train_days.

And to use the train, we have to possess either a 1-day pass, a 7-days pass, or a 30-days pass, each one of them has a price that you can find in a given array prices, where prices[0] represents the price of a 1-day pass, prices[1] represents the price of a 7-days pass, and prices[2] represents the price of a 30-days pass.

You are asked to find the minimum amount of money that we need to use the train during all the train days.



Example:

input:
train_days = [1, 3, 8, 9, 22, 23, 28, 31]
costs = [4, 10, 25]
n = 32

output: 28

explanation: The cheapest way is by buying

a 1-day pass on day 1, we use it on day 1

a 7-days pass on day 3, we use it during days 3, 8, and 9

a 7-days pass on day 22, we use it during days 22, 23, and 28

a 1-day pass on day 31, we use it on day 31

costs[0]+costs[1]+costs[1]+costs[0] = 4+10+10+4 = 28



Constraints:

n > 0
train days are between 0 inclusive and n exclusive
len(costs) == 3

*/

/* 
cost(day0) =>  cost(day1) => cost(2) with 1days pass or cost(8) with 7day pass or
                             cost(31) with 30 day pass

*/

//memoization
function costs(train_days, costs, n, day = 0, lookup = []) {
  if (lookup[day]) return lookup[day];
  if (day >= n) return 0;
  if (!train_days.includes(day))
    lookup[day] = costs(train_days, costs, n, day + 1); //move to next day
  else {
    lookup[day] = Math.min(
      costs[0] + costs(train_days, costs, n, day + 1, lookup),
      costs[1] + costs(train_days, costs, n, day + 7, lookup),
      costs[2] + costs(train_days, costs, n, day + 30, lookup)
    );
    return lookup[day];
  }
}

//tabulation

function costs_dp(train_days, costs, n) {
  let dp = Array.from({ length: n });
  for (let i = 0; i < dp.length; i++) {
    if (!train_days.includes(i)) dp[i] = i - 1 >= 0 ? dp[i - 1] : 0;
    else {
      let day_cost = (i - 1 >= 0 ? dp[i - 1] : 0) + costs[0];
      let week_cost = (i - 7 >= 0 ? dp[i - 7] : 0) + costs[1];
      let month_cost = (i - 30 >= 0 ? dp[i - 30] : 0) + +costs[2];
      dp[i] = Math.min(day_cost, week_cost, month_cost);
    }
  }
  return dp[n - 1];
}

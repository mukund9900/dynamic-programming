/* 

Example:

input:
s = "512810120129"

output: 4

explanation: There are 4 possible ways to decode s:
5   1   2   8   10   1   20   1   2   9
5   1   2   8   10   1   20   12   9
5   12   8   10   1   20   1   2   9
5   12   8   10   1   20   12   9

5 1 2 8 1 0 1 2 0 1 2 9


ways(5) = ways(1) + ways(12);

conditions to get the ways of decoding

   1                                i == |s|
   0                                s[i] == 0
  ways(i+1) + ways(i+2)            10 <= s[i]+s[i+1] <=26 && i+1 < |s|
  ways(i+1)                         otherwise

*/

function ways(s, i = 0) {
  if (i == s.length) return 1;
  if (Number(s[i]) == 0) return 0;
  else if (10 <= Number(s[i]) + Number([i + 1]) <= 26 && i + 1 < s.length) {
    return ways(s, i + 1) + ways(s, i + 2);
  } else {
    ways(s, i + 1);
  }
}

// memoization
function ways(s, i = 0, lookup) {
  if (lookup[i]) return lookup[i];
  if (i == s.length) return 1;
  if (Number(s[i]) == 0) return 0;
  else if (10 <= Number(s[i]) + Number([i + 1]) <= 26 && i + 1 < s.length) {
    lookup[i] = ways(s, i + 1) + ways(s, i + 2);
    return lookup[i];
  } else {
    lookup[i] = ways(s, i + 1);
    return lookup[i];
  }
}

// tabulation
function ways_dp(s) {
  let maxWays = 1;
  let dp = [];
  if (Number(s[0]) == 0) {
    return 0;
  }
  if (s.length == 1) return 1;
  dp[0] = 1;
  if (Number(s[1]) != 0 && 10 <= Number(s[0] + s[1]) <= 26) {
    dp[1] = 2;
  } else {
    dp[1] = 1;
  }

  for (let i = 1; i < s.length; i++) {
    if (Number(s[i]) != 0) {
      dp[i] += dp[i - 1];
    }
    if (10 <= Number(s[i - 1] + s[i]) <= 26) {
      dp[i] += dp[i - 2];
    }
  }
  return dp[s.length - 1];
}

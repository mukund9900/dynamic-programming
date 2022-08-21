"use strict";
Array.prototype.generateMatrix = function (height, width) {
  let dp = Array.from({ length: height });
  dp.forEach((v, i) => {
    dp[i] = Array.from({ length: width });
  });
  return dp;
};

/* 
ex: [2, 7, 3]
amoutn: 15

solu: 7 + 3 + 3 + 2 = 15 , this is the least ways to provide the amount 

possible coin changes       
===============>
           ............... coins(15-2) ------>

           ............... coins(15-7) ------>  coins(15)

           ............... coins(15-3) ------>


_coins(amount, coins) =>  if(amount > 0)
              1 + min( SUMATION _coins(n-i, coins))

             else 
              0 
*/
function minCoinChange(amount, coins) {
  function _coins(amount, coins, lookup = {}) {
    if (lookup[amount]) return lookup[amount];
    if (amount == 0) {
      return 0;
    } else {
      let minCoin = Infinity;
      for (let coin of coins) {
        if (amount - coin >= 0) {
          minCoin = Math.min(minCoin, 1 + _coins(amount - coin, coins, lookup));
        }
      }
      lookup[amount] = minCoin;
      return lookup[amount];
    }
  }
  const MIN_COINS = _coins(amount, coins);
  return MIN_COINS == Infinity ? -1 : MIN_COINS;
}

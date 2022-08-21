/* 
given:

values => 20 30 15 25 10
weight => 6  13 5  10  3

ex: knapsack capacity is 20,
  then possiblity is (6 + 10 + 3) = 19 <= 20 and corresponsing value is 55!

|        |  
|        |
|________|  => this knapsack has only capacity of X weights
               So find the maximum values that can added to kanpsack with 
               its total wieght less than or equal to knapsack capacity.

*/

/* 
knap(k,i) => 0 :  i=|v|
             knap(k, i+1)  : weight @ i > k

             otherwise:
             max(
                v@i + knap(k-v@i, i+1), add the weight @ i in the sack, 
                  or
                knap(k, i+1)   just move the i to next weight and see.
             )
*/

function knapSack(values, weights, k, i = 0) {
  if (i == values.length) {
    return 0;
  } else if (weights[i] > k) {
    return knapSack(values, weights, k, i + 1);
  } else {
    return Math.max(
      values[i] + knapSack(values, weights, k - weights[i], i + 1),
      knapSack(values, weights, k, i + 1)
    );
  }
}

// memoization:

function knapSack(values, weights, k, i = 0, lookup = {}) {
  if (lookup[`${k}${i}`]) return lookup[`${k}${i}`];
  if (i == values.length) {
    return 0;
  } else if (weights[i] > k) {
    lookup[`${k}${i}`] = knapSack(values, weights, k, i + 1);
    return lookup[`${k}${i}`];
  } else {
    lookup[`${k}${i}`] = Math.max(
      values[i] + knapSack(values, weights, k - weights[i], i + 1),
      knapSack(values, weights, k, i + 1)
    );
    return lookup[`${k}${i}`];
  }
}

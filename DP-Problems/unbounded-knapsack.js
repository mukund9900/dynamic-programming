/* 
given:

values => 6,7
weight => 5,5

ex: knapsack capacity is 10,
  then possiblity is (7+7) = 10(w) <= 20(w) and corresponsing value is 14!

|        |  
|        |
|________|  => this knapsack has only capacity of X weights
               So find the maximum values that can added to kanpsack with 
               its total wieght less than or equal to knapsack capacity.
               here we can consider n weight and m values infinitly available.

*/
/* 
knap(k,i) => 0 :  i=|v|
             knap(k, i+1)  : weight @ i > k

             otherwise:
             max(
                v@i + knap(k-w@i, i) add the weight @ i in the sack, 
                        here major diffeence we do not move to next item, sice we can take same item
                        multiple times, we check if wecan take again see if its max
                
                ,knap(k, i+1)   just move the i to next weight and see.
             )
*/

function knapSack_unbounded(values, weights, k, i = 0) {
  if (i == values.length) return 0;
  if (k < 0) return -Infinity;
  if (weights[i] > k) return knapSack_unbounded(values, weights, k, i + 1);
  else
    return Math.max(
      knapSack_unbounded(values, weights, k, i + 1),
      values[i] + knapSack_unbounded(values, weights, k, i)
    );
}

function knapSack_unbounded_v1(values, weights, k) {
  let max_value = 0;
  for (let i = 0; i < values.length; i++) {
    if (weights[i] <= k) {
      max_value = Math.min(
        max_value,
        knapSack_unbounded_v1(values, weights, k - weights[i])
      );
    }
  }
  return max_value;
}

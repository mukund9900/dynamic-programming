/* 


Example 1:

input:
arr = [4, 5, 3, 2, 5, 1]

output: true

explanation: We can split arr into [4, 3, 2, 1] and [5, 5], and they have the same sum
4+3+2+1 = 5+5 = 10



Example 2:

input:
arr = [5, 6, 2, 3, 8, 1]

output: false

explanation: We can't split arr into two subsets that have the same sum
*/

/* 
recursive thought... creating 2 partitions as sum1 and sum2 with value 0;
add each ele to sum1 || sum2 

              canSubsetSumEqual(arr, i=0, sum1=0, sum2=0)

                                ||

       canSubsetSumEqual(arr, i+1 4, 0)  ||    canSubsetSumEqual(arr, i+1 0, 4)
       
    .
    .

    .
    finally find in an any function if we can get the sum1 and sum2 as same then return true;


    answer = (sum1 == sum2) if i = |arr|
    answer = fn(arr, i+1, sum1+arr[i], sum2 ) || fn(arr, i+1, sum1, sum2 + arr[i])

*/

function canWeGet(arr, i = 0, sum1 = 0, sum2 = 0) {
  if (i == arr.length) return sum1 == sum2;
  return (
    canWeGet(arr, i + 1, sum1 + arr[i], sum2) ||
    canWeGet(arr, i + 1, sum1, sum2 + arr[i])
  );
}

// using the subsetSum problem

function twoSS(arr) {
  let s = arr.reduce((a, b) => a + b, 0);
  if (s % 2 == 1) return false;
  
  return ss(arr, s / 2) > 0;
}

//

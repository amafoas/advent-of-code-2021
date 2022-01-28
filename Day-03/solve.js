const fs = require('fs');
const data = fs.readFileSync('./input.txt','utf-8');
const numbers = data.split('\n');

/// PART 1 
let mc = Array.from({length: numbers[0].length}, e => [0, 0]);

numbers.forEach(n => {
  for (let i = 0; i < n.length; i++){
    mc[i][Number(n.charAt(i))] += 1;
  }
});

let gamma = epsilon = '';

mc.forEach(bit => {
  gamma   += bit[0] > bit[1] ? '0' : '1';
  epsilon += bit[0] > bit[1] ? '1' : '0';
})

console.log('PART 1 Result: ', parseInt(gamma, 2) * parseInt(epsilon, 2));

/// PART 2

const filterByBits = (arr, bigger) => {
  let i = 0;

  while (arr.length > 1){  
    let c = [0, 0];
    arr.forEach(n => c[Number(n.charAt(i))]++);
  
    let bit = Number( bigger ? c[0] <= c[1] : c[0] > c[1] );
    
    arr = arr.filter(n => Number(n.charAt(i)) === bit);
    i++
  }

  return parseInt(arr[0], 2);
}

console.log('PART 2 Result: ', filterByBits(numbers, true) * filterByBits(numbers, false));
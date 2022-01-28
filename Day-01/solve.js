const fs = require('fs');


let data = fs.readFileSync("./input.txt", 'utf-8');
let array = (data.split('\n')).map((i) => Number(i));


/// PART 1
let inc = 0;

for(let i = 1; i < array.length; i++){
  if (array[i] > array[i-1]) inc++;
}

console.log('PART 1 Result: ', inc);

/// PART 2
let res = 0;

for(let i = 3; i < array.length-1; i++){
  let mid = array[i-1] + array[i-2];
  let a = mid + array[i-3];
  let b = array[i] + mid;

  if (b > a) res++;
}

console.log('PART 2 Result: ', res);
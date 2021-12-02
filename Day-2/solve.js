const fs = require('fs');

let data = fs.readFileSync('./input.txt', 'utf-8');
 
let arr = (data.split('\n'))

/// PART 1
let horizontal = 0;
let depth = 0;

arr.forEach(move => {
  let value = Number(move.match(/[0-9]+/)[0]);

  if (move.search('forward') != -1) {
    horizontal += value;
  } else if (move.search('down') != -1) {
    depth += value;
  } else {
    depth -= value;
  }
});

console.log('PART 1 Result: ', (horizontal*depth));

/// PART 2
horizontal = 0;
depth = 0;
let aim = 0;

arr.forEach(move => {
  let value = Number(move.match(/[0-9]+/)[0]);

  if (move.search('forward') != -1) {
    horizontal += value;
    depth += aim*value;
  } else if (move.search('down') != -1) {
    aim += value;
  } else {
    aim -= value;
  }
});

console.log('PART 2 Result: ', (horizontal*depth));
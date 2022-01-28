const fs = require('fs')
const crabs = fs.readFileSync('./input.txt', 'utf-8').split(',').map(Number).sort((a, b) => a - b);

const totalFuel = (fpos, step) => crabs.reduce((acc, c) => acc + step(Math.abs(fpos - c)), 0);;

/// PART 1
const median = crabs[Math.floor(crabs.length / 2)];

console.log('PART 1 Result: ', totalFuel(median, n => n));


/// PART 2
const mean = crabs.reduce((acc, c) => acc + c) / crabs.length;

const gauss = n => (n * (n + 1)) / 2;

const part2 = Math.min(totalFuel(Math.ceil(mean), gauss), totalFuel(Math.floor(mean), gauss));

console.log('PART 2 Result: ', part2);
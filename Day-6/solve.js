const fs = require('fs');
const fishes = fs.readFileSync('./input.txt', 'utf-8').split(',').map(e => Number(e));

let fishesPerDay = Array(9).fill(0);
fishes.forEach(f => fishesPerDay[f]++);

const modelFishGrowth = (fishes, days) => {
  for (let day = 1; day <= days; day++) {
    let newFishes = Array(9).fill(0);
  
    fishes.forEach((amount, dayLeft) => {
      let newDay = dayLeft - 1;
  
      if (newDay < 0) {
        // new lanterfish
        newFishes[8] += amount;
        // reset lanterfish cicle
        newFishes[6] += amount;
      } else {
        newFishes[newDay] += amount;
      }
    })
    fishes = newFishes;
  }
  return fishes.reduce((acc, amount) => acc + amount);
}

/// PART 1
console.log('PART 1 Result: ', modelFishGrowth(fishesPerDay, 80))
/// PART 2
console.log('PART 2 Result: ', modelFishGrowth(fishesPerDay, 256));
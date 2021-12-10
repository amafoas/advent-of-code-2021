const fs = require('fs')
const lines = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(l => Array.from(l));

const valid = new Map();
      valid.set(')', '(');
      valid.set(']', '[');
      valid.set('}', '{');
      valid.set('>', '<');

let illegalValues = [];
let incompleteStacks = [];

lines.forEach( line =>{
  let firstIlegal = null;
  let stack = [];

  line.every(e => {
    if (!valid.has(e)) {
      stack.push(e);
    } else if (stack[stack.length -1] === valid.get(e)){
      stack.pop();
    } else {
      firstIlegal = e;
    }
    return !firstIlegal;
  })

  if (firstIlegal) {
    illegalValues.push(firstIlegal)
  } else if (stack.length !== 0) {
    incompleteStacks.push(stack);
  };
})

const getValue = (cur, values) => {
  let val = {'(': values[0], '[': values[1], '{': values[2], '<': values[3]}[cur];
  return (val ? val : 0);
}

/// PART 1
const p1 = illegalValues.reduce((acc, cur) => (
  acc + getValue(valid.get(cur), [3, 57, 1197, 25137])
), 0);

console.log('PART 1 Result: ', p1);

/// PART 2
let scores = incompleteStacks.map(stack => {
  let total = 0;
  
  for (let i = stack.length-1; i >= 0; i--) {
    total = (total + getValue(stack[i], [1, 2, 3, 4])) * (i === 0 ? 1 : 5);
  }

  return total;
}).sort((a, b) => b - a);

console.log('PART 2 Result: ', scores[Math.floor(scores.length/2)]);
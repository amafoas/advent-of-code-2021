const fs = require('fs');
const grid = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(e => e.split('').map(Number));

const getNeighbors = ({i, j}) => {
  return [
    i+1 < grid.length    ? {i: i+1, j: j} : null,
    i-1 >= 0             ? {i: i-1, j: j} : null,
    j+1 < grid[0].length ? {i: i, j: j+1} : null,
    j-1 >= 0             ? {i: i, j: j-1} : null
  ].filter(e => e);
}

const popLower = (arr) => {
  let lower = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < arr[lower]) lower = i;
  }
  return arr.splice(lower, 1)[0];
}

const isIncluded = (obj, arr) => arr.some(o => (o.i === obj.i && o.j === obj.j));

const parse = obj => '' + obj.i + ',' + obj.j ;

const pathfinding = (goal, m) => {
  const start = {i: 0, j: 0};
  let openlist = [start];
  let closedlist = [];

  const risks = new Map();
  risks.set(parse(start), 0);

  let finished = null;
  while (!finished && openlist.length !== 0) {
    let current = popLower(openlist);
    closedlist.push(current);

    if (current.i === goal.i && current.j === goal.j) finished = true;

    getNeighbors(current).forEach(n => {
      if (isIncluded(n, closedlist)) return;

      let tentativeRisk = risks.get(parse(current)) + grid[n.i][n.j];

      if (!isIncluded(n, openlist)) {
        openlist.push(n);
        risks.set(parse(n), tentativeRisk);

      } else if (tentativeRisk < risks.get(parse(n))) {
        risks.set(parse(n), tentativeRisk);
      }
    });
  }

  return risks.get(parse(goal));
}

console.time('PART 1 Time  ');
console.log('PART 1 Result: ', pathfinding({i: grid.length-1, j: grid[0].length-1}));
console.timeEnd('PART 1 Time  ');
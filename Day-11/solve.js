const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(l => l.split('').map(Number));

const repeated = (arr, i, j) => arr.some( o1 => o1.x === i && o1.y === j );

const flash = (grid, x, y, toFlash, flashed) => {
  let limX = {ini: Math.max(x-1, 0), fin: Math.min(x+1, grid.length-1)};
  let limY = {ini: Math.max(y-1, 0), fin: Math.min(y+1, grid[0].length-1)};

  flashed.push({x: x, y: y});

  for (let i = limX.ini; i <= limX.fin; i++) {
    for (let j = limY.ini; j <= limY.fin; j++) {
      grid[i][j]++;
      if (grid[i][j] > 9 && !repeated(flashed, i, j) && !repeated(toFlash, i, j)){
        toFlash.push({x: i, y: j});
      }
    }
  }
}

const moveStep = (grid) => {
  let flashed = [];
  let toFlash = [];

  // increment all by 1
  grid.forEach((row, x) => row.forEach((o, y) => {
    let newOct = o + 1;
    if (newOct > 9) toFlash.push({x: x, y: y});
    grid[x][y] = newOct;
  }));

  while (toFlash.length !== 0) {
    let {x, y} = toFlash.shift();
    flash(grid, x, y, toFlash, flashed);
  }

  flashed.forEach(({x, y}) => grid[x][y] = 0);

  return flashed.length;
}

/// PART 1
const passSteps = (steps) => {
  let grid = data.map(row => row.map(e => e));
  let flashes = 0;

  for (let s = 0; s < steps; s++) {
    flashes += moveStep(grid);
  }

  return flashes;
}

console.log('PART 1 Result: ', passSteps(100));

/// PART 2
const flashSimultaneously = () => {
  let grid = data.map(row => row.map(e => e));
  let maxFlashes = grid.length * grid[0].length;

  let s = 0;
  do {
    s++;
  } while (moveStep(grid) !== maxFlashes);

  return s;
}

console.log('PART 2 Result: ', flashSimultaneously());
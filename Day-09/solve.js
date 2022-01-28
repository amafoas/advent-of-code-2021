const fs = require('fs');
const grid = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(row => Array.from(row).map(Number));

let lowPoints = [];

grid.forEach((row, r) => {
  row.forEach((point, i) => {
    let isLowPoint = ((i+1 < row.length  && point < row[i+1])     || !(i+1 < row.length))
                  && ((i-1 >= 0          && point < row[i-1])     || !(i-1 >= 0))
                  && ((r+1 < grid.length && point < grid[r+1][i]) || !(r+1 < grid.length))
                  && ((r-1 >= 0          && point < grid[r-1][i]) || !(r-1 >= 0));

    if (isLowPoint) lowPoints.push({point: point, x: r, y: i});
  })
})


/// PART 1
let totalRisk = lowPoints.reduce((acc, p) => acc + p.point + 1, 0);

console.log('PART 1 Result: ', totalRisk);

/// PART 2
const wasVisited = (x, y, visited) => visited.some( pos => pos.x === x && pos.y === y);

const flowfill = (x, y, visited) => {
  let basin = 0;

  if ((0 <= x && x < grid.length) && (0 <= y && y < grid[0].length)
     && (grid[x][y] < 9) && !wasVisited(x, y, visited)) {

    visited.push({x: x, y: y});
    basin = 1 + flowfill(x-1, y, visited) + flowfill(x, y-1, visited)
              + flowfill(x+1, y, visited) + flowfill(x, y+1, visited);
  }

  return basin;
}

const getSizes = () => {
  let sizes = [];

  lowPoints.forEach(({x, y}) => {
    sizes.push(flowfill(x, y, []));
  });

  return sizes.sort((a, b) => b - a);
}

const p2 = getSizes().slice(0, 3).reduce((acc, cur) => acc * cur);

console.log('PART 2 Result: ', p2);
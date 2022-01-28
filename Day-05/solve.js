const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const lines =  data.map(line => (
  line.split(' -> ').map(point => {
    let val = point.split(',');
    return { x: parseInt(val[0]), y: parseInt(val[1]) }
  })));

const part1Lines = lines.filter(line => line[0].x === line[1].x || line[0].y === line[1].y);

const interpolate = (p1, p2, map) => {
  let { x, y } = p1;
  let [ endX, endY ] = [ p2.x, p2.y ];

  const incX = x < endX ? 1 : (x > endX ? -1 : 0);
  const incY = y < endY ? 1 : (y > endY ? -1 : 0);

  while (x !== endX || y !== endY) {
    map[x][y]++;
    x += incX;
    y += incY;
  }

  map[x][y]++;
}

const overlapedLines = (arr) => {
  let map = Array(1000).fill().map(() => Array(1000).fill(-1));

  arr.forEach(line => interpolate(line[0], line[1], map));

  return (
    map.reduce((acc, row) => (
      acc + row.reduce((p, c) => ( c > 0 ? p + 1 : p), 0)
    ), 0)
  );
}

console.log('PART 1 Result: ', overlapedLines(part1Lines));

console.log('PART 2 Result: ', overlapedLines(lines));
const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n\n');

const folds = data.pop().match(/(x|y)=\d*/g).map( e => {
  let spl = e.split('=');
  return { along: spl[0], val: Number(spl[1]) };
});

let dots = data.pop().split('\n').map(p => {
  let spl = p.split(',').map(Number);
  return { x:spl[0], y:spl[1] };
});


const includes = (elem, arr) => (
  arr.some(e => (e.x === elem.x) && (e.y === elem.y))
);

const foldDots = ( dotArr , foldInstruction) => {
  const { along, val } = foldInstruction;
  let res = [];

  dotArr = dotArr.map(({x, y}) => {
    let newDot = {
      x: along === 'x' ? val - Math.abs(x - val) : x, 
      y: along === 'y' ? val - Math.abs(y - val) : y
    }
    if (!includes(newDot, res)) res.push(newDot);
  })

  return res;
}

/// PART 1
console.log('PART 1 Result: ', foldDots(dots, folds[0]).length);

/// PART 2
const graphData = (dotArr) => {
  let graph = [];
  dotArr.forEach(({x, y}) => {
    if (y >= graph.length) {
      graph = graph.concat(Array(y + 1 - (graph.length - 1)).fill().map(_ => []));
    }
    if (x >= graph[y].length) {
      graph[y] = graph[y].concat( Array(x + 1 - (graph[y].length - 1)).fill('.'));
    }

    graph[y][x] = '#';
  });

  console.log(graph.map(e => e.join('')).join('\n'));
}

const foldAll = (dotArr) => {
  let dt = [].concat(dotArr);
  folds.forEach(fold => {
    dt = foldDots(dt, fold);
  });
  return dt;
}

console.log('PART 2 Result: ');
graphData(foldAll(dots));
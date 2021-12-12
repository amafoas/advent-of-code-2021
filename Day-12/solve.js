const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(c => c.split('-'));

const connections = {};

data.forEach(con => {
  connections[con[0]] = connections[con[0]] ? [...connections[con[0]], con[1]] : [con[1]];
  connections[con[1]] = connections[con[1]] ? [...connections[con[1]], con[0]] : [con[0]];
})

const getPath = (cave, path, paths, minor) => {
  let newPath = [...path.map(e => e), cave];

  if (cave === 'end') {
    paths.push(newPath);
    return;
  }

  connections[cave].forEach(c => {
    if(c === c.toUpperCase() || !newPath.includes(c)){
      getPath(c, newPath, paths, minor);

    } else if (minor && c !== 'start' && c !== 'end') {
      getPath(c, newPath, paths, false);
    }
  })
}

/// PART 1
let p1 = [];
getPath('start', [], p1, false);
console.log('PART 1 Result: ', p1.length);

/// PART 2
let p2 = [];
getPath('start', [], p2, true);
console.log('PART 2 Result: ', p2.length);
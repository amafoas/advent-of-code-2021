const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n\n');

const base = data[0];
const pairs = data[1].split('\n').map(e => {
  let spl = e.split(' -> ');
  return {req: spl[0], res: spl[1]}
});

const addOrDefineOnMap = (map, key, val) => {
  map.set(key, map.has(key) ? map.get(key) + val : val)
}

const addOrDefine = (e, val) => e ? e + val : val;

const polymerize = (elemMap) => {
  let newElem = new Map(elemMap);

  pairs.forEach(({req, res}) => {
    if (elemMap.has(req)) {

      addOrDefineOnMap(newElem, req[0] + res, elemMap.get(req));
      addOrDefineOnMap(newElem, res + req[1], elemMap.get(req));

      let n = newElem.get(req) - elemMap.get(req);
      if ( n < 1){ 
        newElem.delete(req);
      } else {
        newElem.set(req, n);
      }
    };
  });

  return newElem;
}

const getElements = (elem) => {
  let elements = {};

  for (const [key, val] of elem.entries()) {
    let k = key.split('');

    elements[k[0]] = addOrDefine(elements[k[0]], val);
    elements[k[1]] = addOrDefine(elements[k[1]], val);
  }

  for (let key in elements) elements[key] = Math.ceil(elements[key]/2);

  return elements;
}

const passSteps = (steps) => {
  let elem = new Map();
  for (let i = 0; i < base.length-1; i++) {
    elem.set(base[i]+base[i+1], 1);
  }

  for (let s = 0; s < steps; s++) {
    elem = polymerize(elem);
  }

  let sorted = Object.values(getElements(elem)).sort((a, b) => b - a);

  return (sorted[0] - sorted[sorted.length - 1]);
}

/// PART 1
console.log('PART 1 Result: ', passSteps(10));

/// PART 2
console.log('PART 2 Result: ', passSteps(40));
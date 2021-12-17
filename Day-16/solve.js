const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('');

const BITS = Array.from(data.map(n => parseInt(n, 16).toString(2).padStart(4, '0')).join(''));

const shiftN = (n, arr) => {
  let res = [];
  for (let i = 0; i < n; i++) {
    res.push(arr.shift());
  }
  return res;
}

const shiftAndParse = (n, arr) => parseInt(shiftN(n, arr).join(''), 2);

const decodeLiteral = (package) => {
  let groups = [];
  let last = '0';
  do {
    last = package.shift();
    val  = shiftN(4, package).join('');

    groups.push(val);
  } while (last !== '0' );

  return {
    result: parseInt(groups.join(''), 2),
    version: 0,
  };
}

const operators = {
  0: (a, b) => a + b,
  1: (a, b) => a * b,
  2: (a, b) => Math.min(a, b),
  3: (a, b) => Math.max(a, b),
  5: (a, b) => Number(a > b),
  6: (a, b) => Number(a < b),
  7: (a, b) => Number(a === b),
}

const decodeOperator = (package, op) => {
  let lengthType  = package.shift();
  let lengthValue = shiftAndParse((lengthType === '0' ? 15 : 11), package);

  let version = 0;
  let values  = [];
  let initialLength = package.length;
  let pack = 0;
  while ((lengthType === '0' ? (initialLength - package.length) : pack) < lengthValue ) {
    let decoded = decodePackage(package);
    version += decoded.version;
    values.push(decoded.result);
    pack++;
  }
  
  let operation = operators[op];
  return {
    result: values.reduce((acc, cur) => operation(acc, cur)),
    version: version,
  };
}

const decodePackage = (package) => {
  let version = shiftAndParse(3, package);
  let type    = shiftAndParse(3, package);

  let res = type === 4 ? decodeLiteral(package) : decodeOperator(package, type);

  return {
    result: res.result,
    version: version + res.version,
  };
}

let decode = decodePackage(BITS);

console.log('PART 1 Result: ', decode.version);
console.log('PART 2 Result: ', decode.result);
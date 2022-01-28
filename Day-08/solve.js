const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n')
               .map(l => {
                  let spl = l.split(' | ').map(e => e.split(' '));
                  return { signal: spl[0], output: spl[1] }
                });


/// PART 1
const p1 = data.reduce((acc, line) => acc + line.output
               .reduce((acc, val) => {
                  let l = val.length !== 5 && val.length !== 6;
                  return l ? acc + 1 : acc
                }, 0), 0);

console.log('PART 1 Result: ', p1);


/// PART 2 
const mapDisplay = (signal) => {
  let codes = {1: null, 4: null, 7: null, 8: null};

  signal.forEach(digit => {
    let len = digit.length;
    let i = len === 2 ? 1 :
            len === 4 ? 4 :
            len === 3 ? 7 :
            len === 7 ? 8 : null;

    if (i) codes[i] = Array.from(digit);
  });

  return codes;
}

// a is included in b ?
const isIncluded = (a, b) => a.every(e => b.includes(e));
const difference = (arr1, arr2) => arr1.filter(x => !arr2.includes(x));

const decode = (dp, digit) => {
  let len = digit.length;
  let d = Array.from(digit);
  let n = '';

  if (len === 5) {
    n = isIncluded(dp[1], d) ? '3' :
        isIncluded(difference(dp[4], dp[1]), d) ? '5' : '2';

  } else if (len === 6) {
    n = !isIncluded(dp[1], d) ? '6' :
         isIncluded(dp[4], d) ? '9' : '0';

  } else {
    n = len === 2 ? '1' :
        len === 4 ? '4' :
        len === 3 ? '7' : '8';
  }

  return n;
}

const getNumber = (line) => {
  let strNum = '';

  const dp = mapDisplay(line.signal);

  line.output.forEach(digit => strNum += decode(dp, digit));

  return Number(strNum);
}

const p2 = data.reduce((acc, line) => acc + getNumber(line), 0);

console.log('PART 2 Result: ', p2);
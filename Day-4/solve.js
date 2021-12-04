const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n\n');

let called = data.shift().split(',');
let bingos = 
  data.map(bng => bng.split('\n')
      .map(row => row.match(/\d+/g)
      .map(val => ({value: val, called: false})
      )));


const markOnBoard = (bingo, called) =>{
  let marked = null;
  bingo.forEach( (row, r) => {
    row.forEach( (obj, c) => {
      if (obj.value === called) {
        obj.called = true;
        marked = {row: r, col: c};
      }
    })
  })
  return marked;
}

const isAWinner = (bingo, r, c) => {
  let rowwin = colwin = true;

  bingo[r].forEach(obj => rowwin = rowwin && obj.called);
  bingo.forEach(row => colwin = colwin && row[c].called);

  return (rowwin || colwin);
}

const getWinner = (winnerNum) => {
  let winners = [];
  let lastCalled = null;

  called.every( cll => {
    lastCalled = cll;

    return (
      bingos.every( (bingo, i) => {
        let marked = markOnBoard(bingo, cll);

        if (marked && !winners.includes(i)) {
          if (isAWinner(bingo, marked.row, marked.col)) winners.push(i);
        }

        return winners.length !== winnerNum;
      })
    )
  })

  return {lastCalled: lastCalled, winner: winners.pop()}
}

const finalScoreOf = (winnerNum) => {
  const { lastCalled, winner } = getWinner(winnerNum);
  let sumOfUnmarked = 0;

  bingos[winner].forEach(row => {
    row.forEach(obj => {
      if (!obj.called) sumOfUnmarked += parseInt(obj.value);
    })
  })

  return sumOfUnmarked * parseInt(lastCalled);
}

/// PART 1
console.log('PART 1 Result: ', finalScoreOf(1));

/// PART 2
console.log('PART 2 Result: ', finalScoreOf(bingos.length));
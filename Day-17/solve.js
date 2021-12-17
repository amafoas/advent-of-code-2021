const fs   = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').match(/-?\d+/g).map(Number);
const target = {
  xmin: data[0],
  xmax: data[1],
  ymin: data[2],
  ymax: data[3]
}

const isOnLimits = (probe) => (target.xmin <= probe.x && probe.x <= target.xmax) 
                           && (target.ymin <= probe.y && probe.y <= target.ymax);

const itPast = (probe) => (probe.x > target.xmax) || (probe.y < target.ymin);

const fly = (speed) => {
  let probe = { x: 0, y: 0 };
  let maxH = 0;

  while(!itPast(probe) && !isOnLimits(probe)) {
    // moves the probe
    probe.x += speed.x;
    probe.y += speed.y;

    maxH = Math.max(maxH, probe.y);

    // updates the speed
    if (speed.x !== 0) speed.x += speed.x > 0 ? -1 : 1;
    speed.y -= 1;
  }

  return { valid: !itPast(probe), maxH: maxH };
}

const getHighers = () => {
  let highers = [];

  for (let x = 0; x <= target.xmax; x++) {
    for (let y = target.ymin; y <= target.xmax; y++) {
      let { valid, maxH } = fly({x: x, y: y});
      if (valid) highers.push(maxH);
    }
  }

  return highers.sort((a, b) => b - a);
}

let h = getHighers();

console.log('PART 1 Result: ', h[0]);
console.log('PART 2 Result: ', h.length);
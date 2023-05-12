const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const blockSize = 10; // px
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const colors = [
  "HSL(0, 0%, 100%)", // white
  "HSL(40, 100%, 50%)", // yellow
  "HSL(30, 100%, 50%)", // orange light
  "HSL(20, 100%, 50%)", // orange normal
  "HSL(10, 100%, 50%)", // orange dark
  "HSL(0, 100%, 50%)",  // red
  // "HSL(0, 100%, 0%)", // black
  "RGBA(0, 0, 0, 0)", // transparent
];
const maxIndex = colors.length - 1;
const fireH = 40;
const fireW = Math.floor(canvasWidth / blockSize);
const wind_direction = 1;

function doomGenerateStrangeTable() {
  let table = [];
  for (let column = 0; column < fireW; column++) {
    table.push([]);
    for (let row = 0; row < fireH; row++) {
      table[column].push(row == 0 ? 0 : maxIndex);
    }
  }
  return table;
}

function firePropagation(fire) {
  for (let column = 0; column < fireW; column++) {
    for (let row = 1; row < fireH; row++) {
      let intensityBelow = fire[column][row - 1];
      let decay = Math.round(Math.random());
      let newIntensity = intensityBelow + decay <= maxIndex ? intensityBelow + decay : maxIndex;

      let columnAdd = Math.round(Math.random());
      if (column + columnAdd >= fireW || column + columnAdd <= 0) columnAdd = 0;
      let rowAdd = Math.round(Math.random());
      if (row + rowAdd >= fireH || row + rowAdd <= 0) rowAdd = 0;

      fire[column + columnAdd][row + rowAdd] = newIntensity;
    }
  }
  return fire;
}

function renderSquares(fire) {
  let x = 0;
  let y;
  for (let column of fire) {
    y = canvasHeight;
    for (let block of column) {
      y -= blockSize;
      ctx.fillStyle = colors[block];
      ctx.fillRect(x, y, blockSize, blockSize);
    }
    x += blockSize;
  }
}

let fire = doomGenerateStrangeTable();
let isFireGoing = false;

function doomFireUpdate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!isFireGoing) return;
  fire = firePropagation(fire);
  renderSquares(fire);
  setTimeout(doomFireUpdate, 100);
}

const btnStartStopFire = document.querySelector("#startstopfire");
btnStartStopFire.onclick = () => {
  isFireGoing = !isFireGoing;
  doomFireUpdate();
  btnStartStopFire.textContent = isFireGoing ? "hide fire" : "show fire";
}


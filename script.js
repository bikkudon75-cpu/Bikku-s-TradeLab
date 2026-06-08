let balance = 10000;
let xp = 0;
let level = 1;

let price = 100;
let candles = [];

let wins = 0;
let mission = 0;

let ctx = document.getElementById("chart").getContext("2d");

/* ---------------------------
   UI UPDATE
----------------------------*/
function update() {
  document.getElementById("balance").innerText = balance.toFixed(2);
  document.getElementById("xp").innerText = xp;
  document.getElementById("level").innerText = level;
  document.getElementById("mission").innerText = mission + " / 3";
}

/* ---------------------------
   TRADING
----------------------------*/
function buy() { trade(); }
function sell() { trade(); }

function trade() {
  let win = Math.random() > 0.5;

  if (win) {
    balance += 120;
    xp += 20;
    wins++;
    mission++;
    msg("WIN TRADE ✅");
  } else {
    balance -= 90;
    xp += 5;
    msg("LOSS TRADE ❌");
  }

  checkLevel();
  checkMission();
  checkChallenge();
  update();
}

/* ---------------------------
   LEVEL + MISSION + CHALLENGE
----------------------------*/
function checkLevel() {
  if (xp >= level * 120) {
    level++;
    msg("LEVEL UP 🚀");
  }
}

function checkMission() {
  if (mission >= 3) {
    mission = 0;
    msg("MISSION COMPLETE 🎯 +Reward");
  }
}

function checkChallenge() {
  if (balance >= 12000) {
    document.getElementById("status").innerText = "PASSED 🎉";
  }

  if (balance <= 8000) {
    document.getElementById("status").innerText = "FAILED ❌";
  }
}

/* ---------------------------
   REAL CANDLE GENERATION (OHLC)
----------------------------*/
function generateCandle() {
  let open = price;

  let volatility = (Math.random() - 0.5) * 6;

  let close = open + volatility;
  let high = Math.max(open, close) + Math.random() * 3;
  let low = Math.min(open, close) - Math.random() * 3;

  price = close;

  candles.push({ open, high, low, close });

  if (candles.length > 80) candles.shift();

  drawChart();
}

/* ---------------------------
   TRADINGVIEW-STYLE CHART
----------------------------*/
function drawChart() {
  ctx.clearRect(0, 0, 800, 300);

  let width = 800;
  let height = 300;

  let candleWidth = 6;
  let spacing = 10;

  let max = Math.max(...candles.map(c => c.high));
  let min = Math.min(...candles.map(c => c.low));
  let scale = height / (max - min);

  candles.forEach((c, i) => {
    let x = i * spacing + 20;

    let openY = height - (c.open - min) * scale;
    let closeY = height - (c.close - min) * scale;
    let highY = height - (c.high - min) * scale;
    let lowY = height - (c.low - min) * scale;

    let color = c.close >= c.open ? "#22c55e" : "#ef4444";

    // wick
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, highY);
    ctx.lineTo(x, lowY);
    ctx.stroke();

    // body
    ctx.fillStyle = color;
    let bodyHeight = Math.abs(closeY - openY);
    ctx.fillRect(
      x - candleWidth / 2,
      Math.min(openY, closeY),
      candleWidth,
      bodyHeight < 1 ? 1 : bodyHeight
    );
  });
}

/* ---------------------------
   MESSAGE
----------------------------*/
function msg(t) {
  document.getElementById("msg").innerText = t;
}

/* ---------------------------
   LOOP
----------------------------*/
setInterval(() => {
  generateCandle();
}, 800);

update();

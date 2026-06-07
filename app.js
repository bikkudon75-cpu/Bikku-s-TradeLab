let user="";
let balance=10000;
let xp=0;
let level=1;
let crypt=0;
let funded=false;
let fundedStart=10000;
let missionProgress=0;

function start(){
  user=document.getElementById("name").value;
  if(!user) return;

  document.getElementById("login").style.display="none";
  document.getElementById("app").style.display="block";

  load();
  mission();
  update();
  market();
}

/* MARKET SIM */
function market(){
  setInterval(()=>{
    document.getElementById("chart").innerText =
      "Price: " + (100 + Math.random()*10).toFixed(2);
  },1500);
}

/* TRADE */
function trade(dir){
  let win=Math.random()>0.5;
  let amt=100;

  if(win){
    balance+=amt;
    xp+=20;
    crypt+=10;
    missionProgress++;
  } else {
    balance-=amt;
    xp+=5;
  }

  checkLevel();
  fundedCheck();
  update();
  save();
}

/* LEVEL */
function checkLevel(){
  if(xp>=level*100){
    level++;
    alert("LEVEL UP!");
  }
}

/* FUNDED */
function toggleFunded(){
  funded=true;
}

function fundedCheck(){
  if(!funded) return;

  let profit=((balance-fundedStart)/fundedStart)*100;

  document.getElementById("fundedStatus").innerText =
    "Profit: "+profit.toFixed(2)+"%";

  document.getElementById("fundBar").style.width =
    Math.min(profit,100)+"%";

  if(profit>=10) alert("FUNDED PASSED!");
  if(profit<=-5) alert("FAILED!");
}

/* MISSION */
function mission(){
  document.getElementById("mission").innerText="Make 5 Trades";
}

/* SPIN */
function spin(){
  let reward=Math.floor(Math.random()*50);
  crypt+=reward;
  alert("You got "+reward+" CRYPT!");
}

/* UPDATE UI */
function update(){
  document.getElementById("user").innerText=user;
  document.getElementById("balance").innerText=balance;
  document.getElementById("xp").innerText=xp;
  document.getElementById("level").innerText=level;
  document.getElementById("crypt").innerText=crypt;

  document.getElementById("xpBar").style.width=(xp%(level*100))+"%";
}

/* SAVE */
function save(){
  localStorage.setItem("t",JSON.stringify({
    user,balance,xp,level,crypt
  }));
}

/* LOAD */
function load(){
  let d=JSON.parse(localStorage.getItem("t"));
  if(!d) return;
  balance=d.balance;
  xp=d.xp;
  level=d.level;
  crypt=d.crypt;
}

var gameElem = document.getElementById("game");
var gameInner = document.getElementById("gameCont");
var oldImg;
let timeout;
let FSToggle = 0;
let lvlsUnl = 1; //number of levels unlocked by player
let lvl1WaveCnt = 1;
let GoblinNo;
let Goblins;
let GoblEnd = [];
let CoinsAmnt;
let PlayerHealth;
let GoblinHorde = [];
let GoblinHp = [];
let BowRange = [];
let WaveGoblins;
let ActiveGoblins;
let BowCount = [];
let FiredArrow = [];
let ArrowXOffset = [];
let ArrowYOffset = [];
let CleanupTimer = [];

function ToggleFullscreen(){
  if (FSToggle == 0){
    openFullscreen();
  } else if (FSToggle == 1){
    closeFullscreen();
  }
}

function openFullscreen() {
  if (gameElem.requestFullscreen) {
    gameElem.requestFullscreen();
  } else if (gameElem.webkitRequestFullscreen) { /* Safari */
    gameElem.webkitRequestFullscreen();
  } else if (gameElem.msRequestFullscreen) { /* IE11 */
    gameElem.msRequestFullscreen();
  }
  document.getElementById("ToggleFullscreenBtn").src="Images/Close_Fullscreen.png";
  FSToggle = 1;
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  document.getElementById("ToggleFullscreenBtn").src = "Images/Open_Fullscreen.png";
  FSToggle = 0;
}

function gameLoad(){
  MainMenu()
}

function MainMenu(){ //Game start screen
  document.getElementById("game").style.backgroundColor = "#87ceeb";
  gameInner.innerHTML = '<img class="menu_elem" id="HomeLogo" src="Images/GGW_Logo.png"> <button class="menu_elem button" id="playBtn" onclick="PlayLL()">Play</button> <button class="menu_elem button" id="savesBtn" onclick="SavesMenu()">Saves</button> <button class="menu_elem button" id="lvlSelBtn" onclick="LvlSel()">Level Select</button>';
}

function PlayLL(){ //Plays last level unlocked by player
  gameElem.style.animation = "LoadFade 5s ease-in 0.2s forwards";
  gameInner.innerHTML = '<div class = "LevelNot" id="lvl1">Level 1</div>';
  document.getElementById("lvl1").style.animation = "HoldFade 4s ease-in 1s both";
  timeout = setTimeout(level1, 5000);
}

function TowerClick(a, k){ //Parses arguments to tower placement function
  a.onclick = function(){
    BuildBow(k);
  }
}

function level1(){
  gameInner.innerHTML = "<img class='LevelBG' id='Level1BG' src='Images/Level_1_Map.png'> <img class='CallWaveBtn' id='callWaveLvl1' src='Images/Play.png' onclick='Lvl1Waves()' title='Call next wave'> <img class='CoinCnt' id='lvl1Coins' src='Images/Coin.png'> <img class='PlayHp' id='lvl1Hp' src='Images/Heart.png'> <div class='CoinsTxt' id='lvl1CoinsTxt'></div> <div class='HpTxt' id='lvl1HpTxt'></div> <p class='CurrentWave' id='lvl1CurrentWave'></p>";
  CoinsAmnt = 150;
  PlayerHealth = 100;
  document.getElementById('lvl1CoinsTxt').innerText = '= ' + CoinsAmnt;
  document.getElementById('lvl1HpTxt').innerText = '= ' + PlayerHealth;
  let testRect = document.getElementById('callWaveLvl1').getBoundingClientRect();
  for (let i = 0; i < 10; i++){ //Creates buttons to place towers
    
    var div = document.createElement("div");
    div.id = 'Tower' + i + 'ContLvl1';
    div.className = 'TowerCont';
    var img = document.createElement("img");
    TowerClick(img, i);
    img.className = 'buildBtn';
    img.id = 'build' + i + 'lvl1';
    img.title = 'Build cost = 100 coins';
    img.src = 'Images/Build.png';
    img.setAttribute = ("onclick", "BuildBow(" + i + ")");
    let divVar = 'Tower' + i + 'ContLvl1';
    gameInner.appendChild(div);
    document.getElementById(divVar).appendChild(img);
  }

}

function BuildBow(a){ //Deletes 'build' button and places tower
  if (CoinsAmnt >= 100){
    let tower = 'build' + a + 'lvl1';
    var towerElem = document.getElementById(tower);
    towerElem.remove();
    var img = document.createElement("img");
    img.className = "BowTow";
    img.id = "BowTow" + a + "lvl1";
    img.src = "Images/Bow Tower.png";
    let divVar = 'Tower' + a + 'ContLvl1';
    document.getElementById(divVar).appendChild(img);
    document.getElementById(divVar).style.backgroundColor = "#499d36";
    BuildBow[a] = 'BowTow' + a + "lvl1";
    CoinsAmnt -= 100;
    document.getElementById('lvl1CoinsTxt').innerText = '= ' + CoinsAmnt;
  }
}

function Lvl1Waves(){
  switch (lvl1WaveCnt){
    case 1:
      document.getElementById("callWaveLvl1").disabled = true;
      document.getElementById("lvl1CurrentWave").innerText = 'Current Wave: ' + lvl1WaveCnt;
      GoblinNo = 0;
      WaveGoblins = 10;
      ActiveGoblins = WaveGoblins;
      spawnGoblin();
      Goblins = setInterval(spawnGoblin, 2000);
      lvl1WaveCnt++;
      break;
    case 2:
      document.getElementById("callWaveLvl1").disabled = true;
      document.getElementById("lvl1CurrentWave").innerText = 'Current Wave: ' + lvl1WaveCnt;
      GoblinNo = 0;
      WaveGoblins = 15;
      ActiveGoblins = WaveGoblins;
      spawnGoblin();
      Goblins = setInterval(spawnGoblin, 1900);
      lvl1WaveCnt++;
      break;
    case 3:
      document.getElementById("callWaveLvl1").disabled = true;
      document.getElementById("lvl1CurrentWave").innerText = 'Current Wave: ' + lvl1WaveCnt;
      GoblinNo = 0;
      WaveGoblins = 20;
      ActiveGoblins = WaveGoblins;
      spawnGoblin();
      Goblins = setInterval(spawnGoblin, 1800);
      lvl1WaveCnt++;
      break;
    case 4:
      document.getElementById("callWaveLvl1").disabled = true;
      document.getElementById("lvl1CurrentWave").innerText = 'Current Wave: ' + lvl1WaveCnt;
      GoblinNo = 0;
      WaveGoblins = 25;
      ActiveGoblins = WaveGoblins;
      spawnGoblin();
      Goblins = setInterval(spawnGoblin, 1700);
      lvl1WaveCnt++;
      break;
    case 5:
      document.getElementById("callWaveLvl1").disabled = true;
      document.getElementById("lvl1CurrentWave").innerText = 'Current Wave: ' + lvl1WaveCnt;
      GoblinNo = 0;
      WaveGoblins = 20;
      ActiveGoblins = WaveGoblins;
      spawnGoblin();
      Goblins = setInterval(spawnGoblin, 1500);
      lvl1WaveCnt++;
      break;
  }
}

function spawnGoblin(){
  var GoblinBirth = document.createElement("img");
  GoblinBirth.id = 'BirthedGoblin' + GoblinNo;
  GoblinBirth.className = 'BirthedGoblin';
  GoblinBirth.src = 'Images/Goblin Walking.gif';
  gameInner.appendChild(GoblinBirth);
  let hordeMember = 'BirthedGoblin' + GoblinNo;
  GoblinHorde[GoblinNo] = document.getElementById(hordeMember);
  GoblEnd[GoblinNo] = setTimeout(GoblMiss, 30000, GoblinNo);
  BowRange[GoblinNo] = setInterval(GoblDet, 500);
  GoblinHp[GoblinNo] = 100;
  if (GoblinNo >= WaveGoblins){
        clearInterval(Goblins);
      } else {
        GoblinNo++;
      }
}

function GoblMiss(a){
  let GoblId = 'BirthedGoblin' + a;
  document.getElementById(GoblId).remove();
  ActiveGoblins--;
  PlayerHealth -= 10;
  document.getElementById('lvl1HpTxt').innerText = '= ' + PlayerHealth;
  if(PlayerHealth <= 0){
    document.getElementById("game").style.backgroundColor = "#87ceeb";
    gameInner.innerHTML = '<div class="menuBg" id="LossMenu"><button class="menu_elem button" id="replayBtn" onclick="PlayLL()">Try Again</button> <button class="menu_elem button" id="quitBtn" onclick="MainMenu()">Quit</button></div>';
  }
}

function GoblDet(){
loop1:
  for (let i = 0; i < 10; i++){
  loop2: 
    for (let j = 0; j <= WaveGoblins; j++){
      let CurrentTower = 'BowTow' + i + 'lvl1';
      let CurrentGoblin = 'BirthedGoblin' + j;
      let CurrentArrow = 'Arrow' + i;
      if(document.getElementById(CurrentTower) == null){
        continue loop1;
      } if (document.getElementById(CurrentArrow) !== null){
        continue loop1;
      } if (document.getElementById(CurrentGoblin) == null){
        continue loop2;
      }
      let BowRect = document.getElementById(CurrentTower).getBoundingClientRect();
      let GoblinRect = document.getElementById(CurrentGoblin).getBoundingClientRect();
      let GoblXCentre = (GoblinRect.x + GoblinRect.right)/2;
      let BowXCentre = ((BowRect.x + BowRect.right)/2);
      let xCalc = (GoblXCentre) - (BowXCentre);
      let GoblYCentre = (GoblinRect.y + GoblinRect.bottom)/2;
      let BowYCentre = (BowRect.y + BowRect.bottom)/2;
      let yCalc = (GoblYCentre) - (BowYCentre);
      if (xCalc >= -200 && xCalc <= 200 && yCalc >= -200 && yCalc <= 200){
        let shoot = document.createElement("img");
        shoot.id = 'Arrow' + i;
        shoot.className = 'Arrow';
        shoot.src = 'Images/Arrow.png';
        let TowerCont = 'Tower' + i + 'ContLvl1';
        ArrowXOffset[i] = 0;
        ArrowYOffset[i] = 0;
        document.getElementById(TowerCont).appendChild(shoot);
        shootArrow(i, j);
      continue loop2;
      }
    }
  }
}

function shootArrow(a, b){
  FiredArrow[a] = setInterval(seekGoblin, 10, a, b);
} 

function seekGoblin(a, b){
  let CurrentGoblin = 'BirthedGoblin' + b;
  let ArrowId = 'Arrow' + a;
  if (document.getElementById(CurrentGoblin) == null){
    document.getElementById(ArrowId).remove();
    clearInterval(FiredArrow[a]);
  } let GoblinRect = document.getElementById(CurrentGoblin).getBoundingClientRect();
  let ArrowRect = document.getElementById(ArrowId).getBoundingClientRect();
  let GoblXCentre = (GoblinRect.x + GoblinRect.right)/2;
  let BowXCentre = (ArrowRect.x + ArrowRect.right)/2;
  let xCalc = (GoblXCentre) - (BowXCentre);
  let GoblYCentre = (GoblinRect.y + GoblinRect.bottom)/2;
  let BowYCentre = (ArrowRect.y + ArrowRect.bottom)/2;
  let yCalc = (GoblYCentre) - (BowYCentre);
  let ArrowElem = document.getElementById(ArrowId);
  ArrowElem.style.transform = "rotate(0deg)";
  if (xCalc < 0){
    ArrowXOffset[a] -= 5;
    ArrowElem.style.left = ArrowXOffset[a] + 'px';
    ArrowElem.style.transform -= "rotate(90deg)";
  } if (xCalc > 0){
    ArrowXOffset[a] += 5;
    ArrowElem.style.left = ArrowXOffset[a] + 'px';
    ArrowElem.style.transform += "rotate(90deg)";
  } if (yCalc < 0){
    ArrowYOffset[a] -= 5;
    ArrowElem.style.top = ArrowYOffset[a] + 'px';
  } if (yCalc > 0){
    ArrowYOffset[a] += 5;
    ArrowElem.style.top = ArrowYOffset[a] + 'px';
    ArrowElem.style.transform += "rotate(180deg)";
  } if (xCalc > -5 && xCalc < 5 && yCalc > -5 && yCalc < 5){
    GoblinHp[b] -=10
    if(GoblinHp[b] <= 0){
      document.getElementById(CurrentGoblin).remove();
      ArrowElem.remove();
      CoinsAmnt += 50;
      document.getElementById('lvl1CoinsTxt').innerText = '= ' + CoinsAmnt;
      clearTimeout(GoblEnd[b]);
      ActiveGoblins--;
      if (ActiveGoblins < 0){
        if (lvl1WaveCnt > 5){
          let WaveComp = document.createElement('div');
          WaveComp.className = 'WaveCompMsg';
          WaveComp.id = 'WaveCompMsg';
          gameInner.appendChild(WaveComp);
          document.getElementById('WaveCompMsg').innerText = 'Level Complete!';
          let CloseTimer;
        } else {
          let WaveComp = document.createElement('div');
          WaveComp.className = 'WaveCompMsg';
          WaveComp.id = 'WaveCompMsg';
          gameInner.appendChild(WaveComp);
          document.getElementById('WaveCompMsg').innerText = 'Wave Complete!';
          let CloseTimer;
          CloseTimer = setTimeout(CloseMsg, 3500);
          document.getElementById("callWaveLvl1").disabled = false;
        }
      }
    }
    ArrowElem.remove();
    clearInterval(FiredArrow[a]);
  }
}

function CloseMsg(){
  document.getElementById('WaveCompMsg').remove();
}

function SavesMenu(){ //lists player save files and allows for saving/loading
  document.getElementById("game").style.backgroundColor = "#87ceeb";
  gameInner.innerHTML = '<div class="menuBg" id="savesMenu"><img id="BackBtn" src="Images/Back_Button.png" title="Back to main menu" onclick="MainMenu()"></div>';
}

function LvlSel(){ //lists unlocked levels, allows replay of completed levels
  document.getElementById("game").style.backgroundColor = "#87ceeb";
  gameInner.innerHTML = '<div class="menuBg" id="LevelsMenu"><img id="BackBtn" src="Images/Back_Button.png" title="Back to main menu" onclick="MainMenu()"></div>';
}
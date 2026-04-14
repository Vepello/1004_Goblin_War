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
let GremlinNo;
let Gremlins;
let GremEnd = [];
let CoinsAmnt;
let PlayerHealth;
let GoblinHorde = [];
let GremlinSwarm = [];
let GoblinHp = [];
let GremlinHp = [];
let BowRange = [];
let WaveGoblins;
let ActiveGoblins;
let WaveGremlins;
let ActiveGremlins;
let TotalActive;
let BowCount = [];
let FiredArrow = [];
let ArrowXOffset = [];
let ArrowYOffset = [];
let CleanupTimer = [];
let ArrowTarget;
let EnemyColour = 'Green';
let AllyColour = 'Blue';
let ColoursSelected = 0;
let EnemyColoursSelected = 0;
let AllyColoursSelected = 0;

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
  if (ColoursSelected == 0){
    gameInner.innerHTML = '<div class="menuBg" id="ColourSelBg"> <p class="ColourMenu" id="EnemyColourTxt">Enemy Colour:</p><img class="ColourSelBtn" id="EnemyGreenBtn" src="Images/Goblin Idle - Green.png" onclick="EnemyColourChg(`Green`)"><img class="ColourSelBtn" id="EnemyBlueBtn" src="Images/Goblin Idle - Blue.png" onclick="EnemyColourChg(`Blue`)"><img class="ColourSelBtn" id="EnemyYellowBtn" src="Images/Goblin Idle - Yellow.png" onclick="EnemyColourChg(`Yellow`)"><img class="ColourSelBtn" id="EnemyOrangeBtn" src="Images/Goblin Idle - Orange.png" onclick="EnemyColourChg(`Orange`)"><img class="ColourSelBtn" id="EnemyRedBtn" src="Images/Goblin Idle - Red.png" onclick="EnemyColourChg(`Red`)"><img class="ColourSelBtn" id="EnemyPinkBtn" src="Images/Goblin Idle - Pink.png" onclick="EnemyColourChg(`Pink`)"><img class="ColourSelBtn" id="EnemyPurpleBtn" src="Images/Goblin Idle - Purple.png" onclick="EnemyColourChg(`Purple`)"> <p class="ColourMenu" id="AllyColourTxt">Ally Colour:</p><img class="ColourSelBtn" id="AllyGreenBtn" src="Images/Goblin Idle - Green.png" onclick="AllyColourChg(`Green`)"><img class="ColourSelBtn" id="AllyBlueBtn" src="Images/Goblin Idle - Blue.png" onclick="AllyColourChg(`Blue`)"><img class="ColourSelBtn" id="AllyYellowBtn" src="Images/Goblin Idle - Yellow.png" onclick="AllyColourChg(`Yellow`)"><img class="ColourSelBtn" id="AllyOrangeBtn" src="Images/Goblin Idle - Orange.png" onclick="AllyColourChg(`Orange`)"><img class="ColourSelBtn" id="AllyRedBtn" src="Images/Goblin Idle - Red.png" onclick="AllyColourChg(`Red`)"><img class="ColourSelBtn" id="AllyPinkBtn" src="Images/Goblin Idle - Pink.png" onclick="AllyColourChg(`Pink`)"><img class="ColourSelBtn" id="AllyPurpleBtn" src="Images/Goblin Idle - Purple.png" onclick="AllyColourChg(`Purple`)"><img class="ProceedBtn" id="ConfirmColoursBtn" src="Images/Back_Button.png" title="Select both colours first">';
  } else {
    gameElem.style.animation = "LoadFade 5s ease-in 0.2s forwards";
    gameInner.innerHTML = '<div class = "LevelNot" id="lvl1">Level 1</div>';
    document.getElementById("lvl1").style.animation = "HoldFade 4s ease-in 1s both";
    timeout = setTimeout(level1, 5000);
  }
}

function EnemyColourChg(a){
  document.getElementById("EnemyGreenBtn").attributeStyleMap.clear();
  document.getElementById("EnemyBlueBtn").attributeStyleMap.clear();
  document.getElementById("EnemyYellowBtn").attributeStyleMap.clear();
  document.getElementById("EnemyOrangeBtn").attributeStyleMap.clear();
  document.getElementById("EnemyRedBtn").attributeStyleMap.clear();
  document.getElementById("EnemyPinkBtn").attributeStyleMap.clear();
  document.getElementById("EnemyPurpleBtn").attributeStyleMap.clear();
  let ColourSelected = "Enemy" + a + "Btn";
  document.getElementById(ColourSelected).style.height = "12vh";
  document.getElementById(ColourSelected).style.margin = "1vw";
  document.getElementById(ColourSelected).style.outline = "5px solid yellow";
  document.getElementById(ColourSelected).style.borderRadius = "7px";
  EnemyColour = a;
  ColourSelected = "Ally" + a + "Btn";
  document.getElementById("AllyGreenBtn").setAttribute('onclick','AllyColourChg("Green")');
  document.getElementById("AllyGreenBtn").style.filter = "brightness(100%)";
  document.getElementById("AllyBlueBtn").setAttribute('onclick','AllyColourChg("Blue")');
  document.getElementById("AllyBlueBtn").style.filter = "brightness(100%)";
  document.getElementById("AllyYellowBtn").setAttribute('onclick','AllyColourChg("Yellow")');
  document.getElementById("AllyYellowBtn").style.filter = "brightness(100%)";
  document.getElementById("AllyOrangeBtn").setAttribute('onclick','AllyColourChg("Orange")');
  document.getElementById("AllyOrangeBtn").style.filter = "brightness(100%)";
  document.getElementById("AllyRedBtn").setAttribute('onclick','AllyColourChg("Red")');
  document.getElementById("AllyRedBtn").style.filter = "brightness(100%)";
  document.getElementById("AllyPinkBtn").setAttribute('onclick','AllyColourChg("Pink")');
  document.getElementById("AllyPinkBtn").style.filter = "brightness(100%)";
  document.getElementById("AllyPurpleBtn").setAttribute('onclick','AllyColourChg("Purple")');
  document.getElementById("AllyPurpleBtn").style.filter = "brightness(100%)";
  document.getElementById(ColourSelected).removeAttribute('onclick');
  document.getElementById(ColourSelected).style.filter = "brightness(0%)";
  EnemyColoursSelected = 1;
  if (AllyColoursSelected == 1){
    let AltColourSelected = "Enemy" + AllyColour + "Btn";
    document.getElementById(AltColourSelected).style.filter = "brightness(0%)";
  }
  if (EnemyColoursSelected == 1 && AllyColoursSelected == 1){
    ColoursSelected = 1;
    document.getElementById("ConfirmColoursBtn").setAttribute('onclick','PlayLL()');
    document.getElementById("ConfirmColoursBtn").removeAttribute("title");
  }
}

function AllyColourChg(a){
  let ColourSelected;
  document.getElementById("AllyGreenBtn").attributeStyleMap.clear();
  document.getElementById("AllyBlueBtn").attributeStyleMap.clear();
  document.getElementById("AllyYellowBtn").attributeStyleMap.clear();
  document.getElementById("AllyOrangeBtn").attributeStyleMap.clear();
  document.getElementById("AllyRedBtn").attributeStyleMap.clear();
  document.getElementById("AllyPinkBtn").attributeStyleMap.clear();
  document.getElementById("AllyPurpleBtn").attributeStyleMap.clear();
  ColourSelected = "Ally" + a + "Btn";
  document.getElementById(ColourSelected).style.height = "12vh";
  document.getElementById(ColourSelected).style.margin = "1vw";
  document.getElementById(ColourSelected).style.outline = "5px solid yellow";
  document.getElementById(ColourSelected).style.borderRadius = "7px";
  AllyColour = a;
  ColourSelected = "Enemy" + a + "Btn";
  document.getElementById("EnemyGreenBtn").setAttribute('onclick','EnemyColourChg("Green")');
  document.getElementById("EnemyGreenBtn").style.filter = "brightness(100%)";
  document.getElementById("EnemyBlueBtn").setAttribute('onclick','EnemyColourChg("Blue")');
  document.getElementById("EnemyBlueBtn").style.filter = "brightness(100%)";
  document.getElementById("EnemyYellowBtn").setAttribute('onclick','EnemyColourChg("Yellow")');
  document.getElementById("EnemyYellowBtn").style.filter = "brightness(100%)";
  document.getElementById("EnemyOrangeBtn").setAttribute('onclick','EnemyColourChg("Orange")');
  document.getElementById("EnemyOrangeBtn").style.filter = "brightness(100%)";
  document.getElementById("EnemyRedBtn").setAttribute('onclick','EnemyColourChg("Red")');
  document.getElementById("EnemyRedBtn").style.filter = "brightness(100%)";
  document.getElementById("EnemyPinkBtn").setAttribute('onclick','EnemyColourChg("Pink")');
  document.getElementById("EnemyPinkBtn").style.filter = "brightness(100%)";
  document.getElementById("EnemyPurpleBtn").setAttribute('onclick','EnemyColourChg("Purple")');
  document.getElementById("EnemyPurpleBtn").style.filter = "brightness(100%)";
  document.getElementById(ColourSelected).removeAttribute('onclick');
  document.getElementById(ColourSelected).style.filter = "brightness(0%)";
  AllyColoursSelected = 1;
  if (EnemyColoursSelected == 1){
    let AltColourSelected = "Ally" + EnemyColour + "Btn";
    document.getElementById(AltColourSelected).style.filter = "brightness(0%)";
  }
  if (EnemyColoursSelected == 1 && AllyColoursSelected == 1){
    ColoursSelected = 1;
    document.getElementById("ConfirmColoursBtn").setAttribute('onclick','PlayLL()');
    document.getElementById("ConfirmColoursBtn").removeAttribute("title");
  }
}

function TowerClick(a, k){ //Parses arguments to tower placement function
  a.onclick = function(){
    BuildBow(k);
  }
}

function level1(){
  gameInner.innerHTML = "<img class='LevelBG' id='Level1BG' src='Images/Level_1_Map.gif'> <img class='CallWaveBtn' id='callWaveLvl1' src='Images/Play.png' onclick='Lvl1Waves()' title='Call next wave'> <img class='CoinCnt' id='lvl1Coins' src='Images/Coin.png'> <img class='PlayHp' id='lvl1Hp' src='Images/Heart.png'> <div class='CoinsTxt' id='lvl1CoinsTxt'></div> <div class='HpTxt' id='lvl1HpTxt'></div> <p class='CurrentWave' id='lvl1CurrentWave'></p>";
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
      GremlinNo = 0;
      WaveGremlins = 5;
      ActiveGremlins = WaveGremlins;
      spawnGremlin();
      Gremlins = setInterval(spawnGremlin, 2500);
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
  GoblinBirth.src = 'Images/Goblin Walking - ' + EnemyColour + '.gif';
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

function spawnGremlin(){
  var GremlinBirth = document.createElement("img");
  GremlinBirth.id = 'BirthedGremlin' + GremlinNo;
  GremlinBirth.className = 'BirthedGremlin';
  GremlinBirth.src = 'Images/Gremlin Crawling - ' + EnemyColour + '.gif';
  gameInner.appendChild(GremlinBirth);
  let swarmMember = 'BirthedGremlin' + GremlinNo;
  GremlinSwarm[GremlinNo] = document.getElementById(swarmMember);
  GremEnd[GremlinNo] = setTimeout(GremMiss, 20000, GremlinNo);
  BowRange[GremlinNo] = setInterval(GremDet, 500);
  GremlinHp[GremlinNo] = 75;
  if (GremlinNo >= WaveGremlins){
        clearInterval(Gremlins);
      } else {
        GremlinNo++;
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
        ArrowTarget = 1;
        shootArrow(i, j);
      continue loop2;
      }
    }
  }
}

function GremMiss(a){
  let GremId = 'BirthedGremlin' + a;
  document.getElementById(GremId).remove();
  ActiveGremlins--;
  PlayerHealth -= 10;
  document.getElementById('lvl1HpTxt').innerText = '= ' + PlayerHealth;
  if(PlayerHealth <= 0){
    document.getElementById("game").style.backgroundColor = "#87ceeb";
    gameInner.innerHTML = '<div class="menuBg" id="LossMenu"><button class="menu_elem button" id="replayBtn" onclick="PlayLL()">Try Again</button> <button class="menu_elem button" id="quitBtn" onclick="MainMenu()">Quit</button></div>';
  }
}

function GremDet(){
loop1:
  for (let i = 0; i < 10; i++){
  loop2: 
    for (let j = 0; j <= WaveGremlins; j++){
      let CurrentTower = 'BowTow' + i + 'lvl1';
      let CurrentGremlin = 'BirthedGremlin' + j;
      let CurrentArrow = 'Arrow' + i;
      if(document.getElementById(CurrentTower) == null){
        continue loop1;
      } if (document.getElementById(CurrentArrow) !== null){
        continue loop1;
      } if (document.getElementById(CurrentGremlin) == null){
        continue loop2;
      }
      let BowRect = document.getElementById(CurrentTower).getBoundingClientRect();
      let GremlinRect = document.getElementById(CurrentGremlin).getBoundingClientRect();
      let GremXCentre = (GremlinRect.x + GremlinRect.right)/2;
      let BowXCentre = ((BowRect.x + BowRect.right)/2);
      let xCalc = (GremXCentre) - (BowXCentre);
      let GremYCentre = (GremlinRect.y + GremlinRect.bottom)/2;
      let BowYCentre = (BowRect.y + BowRect.bottom)/2;
      let yCalc = (GremYCentre) - (BowYCentre);
      if (xCalc >= -200 && xCalc <= 200 && yCalc >= -200 && yCalc <= 200){
        let shoot = document.createElement("img");
        shoot.id = 'Arrow' + i;
        shoot.className = 'Arrow';
        shoot.src = 'Images/Arrow.png';
        let TowerCont = 'Tower' + i + 'ContLvl1';
        ArrowXOffset[i] = 0;
        ArrowYOffset[i] = 0;
        document.getElementById(TowerCont).appendChild(shoot);
        ArrowTarget = 2;
        shootArrow(i, j);
      continue loop2;
      }
    }
  }
}

function shootArrow(a, b){
  switch (ArrowTarget){
    case 1:
      FiredArrow[a] = setInterval(seekGoblin, 10, a, b);
      break;
    case 2:
      FiredArrow[a] = setInterval(seekGremlin, 10, a, b);
      break;
    }
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
      TotalActive = ActiveGoblins + ActiveGremlins;
      if (TotalActive < 0){
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

function seekGremlin(a, b){
  let CurrentGremlin = 'BirthedGremlin' + b;
  let ArrowId = 'Arrow' + a;
  if (document.getElementById(CurrentGremlin) == null){
    document.getElementById(ArrowId).remove();
    clearInterval(FiredArrow[a]);
  } let GremlinRect = document.getElementById(CurrentGremlin).getBoundingClientRect();
  let ArrowRect = document.getElementById(ArrowId).getBoundingClientRect();
  let GremXCentre = (GremlinRect.x + GremlinRect.right)/2;
  let BowXCentre = (ArrowRect.x + ArrowRect.right)/2;
  let xCalc = (GremXCentre) - (BowXCentre);
  let GremYCentre = (GremlinRect.y + GremlinRect.bottom)/2;
  let BowYCentre = (ArrowRect.y + ArrowRect.bottom)/2;
  let yCalc = (GremYCentre) - (BowYCentre);
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
    GremlinHp[b] -=10
    if(GremlinHp[b] <= 0){
      document.getElementById(CurrentGremlin).remove();
      ArrowElem.remove();
      CoinsAmnt += 50;
      document.getElementById('lvl1CoinsTxt').innerText = '= ' + CoinsAmnt;
      clearTimeout(GremEnd[b]);
      ActiveGremlins--;
      TotalActive = ActiveGoblins + ActiveGremlins
      if (TotalActive < 0){
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
var gameElem = document.getElementById("game");
var gameInner = document.getElementById("gameCont");
let BgMusic = document.getElementById('region1bgMusic');
let LetterMusic = document.getElementById('letterbgMusic');
let Letter1VA = document.getElementById('letter1VA');
var oldImg;
let timeout;
let FSToggle = 0;
let lvlsUnl = 1; //number of levels unlocked by player
let lvl1WaveCnt = 1;
let lvl2WaveCnt = 1;
let GoblinNo = 0;
let Goblins;
let GoblEnd = [];
let GoblStart = [];
let GoblFighting = [];
let GremlinNo = 0;
let Gremlins;
let GremEnd = [];
let GremStart = [];
let GremFighting = [];
let GoblinAttack = [];
let GremlinAttack = [];
let SoldierAttack = new Array(100).fill(null).map(()=>new Array(100).fill(null));;
let CoinsAmnt;
let PlayerHealth;
let GoblinHorde = [];
let GremlinSwarm = [];
let GoblinHp = [];
let GremlinHp = [];
let BowRange = [];
let WaveGoblins = 0;
let ActiveGoblins = 0;
let WaveGremlins = 0;
let ActiveGremlins = 0;
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
var GoblinMilitia = new Array(100).fill().map(()=>new Array(2).fill());
var SoldierHp = new Array(100).fill().map(()=>new Array(2).fill());
var SoldierRange = new Array(100).fill().map(()=>new Array(2).fill());
var SoldierFighting = new Array(100).fill().map(()=>new Array(2).fill());
let LevelTowers = 0;
let flagDistanceX = [];
let flagDistanceY = [];
var WalkingTimer = new Array(100).fill().map(()=>new Array(2).fill());
const SaveDataList = {
  Save1:{
    AllyColoursSelected : null, AllyColour : null, EnemyColoursSelected : null, EnemyColour : null, lvlsUnl : null, DataSaved : null, LastSave : 1
  }, Save2:{
    AllyColoursSelected : null, AllyColour : null, EnemyColoursSelected : null, EnemyColour : null, lvlsUnl : null, DataSaved : null, LastSave : 1
  }, Save3:{
    AllyColoursSelected : null, AllyColour : null, EnemyColoursSelected : null, EnemyColour : null, lvlsUnl : null, DataSaved : null, LastSave : 1
  }}
let LoadedSave = 1;

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
  } else if (gameElem.webkitRequestFullscreen) { //Safari
    gameElem.webkitRequestFullscreen();
  } else if (gameElem.msRequestFullscreen) { //IE11
    gameElem.msRequestFullscreen();
  }
  document.getElementById("ToggleFullscreenBtn").src="Images/Close_Fullscreen.png";
  FSToggle = 1;
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { //Safari
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {  //IE11
    document.msExitFullscreen();
  }
  document.getElementById("ToggleFullscreenBtn").src = "Images/Open_Fullscreen.png";
  FSToggle = 0;
}

function gameLoad(){
  switch(LoadedSave){
    case 1:
      SaveDataList.Save1.DataSaved = localStorage.getItem("DataSaved1");
      if (SaveDataList.Save1.DataSaved != null){
        AllyColoursSelected = parseInt(localStorage.getItem("AllyColoursSelected1"));
        AllyColour = localStorage.getItem("AllyColour1");
        EnemyColoursSelected = parseInt(localStorage.getItem("EnemyColoursSelected1"));
        EnemyColour = localStorage.getItem("EnemyColour1");
        lvlsUnl = parseInt(localStorage.getItem("lvlsUnl1"));
        ColoursSelected = parseInt(localStorage.getItem("ColoursSelected1"));
        SaveDataList.Save1.LastSave = 1;
        SaveDataList.Save2.LastSave = 0;
        SaveDataList.Save3.LastSave = 0;
      }
    case 2:
      SaveDataList.Save2.DataSaved = localStorage.getItem("DataSaved2");
      if (SaveDataList.Save2.DataSaved != null){
        AllyColoursSelected = parseInt(localStorage.getItem("AllyColoursSelected2"));
        AllyColour = localStorage.getItem("AllyColour2");
        EnemyColoursSelected = parseInt(localStorage.getItem("EnemyColoursSelected2"));
        EnemyColour = localStorage.getItem("EnemyColour2");
        lvlsUnl = parseInt(localStorage.getItem("lvlsUnl2"));
        ColoursSelected = parseInt(localStorage.getItem("ColoursSelected2"));
        SaveDataList.Save1.LastSave = 0;
        SaveDataList.Save2.LastSave = 1;
        SaveDataList.Save3.LastSave = 0;
      }
    case 3:
      SaveDataList.Save3.DataSaved = localStorage.getItem("DataSaved3");
      if (SaveDataList.Save3.DataSaved != null){
        AllyColoursSelected = parseInt(localStorage.getItem("AllyColoursSelected3"));
        AllyColour = localStorage.getItem("AllyColour3");
        EnemyColoursSelected = parseInt(localStorage.getItem("EnemyColoursSelected3"));
        EnemyColour = localStorage.getItem("EnemyColour3");
        lvlsUnl = parseInt(localStorage.getItem("lvlsUnl3"));
        ColoursSelected = parseInt(localStorage.getItem("ColoursSelected3"));
        SaveDataList.Save1.LastSave = 0;
        SaveDataList.Save2.LastSave = 0;
        SaveDataList.Save3.LastSave = 1;
      }
  }
  document.addEventListener("fullscreenchange", function(){
    if (document.fullscreenElement == null && FSToggle == 1){
      document.getElementById("ToggleFullscreenBtn").src = "Images/Open_Fullscreen.png";
      FSToggle = 0;
    } 
  });
  MainMenu()
}

function MainMenu(){ //Game start screen
  document.getElementById("game").style.backgroundColor = "#87ceeb";
  gameInner.innerHTML = '<img class="menu_elem" id="HomeLogo" src="Images/GGW_Logo.png"><div id="MainMenuBtns"> <button class="menu_elem button" id="playBtn" onclick="PlayLL()">Play</button> <button class="menu_elem button" id="savesBtn" onclick="SavesMenu()">Saves</button> <button class="menu_elem button" id="lvlSelBtn" onclick="LvlSel()">Level Select</button> <button class="menu_elem button" id="settingsBtn" onclick="Settings()">Settings</button></div>';
}

function PlayLL(){ //Plays last level unlocked by player
  if (ColoursSelected == 0){
    ColourSelect();
  } else {
    gameElem.style.animation = "LoadFade 5s ease-in 0.2s forwards";
    switch(lvlsUnl){
    case 1:
        gameInner.innerHTML = '<div class = "LevelNot" id="lvl1">Level 1</div>';
        document.getElementById("lvl1").style.animation = "HoldFade 4s ease-in 1s both";
        timeout = setTimeout(level1, 5000);
        break;
      case 2:
        gameInner.innerHTML = '<div class = "LevelNot" id="lvl2">Level 2</div>';
        document.getElementById("lvl2").style.animation = "HoldFade 4s ease-in 1s both";
        timeout = setTimeout(level2, 5000);
    }
  }
}

function ColourSelect(){
  gameInner.innerHTML = '<div class="menuBg" id="ColourSelBg"> <img id="BackBtn" src="Images/Back_Button.png" title="Back to main menu" onclick="MainMenu()"> <p class="ColourMenu" id="EnemyColourTxt">Enemy Colour:</p><img class="ColourSelBtn" id="EnemyGreenBtn" src="Images/Goblin Idle - Green.png" onclick="EnemyColourChg(`Green`)"><img class="ColourSelBtn" id="EnemyBlueBtn" src="Images/Goblin Idle - Blue.png" onclick="EnemyColourChg(`Blue`)"><img class="ColourSelBtn" id="EnemyYellowBtn" src="Images/Goblin Idle - Yellow.png" onclick="EnemyColourChg(`Yellow`)"><img class="ColourSelBtn" id="EnemyOrangeBtn" src="Images/Goblin Idle - Orange.png" onclick="EnemyColourChg(`Orange`)"><img class="ColourSelBtn" id="EnemyRedBtn" src="Images/Goblin Idle - Red.png" onclick="EnemyColourChg(`Red`)"><img class="ColourSelBtn" id="EnemyPinkBtn" src="Images/Goblin Idle - Pink.png" onclick="EnemyColourChg(`Pink`)"><img class="ColourSelBtn" id="EnemyPurpleBtn" src="Images/Goblin Idle - Purple.png" onclick="EnemyColourChg(`Purple`)"> <p class="ColourMenu" id="AllyColourTxt">Ally Colour:</p><img class="ColourSelBtn" id="AllyGreenBtn" src="Images/Goblin Idle - Green.png" onclick="AllyColourChg(`Green`)"><img class="ColourSelBtn" id="AllyBlueBtn" src="Images/Goblin Idle - Blue.png" onclick="AllyColourChg(`Blue`)"><img class="ColourSelBtn" id="AllyYellowBtn" src="Images/Goblin Idle - Yellow.png" onclick="AllyColourChg(`Yellow`)"><img class="ColourSelBtn" id="AllyOrangeBtn" src="Images/Goblin Idle - Orange.png" onclick="AllyColourChg(`Orange`)"><img class="ColourSelBtn" id="AllyRedBtn" src="Images/Goblin Idle - Red.png" onclick="AllyColourChg(`Red`)"><img class="ColourSelBtn" id="AllyPinkBtn" src="Images/Goblin Idle - Pink.png" onclick="AllyColourChg(`Pink`)"><img class="ColourSelBtn" id="AllyPurpleBtn" src="Images/Goblin Idle - Purple.png" onclick="AllyColourChg(`Purple`)"><img class="ProceedBtn" id="ConfirmColoursBtn" src="Images/Back_Button.png" title="Select both colours first">';
}

function PlayNL(a){ //{Plays the next (or selected) level}
  if (ColoursSelected == 0){
    ColourSelect();
  } else {
    BgMusic.load()
    gameElem.animate([{backgroundColor: "black", offset: 0.2},{backgroundColor: "black", offset: 0.8},{backgroundColor: "#87ceeb"}],{duration: 5000, fill: "both"});
    switch(a){
    case 1:
      gameInner.innerHTML = '<div class = "LevelNot" id="lvl1">Level 1</div>';
      document.getElementById("lvl1").style.animation = "HoldFade 4s ease-in 1s both";
      timeout = setTimeout(level1, 5000);
      break;
    case 2:
      gameInner.innerHTML = '<div class = "LevelNot" id="lvl2">Level 2</div>';
      document.getElementById("lvl2").style.animation = "HoldFade 4s ease-in 1s both";
      timeout = setTimeout(level2, 5000);
    }
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
  SaveData();
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
  SaveData();
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

function level1(){
  gameInner.innerHTML = "<img class='LevelBG' id='Level1BG' src='Images/Level_1_Map.gif'> <img class='CallWaveBtn' id='callWaveLvl1' src='Images/Play.png' onclick='Lvl1Waves()' title='Call next wave'> <img class='CoinCnt' id='lvl1Coins' src='Images/Coin.png'> <img class='PlayHp' id='lvl1Hp' src='Images/Heart.png'> <div class='CoinsTxt' id='lvl1CoinsTxt'></div> <div class='HpTxt' id='lvl1HpTxt'></div> <p class='CurrentWave' id='lvl1CurrentWave'></p>";
  BgMusic.play();
  CoinsAmnt = 170;
  PlayerHealth = 100;
  LevelTowers = 10;
  document.getElementById('lvl1CoinsTxt').innerText = '= ' + CoinsAmnt;
  document.getElementById('lvl1HpTxt').innerText = '= ' + PlayerHealth;
  let testRect = document.getElementById('callWaveLvl1').getBoundingClientRect();
  for (let i = 0; i < 10; i++){ //Creates buttons to place towers
    
    var div = document.createElement("div");
    div.id = 'Tower' + i + 'ContLvl1';
    div.className = 'TowerCont';
    var img = document.createElement("img");
    img.className = 'buildBtn';
    img.id = 'build' + i + 'lvl1';
    img.src = 'Images/Build.png';
    img.setAttribute('onclick', 'BuildMenu(' + i + ',1)');
    let divVar = 'Tower' + i + 'ContLvl1';
    gameInner.appendChild(div);
    document.getElementById(divVar).appendChild(img);
    document.getElementById(divVar).style.backgroundImage = "url('Images/Level 1 Tower Placement.png')";
    document.getElementById(divVar).style.backgroundSize = "100% 100%";
  }

}

function level2(){
  gameInner.innerHTML = "<img class='LevelBG' id='Level2BG' src='Images/Level_2_Map.png'> <img class='CallWaveBtn' id='callWaveLvl2' src='Images/Play.png' onclick='Lvl2Waves()' title='Call next wave'> <img class='CoinCnt' id='lvl2Coins' src='Images/Coin.png'> <img class='PlayHp' id='lvl2Hp' src='Images/Heart.png'> <div class='CoinsTxt' id='lvl2CoinsTxt'></div> <div class='HpTxt' id='lvl2HpTxt'></div> <p class='CurrentWave' id='lvl2CurrentWave'></p>";
  BgMusic.play();
  CoinsAmnt = 270;
  PlayerHealth = 100;
  LevelTowers = 15;
  document.getElementById('lvl2CoinsTxt').innerText = '= ' + CoinsAmnt;
  document.getElementById('lvl2HpTxt').innerText = '= ' + PlayerHealth;
  for (let i = 0; i < 15; i++){ //Creates buttons to place towers
    
    var div = document.createElement("div");
    div.id = 'Tower' + i + 'ContLvl2';
    div.className = 'TowerCont';
    var img = document.createElement("img");
    img.className = 'buildBtn';
    img.id = 'build' + i + 'lvl2';
    img.src = 'Images/Build.png';
    img.setAttribute('onclick', 'BuildMenu(' + i + ',2)');
    let divVar = 'Tower' + i + 'ContLvl2';
    gameInner.appendChild(div);
    document.getElementById(divVar).appendChild(img);
    document.getElementById(divVar).style.backgroundImage = "url('Images/Level 1 Tower Placement.png')";
    document.getElementById(divVar).style.backgroundSize = "100% 100%";
  }
}

function BuildMenu(a,b){
  let tower = 'build' + a + 'lvl' + b;
  var towerElem = document.getElementById(tower);
  towerElem.remove();
  var BuildCont = document.createElement("div");
  BuildCont.className = "BuildMenuCont";
  BuildCont.id = "BuildMenu" + a + "lvl" + b;
  let BuildVar = "BuildMenu" + a + "lvl" + b;
  var BuildWheel = document.createElement("img");
  BuildWheel.className = "BuildMenuWheel";
  BuildWheel.id = "BuildWheel" + a + "lvl" + b;
  BuildWheel.src = "Images/Tower Select Wheel.png";
  var Ranged = document.createElement("img");
  Ranged.className = "buildBowBtn BuildMenuOpt";
  Ranged.id = "Range" + a + "lvl" + b;
  Ranged.src = "Images/Ranged Button.png";
  Ranged.title = 'Gobbow \nBuild cost = 100 coins';
  Ranged.setAttribute("onclick", "BuildBow(" + a + ", AllyColour, " + b + ")");
  var Melee = document.createElement("img");
  Melee.className = "buildMeleeBtn BuildMenuOpt";
  Melee.id = "Melee" + a + "lvl" + b;
  Melee.src = "Images/Melee Button.png";
  Melee.title = 'Goblin Barracks \nBuild Cost 70 coins';
  Melee.setAttribute("onclick", "BuildMelee(" + a + ", AllyColour, " + b + ")");
  var Mage = document.createElement("img");
  Mage.className = "buildMageBtn BuildMenuOpt";
  Mage.id = "Mage" + a + "lvl" + b;
  Mage.src = "Images/Locked Button.png";
  var Bomb = document.createElement("img");
  Bomb.className = "buildBombBtn BuildMenuOpt";
  Bomb.id = "Bomb" + a + "lvl" + b;
  Bomb.src = "Images/Locked Button.png";
  var Cancel = document.createElement("img");
  Cancel.className = "CancelBuildBtn BuildMenuOpt";
  Cancel.id = "Cancel" + a + "lvl" + b;
  Cancel.src = "Images/Cancel.png";
  Cancel.title = 'Cancel Build';
  Cancel.setAttribute("onclick", "CancelBuild(" + a + ", 1, 0, " + b + ")");
  let divVar = 'Tower' + a + 'ContLvl' + b;
  document.getElementById(divVar).appendChild(BuildCont);
  document.getElementById(BuildVar).appendChild(BuildWheel);
  document.getElementById(BuildVar).appendChild(Ranged);
  document.getElementById(BuildVar).appendChild(Melee);
  document.getElementById(BuildVar).appendChild(Mage);
  document.getElementById(BuildVar).appendChild(Bomb);
  document.getElementById(BuildVar).appendChild(Cancel);
  document.getElementById(divVar).style.backgroundImage = "none";
  /*document.getElementById(BuildVar).addEventListener("mouseleave", () =>{
    document.addEventListener("mousedown", CancelBuild.bind(null,a,1));
    document.getElementById(BuildVar).addEventListener("mouseenter", () =>{
      document.removeEventListener("mousedown", CancelBuild);
    })
  })*/
 document.getElementById(BuildVar).setAttribute("onmouseleave", "CancelClick('" + BuildVar + "', " + a + ", 1, 0, " + b + ")");
  BuildMenu[a] = "BuildMenu" + a + "lvl" + b;
}

function CancelClick(a,b,c,d,e){
  document.body.setAttribute("onclick", "CancelBuild(" + b + ", " + c + ", '" + d + "', " + e + ")");
  document.getElementById(a).setAttribute("onmouseenter", "noCancel('" + a + "')");
}

function noCancel(a){
  document.body.removeAttribute("onclick");
  document.getElementById(a).removeAttribute("onmouseenter");
}

function BuildBow(a,b,c){ //Deletes 'build' button and places tower
  if (CoinsAmnt >= 100){
    document.body.removeAttribute("onclick")
    let tower = 'BuildMenu' + a + 'lvl' + c;
    var towerElem = document.getElementById(tower);
    towerElem.remove();
    var img = document.createElement("img");
    img.className = "BowTow activeTower";
    img.id = "BowTow" + a + "lvl" + c;
    img.src = "Images/Bow Tower - " + b + ".gif";
    img.setAttribute('onclick', 'upgradeMenu(1, ' + a + ', ' + c + ')');
    let divVar = 'Tower' + a + 'ContLvl' + c;
    document.getElementById(divVar).appendChild(img);
    var SightRange = document.createElement("div");
    SightRange.className = "SightRange BowRange";
    var SightId = "BowSightRange" + a + "lvl" + c;
    SightRange.id = SightId
    document.getElementById(divVar).appendChild(SightRange);
    let TowerSize = document.getElementById(divVar).getBoundingClientRect();
    let getSight = document.getElementById(SightId);
    getSight.style.width = (TowerSize.width*1.5)*2.5;
    getSight.style.height = (TowerSize.height*1.5)*2.5;
    getSight.style.top = "-" + TowerSize.height*1.35;
    getSight.style.left = "-" + TowerSize.width*1.35;
    getSight.style.visibility = "hidden";
    document.addEventListener("fullscreenchange", () => {
      if (document.getElementById(divVar) != null){
        TowerSize = document.getElementById(divVar).getBoundingClientRect();
        getSight.style.width = (TowerSize.width*1.5)*2.5;
        getSight.style.height = (TowerSize.height*1.5)*2.5;
        getSight.style.top = "-" + TowerSize.height*1.35;
        getSight.style.left = "-" + TowerSize.width*1.35;
      }
    })
    gameInner.addEventListener("wheel", () => {
      if (document.getElementById(divVar) != null){
        TowerSize = document.getElementById(divVar).getBoundingClientRect();
        getSight.style.width = (TowerSize.width*1.5)*2.5;
        getSight.style.height = (TowerSize.height*1.5)*2.5;
        getSight.style.top = "-" + TowerSize.height*1.35;
        getSight.style.left = "-" + TowerSize.width*1.35;
      }
    })
    gameElem.addEventListener("scroll", () => {
      if (document.getElementById(divVar) != null){
        TowerSize = document.getElementById(divVar).getBoundingClientRect();
        getSight.style.width = (TowerSize.width*1.5)*2.5;
        getSight.style.height = (TowerSize.height*1.5)*2.5;
        getSight.style.top = "-" + TowerSize.height*1.35;
        getSight.style.left = "-" + TowerSize.width*1.35;
      }
    })
    document.getElementById(divVar).style.backgroundImage = "none";
    BuildBow[a] = 'BowTow' + a + "lvl" + c;
    CoinsAmnt -= 100;
    let CoinTxt = 'lvl' + c + 'CoinsTxt';
    document.getElementById(CoinTxt).innerText = '= ' + CoinsAmnt;
    BowRange[a] = setInterval(EnemDet, 650, a, c);
  }
}

function BuildMelee(a,b,c){ //Deletes 'build' button and places tower
  if (CoinsAmnt >= 70){
    document.body.removeAttribute("onclick")
    let tower = 'BuildMenu' + a + 'lvl' + c;
    var towerElem = document.getElementById(tower);
    towerElem.remove();
    var img = document.createElement("img");
    img.className = "MeleeTow activeTower";
    img.id = "MeleeTow" + a + "lvl" + c;
    img.src = "Images/Melee Tower - " + b + ".png";
    img.setAttribute('onclick', 'upgradeMenu(2, ' + a + ', ' + c + ')');
    let divVar = 'Tower' + a + 'ContLvl' + c;
    document.getElementById(divVar).appendChild(img);
    var SightRange = document.createElement("div");
    SightRange.className = "SightRange MeleeRange";
    var SightId = "MeleeSightRange" + a + "lvl" + c;
    SightRange.id = SightId;
    document.getElementById(divVar).appendChild(SightRange);
    let TowerSize = document.getElementById(divVar).getBoundingClientRect();
    let getSight = document.getElementById(SightId);
    getSight.style.width = (TowerSize.width*1.5)*2.5;
    getSight.style.height = (TowerSize.height*1.5)*2.5;
    getSight.style.top = "-" + TowerSize.height*1.35;
    getSight.style.left = "-" + TowerSize.width*1.35;
    getSight.style.visibility = "hidden";
    document.addEventListener("fullscreenchange", () => {
      if (document.getElementById(divVar) != null){
        TowerSize = document.getElementById(divVar).getBoundingClientRect();
        getSight.style.width = (TowerSize.width*1.5)*2.5;
        getSight.style.height = (TowerSize.height*1.5)*2.5;
        getSight.style.top = "-" + TowerSize.height*1.35;
        getSight.style.left = "-" + TowerSize.width*1.35;
      }
    })
    gameInner.addEventListener("wheel", () => {
      if (document.getElementById(divVar) != null){
        TowerSize = document.getElementById(divVar).getBoundingClientRect();
        getSight.style.width = (TowerSize.width*1.5)*2.5;
        getSight.style.height = (TowerSize.height*1.5)*2.5;
        getSight.style.top = "-" + TowerSize.height*1.35;
        getSight.style.left = "-" + TowerSize.width*1.35;
        }
    })
    gameElem.addEventListener("scroll", () => {
      if (document.getElementById(divVar) != null){
        TowerSize = document.getElementById(divVar).getBoundingClientRect();
        getSight.style.width = (TowerSize.width*1.5)*2.5;
        getSight.style.height = (TowerSize.height*1.5)*2.5;
        getSight.style.top = "-" + TowerSize.height*1.35;
        getSight.style.left = "-" + TowerSize.width*1.35;
      }
    })
    let FlagId = "RallyFlag" + a + "lvl" + c;
    var RallyFlag = document.createElement("img");
    RallyFlag.className = "RallyFlag"
    RallyFlag.id = "RallyFlag" + a + "lvl" + c;
    RallyFlag.src = "Images/Rally Flag - " + AllyColour + ".png";
    RallyFlag.style.visibility = "hidden";
    document.getElementById(divVar).appendChild(RallyFlag);
    document.getElementById(divVar).style.backgroundImage = "none";
    BuildMelee[a] = 'MeleeTow' + a + "lvl" + c;
    CoinsAmnt -= 70;
    let CoinTxt = 'lvl' + c + 'CoinsTxt';
    document.getElementById(CoinTxt).innerText = '= ' + CoinsAmnt;
    TrainGoblins(a,c);
  }
}

function upgradeMenu(a,b,c){
  let UpgrVar;
  let divVar = 'Tower' + b + 'ContLvl' + c;
  let SightId;
  switch(a){
    case 1:
      var BuildCont = document.createElement("div");
      BuildCont.className = "BuildMenuCont";
      BuildCont.id = "UpgrMenu" + b + "lvl" + c;
      UpgrVar = "UpgrMenu" + b + "lvl" + c;
      var UpgrWheel = document.createElement("img");
      UpgrWheel.className = "BuildMenuWheel";
      UpgrWheel.id = "BuildWheel" + b + "lvl" + c;
      UpgrWheel.src = "Images/Upgrade Wheel.png";
      var Upgrade = document.createElement("img");
      Upgrade.className = "UpgradeBtn BuildMenuOpt";
      Upgrade.id = "Upgr" + b + "lvl" + c;
      Upgrade.src = "Images/Locked Button.png";
      Upgrade.title = 'locked';
      var Cancel = document.createElement("img");
      Cancel.className = "CancelBuildBtn BuildMenuOpt";
      Cancel.id = "Range" + b + "lvl" + c;
      Cancel.src = "Images/Cancel.png";
      Cancel.title = 'Cancel Build';
      Cancel.setAttribute("onclick", "CancelBuild(" + b + ", 2, 'Bow', " + c + ")");
      document.getElementById(divVar).appendChild(BuildCont);
      document.getElementById(UpgrVar).appendChild(UpgrWheel);
      document.getElementById(UpgrVar).appendChild(Upgrade);
      document.getElementById(UpgrVar).appendChild(Cancel);
      SightId = "BowSightRange" + b + "lvl" + c;
      document.getElementById(SightId).style.visibility = "visible";
      upgradeMenu[b] = "UpgrMenu" + b + "lvl" + c;
      document.getElementById(UpgrVar).setAttribute("onmouseleave", "CancelClick('" + UpgrVar + "', " + b + ", 2, 'Bow', " + c + ")");
      break;
    case 2:
      var BuildCont = document.createElement("div");
      BuildCont.className = "BuildMenuCont";
      BuildCont.id = "UpgrMenu" + b + "lvl" + c;
      UpgrVar = "UpgrMenu" + b + "lvl" + c;
      var UpgrWheel = document.createElement("img");
      UpgrWheel.className = "BuildMenuWheel";
      UpgrWheel.id = "BuildWheel" + b + "lvl" + c;
      UpgrWheel.src = "Images/Upgrade Wheel - melee.png";
      var Upgrade = document.createElement("img");
      Upgrade.className = "UpgradeBtn BuildMenuOpt";
      Upgrade.id = "Upgr" + b + "lvl" + c;
      Upgrade.src = "Images/Locked Button.png";
      Upgrade.title = 'locked';
      var RallyFlagBtn = document.createElement("img");
      RallyFlagBtn.className = "RallyFlagBtn BuildMenuOpt";
      RallyFlagBtn.id = "RallyFlagBtn" + b + "lvl" + c;
      RallyFlagBtn.src = "Images/Rally Flag - " + AllyColour + ".png";
      RallyFlagBtn.title = "Set Rally Point";
      RallyFlagBtn.setAttribute("onclick", "SetRally(" + b + ', ' + c + ")")
      document.addEventListener("keypress", RallyShortcut)
      function RallyShortcut(event){
        if(event.key === 'r'){
          SetRally(b,c);
          document.removeEventListener("keypress", RallyShortcut);
        }
      }
      let FlagId = "RallyFlag" + b + "lvl" + c;
      document.getElementById(FlagId).style.visibility = "visible";
      var Cancel = document.createElement("img");
      Cancel.className = "CancelBuildBtn BuildMenuOpt";
      Cancel.id = "Cancel" + b + "lvl" + c;
      Cancel.src = "Images/Cancel.png";
      Cancel.title = 'Cancel Build';
      Cancel.setAttribute("onclick", "CancelBuild(" + b + ", 2, 'Melee', " + c + ")");
      document.getElementById(divVar).appendChild(BuildCont);
      document.getElementById(UpgrVar).appendChild(UpgrWheel);
      document.getElementById(UpgrVar).appendChild(Upgrade);
      document.getElementById(UpgrVar).appendChild(RallyFlagBtn);
      document.getElementById(UpgrVar).appendChild(Cancel);
      SightId = "MeleeSightRange" + b + "lvl" + c;
      document.getElementById(SightId).style.visibility = "visible";
      upgradeMenu[b] = "UpgrMenu" + b + "lvl" + c
      document.getElementById(UpgrVar).setAttribute("onmouseleave", "CancelClick('" + UpgrVar + "', " + b + ", 2, 'Melee', " + c + ")");
  } 
}

function SetRally(a,b){
  let FlagId = "RallyFlag" + a + "lvl" + b;
  let FlagBtnId = "RallyFlagBtn" + a + "lvl" + b;
  let RallyFlag = document.getElementById(FlagId);
  let FlagSize = RallyFlag.getBoundingClientRect();
  var SightId = "MeleeSightRange" + a + "lvl" + b;
  document.getElementById(SightId).addEventListener('mousemove', FlagMove);
  document.getElementById(SightId).style.zIndex = "2";
  document.body.addEventListener("mouseup", setFlag);
  document.getElementById(FlagBtnId).removeAttribute("onclick");
  
  function FlagMove (event) {
    RallyFlag.classList.remove('BuildMenuOpt');
    RallyFlag.classList.add('MovingFlag');
    RallyFlag.style.display = 'block';
    RallyFlag.style.left = event.clientX - (FlagSize.width/5) + 'px';
    RallyFlag.style.top = event.clientY - (FlagSize.height) + 'px';
  }

  function setFlag(){
    clearTimeout(WalkingTimer[a][0]);
    clearTimeout(WalkingTimer[a][1]);
    document.getElementById(SightId).removeEventListener('mousemove', FlagMove);
    document.body.removeEventListener("mouseup", setFlag);
    document.getElementById(SightId).style.zIndex = "0";
    let militiaMember1 = 'Tower' + a + 'Goblin0';
    let militiaMember2 = 'Tower' + a + 'Goblin1';
    let getMember1 = document.getElementById(militiaMember1);
    let getMember2 = document.getElementById(militiaMember2);
    let RallyPoint = RallyFlag.getBoundingClientRect();
    let member1Position = getMember1.getBoundingClientRect();
    let member2Position = getMember2.getBoundingClientRect();
    let distanceX = (RallyPoint.x - (RallyPoint.x/20)) - member1Position.x;
    if (distanceX < 0){
      distanceX = distanceX * -1;
    }
    let distanceY = (RallyPoint.y - (RallyPoint.y/20)) - member1Position.y;
    if (distanceY < 0){
      distanceY = distanceY * -1;
    }
    let maxDistance = Math.max(distanceX, distanceY);
    getMember1.src = "Images/Goblin Walking - " + AllyColour + ".gif";
    getMember2.src = "Images/Goblin Walking - " + AllyColour + ".gif";
    WalkingTimer[a][0] = setTimeout(function(){
      getMember1.src = "Images/Goblin Idle - " + AllyColour + ".gif";
    },maxDistance*7);
    WalkingTimer[a][1] = setTimeout(function(){
      getMember2.src = "Images/Goblin Idle - " + AllyColour + ".gif";
    },maxDistance*7);
    getMember1.animate({left: (RallyPoint.x - (RallyPoint.x/20)) + "px", top: (RallyPoint.y - (RallyPoint.y/50)) + "px"},{duration: maxDistance*7, fill:"forwards"});
    getMember2.animate({left: (RallyPoint.x + (RallyPoint.x/20)) + "px", top: (RallyPoint.y + (RallyPoint.y/50)) + "px"},{duration: maxDistance*7, fill:"forwards"});
    let towerId = 'Tower' + a + 'ContLvl' + b;
    let towerPosition = document.getElementById(towerId).getBoundingClientRect();
    flagDistanceX[a] = towerPosition.x - RallyPoint.x;
    flagDistanceY[a] = towerPosition.y - RallyPoint.y; 
    CancelBuild(a,2,"Melee",b);
  }
}

function CancelBuild(a, b, c, d){
  let tower;
  let towerElem;
  let SightId;
  document.body.removeAttribute("onclick")
  switch(b){
    case 1:
      tower = 'BuildMenu' + a + 'lvl' + d;
      towerElem = document.getElementById(tower);
      towerElem.remove();
      var img = document.createElement("img");
      img.className = 'buildBtn';
      img.id = 'build' + a + 'lvl' + d;
      img.src = 'Images/Build.png';
      img.setAttribute('onclick', 'BuildMenu(' + a + ', ' + d + ')');
      let divVar = 'Tower' + a + 'ContLvl' + d;
      document.getElementById(divVar).appendChild(img);
      document.getElementById(divVar).style.backgroundImage = "url('Images/Level 1 Tower Placement.png')";
      break;
    case 2:
      tower = 'UpgrMenu' + a + 'lvl' + d;
      towerElem = document.getElementById(tower);
      towerElem.remove();
      SightId = c + "SightRange" + a + "lvl" + d;
      document.getElementById(SightId).style.visibility = "hidden";
      let FlagId = "RallyFlag" + a + "lvl" + d;
      if (document.getElementById(FlagId) != null){
        document.getElementById(FlagId).style.visibility = "hidden";
      }
  }
}

function TrainGoblins(a,b){
  for (let i=0; i < 2; i++){
    let SoldierId = 'Tower' + a + 'Goblin' + i;
    if (document.getElementById(SoldierId) != null){
      continue;
    }
    var GoblinTraining = document.createElement("img");
    GoblinTraining.id = SoldierId
    GoblinTraining.className = 'TrainedGoblin';
    GoblinTraining.src = "Images/Goblin Walking - " + AllyColour + ".gif";
    let FlagId = "RallyFlag" + a + "lvl" + b;
    let towerId = 'Tower' + a + 'ContLvl' + b;
    let RallyPoint = document.getElementById(FlagId).getBoundingClientRect();
    gameInner.appendChild(GoblinTraining);
    let militiaMember = 'Tower' + a + 'Goblin' + i;
    let getMember = document.getElementById(militiaMember);
    let towerPosition = document.getElementById(towerId).getBoundingClientRect();
    let distanceX = (RallyPoint.x - (RallyPoint.x/20)) - towerPosition.x;
    if (distanceX < 0){
      distanceX = distanceX * -1;
    }
    let distanceY = (RallyPoint.y - (RallyPoint.y/20)) - towerPosition.y;
    if (distanceY < 0){
      distanceY = distanceY * -1;
    }
    let maxDistance = Math.max(distanceX, distanceY);
    flagDistanceX[a] = towerPosition.x - RallyPoint.x;
    flagDistanceY[a] = towerPosition.y - RallyPoint.y;
    setTimeout(function(){
      getMember.src = "Images/Goblin Idle - " + AllyColour + ".gif";
    },maxDistance*7)
    getMember.style.left = (towerPosition.left + (towerPosition.width/2)) + "px";
    getMember.style.top = (towerPosition.top + (towerPosition.height/2)) + "px";
    if(i == 0){
      getMember.animate({left: (RallyPoint.x - (RallyPoint.x/20)) + "px", top: (RallyPoint.y - (RallyPoint.y/50)) + "px"},{duration: maxDistance*7, fill:"forwards"});
      document.addEventListener("fullscreenchange", ()=>{
        if (document.getElementById(towerId) != null){
          towerPosition = document.getElementById(towerId).getBoundingClientRect();
          document.getElementById(FlagId).style.left = towerPosition.x - flagDistanceX[a];
          document.getElementById(FlagId).style.top = towerPosition.y - flagDistanceY[a];
          RallyPoint = document.getElementById(FlagId).getBoundingClientRect();
          getMember.animate({left: (RallyPoint.x - (RallyPoint.x/20)) + "px", top: (RallyPoint.y - (RallyPoint.y/50)) + "px"},{duration: 1, fill:"forwards"});
        }
      })
      gameInner.addEventListener("wheel", ()=>{
        if (document.getElementById(towerId) != null){
          towerPosition = document.getElementById(towerId).getBoundingClientRect();
          document.getElementById(FlagId).style.left = towerPosition.x - flagDistanceX[a];
          document.getElementById(FlagId).style.top = towerPosition.y - flagDistanceY[a];
          RallyPoint = document.getElementById(FlagId).getBoundingClientRect();
          getMember.animate({left: (RallyPoint.x - (RallyPoint.x/20)) + "px", top: (RallyPoint.y - (RallyPoint.y/50)) + "px"},{duration: 1, fill:"forwards"});
        }
      })
      gameElem.addEventListener("scroll", ()=>{
        if (document.getElementById(towerId) != null){
          towerPosition = document.getElementById(towerId).getBoundingClientRect();
          document.getElementById(FlagId).style.left = towerPosition.x - flagDistanceX[a];
          document.getElementById(FlagId).style.top = towerPosition.y - flagDistanceY[a];
          RallyPoint = document.getElementById(FlagId).getBoundingClientRect();
          getMember.animate({left: (RallyPoint.x - (RallyPoint.x/20)) + "px", top: (RallyPoint.y - (RallyPoint.y/50)) + "px"},{duration: 1, fill:"forwards"});
        }
      })
    } if (i == 1){
      getMember.animate({left: (RallyPoint.x + (RallyPoint.x/20)) + "px", top: (RallyPoint.y + (RallyPoint.y/50)) + "px"},{duration: maxDistance*7, fill:"forwards"});
      document.addEventListener("fullscreenchange", ()=>{
        if (document.getElementById(towerId) != null){
          towerPosition = document.getElementById(towerId).getBoundingClientRect();
          document.getElementById(FlagId).style.left = towerPosition.x - flagDistanceX[a];
          document.getElementById(FlagId).style.top = towerPosition.y - flagDistanceY[a];
          RallyPoint = document.getElementById(FlagId).getBoundingClientRect();
          getMember.animate({left: (RallyPoint.x + (RallyPoint.x/20)) + "px", top: (RallyPoint.y + (RallyPoint.y/50)) + "px"},{duration: 1, fill:"forwards"});
        }
      })
      gameInner.addEventListener("wheel", ()=>{
        if (document.getElementById(towerId) != null){
          towerPosition = document.getElementById(towerId).getBoundingClientRect();
          document.getElementById(FlagId).style.left = towerPosition.x - flagDistanceX[a];
          document.getElementById(FlagId).style.top = towerPosition.y - flagDistanceY[a];
          RallyPoint = document.getElementById(FlagId).getBoundingClientRect();
          getMember.animate({left: (RallyPoint.x + (RallyPoint.x/20)) + "px", top: (RallyPoint.y + (RallyPoint.y/50)) + "px"},{duration: 1, fill:"forwards"});
        }
      })
      gameElem.addEventListener("scroll", ()=>{
        if (document.getElementById(towerId) != null){
          towerPosition = document.getElementById(towerId).getBoundingClientRect();
          document.getElementById(FlagId).style.left = towerPosition.x - flagDistanceX[a];
          document.getElementById(FlagId).style.top = towerPosition.y - flagDistanceY[a];
          RallyPoint = document.getElementById(FlagId).getBoundingClientRect();
          getMember.animate({left: (RallyPoint.x + (RallyPoint.x/20)) + "px", top: (RallyPoint.y + (RallyPoint.y/50)) + "px"},{duration: 1, fill:"forwards"});
        }
      })
    }
    GoblinMilitia[a][i] = document.getElementById(militiaMember);
    SoldierHp[a][i] = 100;
    SoldierFighting[a][i] = 0;
    SoldierRange[a][i] = setInterval(MeleeDet, 770, a, i, b);
  }
}

function MeleeDet(a,b,c){
  let CurrentTower;
  let CurrentGremlin;
  let CurrentGoblin;
  let CurrentSoldier;
  let MeleeRect;
  let MeleeXCentre;
  let MeleeYCentre;
  let GremlinRect;
  let GremXCentre;
  let GremYCentre;
  let GoblinRect;
  let GoblXCentre;
  let GoblYCentre;
  let GoblXCalc;
  let GoblYCalc;
  let GremXCalc;
  let GremYCalc;
  let SoldierRect;
  let SoldierXCentre;
  let SoldierYCentre;
  let SoldierXCalc;
  let SoldierYCalc;
  let GameRect = document.getElementById('gameCont').getBoundingClientRect();
  let RangeWidth = GameRect.width/15;
  let RangeHeight = GameRect.height/15;
  CurrentTower = 'MeleeTow' + a + 'lvl' + c;
  CurrentSoldier = 'Tower' + a + 'Goblin' + b;
  if (document.getElementById(CurrentSoldier) != null && SoldierFighting[a][b] == 0){
    SoldierRect = document.getElementById(CurrentSoldier).getBoundingClientRect();
    SoldierXCentre = ((SoldierRect.x + SoldierRect.right)/2);
    SoldierYCentre = (SoldierRect.y + SoldierRect.bottom)/2;
    for (let i = 0; i <= WaveGoblins; i++){
        CurrentGoblin = 'BirthedGoblin' + i;
      if (document.getElementById(CurrentGoblin) == null || GoblFighting[i] == 1){
        continue;
      } GoblinRect = document.getElementById(CurrentGoblin).getBoundingClientRect();
      GoblXCentre = (GoblinRect.x + GoblinRect.right)/2;
      GoblYCentre = (GoblinRect.y + GoblinRect.bottom)/2;
      GoblXCalc = (GoblXCentre) - (SoldierXCentre);
      GoblYCalc = (GoblYCentre) - (SoldierYCentre);
      if (ActiveGremlins > 0){  
        for (let j = 0; j <= WaveGremlins; j++){
          CurrentGremlin = 'BirthedGremlin' + j;
          if (document.getElementById(CurrentGremlin) == null || GremFighting[j] == 1){
            continue;
          } GremlinRect = document.getElementById(CurrentGremlin).getBoundingClientRect();
          GremXCentre = (GremlinRect.x + GremlinRect.right)/2;
          GremXCalc = (GremXCentre) - (SoldierXCentre);
          GremYCentre = (GremlinRect.y + GremlinRect.bottom)/2;
          GremYCalc = (GremYCentre) - (SoldierYCentre);
          if ((GoblXCalc >= -RangeWidth && GoblXCalc <= RangeWidth && GoblYCalc >= -RangeHeight && GoblYCalc <= RangeHeight) && (GremXCalc >= -RangeWidth && GremXCalc <= RangeWidth && GremYCalc >= -RangeHeight && GremYCalc <= RangeHeight)){
            GremFight(a,j, GremXCalc, GremYCalc, RangeWidth, RangeHeight,c);
          } else {
            GremFight(a, b, j, GremXCalc, GremYCalc, RangeWidth, RangeHeight,c);
            GoblFight(a, b, i, GoblXCalc, GoblYCalc, RangeWidth, RangeHeight,c);
          }
        }
      } else {
        if (GoblXCalc >= -RangeWidth && GoblXCalc <= RangeWidth && GoblYCalc >= -RangeHeight && GoblYCalc <= RangeHeight && SoldierFighting[a][b] == 0 && GoblFighting[i] == 0){
          GoblFight(a, b, i, GoblXCalc, GoblYCalc, RangeWidth, RangeHeight,c);
          break;
        }
      }
    }
  }
}

function GoblFight(a,b,c,d,e,f,g,h){
  if (d >= -f && d <= f && e >= -g && e <= g && SoldierFighting[a][b] == 0 && GoblFighting[c] == 0){
    let SoldierVar = 'Tower' + a + 'Goblin' + b;
    let GetSoldier = document.getElementById(SoldierVar);
    if(GetSoldier != null){
      let CurrentGoblin = 'BirthedGoblin' + c;
      let GetGoblin = document.getElementById(CurrentGoblin);
      if (GetGoblin != null){
        GetGoblin.style.animationPlayState = "paused";
        //Pause 'miss' timer:
        clearTimeout(GoblEnd[c]);
        GoblEnd[c] = null;
        let remaining = 30000;
        remaining -= Date.now() - GoblStart[c];

        GoblFighting[c] = 1;
        SoldierFighting[a][b] = 1;

        let GoblinRect = GetGoblin.getBoundingClientRect();
        let SoldierRect = GetSoldier.getBoundingClientRect();
        let GameSize = gameInner.getBoundingClientRect();
        if(SoldierRect.x != (GoblinRect.x + (GameSize.width/25)) || SoldierRect.y != GoblinRect.y){
          clearTimeout(WalkingTimer[a][b]);
          GetSoldier.src = "Images/Goblin Walking - " + AllyColour + ".gif";
          GetSoldier.animate({left: (GoblinRect.x + (GameSize.width/25)) + "px", top: GoblinRect.y + "px"},{duration: 500, fill:"forwards"});
        }

        GetGoblin.src = "Images/Goblin Idle - " + EnemyColour + ".gif"; 
        let EnemyDelay = [];
        EnemyDelay[c] = setTimeout(function(){
          GetGoblin.src = "Images/Goblin Claw - " + EnemyColour + ".gif";
          let EnemyGif1 = [];
          EnemyGif1[c] = setTimeout(function(){
            GoblinAttack[c] = setInterval(GoblinDamage,765, a,b,c,remaining,h);
          }, 765);
        },510);
        
        let AllyDelay = new Array(100).fill().map(()=>new Array(100).fill());;
        AllyDelay[a][b] = setTimeout(function(){
          GetSoldier.src = "Images/Goblin Claw - " + AllyColour + ".gif";
          let AllyGif1 = new Array(100).fill().map(()=>new Array(100).fill());;
          AllyGif1= setTimeout(function(){
            SoldierAttack[a][b] = setInterval(SoldierDamage,765,a,b,c,1,h);
          }, 765)
        },500);
      }
    }
  }
}

function GremFight(a,b,c,d,e,f,g,h){
  if (d >= -f && d <= f && e >= -g && e <= g && SoldierFighting[a][b] == 0){
    let SoldierVar = 'Tower' + a + 'Goblin' + b;
    let GetSoldier = document.getElementById(SoldierVar);
    if(GetSoldier != null){
      let CurrentGremlin = 'BirthedGremlin' + c;
      let GetGremlin = document.getElementById(CurrentGremlin);
      GetGremlin.style.animationPlayState = "paused";
      //Pause 'miss' timer:
      clearTimeout(GremEnd[c]);
      GremEnd[c] = null;
      let remaining = 30000;
      remaining -= Date.now() - GremStart[c];

      GremFighting[c] = 1;
      SoldierFighting[a][b] = 1;

      let GremlinRect = GetGremlin.getBoundingClientRect();
      let SoldierRect = GetSoldier.getBoundingClientRect();
      let GameSize = gameInner.getBoundingClientRect();
      if(SoldierRect.x != (GremlinRect.x + (GameSize.width/25)) && SoldierRect.y != GremlinRect.y){
        clearTimeout(WalkingTimer[a][b]);
        GetSoldier.src = "Images/Goblin Walking - " + AllyColour + ".gif";
        GetSoldier.animate({left: (GremlinRect.x + (GameSize.width/25)) + "px", top: GremlinRect.y + "px"},{duration: 500, fill:"forwards"});
      }

      GetGremlin.src = "Images/Gremlin Stand - " + EnemyColour + ".gif";
      let StandUp = [];
      StandUp[c] = setTimeout(function(){
        GetGremlin.src = "Images/Gremlin Idle - " + EnemyColour + ".gif"
      }, 1100)
      let EnemyDelay = [];
      EnemyDelay[c] = setTimeout(function(){
        //GetGremlin.src = "Images/Gremlin Idle - " + EnemyColour + ".gif";
        let EnemyGif1 = [];
        EnemyGif1[c] = setTimeout(function(){
          GremlinAttack[c] = setInterval(GremlinDamage,765, a,b,c,remaining,h);
        }, 765);
      },510);
      
      let AllyDelay = new Array(100).fill().map(()=>new Array(100).fill());;
      AllyDelay [a][b] = setTimeout(function(){
        GetSoldier.src = "Images/Goblin Claw - " + AllyColour + ".gif";
        let AllyGif1 = new Array(100).fill().map(()=>new Array(100).fill());;
         AllyGif1= setTimeout(function(){
          SoldierAttack[a][b] = setInterval(SoldierDamage,765,a,b,c,2,h);
        }, 765)
      },500);
    }
  }
}

function GoblinDamage(a,b,c,d,e){
  let CurrentSoldier = 'Tower' + a + 'Goblin' + b;
  let CurrentGoblin = 'BirthedGoblin' + c;
  let GetGoblin = document.getElementById(CurrentGoblin);
  if (GetGoblin != null){
    SoldierHp[a][b] -= 10;
    if (SoldierHp[a][b] <= 0){
      GoblFighting[c] = 0;
      SoldierFighting[a][b] = 0;
      document.getElementById(CurrentSoldier).remove();
      let respawnTimer = setTimeout(TrainGoblins, 5000,a,e);
      clearInterval(SoldierRange[a][b]);
      clearInterval(GoblinAttack[c]);
      clearInterval(SoldierAttack[a][b]);
      GoblEnd[c] = setTimeout(GoblMiss, d, c,e);
      GoblStart[c] = Date.now();
      GetGoblin.src = "Images/Goblin Walking - " + EnemyColour + ".gif";
      GetGoblin.style.animationPlayState = "running";
    }
  }
}

function GremlinDamage(a,b,c,d,e){
  let CurrentSoldier = 'Tower' + a + 'Goblin' + b;
  let CurrentGremlin = 'BirthedGremlin' + c;
  let GetGremlin = document.getElementById(CurrentGremlin);
  SoldierHp[a][b] -= 5;
  if (SoldierHp[a][b] <= 0){
    document.getElementById(CurrentSoldier).remove();
    SoldierFighting[a][b] = 0;
    GremFighting[c] = 0;
    let respawnTimer = setTimeout(TrainGoblins, 5000,a,e);
    clearInterval(SoldierRange[a][b]);
    clearInterval(GremlinAttack[c]);
    clearInterval(SoldierAttack[a][b]);
    GremEnd[c] = setTimeout(GremMiss, d, c, e);
    GremStart[c] = Date.now();
    GetGremlin.src = "Images/Gremlin Crawling - " + EnemyColour + ".gif";
    GetGremlin.style.animationPlayState = "running";
  }
}

function SoldierDamage(a,b,c,d,e){
  let CurrentSoldier = 'Tower' + a + 'Goblin' + b;
  let GetSoldier = document.getElementById(CurrentSoldier);
  let soldierPosition = GetSoldier.getBoundingClientRect();
  let Coins = 'lvl' + e + 'CoinsTxt';
  switch(d){
    case 1:
      let CurrentGoblin = 'BirthedGoblin' + c;
      let GetGoblin = document.getElementById(CurrentGoblin);
      if (GetGoblin == null){
        SoldierFighting[a][b] = 0;
        GoblFighting[c] = 0;
        clearTimeout(WalkingTimer[a][b]);
        clearInterval(GoblinAttack[c]);
        clearInterval(SoldierAttack[a][b]);
        document.getElementById(CurrentSoldier).src = "Images/Goblin Walking - " + AllyColour + ".gif";
        let FlagId = "RallyFlag" + a + "lvl" + e;
        let RallyFlag = document.getElementById(FlagId);
        let RallyPoint = RallyFlag.getBoundingClientRect();
        let distanceX = (RallyPoint.x - (RallyPoint.x/20)) - soldierPosition.x;
        if (distanceX < 0){
          distanceX = distanceX * -1;
        }
        let distanceY = (RallyPoint.y - (RallyPoint.y/20)) - soldierPosition.y;
        if (distanceY < 0){
          distanceY = distanceY * -1;
        }
        let maxDistance = Math.max(distanceX, distanceY);
        GetSoldier.src = "Images/Goblin Walking - " + AllyColour + ".gif";
        WalkingTimer[a][b] = setTimeout(function(){
          GetSoldier.src = "Images/Goblin Idle - " + AllyColour + ".gif";
        },maxDistance*7)
        GetSoldier.animate({left: (RallyPoint.x - (RallyPoint.x/20)) + "px", top: (RallyPoint.y - (RallyPoint.y/50)) + "px"},{duration: maxDistance*7, fill:"forwards"});
        let towerId = 'Tower' + a + 'ContLvl' + e;
        let towerPosition = document.getElementById(towerId).getBoundingClientRect();
        flagDistanceX[a] = towerPosition.x - RallyPoint.x;
        flagDistanceY[a] = towerPosition.y - RallyPoint.y;
        break;
      }
      GoblinHp[c] -= 7;
      if (GoblinHp[c] <= 0){
        SoldierFighting[a][b] = 0;
        GoblFighting[c] = 0;
        clearTimeout(WalkingTimer[a][b]);
        let LastKnownPosition = GetGoblin.getBoundingClientRect();
        GetGoblin.remove();
        clearInterval(GoblinAttack[c]);
        clearInterval(SoldierAttack[a][b]);
        document.getElementById(CurrentSoldier).src = "Images/Goblin Idle - " + AllyColour + ".gif";
        CoinsAmnt += 50;
        document.getElementById(Coins).innerText = '= ' + CoinsAmnt;
        ActiveGoblins--;
        WaveProgress(LastKnownPosition.x,LastKnownPosition.y,e);
        let FlagId = "RallyFlag" + a + "lvl" + e;
        let RallyFlag = document.getElementById(FlagId);
        let RallyPoint = RallyFlag.getBoundingClientRect();
        let distanceX = (RallyPoint.x - (RallyPoint.x/20)) - soldierPosition.x;
        if (distanceX < 0){
          distanceX = distanceX * -1;
        }
        let distanceY = (RallyPoint.y - (RallyPoint.y/20)) - soldierPosition.y;
        if (distanceY < 0){
          distanceY = distanceY * -1;
        }
        let maxDistance = Math.max(distanceX, distanceY);
        GetSoldier.src = "Images/Goblin Walking - " + AllyColour + ".gif";
        WalkingTimer[a][b] = setTimeout(function(){
          GetSoldier.src = "Images/Goblin Idle - " + AllyColour + ".gif";
        },maxDistance*7)
        GetSoldier.animate({left: (RallyPoint.x - (RallyPoint.x/20)) + "px", top: (RallyPoint.y - (RallyPoint.y/50)) + "px"},{duration: maxDistance*7, fill:"forwards"});
        let towerId = 'Tower' + a + 'ContLvl' + e;
        let towerPosition = document.getElementById(towerId).getBoundingClientRect();
        flagDistanceX[a] = towerPosition.x - RallyPoint.x;
        flagDistanceY[a] = towerPosition.y - RallyPoint.y;
      } break;
    case 2:
      let CurrentGremlin = 'BirthedGremlin' + c;
      let GetGremlin = document.getElementById(CurrentGremlin);
      if (GetGremlin == null){
        SoldierFighting[a][b] = 0;
        GremFighting[c] = 0;
        clearTimeout(WalkingTimer[a][b]);
        clearInterval(GremlinAttack[c]);
        clearInterval(SoldierAttack[a][b]);
        document.getElementById(CurrentSoldier).src = "Images/Goblin Walking - " + AllyColour + ".gif";
        let FlagId = "RallyFlag" + a + "lvl" + e;
        let RallyFlag = document.getElementById(FlagId);
        let RallyPoint = RallyFlag.getBoundingClientRect();
        let distanceX = (RallyPoint.x - (RallyPoint.x/20)) - soldierPosition.x;
        if (distanceX < 0){
          distanceX = distanceX * -1;
        }
        let distanceY = (RallyPoint.y - (RallyPoint.y/20)) - soldierPosition.y;
        if (distanceY < 0){
          distanceY = distanceY * -1;
        }
        let maxDistance = Math.max(distanceX, distanceY);
        GetSoldier.src = "Images/Goblin Walking - " + AllyColour + ".gif";
        WalkingTimer[a][b] = setTimeout(function(){
          GetSoldier.src = "Images/Goblin Idle - " + AllyColour + ".gif";
        },maxDistance*7)
        GetSoldier.animate({left: (RallyPoint.x - (RallyPoint.x/20)) + "px", top: (RallyPoint.y - (RallyPoint.y/50)) + "px"},{duration: maxDistance*7, fill:"forwards"});
        let towerId = 'Tower' + a + 'ContLvl' + e;
        let towerPosition = document.getElementById(towerId).getBoundingClientRect();
        flagDistanceX[a] = towerPosition.x - RallyPoint.x;
        flagDistanceY[a] = towerPosition.y - RallyPoint.y;
        break;
      }
      GremlinHp[c] -= 7;
      if (GremlinHp[c] <= 0){
        SoldierFighting[a][b] = 0;
        GremFighting[c] = 0;
        clearTimeout(WalkingTimer[a][b]);
        let LastKnownPosition = GetGremlin.getBoundingClientRect();
        GetGremlin.remove();
        clearInterval(GremlinAttack[c]);
        clearInterval(SoldierAttack[a][b]);
        document.getElementById(CurrentSoldier).src = "Images/Goblin Idle - " + AllyColour + ".gif";
        CoinsAmnt += 50;
        document.getElementById(Coins).innerText = '= ' + CoinsAmnt;
        ActiveGremlins--;
        WaveProgress(LastKnownPosition.x,LastKnownPosition.y,e);
        let FlagId = "RallyFlag" + a + "lvl" + e;
        let RallyFlag = document.getElementById(FlagId);
        let RallyPoint = RallyFlag.getBoundingClientRect();
        let distanceX = (RallyPoint.x - (RallyPoint.x/20)) - soldierPosition.x;
        if (distanceX < 0){
          distanceX = distanceX * -1;
        }
        let distanceY = (RallyPoint.y - (RallyPoint.y/20)) - soldierPosition.y;
        if (distanceY < 0){
          distanceY = distanceY * -1;
        }
        let maxDistance = Math.max(distanceX, distanceY);
        GetSoldier.src = "Images/Goblin Walking - " + AllyColour + ".gif";
        WalkingTimer[a][b] = setTimeout(function(){
          GetSoldier.src = "Images/Goblin Idle - " + AllyColour + ".gif";
        },maxDistance*7)
        GetSoldier.animate({left: (RallyPoint.x - (RallyPoint.x/20)) + "px", top: (RallyPoint.y - (RallyPoint.y/50)) + "px"},{duration: maxDistance*7, fill:"forwards"});
        let towerId = 'Tower' + a + 'ContLvl' + e;
        let towerPosition = document.getElementById(towerId).getBoundingClientRect();
        flagDistanceX[a] = towerPosition.x - RallyPoint.x;
        flagDistanceY[a] = towerPosition.y - RallyPoint.y;
        break;
      }
  }
}


function Lvl1Waves(){
  switch (lvl1WaveCnt){
    case 1:
      document.getElementById("callWaveLvl1").removeAttribute('onclick');
      document.getElementById("callWaveLvl1").removeAttribute('title');
      document.getElementById("callWaveLvl1").style.filter = "brightness(50%)";
      document.getElementById("lvl1CurrentWave").innerText = 'Current Wave: ' + lvl1WaveCnt;
      GoblinNo = 0;
      WaveGoblins = 10;
      ActiveGoblins = WaveGoblins + 1;
      spawnGoblin(1);
      Goblins = setInterval(spawnGoblin, 2000,1);
      lvl1WaveCnt++;
      break;
    case 2:
      document.getElementById("callWaveLvl1").removeAttribute('onclick');
      document.getElementById("callWaveLvl1").removeAttribute('title');
      document.getElementById("callWaveLvl1").style.filter = "brightness(50%)";
      document.getElementById("lvl1CurrentWave").innerText = 'Current Wave: ' + lvl1WaveCnt;
      GoblinNo = 0;
      WaveGoblins = 15;
      ActiveGoblins = WaveGoblins + 1;
      spawnGoblin(1);
      Goblins = setInterval(spawnGoblin, 1900,1);
      GremlinNo = 0;
      WaveGremlins = 5;
      ActiveGremlins = WaveGremlins + 1;
      spawnGremlin(1);
      Gremlins = setInterval(spawnGremlin, 2500,1);
      lvl1WaveCnt++;
      break;
    case 3:
      document.getElementById("callWaveLvl1").removeAttribute('onclick');
      document.getElementById("callWaveLvl1").removeAttribute('title');
      document.getElementById("callWaveLvl1").style.filter = "brightness(50%)";
      document.getElementById("lvl1CurrentWave").innerText = 'Current Wave: ' + lvl1WaveCnt;
      GoblinNo = 0;
      WaveGoblins = 20;
      ActiveGoblins = WaveGoblins + 1;
      spawnGoblin(1);
      Goblins = setInterval(spawnGoblin, 1800,1);
      lvl1WaveCnt++;
      break;
    case 4:
      document.getElementById("callWaveLvl1").removeAttribute('onclick');
      document.getElementById("callWaveLvl1").removeAttribute('title');
      document.getElementById("callWaveLvl1").style.filter = "brightness(50%)";
      document.getElementById("lvl1CurrentWave").innerText = 'Current Wave: ' + lvl1WaveCnt;
      GoblinNo = 0;
      WaveGoblins = 25;
      ActiveGoblins = WaveGoblins + 1;
      spawnGoblin(1);
      Goblins = setInterval(spawnGoblin, 1700,1);
      lvl1WaveCnt++;
      break;
    case 5:
      document.getElementById("callWaveLvl1").removeAttribute('onclick');
      document.getElementById("callWaveLvl1").removeAttribute('title');
      document.getElementById("callWaveLvl1").style.filter = "brightness(50%)";
      document.getElementById("lvl1CurrentWave").innerText = 'Current Wave: ' + lvl1WaveCnt;
      GoblinNo = 0;
      WaveGoblins = 20;
      ActiveGoblins = WaveGoblins + 1;
      spawnGoblin(1);
      Goblins = setInterval(spawnGoblin, 1500,1);
      lvl1WaveCnt++;
      break;
  }
}

function Lvl2Waves(){
  switch (lvl2WaveCnt){
    case 1:
      document.getElementById("callWaveLvl2").removeAttribute('onclick');
      document.getElementById("callWaveLvl2").removeAttribute('title');
      document.getElementById("callWaveLvl2").style.filter = "brightness(50%)";
      document.getElementById("lvl2CurrentWave").innerText = 'Current Wave: ' + lvl2WaveCnt;
      GoblinNo = 0;
      WaveGoblins = 10;
      ActiveGoblins = WaveGoblins + 1;
      spawnGoblin(2);
      Goblins = setInterval(spawnGoblin, 2000,2);
      lvl2WaveCnt++;
      break;
    case 2:
      document.getElementById("callWaveLvl2").removeAttribute('onclick');
      document.getElementById("callWaveLvl2").removeAttribute('title');
      document.getElementById("callWaveLvl2").style.filter = "brightness(50%)";
      document.getElementById("lvl2CurrentWave").innerText = 'Current Wave: ' + lvl2WaveCnt;
      GoblinNo = 0;
      WaveGoblins = 15;
      ActiveGoblins = WaveGoblins + 1;
      spawnGoblin(2);
      Goblins = setInterval(spawnGoblin, 1900,2);
      GremlinNo = 0;
      WaveGremlins = 5;
      ActiveGremlins = WaveGremlins + 1;
      spawnGremlin(2);
      Gremlins = setInterval(spawnGremlin, 2500,2);
      lvl2WaveCnt++;
      break;
    case 3:
      document.getElementById("callWaveLvl2").removeAttribute('onclick');
      document.getElementById("callWaveLvl2").removeAttribute('title');
      document.getElementById("callWaveLvl2").style.filter = "brightness(50%)";
      document.getElementById("lvl2CurrentWave").innerText = 'Current Wave: ' + lvl2WaveCnt;
      GoblinNo = 0;
      WaveGoblins = 20;
      ActiveGoblins = WaveGoblins + 1;
      spawnGoblin(2);
      Goblins = setInterval(spawnGoblin, 1800,2);
      lvl2WaveCnt++;
      break;
    case 4:
      document.getElementById("callWaveLvl2").removeAttribute('onclick');
      document.getElementById("callWaveLvl2").removeAttribute('title');
      document.getElementById("callWaveLvl2").style.filter = "brightness(50%)";
      document.getElementById("lvl2CurrentWave").innerText = 'Current Wave: ' + lvl2WaveCnt;
      GoblinNo = 0;
      WaveGoblins = 25;
      ActiveGoblins = WaveGoblins + 1;
      spawnGoblin(2);
      Goblins = setInterval(spawnGoblin, 1700,2);
      lvl2WaveCnt++;
      break;
    case 5:
      document.getElementById("callWaveLvl2").removeAttribute('onclick');
      document.getElementById("callWaveLvl2").removeAttribute('title');
      document.getElementById("callWaveLvl2").style.filter = "brightness(50%)";
      document.getElementById("lvl2CurrentWave").innerText = 'Current Wave: ' + lvl2WaveCnt;
      GoblinNo = 0;
      WaveGoblins = 20;
      ActiveGoblins = WaveGoblins + 1;
      spawnGoblin(2);
      Goblins = setInterval(spawnGoblin, 1500,2);
      lvl2WaveCnt++;
      break;
  }
}

function spawnGoblin(a){
  var GoblinBirth = document.createElement("img");
  let direction;
  GoblinBirth.id = 'BirthedGoblin' + GoblinNo;
  GoblinBirth.className = 'BirthedGoblin Lvl' + a + 'Goblin';
  GoblinBirth.src = 'Images/Goblin Walking - ' + EnemyColour + '.gif';
  switch (a){
    case 1:
      GoblinBirth.style.animationName = "lvl1Path";
      break;
    case 2:
      direction = Math.floor(Math.random()*2);
      if (direction == 0){
        GoblinBirth.style.animationName = "lvl2PathL";
      } if (direction == 1){
        GoblinBirth.style.animationName = "lvl2PathR";
      }
      break;
  }
  GoblinBirth.style.animationDuration = "25s";
  GoblinBirth.style.animationFillMode = "both";
  GoblinBirth.style.animationTimingFunction = "linear";
  gameInner.appendChild(GoblinBirth);
  let hordeMember = 'BirthedGoblin' + GoblinNo;
  GoblinHorde[GoblinNo] = document.getElementById(hordeMember);
  GoblEnd[GoblinNo] = setTimeout(GoblMiss, 27000, GoblinNo,a);
  GoblStart[GoblinNo] = Date.now();
  GoblFighting[GoblinNo] = 0;
  GoblinHp[GoblinNo] = 100;
  if (GoblinNo >= WaveGoblins){
        clearInterval(Goblins);
      } else {
        GoblinNo++;
      }
}

function spawnGremlin(a){
  var GremlinBirth = document.createElement("img");
  GremlinBirth.id = 'BirthedGremlin' + GremlinNo;
  GremlinBirth.className = 'BirthedGremlin lvl' + a + 'Gremlin';
  GremlinBirth.src = 'Images/Gremlin Crawling - ' + EnemyColour + '.gif';
  gameInner.appendChild(GremlinBirth);
  let swarmMember = 'BirthedGremlin' + GremlinNo;
  GremlinSwarm[GremlinNo] = document.getElementById(swarmMember);
  GremEnd[GremlinNo] = setTimeout(GremMiss, 12000, GremlinNo,a);
  GremStart[GremlinNo] = Date.now();
  GremFighting[GremlinNo] = 0;
  GremlinHp[GremlinNo] = 75;
  if (GremlinNo >= WaveGremlins){
        clearInterval(Gremlins);
      } else {
        GremlinNo++;
      }
}

function GoblMiss(a,b){
  let GoblId = 'BirthedGoblin' + a;
  let LastKnownPosition = document.getElementById(GoblId).getBoundingClientRect();
  let Coins = 'lvl' + b + 'CoinsTxt'
  let CurrentHp = 'lvl' + b + 'HpTxt'
  document.getElementById(GoblId).remove();
  ActiveGoblins--;
  PlayerHealth -= 10;
  document.getElementById(CurrentHp).innerText = '= ' + PlayerHealth;
  CoinsAmnt += 50;
  document.getElementById(Coins).innerText = '= ' + CoinsAmnt;
  if(PlayerHealth <= 0){
    document.getElementById("game").style.backgroundColor = "#87ceeb";
    gameInner.innerHTML = '<div class="menuBg" id="LossMenu"><button class="menu_elem button" id="replayBtn" onclick="PlayLL()">Try Again</button> <button class="menu_elem button" id="quitBtn" onclick="MainMenu()">Quit</button></div>';
  } else {
    let EscapedX = LastKnownPosition.x - (LastKnownPosition.x/5);
    let EscapedY = LastKnownPosition.y - (LastKnownPosition.x/5);
    WaveProgress(EscapedX, EscapedY,b);
  }
}

function EnemDet(a,b){
  let CurrentTower;
  let CurrentGremlin;
  let CurrentGoblin;
  let CurrentArrow;
  let BowRect;
  let BowXCentre;
  let BowYCentre;
  let GremlinRect;
  let GremXCentre;
  let GremYCentre;
  let GoblinRect;
  let GoblXCentre;
  let GoblYCentre;
  let GoblXCalc;
  let GoblYCalc;
  let GremXCalc;
  let GremYCalc;
  let GameRect = document.getElementById('gameCont').getBoundingClientRect();
  let RangeWidth = GameRect.width*0.23;
  let RangeHeight = GameRect.height*0.2;
  CurrentTower = 'BowTow' + a + 'lvl' + b;
  CurrentArrow = 'Arrow' + a;
  if (document.getElementById(CurrentTower) == null){
    clearTimeout(BowRange[a]);
  } else
  if (document.getElementById(CurrentArrow) == null){
    BowRect = document.getElementById(CurrentTower).getBoundingClientRect();
    BowXCentre = ((BowRect.x + BowRect.right)/2);
    BowYCentre = (BowRect.y + BowRect.bottom)/2;
    for (let i = 0; i <= WaveGoblins; i++){
        CurrentGoblin = 'BirthedGoblin' + i;
      if (document.getElementById(CurrentGoblin) == null){
        continue;
      } GoblinRect = document.getElementById(CurrentGoblin).getBoundingClientRect();
      GoblXCentre = (GoblinRect.x + GoblinRect.right)/2;
      GoblYCentre = (GoblinRect.y + GoblinRect.bottom)/2;
      GoblXCalc = (GoblXCentre) - (BowXCentre);
      GoblYCalc = (GoblYCentre) - (BowYCentre);
      if (ActiveGremlins > 0){  
        for (let j = 0; j <= WaveGremlins; j++){
          CurrentGremlin = 'BirthedGremlin' + j;
          if (document.getElementById(CurrentGremlin) == null){
            continue;
          } GremlinRect = document.getElementById(CurrentGremlin).getBoundingClientRect();
          GremXCentre = (GremlinRect.x + GremlinRect.right)/2;
          GremXCalc = (GremXCentre) - (BowXCentre);
          GremYCentre = (GremlinRect.y + GremlinRect.bottom)/2;
          GremYCalc = (GremYCentre) - (BowYCentre);
          if ((GoblXCalc >= -RangeWidth && GoblXCalc <= RangeWidth && GoblYCalc >= -RangeHeight && GoblYCalc <= RangeHeight) && (GremXCalc >= -RangeWidth && GremXCalc <= RangeWidth && GremYCalc >= -RangeHeight && GremYCalc <= RangeHeight)){
            GremDet(a,j, GremXCalc, GremYCalc, RangeWidth, RangeHeight,b);
          } else {
            GremDet(a,j, GremXCalc, GremYCalc, RangeWidth, RangeHeight,b);
            GoblDet(a,i, GoblXCalc, GoblYCalc, RangeWidth, RangeHeight,b);
          }
        }
      } else {
        GoblDet(a,i, GoblXCalc, GoblYCalc, RangeWidth, RangeHeight, b);
      }
    }
  }
}

function GremDet(a,b,c,d,e,f,g){
  if (c >= -e && c <= e && d >= -f && d <= f){
    let ArrowVar = 'Arrow' + a;
    if(document.getElementById(ArrowVar) == null){
      let shoot = document.createElement("img");
      shoot.id = ArrowVar;
      shoot.className = 'Arrow';
      shoot.src = 'Images/Arrow.png';
      let TowerCont = 'Tower' + a + 'ContLvl' + g;
      ArrowXOffset[a] = 0;
      ArrowYOffset[a] = 0;
      document.getElementById(TowerCont).appendChild(shoot);
      shootArrow(a, b, 2, g);
    }
  }
}

function GoblDet(a,b,c,d,e,f,g){
  if (c >= -e && c <= e && d >= -f && d <= f){
    let ArrowVar = 'Arrow' + a;
    if(document.getElementById(ArrowVar) == null){
      let shoot = document.createElement("img");
      shoot.id = ArrowVar;
      shoot.className = 'Arrow';
      shoot.src = 'Images/Arrow.png';
      let TowerCont = 'Tower' + a + 'ContLvl' + g;
      ArrowXOffset[a] = 0;
      ArrowYOffset[a] = 0;
      document.getElementById(TowerCont).appendChild(shoot);
      ArrowTarget = 1;
      shootArrow(a, b, 1, g);
    }
  }
}

function GremMiss(a,b){
  let GremId = 'BirthedGremlin' + a;
  let LastKnownPosition = document.getElementById(GremId).getBoundingClientRect();
  let Coins = 'lvl' + b + 'CoinsTxt'
  let CurrentHp = 'lvl' + b + 'HpTxt'
  document.getElementById(GremId).remove();
  ActiveGremlins--;
  PlayerHealth -= 10;
  document.getElementById(CurrentHp).innerText = '= ' + PlayerHealth;
  CoinsAmnt += 50;
  document.getElementById(Coins).innerText = '= ' + CoinsAmnt;
  if(PlayerHealth <= 0){
    document.getElementById("game").style.backgroundColor = "#87ceeb";
    gameInner.innerHTML = '<div class="menuBg" id="LossMenu"><button class="menu_elem button" id="replayBtn" onclick="PlayLL()">Try Again</button> <button class="menu_elem button" id="quitBtn" onclick="MainMenu()">Quit</button></div>';
  } else {
    let EscapedX = LastKnownPosition.x - (LastKnownPosition.x/5);
    let EscapedY = LastKnownPosition.y - (LastKnownPosition.x/5);
    WaveProgress(EscapedX, EscapedY,b);
  }
}

function shootArrow(a, b, c, d){
  switch (c){
    case 1:
      FiredArrow[a] = setInterval(seekGoblin, 5, a, b, d);
      break;
    case 2:
      FiredArrow[a] = setInterval(seekGremlin, 5, a, b, d);
      break;
    }
} 

function seekGoblin(a, b, c){
  let CurrentGoblin = 'BirthedGoblin' + b;
  let ArrowId = 'Arrow' + a;
  let Coins = 'lvl' + c + 'CoinsTxt'
  if (document.getElementById(CurrentGoblin) == null){
    if (document.getElementById(ArrowId) != null){
      document.getElementById(ArrowId).remove();
      clearInterval(FiredArrow[a]);
    }
  } else{
    let GoblinRect = document.getElementById(CurrentGoblin).getBoundingClientRect();
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
      ArrowElem.style.transform = "rotate(-90deg)";
    } if (xCalc > 0){
      ArrowXOffset[a] += 5;
      ArrowElem.style.left = ArrowXOffset[a] + 'px';
      ArrowElem.style.transform = "rotate(90deg)";
    } if (yCalc < 0){
      ArrowYOffset[a] -= 5;
      ArrowElem.style.top = ArrowYOffset[a] + 'px';
    } if (yCalc > 0){
      ArrowYOffset[a] += 5;
      ArrowElem.style.top = ArrowYOffset[a] + 'px';
      ArrowElem.style.transform = "rotate(180deg)";
    } if (xCalc > -5 && xCalc < 5 && yCalc > -5 && yCalc < 5){
      GoblinHp[b] -=10
      if(GoblinHp[b] <= 0){
        let LastKnownPosition = document.getElementById(CurrentGoblin).getBoundingClientRect();
        document.getElementById(CurrentGoblin).remove();
        ArrowElem.remove();
        CoinsAmnt += 50;
        document.getElementById(Coins).innerText = '= ' + CoinsAmnt;
        clearTimeout(GoblEnd[b]);
        ActiveGoblins--;
        WaveProgress(LastKnownPosition.x,LastKnownPosition.y,c);
      }
      ArrowElem.remove();
      clearInterval(FiredArrow[a]);
    }
  }
}

function seekGremlin(a, b, c){
  let CurrentGremlin = 'BirthedGremlin' + b;
  let ArrowId = 'Arrow' + a;
  let Coins = 'lvl' + c + 'CoinsTxt'
  if (document.getElementById(CurrentGremlin) == null){
    document.getElementById(ArrowId).remove();
    clearInterval(FiredArrow[a]);
  } else {
    let GremlinRect = document.getElementById(CurrentGremlin).getBoundingClientRect();
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
      ArrowElem.style.transform = "rotate(-90deg)";
    } if (xCalc > 0){
      ArrowXOffset[a] += 5;
      ArrowElem.style.left = ArrowXOffset[a] + 'px';
      ArrowElem.style.transform = "rotate(90deg)";
    } if (yCalc < 0){
      ArrowYOffset[a] -= 5;
      ArrowElem.style.top = ArrowYOffset[a] + 'px';
    } if (yCalc > 0){
      ArrowYOffset[a] += 5;
      ArrowElem.style.top = ArrowYOffset[a] + 'px';
      ArrowElem.style.transform = "rotate(180deg)";
    } if (xCalc > -5 && xCalc < 5 && yCalc > -5 && yCalc < 5){
      GremlinHp[b] -=10
      if(GremlinHp[b] <= 0){
        let LastKnownPosition = document.getElementById(CurrentGremlin).getBoundingClientRect();
        document.getElementById(CurrentGremlin).remove();
        ArrowElem.remove();
        CoinsAmnt += 50;
        document.getElementById(Coins).innerText = '= ' + CoinsAmnt;
        clearTimeout(GremEnd[b]);
        ActiveGremlins--;
        WaveProgress(LastKnownPosition.x,LastKnownPosition.y, c);
      }
      ArrowElem.remove();
      clearInterval(FiredArrow[a]);
    }
  }
}

function WaveProgress(a,b,c){
  let CurrentLvlWaves;
  let CurrentLvlPlay = "callWaveLvl" + c;
  if (c == 1){
    CurrentLvlWaves = lvl1WaveCnt;
  } if (c == 2){
    CurrentLvlWaves = lvl2WaveCnt;
  }
  TotalActive = ActiveGoblins + ActiveGremlins
      if (TotalActive == 0){
        if (CurrentLvlWaves > 5){
          if (lvlsUnl < c){
            lvlsUnl++;
          } let WaveComp = document.createElement('div');
          WaveComp.className = 'WaveCompMsg';
          WaveComp.id = 'WaveCompMsg';
          gameInner.appendChild(WaveComp);
          document.getElementById('WaveCompMsg').innerText = 'Level Complete!';
          let DroppedLetter = document.createElement('img');
          DroppedLetter.className = 'envelope';
          let envelopeId = 'envelopeLvl' + c;
          DroppedLetter.id = envelopeId
          DroppedLetter.src = 'Images/Envelope - Closed.png';
          gameInner.appendChild(DroppedLetter);
          let GetLetter = document.getElementById(envelopeId);
          GetLetter.setAttribute('onclick', 'OpenLetter(' + c + ')');
          GetLetter.style.left = a;
          GetLetter.style.top = b;
          let Coins = 'lvl' + c + 'Coins';
          let initial = document.getElementById(Coins).getBoundingClientRect();
          let letterRect = GetLetter.getBoundingClientRect();
          let CallWave = 'callWaveLvl' + c;
          document.getElementById(CallWave).setAttribute('title', "You've got mail...");
          document.addEventListener("fullscreenchange", () => {
            if (document.getElementById(Coins) != null){
              let current = document.getElementById(Coins).getBoundingClientRect();
              GetLetter.style.top = letterRect.y + (current.y - initial.y);
              GetLetter.style.left = letterRect.x + (current.x - initial.x);
            }
          })
          gameInner.addEventListener("wheel", () => {
            if (document.getElementById(Coins) != null){
              let current = document.getElementById(Coins).getBoundingClientRect();
              GetLetter.style.top = letterRect.y + (current.y - initial.y);
              GetLetter.style.left = letterRect.x + (current.x - initial.x);
            }
          })
          gameElem.addEventListener("scroll", () => {
            if (document.getElementById(Coins) != null){
              let current = document.getElementById(Coins).getBoundingClientRect();
              GetLetter.style.top = letterRect.y + (current.y - initial.y);
              GetLetter.style.left = letterRect.x + (current.x - initial.x);
            }
          })
          let CloseTimer;
        } else {
          let WaveComp = document.createElement('div');
          WaveComp.className = 'WaveCompMsg';
          WaveComp.id = 'WaveCompMsg';
          gameInner.appendChild(WaveComp);
          document.getElementById('WaveCompMsg').innerText = 'Wave Complete!';
          let CloseTimer;
          CloseTimer = setTimeout(CloseMsg, 3500);
          document.getElementById(CurrentLvlPlay).setAttribute('onclick', 'Lvl' + c + 'Waves()');
          document.getElementById(CurrentLvlPlay).setAttribute('title', 'Call Next Wave');
          document.getElementById(CurrentLvlPlay).style.filter = "brightness(100%)";
        }
      }
}

function DevTools(a){
  if (a == 1){
    if (event.key == 1){
      lvl1WaveCnt = 1;
      console.log(event.key);
    } if (event.key == 2){
      lvl1WaveCnt = 2;
      console.log(event.key);
    } if (event.key == 3){
      lvl1WaveCnt = 3;
      console.log(event.key);
    } if (event.key == 4){
      lvl1WaveCnt = 4;
      console.log(event.key);
    } if (event.key == 5){
    lvl1WaveCnt = 5;
    console.log(event.key);
    }
  } if (a == 2){
    if (event.key == 1){
      lvl2WaveCnt = 1;
      console.log(event.key);
    } if (event.key == 2){
      lvl2WaveCnt = 2;
      console.log(event.key);
    } if (event.key == 3){
      lvl2WaveCnt = 3;
      console.log(event.key);
    } if (event.key == 4){
      lvl2WaveCnt = 4;
      console.log(event.key);
    } if (event.key == 5){
      lvl2WaveCnt = 5;
      console.log(event.key);
    }
  } if (event.key == 'c'){
    CoinsAmnt += 50;
    let CoinTxt = 'lvl' + a + 'CoinsTxt'
    document.getElementById(CoinTxt).innerText = '= ' + CoinsAmnt;
  }
}

function OpenLetter(a){
  let AnyKey;
  let GetLetter;
  let LetterRect;
  let GameSize;
  ContMsg = document.createElement('div');
  switch(a){
    case 1:
      GetLetter = document.getElementById('envelopeLvl1');
      LetterRect = GetLetter.getBoundingClientRect();
      GameSize = gameInner.getBoundingClientRect();
      GetLetter.src = "Images/Envelope - Opening(no loop).gif"
      GetLetter.style.position = "absolute";
      GetLetter.animate({left: "20%", top: "10%", height: "80%", width: "60%"},{duration: 1000,fill: "forwards"});
      setTimeout(function(){
        gameInner.innerHTML = "";
        BgMusic.pause()
        LetterMusic.play();
        LetterMusic.volume = 0.2;
        setTimeout(function(){
          gameInner.innerHTML = '<div class="cutscene"> <img class = "Background" id="GoblinRegret" src="Images/Writing Goblin.jpeg"> <img class = "LetterBg" src="Images/Letter Bg.png"> <div class = "LetterContents">My dearest wife,<br><br>It has been years since I last laid eyes upon you, last held you, held our daughter, but I am at long last coming home to you.<br>Our commander has informed us this is to be our last mission, one final push, then I can return.<br>I cannot wait to see you again, to see how our little Goblinda has grown.<br>I will see you soon, my love.</div></div>'
          document.addEventListener("keypress", ContinueLvl1);
          setTimeout(function(){
            Letter1VA.load();
            Letter1VA.play();
          },5000)
          function ContinueLvl1(){
            console.log('not that one');
            LetterMusic.pause();
            gameInner.innerHTML = "";
            gameElem.style.backgroundColor = "black";
            PlayNL(2);
            Letter1VA.pause();
            document.removeEventListener("keypress", ContinueLvl1);
            clearTimeout(AnyKey);
          }
          AnyKey = setTimeout(function(){
            ContMsg = document.createElement('div');
            ContMsg.id = "ContinueLvl1";
            ContMsg.innerText = "press any key to continue";
            gameInner.appendChild(ContMsg);
          },30000);
        },1000);
      },1250);
      break;
    case 2:
      GetLetter = document.getElementById('envelopeLvl2');
      LetterRect = GetLetter.getBoundingClientRect();
      GameSize = gameInner.getBoundingClientRect();
      GetLetter.src = "Images/Envelope - Opening(no loop).gif"
      GetLetter.style.position = "absolute";
      GetLetter.animate({left: "20%", top: "10%", height: "80%", width: "60%"},{duration: 1000,fill: "forwards"});
      setTimeout(function(){
        gameInner.innerHTML = "";
        BgMusic.pause()
        LetterMusic.play();
        setTimeout(function(){
          gameInner.innerHTML = '<div class="cutscene"> <img class = "Background" id="GoblinRegret" src="Images/Gobling Drawing.jpeg"> <img class = "LetterBg" src="Images/Letter Bg.png"> <div class = "LetterContents">Good luck on your first mission Mama!<br><br>Me and Gurge got you a present for when you get home!</div></div>'
          document.addEventListener("keypress", ContinueLvl2);
          function ContinueLvl2(){
            console.log('not that one');
            LetterMusic.pause();
            gameInner.innerHTML = "";
            gameElem.style.backgroundColor = "black";
            MainMenu();
            document.removeEventListener("keypress", ContinueLvl2);
            clearTimeout(AnyKey);
          }
          AnyKey = setTimeout(function(){
            ContMsg = document.createElement('div');
            ContMsg.id = "ContinueLvl2";
            ContMsg.innerText = "press any key to continue";
            gameInner.appendChild(ContMsg);
          },30000);
        },1000);
      },1250);
      break;
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
  gameInner.innerHTML = '<div class="menuBg" id="LevelsMenu"><img id="BackBtn" src="Images/Back_Button.png" title="Back to main menu" onclick="MainMenu()"> <button class="menu_elem button lvlbtn" id="lvl1btn">Level 1</button> <button class="menu_elem button lvlbtn" id="lvl2btn">Level 2</button> </div>';
  for (let i = 1; i <= lvlsUnl; i++){
    let CurrentBtn = "lvl" + i + "btn";
    document.getElementById(CurrentBtn).setAttribute("onclick", "PlayNL(" + i + ")");
    document.getElementById(CurrentBtn).style.filter = "brightness(100%)";
  }
}

function Settings(){
   document.getElementById("game").style.backgroundColor = "#87ceeb";
  gameInner.innerHTML = '<div class="menuBg" id="SettingsMenu"><img id="BackBtn" src="Images/Back_Button.png" title="Back to main menu" onclick="MainMenu()"> <button class="menu_elem button" id="ColChgBtn" onclick="ColourSelect()">Change Colours</button> <button class="menu_elem button" id="ClrStrBtn" onclick="ClrStr()">Clear Local Storage</button> </div>';
}

function ClrStr(){
  localStorage.clear();
  window.location.reload();
}

function SaveData(){
  switch(LoadedSave){
  case 1:
    localStorage.setItem("AllyColoursSelected1", AllyColoursSelected);
    localStorage.setItem("AllyColour1", AllyColour);
    localStorage.setItem("EnemyColoursSelected1", EnemyColoursSelected);
    localStorage.setItem("EnemyColour1", EnemyColour);
    localStorage.setItem("ColoursSelected1", ColoursSelected);
    localStorage.setItem("lvlsUnl1", lvlsUnl);
    localStorage.setItem("DataSaved1", 1);
  case 2:
    localStorage.setItem("AllyColoursSelected2", AllyColoursSelected);
    localStorage.setItem("AllyColour2", AllyColour);
    localStorage.setItem("EnemyColoursSelected2", EnemyColoursSelected);
    localStorage.setItem("EnemyColour2", EnemyColour);
    localStorage.setItem("ColoursSelected2", ColoursSelected);
    localStorage.setItem("lvlsUnl2", lvlsUnl);
    localStorage.setItem("DataSaved2", 1);
  case 3:
    localStorage.setItem("AllyColoursSelected3", AllyColoursSelected);
    localStorage.setItem("AllyColour3", AllyColour);
    localStorage.setItem("EnemyColoursSelected3", EnemyColoursSelected);
    localStorage.setItem("EnemyColour3", EnemyColour);
    localStorage.setItem("ColoursSelected3", ColoursSelected);
    localStorage.setItem("lvlsUnl3", lvlsUnl);
    localStorage.setItem("DataSaved3", 1);
  }
}
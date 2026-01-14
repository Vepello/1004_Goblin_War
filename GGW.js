var gameElem = document.getElementById("game");
var gameInner = document.getElementById("gameCont");
var img = document.createElement("IMG");
var oldImg;
let timeout;
let FSToggle = 0;
let lvlsUnl = 1; //number of levels unlocked by player

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

function level1(){
  gameInner.innerHTML = "<img class='LevelBG' id='Level1BG' src='Images/Level_1_Map.png'>";
}

function SavesMenu(){ //lists player save files and allows for saving/loading
  document.getElementById("game").style.backgroundColor = "#87ceeb";
  gameInner.innerHTML = '<div class="menuBg" id="savesMenu"><img id="BackBtn" src="Images/Back_Button.png" title="Back to main menu" onclick="MainMenu()"></div>';
}

function LvlSel(){ //lists unlocked levels, allows replay of completed levels
  document.getElementById("game").style.backgroundColor = "#87ceeb";
  gameInner.innerHTML = '<div class="menuBg" id="LevelsMenu"><img id="BackBtn" src="Images/Back_Button.png" title="Back to main menu" onclick="MainMenu()"></div>';
}
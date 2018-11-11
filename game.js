//------------
//System Vars
//------------
var stage = document.getElementById("gameCanvas");
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;
var ctx = stage.getContext("2d");
ctx.fillStyle = "grey";
ctx.font = GAME_FONTS;

//---------------
//Preloading ...
//---------------
//Preload Art Assets
// - Sprite Sheet
var charImage = new Image();
charImage.ready = false;
charImage.onload = setAssetReady;
charImage.src = PATH_CHAR;

function setAssetReady() {
  this.ready = true;
}

//Display Preloading
ctx.fillRect(0, 0, stage.width, stage.height);
ctx.fillStyle = "#000";
ctx.fillText(TEXT_PRELOADING, TEXT_PRELOADING_X, TEXT_PRELOADING_Y);
var preloader = setInterval(preloading, TIME_PER_FRAME);

var gameloop, facing, currX, currY, charX, charY, isMoving;

function preloading() {
  if (charImage.ready) {
    clearInterval(preloader);

    //Initialise game
    facing = "E"; //N = North, E = East, S = South, W = West
    isMoving = false;

    gameloop = setInterval(update, TIME_PER_FRAME);
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
  }
}

//------------
//Key Handlers
//------------
function keyDownHandler(event) {
  var keyPressed = String.fromCharCode(event.keyCode);

  if (keyPressed == "W") {
    facing = "N";
    isMoving = true;
  } else if (keyPressed == "D") {
    facing = "E";
    isMoving = true;
  } else if (keyPressed == "S") {
    facing = "S";
    isMoving = true;
  } else if (keyPressed == "A") {
    facing = "W";
    isMoving = true;
  }
}

function keyUpHandler(event) {
  var keyPressed = String.fromCharCode(event.keyCode);

  if ((keyPressed == "W") || (keyPressed == "A") ||
    (keyPressed == "S") || (keyPressed == "D")) {
    isMoving = false;
  }
}

//Preolad HashMap of all coordinates
var myMapX = new Map();
//var myMapY = new Map();
var i, j;
//Science Hall
for (i = 1107; i < 1133; i++) {
  for (j = 258; j < 301; j++) {
    myMapX.set(i.toString() + " " + j.toString(), "Science");
  }
}

//Rheta's Market
for (i = 1067; i < 1095; i++) {
  for (j = 422; j < 442; j++) {
    myMapX.set(i.toString() + " " + j.toString(), "Rhetas");
  }
}

//Starting Point
charX = CHAR_START_X;
charY = CHAR_START_Y;

currX = IMAGE_START_X;
currY = IMAGE_START_EAST_Y;
var appear = false;
var dining = false;

function update() {
  //Clear Canvas
  //ctx.fillStyle = "red";
  // var background = new Image();
  // background.src = "https://welovebears.club/wp-content/uploads/2017/11/bears-climb-trees-1-300x300.jpg";
  //
  // // Make sure the image is loaded first otherwise nothing will draw.
  // background.onload = function(){
  // 	ctx.fillStyle = background;
  //   //ctx.drawImage(background,0,0);
  // }

  var img = document.getElementById("bg");
  var pat = ctx.createPattern(img, "no-repeat");

  ctx.fillStyle = pat;

  ctx.fillRect(0, 0, stage.width, stage.height);

  var legal = true;

  if (isMoving) {
    if (facing == "N") {
      if (!((charX < 604 && charY < 0) || ((charX > 600 && charX < 920) && charY < 50) ||
          ((charX > 900 && charX < 1550) && charY < 120))) {
        charY -= CHAR_SPEED;
      }
      currY = IMAGE_START_NORTH_Y;
    } else if (facing == "E") {
      if (!(charX > 1470)) {
        charX += CHAR_SPEED;
      }
      currY = IMAGE_START_EAST_Y;
    } else if (facing == "S") {
      if (!(charY > 840 || (charX < 305 && charY > 480))) {
        charY += CHAR_SPEED;
      }
      currY = IMAGE_START_SOUTH_Y;
    } else if (facing == "W") {
      if (!(charX < -15 || (charX < 305 && charY > 490))) {
        charX -= CHAR_SPEED;
      }
      currY = IMAGE_START_WEST_Y;
    }

    currX += CHAR_WIDTH;

    var cd = (charX + 30).toString() + " " + (charY + 90).toString();

    if (myMapX.has(cd)) {
      if (!appear) {
        CHAR_SPEED = 0;
        if (myMapX.get(cd) == "Science") {
          scienceModal();
        } else if (myMapX.get(cd) == "Rhetas") {
          if (!dining) {
            diningModal();
            dining = true;
          } else {
            CHAR_SPEED = 5;
          }
        }
        appear = true;

      }
    } else {
      appear = false;
    }

    if (currX >= SPRITE_WIDTH)
      currX = 0;
  }

  //Draw Image
  ctx.drawImage(charImage, currX, currY, CHAR_WIDTH, CHAR_HEIGHT,
    charX, charY, CHAR_WIDTH, CHAR_HEIGHT);
}

//create welcome modal
function welcomeModal() {
  var outside = document.getElementById("modal");
  var inside = document.createElement("div");
  inside.setAttribute("class", "modal");
  var content = document.createElement("div");
  content.setAttribute('class', 'modal-content');
  var close = document.createElement("span");
  close.setAttribute('class', 'close');
  close.innerHTML = "&times";
  close.onclick = function() {
    while (outside.firstChild) {
      outside.removeChild(outside.firstChild);
    }
  }
  content.appendChild(close);

  var title = document.createElement("h1");
  title.innerHTML = "Welcome!";
  console.log(title);
  content.appendChild(title);
  inside.appendChild(content);
  outside.appendChild(inside);
  console.log("test");

}
welcomeModal();

function scienceModal() {
  var outside = document.getElementById("modal");
  var inside = document.createElement("div");
  inside.setAttribute("class", "modal");
  var content = document.createElement("div");
  content.setAttribute('class', 'modal-content');
  var close = document.createElement("span");
  close.setAttribute('class', 'close');
  close.innerHTML = "&times";
  close.onclick = function() {
    while (outside.firstChild) {
      outside.removeChild(outside.firstChild);
      CHAR_SPEED = 5;
    }
  }
  content.appendChild(close);

  var title = document.createElement("h1");
  title.innerHTML = "Welcome to ghost hall!";
  console.log(title);
  content.appendChild(title);
  inside.appendChild(content);
  outside.appendChild(inside);
  console.log("test");

}

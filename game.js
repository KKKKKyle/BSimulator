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

function setAssetReady()
{
	this.ready = true;
}

//Display Preloading
ctx.fillRect(0,0,stage.width,stage.height);
ctx.fillStyle = "#000";
ctx.fillText(TEXT_PRELOADING, TEXT_PRELOADING_X, TEXT_PRELOADING_Y);
var preloader = setInterval(preloading, TIME_PER_FRAME);

var gameloop, facing, currX, currY, charX, charY, isMoving;

function preloading()
{
	if (charImage.ready)
	{
		clearInterval(preloader);

		//Initialise game
		facing = "E"; //N = North, E = East, S = South, W = West
		isMoving = false;

		gameloop = setInterval(update, TIME_PER_FRAME);
		document.addEventListener("keydown",keyDownHandler, false);
		document.addEventListener("keyup",keyUpHandler, false);
	}
}

//------------
//Key Handlers
//------------
function keyDownHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);

	if (keyPressed == "W")
	{
		facing = "N";
		isMoving = true;
	}
	else if (keyPressed == "D")
	{
		facing = "E";
		isMoving = true;
	}
	else if (keyPressed == "S")
	{
		facing = "S";
		isMoving = true;
	}
	else if (keyPressed == "A")
	{
		facing = "W";
		isMoving = true;
	}
}

function keyUpHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);

	if ((keyPressed == "W") || (keyPressed == "A") ||
		(keyPressed == "S") || (keyPressed == "D"))
	{
		isMoving = false;
	}
}

charX = CHAR_START_X;
charY = CHAR_START_Y;

currX = IMAGE_START_X;
currY = IMAGE_START_EAST_Y;

function update()
{
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
	var pat = ctx.createPattern(img,"no-repeat");

	ctx.fillStyle = pat;

	ctx.fillRect(0, 0, stage.width, stage.height);

	var legal = true;

	// if((charX < 564 && charY < 59) || (charX > 313 && charY > 575)){
	//
	// }
	if (isMoving)
	{
		if (facing == "N")
		{
			if(!((charX < 604 && charY < 0)||((charX > 600 && charX < 920) && charY < 50)
																		 ||((charX > 900 && charX < 1550) && charY < 120))) {
				charY -= CHAR_SPEED;
			}
			currY = IMAGE_START_NORTH_Y;
		}
		else if (facing == "E")
		{
			if(!(charX > 1470)){
				charX += CHAR_SPEED;
			}
			currY = IMAGE_START_EAST_Y;
		}
		else if (facing == "S")
		{
			if(!(charY > 840 || (charX < 305 && charY > 480))){
				charY += CHAR_SPEED;
			}
			currY = IMAGE_START_SOUTH_Y;
		}
		else if (facing == "W")
		{
			if(!(charX < -15 || (charX < 305 && charY > 490))){
				charX -= CHAR_SPEED;
			}
			currY = IMAGE_START_WEST_Y;
		}

		currX += CHAR_WIDTH;

		if (currX >= SPRITE_WIDTH)
			currX = 0;
}

	//Draw Image
	ctx.drawImage(charImage,currX,currY,CHAR_WIDTH,CHAR_HEIGHT,
					charX,charY,CHAR_WIDTH,CHAR_HEIGHT);
}

//create welcome modal
function welcomeModal() {
    var outside = document.getElementById("modal");
    console.log(outside);
    var content = document.createElement("div");
    content.setAttribute('class', 'modal-content');
    var close = document.createElement("span");
    close.setAttribute('class', 'close');
    close.innerHTML = "&times";
    close.onclick = function() {
        outside.style.display = "none";
    }
    content.appendChild(close);

    var title = document.createElement("h1");
    title.innerHTML = "Welcome!";
    console.log(title);
    content.appendChild(title);
    outside.appendChild(content);
    console.log("test");

}
welcomeModal();

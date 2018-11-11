//------------
//System Values
//------------
var STAGE_WIDTH = 1536,
	STAGE_HEIGHT = 944,
	TIME_PER_FRAME = 33, //this equates to 30 fps
	GAME_FONTS = "bold 20px sans-serif";

var PATH_CHAR = "img/spritesheet3.png";

var CHAR_WIDTH = 72,
	CHAR_HEIGHT = 96,
	IMAGE_START_X = 0,
	IMAGE_START_NORTH_Y = 0,
	IMAGE_START_EAST_Y = 96,
	IMAGE_START_SOUTH_Y = 192,
	IMAGE_START_WEST_Y = 288,
	SPRITE_WIDTH = 216;

var TEXT_PRELOADING = "Loading ...",
	TEXT_PRELOADING_X = 200,
	TEXT_PRELOADING_Y = 200;

//Preload HashMap of all coordinates
var MAP = new Map();
//var myMapY = new Map();
var i, j;
//Science Hall
for (i = 1107; i < 1133; i++) {
  for (j = 258; j < 301; j++) {
    MAP.set(i.toString() + " " + j.toString(), "Science");
  }
}

//Rheta's Market
for (i = 1067; i < 1095; i++) {
  for (j = 422; j < 442; j++) {
    MAP.set(i.toString() + " " + j.toString(), "Rhetas");
  }
}

//College Library
for (i = 1082; i < 1136; i++) {
  for (j = 189; j < 229; j++) {
    MAP.set(i.toString() + " " + j.toString(), "College Library");
  }
}

//Lake
for(i=1150;i<1227;i++) {
	for(j=181;j<269;j++) {
		MAP.set(i.toString()+" "+j.toString(),"Lake");
	}
}

//QQ Express(Dinner)
for(i=631;i<659;i++) {
	for(j=485;j<501;j++) {
		MAP.set(i.toString()+" "+j.toString(),"QQExp");
	}
}

//Ian's Pizza(Dinner)
for(i=1436;i<1483;i++) {
	for(j=491;j<528;j++) {
		MAP.set(i.toString()+" "+j.toString(),"Ians");
	}
}
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
for (i = 1000; i < 1200; i++) {
  for (j = 402; j < 462; j++) {
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

// waters
for(i=740;i<850;i++) {
	for(j=180;j<230;j++) {
		MAP.set(i.toString()+" "+j.toString(),"Waters");
	}
}

//Bascom Hall
for(i = 950; i<1050; i++){
	for(j = 310; j < 350; j++){
		MAP.set(i.toString()+" "+j.toString(),"Bascom Hall");
	}
}

// education science
for(i = 960; i<1036; i++){
	for(j = 585; j < 610; j++){
		MAP.set(i.toString()+" "+j.toString(),"Edu Sci");
	}
}
var Chadbourne = {x:1090, y:350};
var Sellery = {x: 1150, y:514};
var Kronshage = {x:328, y:80};
var Witte = {x:1056, y:529};
var Leopold = {x:353, y:80};
var Dejope = {x: 139, y:57};
var Tripp = {x:527, y:28};
var Liz_Waters = {x:752, y:124};
var Adams = {x:464, y:35};
var Cole = {x: 291, y:81};
var Sullivan = {x:277, y:54};
var Ogg = {x:1155, y:613};
var Slichter = {x:459, y:94};
var Phillips = {x: 128, y:-12};
var Bradley = {x:222, y:34};
var Smith = {x:1135, y:749};
var Barnard = {x:1021, y:359};
var Merit = {x: 1097, y:607};
var Davis = {x:1064, y:505};

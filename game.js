//------------
//System Vars
//------------
var CHAR_SPEED = 0,
    charX = -100,
    charY = -100;
var stage = document.getElementById("gameCanvas");
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;
var ctx = stage.getContext("2d");
ctx.fillStyle = "grey";
ctx.font = GAME_FONTS;

//---------------
//Preloading ...
//---------------
var charImage = new Image();
charImage.ready = false;
charImage.onload = setAssetReady;
charImage.src = PATH_CHAR;

// constants
var dorm;
var selectedDorm = false;
var arriveColi = false;
var soarBegin = false;

function setAssetReady() {
    this.ready = true;
}

welcomeModal();


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
        facing = "S"; //N = North, E = East, S = South, W = West
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

//------------
//Game Loop
//------------

currX = IMAGE_START_X;
currY = IMAGE_START_EAST_Y;

// flags
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

    console.log(selectedDorm);
    if (selectedDorm == true) {
        var outside = document.getElementById("modal");
        while (outside.firstChild) {
            outside.removeChild(outside.firstChild);
        }
        soarModal();
    }

    var img = document.getElementById("bg");
    var pat = ctx.createPattern(img, "no-repeat");

    ctx.fillStyle = pat;

    ctx.fillRect(0, 0, stage.width, stage.height);
    // restrict moving
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

        if (MAP.has(cd)) {
            if (!appear) {
                CHAR_SPEED = 0;
                if (MAP.get(cd) == "Science") {
                    scienceModal();
                } else if (MAP.get(cd) == "College Library") {
                    if (soarBegin == true) {
                        soarBegin = false;
                        soarModal2();
                    } else {
                        CHAR_SPEED = 5;
                    }
                } else if (MAP.get(cd) == "Rhetas") {
                    if (!dining) {
                        diningModal();
                        dining = true;
                    } else {
                        CHAR_SPEED = 5;
                    }
                } else if (MAP.get(cd) == "Lake") {
                    iceCreamModal();
                } else if (MAP.get(cd) == "QQExp" || MAP.get(cd) == "Ians") {
                    dinnerModal();
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
//HELPER FUNCTIONS
function tableCreate() {
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    var tbdy = document.createElement('tbody');
    var tr1 = document.createElement('tr');
    tr1.style.width = '100%';
    tr1.style.textAlign = "center";
    var label1 = document.createElement("label");
    var input1 = document.createElement("input");
    input1.setAttribute("type", "checkbox");
    input1.id = "course1";
    label1.innerHTML = "CHEESE 101: Lactose Intolerant Sad React Only";
    label1.appendChild(input1);
    tr1.appendChild(label1);
    tbdy.appendChild(tr1);

    var tr2 = document.createElement('tr');
    tr2.style.width = '100%';
    tr2.style.textAlign = "center";
    var label2 = document.createElement("label");
    var input2 = document.createElement("input");
    input2.setAttribute("type", "checkbox");
    input2.id = "course2";
    label2.innerHTML = "PARTY 101: It's all about ALC";
    label2.appendChild(input2);
    tr2.appendChild(label2);
    tbdy.appendChild(tr2);

    var tr3 = document.createElement('tr');
    tr3.style.width = '100%';
    tr3.style.textAlign = "center";
    var label3 = document.createElement("label");
    var input3 = document.createElement("input");
    input3.setAttribute("type", "checkbox");
    input3.id = "course3";
    label3.innerHTML = "POLI SCI 100: VOTE";
    label3.appendChild(input3);
    tr3.appendChild(label3);
    tbdy.appendChild(tr3);

    var tr4 = document.createElement('tr');
    tr4.style.width = '100%';
    tr4.style.textAlign = "center";
    var label4 = document.createElement("label");
    var input4 = document.createElement("input");
    input4.setAttribute("type", "checkbox");
    input4.id = "course4";
    label4.innerHTML = "COMP SCI 100: In any case, no bugs pls.";
    label4.appendChild(input4);
    tr4.appendChild(label4);
    tbdy.appendChild(tr4);

    tbl.appendChild(tbdy);
    return tbl;
}


var selectDorm = function(event, img) {
    var cX = event.offsetX / img.clientWidth;
    var cY = event.offsetY / img.clientHeight;
    // var cX = event.offsetX?(event.offsetX):event.pageX-img.offsetLeft;
    // var cY = event.offsetY?(event.offsetY):event.pageY-img.offsetTop;
    var coords = "offset - X: " + cX + ", Y coords: " + cY;
    console.log(coords);
    if (cX >= 0.065 && cY >= 0.06 && cX <= 0.22 && cY <= 0.12) {
        dorm = "Sellery";
        charX = -30 + 1180;
        charY = -90 + 604;
        selectedDorm = true;
        console.log(dorm);
        console.log(selectedDorm);
        // also add the coordinates here!!!
    } else if (cX >= 0.44 && cY >= 0.104 && cX <= 0.72 && cY <= 0.148) {
        dorm = "Chadbourne";
        charX = -30 + 1120;
        charY = -90 + 440;
        selectedDorm = true;
    } else if (cX >= 0.113 && cY >= 0.2 && cX <= 0.35 && cY <= 0.25) {
        dorm = "Kronshage";
        charX = -30 + 358;
        charY = -90 + 170;
        selectedDorm = true;
    } else if (cX >= 0.62 && cY >= 0.22 && cX <= 0.74 && cY <= 0.27) {
        dorm = "Witte";
        charX = -30 + 1356;
        charY = -90 + 619;
        selectedDorm = true;
    } else if (cX >= 0.21 && cY >= 0.26 && cX <= 0.385 && cY <= 0.325) {
        dorm = "Leopold";
        charX = -30 + 383;
        charY = -90 + 170;
        selectedDorm = true;
    } else if (cX >= 0.11 && cY >= 0.33 && cX <= 0.265 && cY <= 0.385) {
        dorm = "Dejope";
        charX = -30 + 169;
        charY = -90 + 147;
        selectedDorm = true;
    } else if (cX >= 0.26 && cY >= 0.39 && cX <= 0.375 && cY <= 0.439) {
        dorm = "Tripp";
        charX = -30 + 557;
        charY = -90 + 118;
        selectedDorm = true;
    } else if (cX >= 0.48 && cY >= 0.32 && cX <= 0.715 && cY <= 0.368) {
        dorm = "Liz Waters";
        charX = -30 + 782;
        charY = -90 + 214;
        selectedDorm = true;
    } else if (cX >= 0.44 && cY >= 0.434 && cX <= 0.595 && cY <= 0.48) {
        dorm = "Adams";
        charX = -30 + 494;
        charY = -90 + 125;
        selectedDorm = true;
    } else if (cX >= 0.65 && cY >= 0.455 && cX <= 0.76 && cY <= 0.51) {
        dorm = "Cole";
        charX = -30 + 321;
        charY = -90 + 171;
        selectedDorm = true;
    } else if (cX >= 0.05 && cY >= 0.44 && cX <= 0.23 && cY <= 0.49) {
        dorm = "Sullivan";
        charX = -30 + 307;
        charY = -90 + 144;
        selectedDorm = true;
    } else if (cX >= 0.40 && cY >= 0.54 && cX <= 0.489 && cY <= 0.588) {
        dorm = "Ogg";
        charX = -30 + 1185;
        charY = -90 + 703;
        selectedDorm = true;
    } else if (cX >= 0.064 && cY >= 0.55 && cX <= 0.22 && cY <= 0.59) {
        dorm = "Slichter";
        charX = -30 + 489;
        charY = -90 + 184;
        selectedDorm = true;
    } else if (cX >= 0.24 && cY >= 0.64 && cX <= 0.39 && cY <= 0.70) {
        dorm = "Phillips";
        charX = -30 + 158;
        charY = -90 + 78;
        selectedDorm = true;
    } else if (cX >= 0.58 && cY >= 0.61 && cX <= 0.75 && cY <= 0.67) {
        dorm = "Bradley";
        charX = -30 + 252;
        charY = -90 + 124;
        selectedDorm = true;
    } else if (cX >= 0.06 && cY >= 0.72 && cX <= 0.19 && cY <= 0.775) {
        dorm = "Smith";
        charX = -30 + 1165;
        charY = -90 + 839;
        selectedDorm = true;
    } else if (cX >= 0.55 && cY >= 0.75 && cX <= 0.73 && cY <= 0.80) {
        dorm = "Barnard";
        charX = -30 + 1051;
        charY = -90 + 449;
        selectedDorm = true;
    } else if (cX >= 0.12 && cY >= 0.90 && cX <= 0.23 && cY <= 0.955) {
        dorm = "Merit";
        charX = -30 + 1107;
        charY = -90 + 697;
        selectedDorm = true;
    } else if (cX >= 0.61 && cY >= 0.86 && cX <= 0.74 && cY <= 0.91) {
        dorm = "Davis";
        charX = -30 + 1094;
        charY = -90 + 595;
        selectedDorm = true;
    } else if (cX >= 0.33 && cY >= 0.95 && cX <= 0.66 && cY <= 1) {
        alert("You startled Tunnel Bob. Choose again lol.");
    }
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
        dormModal();
    }
    content.appendChild(close);
    var title = document.createElement("h1");
    title.innerHTML = "Congrats!!! Go Badger!";
    var img = document.createElement("img");
    img.src = "img/admit.jpeg";
    img.setAttribute('class', 'image');
    content.appendChild(img);
    content.appendChild(title);
    inside.appendChild(content);
    outside.appendChild(inside);
}

// create dorm modal
function dormModal() {
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
        dormModal2();
    }
    content.appendChild(close);
    var title = document.createElement("h1");
    title.innerHTML = "Choose your dorm on campus first!";
    content.appendChild(title);
    var img = document.createElement("img");
    img.src = "img/dorm.png";
    img.setAttribute('class', 'image');
    var subtitle = document.createElement("h4");
    subtitle.innerHTML = "(click on the close button to continue)";
    content.appendChild(img);
    content.appendChild(title);
    content.appendChild(subtitle);
    inside.appendChild(content);
    outside.appendChild(inside);
}

// create dorm2 modal
function dormModal2() {
    var outside = document.getElementById("modal");
    var inside = document.createElement("div");
    inside.setAttribute("class", "modal");
    var content = document.createElement("div");
    content.setAttribute('class', 'modal-content');
    var title = document.createElement("h1");
    title.innerHTML = "Click on the name of the dorm you like!";
    content.appendChild(title);
    var subtitle = document.createElement("h5");
    subtitle.innerHTML = "(Not the last one lol, though it can keep you warm well enought to survive." + "<br />" + "Check out more " + "<a href='https://www.facebook.com/groups/175526726305977/search/?query=dorm'>" + "memes " + "</a>" + "about each dorm to learn more!";
    var img = document.createElement("img");
    img.src = "img/dorm2.png";
    img.setAttribute('class', 'image');
    img.onclick = function() { selectDorm(event, img); };
    content.appendChild(subtitle);
    content.appendChild(img);
    inside.appendChild(content);
    outside.appendChild(inside);
}

// create soar modal
function soarModal() {
    selectedDorm = false;
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
        CHAR_SPEED = 5;
    }
    content.appendChild(close);
    var title = document.createElement("h1");
    title.innerHTML = "Now it's SOAR! You need to go to the College Libaray to choose your courses!";
    content.appendChild(title);
    var subtitle = document.createElement("h5");
    subtitle.innerHTML = "Cr. to Alyssa Stammerjohan from Milk-Chugging Teans";
    var img = document.createElement("img");
    img.src = "img/soar.png";
    img.setAttribute('class', 'image');
    content.appendChild(img);
    content.appendChild(subtitle);
    inside.appendChild(content);
    outside.appendChild(inside);
    soarBegin = true;
}

//create soar2 modal
function soarModal2() {
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
        CHAR_SPEED = 5;
    }
    content.appendChild(close);
    var title = document.createElement("h1");
    title.innerHTML = "All other courses have been taken. Here are your only choices";
    var subtitle = document.createElement("h4");
    subtitle.innerHTML = "You need to take at least 12 credits w/o paying extra, so do it!";
    var table = tableCreate();
    content.appendChild(title);
    content.appendChild(table);
    inside.appendChild(content);
    outside.appendChild(inside);
}

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
var finishSelecting = false;
var finishLunch = false;

function setAssetReady() {
    this.ready = true;
}

//Display Preloading
ctx.fillRect(0, 0, stage.width, stage.height);
ctx.fillStyle = "#000";
ctx.fillText(TEXT_PRELOADING, TEXT_PRELOADING_X, TEXT_PRELOADING_Y);
var preloader = setInterval(preloading, TIME_PER_FRAME);

var gameloop, facing, currX, currY, charX, charY, isMoving;
var touchX, touchY;

// class of buttons on screen
function btn(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function() {
        ctx.fillStyle = color;
        ctx.fillRect(charX + x - 15, charY + y -7, this.width, this.height);
    }
    this.clicked = function() {
        console.log(touchX);
        console.log(touchY);
        console.log("char" + charX);
        console.log("char" + charY);
        var myleft = charX + x - 15;
        var myright = charX + x - 15 + (this.width);
        var mytop = charY + y -7;
        var mybottom = charY + y -7 + (this.height);
        var clicked = true;
        if ((mybottom < touchY) || (mytop > touchY) || (myright < touchX) || (myleft > touchX)) {
            clicked = false;
        }
        return clicked;
    }
}

// touch
var upBtn, downBtn, leftBtn, rightBtn;

function preloading() {
    if (charImage.ready) {
        clearInterval(preloader);

        //Initialise game
        facing = "S"; //N = North, E = East, S = South, W = West
        isMoving = false;
        upBtn = new btn(30, 30, "rgba(197, 5, 12, .7)", CHAR_WIDTH/2, 0);
        leftBtn = new btn(30, 30, "rgba(197, 5, 12, .7)", 0, CHAR_HEIGHT/2);
        downBtn = new btn(30, 30, "rgba(197, 5, 12, .7)", CHAR_WIDTH/2, CHAR_HEIGHT);
        rightBtn = new btn(30, 30, "rgba(197, 5, 12, .7)", CHAR_WIDTH, CHAR_HEIGHT/2);


        gameloop = setInterval(update, TIME_PER_FRAME);
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);

        window.addEventListener('mousedown', function(e) {
            touchX = e.pageX;
            touchY = e.pageY;
            if (upBtn.clicked()) {
                facing = "N";
                isMoving = true;
            } else if (downBtn.clicked()) {
                facing = "S";
                isMoving = true;

            } else if (leftBtn.clicked()) {
                facing = "W";
                isMoving = true;
            } else if (rightBtn.clicked()) {
                facing = "E";
                isMoving = true;
            }
        })
        window.addEventListener('mouseup', function(e) {
            touchX = false;
            touchY = false;
            isMoving = false;
        })
        window.addEventListener('touchstart', function(e) {
            touchX = e.pageX;
            touchY = e.pageY;
            if (upBtn.clicked()) {
                facing = "N";
                isMoving = true;
            } else if (downBtn.clicked()) {
                facing = "S";
                isMoving = true;

            } else if (leftBtn.clicked()) {
                facing = "W";
                isMoving = true;
            } else if (rightBtn.clicked()) {
                facing = "E";
                isMoving = true;
            }
        })
        window.addEventListener('touchend', function(e) {
            touchX = false;
            touchY = false;
            isMoving = false;
        })
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
var bascom = false;
var finishBascom = false;
var finishEdu = false;
var dining2 = false;

function update() {
    if (selectedDorm == true) {

        //clean modal
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
                        CHAR_SPEED = 0;
                        soarModal2();
                    } else {
                        CHAR_SPEED = 5;
                    }
                } else if (MAP.get(cd) == "Rhetas" || MAP.get(cd) == "Waters") {
                    if (bascom == true) {
                        if (!dining) {
                            if (MAP.get(cd) == "Rhetas") {
                                CHAR_SPEED = 0;
                                rhetasModal();
                            } else if (MAP.get(cd) == "Waters") {
                                CHAR_SPEED = 0;
                                watersModal();
                            }
                            dining = true;
                        } else {
                            CHAR_SPEED = 5;
                        }
                    } else {
                        CHAR_SPEED = 5;
                    }

                } else if (MAP.get(cd) == "Lake") {
                    CHAR_SPEED = 0;
                    iceCreamModal();
                } else if (MAP.get(cd) == "QQExp" || MAP.get(cd) == "Ians") {
                    if (finishEdu == true) {
                        if (!dining2) {
                            if (MAP.get(cd) == "Ians") {
                                CHAR_SPEED = 0;
                                ianModal();
                            } else if (MAP.get(cd) == "QQExp") {
                                CHAR_SPEED = 0;
                                qqModal();
                            }
                            dining2 = true;
                        } else {
                            CHAR_SPEED = 5;
                        }
                    } else {
                        CHAR_SPEED = 5;
                    }
                } else if (MAP.get(cd) == "Bascom Hall") {
                    if (finishSelecting == true && finishBascom == false) {
                        finishBascom = true;
                        CHAR_SPEED = 0;
                        bascomModal();
                        CHAR_SPEED = 5;
                        var list = document.getElementById("taskList");
                        while (list.firstChild) {
                            list.removeChild(list.firstChild);
                        }
                        var task = document.createElement("p");
                        task.innerHTML = "TASK: ";
                        list.appendChild(task);
                    } else {
                        CHAR_SPEED = 5;
                    }
                } else if (MAP.get(cd) == "Edu Sci") {
                    if (finishLunch == true && finishEdu == false) {
                        finishEdu = true;
                        CHAR_SPEED = 0;
                        educationModal();
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
    upBtn.update();
    downBtn.update();
    leftBtn.update();
    rightBtn.update();
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
    input1.setAttribute("checked", "checked");
    input1.disabled = true;
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
    input2.setAttribute("checked", "checked");
    input2.disabled = true;
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
    input3.setAttribute("checked", "checked");
    input3.disabled = true;
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
    input4.setAttribute("checked", "checked");
    input4.disabled = true;
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
        dorm = Sellery;
        selectedDorm = true;
        console.log(dorm);
        console.log(selectedDorm);
        // also add the coordinates here!!!
    } else if (cX >= 0.44 && cY >= 0.104 && cX <= 0.72 && cY <= 0.148) {
        dorm = Chadbourne;
        selectedDorm = true;
    } else if (cX >= 0.113 && cY >= 0.2 && cX <= 0.35 && cY <= 0.25) {
        dorm = Kronshage;
        selectedDorm = true;
    } else if (cX >= 0.62 && cY >= 0.22 && cX <= 0.74 && cY <= 0.27) {
        dorm = Witte;
        selectedDorm = true;
    } else if (cX >= 0.21 && cY >= 0.26 && cX <= 0.385 && cY <= 0.325) {
        dorm = Leopold;
        selectedDorm = true;
    } else if (cX >= 0.11 && cY >= 0.33 && cX <= 0.265 && cY <= 0.385) {
        dorm = Dejope;
        selectedDorm = true;
    } else if (cX >= 0.26 && cY >= 0.39 && cX <= 0.375 && cY <= 0.439) {
        dorm = Tripp;
        selectedDorm = true;
    } else if (cX >= 0.48 && cY >= 0.32 && cX <= 0.715 && cY <= 0.368) {
        dorm = Liz_Waters;
        selectedDorm = true;
    } else if (cX >= 0.44 && cY >= 0.434 && cX <= 0.595 && cY <= 0.48) {
        dorm = Adams;
        selectedDorm = true;
    } else if (cX >= 0.65 && cY >= 0.455 && cX <= 0.76 && cY <= 0.51) {
        dorm = Cole;
        selectedDorm = true;
    } else if (cX >= 0.05 && cY >= 0.44 && cX <= 0.23 && cY <= 0.49) {
        dorm = Sullivan;
        selectedDorm = true;
    } else if (cX >= 0.40 && cY >= 0.54 && cX <= 0.489 && cY <= 0.588) {
        dorm = Ogg;
        selectedDorm = true;
    } else if (cX >= 0.064 && cY >= 0.55 && cX <= 0.22 && cY <= 0.59) {
        dorm = Slichter;
        selectedDorm = true;
    } else if (cX >= 0.24 && cY >= 0.64 && cX <= 0.39 && cY <= 0.70) {
        dorm = Phillips;
        selectedDorm = true;
    } else if (cX >= 0.58 && cY >= 0.61 && cX <= 0.75 && cY <= 0.67) {
        dorm = Bradley;
        selectedDorm = true;
    } else if (cX >= 0.06 && cY >= 0.72 && cX <= 0.19 && cY <= 0.775) {
        dorm = Smith;
        selectedDorm = true;
    } else if (cX >= 0.55 && cY >= 0.75 && cX <= 0.73 && cY <= 0.80) {
        dorm = Barnard;
        selectedDorm = true;
    } else if (cX >= 0.12 && cY >= 0.90 && cX <= 0.23 && cY <= 0.955) {
        dorm = Merit;
        selectedDorm = true;
    } else if (cX >= 0.61 && cY >= 0.86 && cX <= 0.74 && cY <= 0.91) {
        dorm = Davis;
        selectedDorm = true;
    } else if (cX >= 0.33 && cY >= 0.95 && cX <= 0.66 && cY <= 1) {
        alert("You startled Tunnel Bob. Choose again lol.");
    }
    if (selectedDorm) {
        charX = dorm.x;
        charY = dorm.y;
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
    var credit = document.createElement("h5");
    credit.innerHTML = "Cr. to Colton Wickland from Milk-Chugging Teens";
    content.appendChild(img);
    content.appendChild(title);
    content.appendChild(subtitle);
    content.appendChild(credit);
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
    var credit = document.createElement("h5");
    credit.innerHTML = "Cr. to Colton Wickland from Milk-Chugging Teens";
    content.appendChild(subtitle);
    content.appendChild(img);
    content.appendChild(credit);
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

        // add new task
        var list = document.getElementById("taskList");
        var task = document.createElement("p");
        task.innerHTML = "Go to College Library to join SOAR!";
        list.appendChild(task);
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
        goToClass1();
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
    // clean task
    var list = document.getElementById("taskList");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    var task = document.createElement("p");
    task.innerHTML = "TASK: ";
    list.appendChild(task);
    finishSelecting = true;
}

// go to school
function goToClass1() {
    charX = dorm.x;
    charY = dorm.y;
    var task = document.createElement("p");
    task.innerHTML = "Go to Bascom Hall for CHEESE 101.";
    console.log(document.getElementById("taskList"));
    document.getElementById("taskList").appendChild(task);
}

// bascom hall
function bascomModal() {
    bascom = true;
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
        var list = document.getElementById("taskList");
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
        var task = document.createElement("p");
        task.innerHTML = "TASK: Go to Rheta's or Liz's Market to have lunch.";
        list.appendChild(task);
        diningModal();
    }
    content.appendChild(close);
    var title = document.createElement("h1");
    title.innerHTML = "Climbing Bascom Hill";
    var frame = document.createElement("iframe");
    frame.src = "https://www.google.com/maps/embed?pb=!4v1541945242488!6m8!1m7!1sCAoSLEFGMVFpcFBnT3ZQZTl1Mjd0Z2RRVTlYdDBKdDhiYVI3VHg2VmY5UXdLN1d3!2m2!1d43.0753757!2d-89.4042128!3f241.0742641660981!4f-11.620922914975196!5f0.7820865974627469";
    frame.width = 600;
    frame.height = 450;
    content.appendChild(title);
    content.appendChild(frame);
    inside.appendChild(content);
    outside.appendChild(inside);
}

// rhetas
function rhetasModal() {
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
        goToClass2();
    }
    content.appendChild(close);
    var title = document.createElement("h1");
    title.innerHTML = "Rheta's Market";
    var frame = document.createElement("iframe");
    frame.src = "https://www.google.com/maps/embed?pb=!4v1541948968387!6m8!1m7!1sCAoSLEFGMVFpcE9HbTM0NGUxcmlUcUFOVktNZXlyTFpiVnJXZ3JrcFA4WWFpNjk4!2m2!1d43.0738511!2d-89.40172849999999!3f20.071811335170274!4f0!5f0.7820865974627469";
    frame.width = 600;
    frame.height = 450;
    content.appendChild(title);
    content.appendChild(frame);
    inside.appendChild(content);
    outside.appendChild(inside);

    var list = document.getElementById("taskList");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    var task = document.createElement("p");
    task.innerHTML = "TASK: ";
    list.appendChild(task);
    CHAR_SPEED = 5;
    finishLunch = true;
}

function watersModal() {
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
        goToClass2();
    }
    content.appendChild(close);
    var title = document.createElement("h1");
    title.innerHTML = "Liz Water's Market";
    var frame = document.createElement("iframe");
    frame.src = "https://www.google.com/maps/embed?pb=!4v1541953055175!6m8!1m7!1sCAoSLEFGMVFpcE9OWE93R0NSS0tmdmZPZ01UbVZXRWlLM1UxTzVtNVdOMnZ1Nnd5!2m2!1d43.0768298!2d-89.4069008!3f289.7375685283002!4f-14.038300207400496!5f0.7820865974627469";
    frame.width = 600;
    frame.height = 450;
    content.appendChild(title);
    content.appendChild(frame);
    inside.appendChild(content);
    outside.appendChild(inside);

    var list = document.getElementById("taskList");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    var task = document.createElement("p");
    task.innerHTML = "TASK: ";
    list.appendChild(task);
    CHAR_SPEED = 5;
    finishLunch = true;
}

// go to class 2
function goToClass2() {
    var task = document.createElement("p");
    task.innerHTML = "Go to Education Science Building for COMP SCI 100.";
    console.log(document.getElementById("taskList"));
    document.getElementById("taskList").appendChild(task);
}

// Education
function educationModal() {
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
        dinnerModal();
        // update task
        var list = document.getElementById("taskList");
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
        var task = document.createElement("p");
        task.innerHTML = "TASK: Find QQ or Ian's to have dinner!";
        list.appendChild(task);


    }
    content.appendChild(close);
    var title = document.createElement("h1");
    title.innerHTML = "Education Science Building";
    var frame = document.createElement("iframe");
    frame.src = "https://www.google.com/maps/embed?pb=!4v1541950334449!6m8!1m7!1sCAoSLEFGMVFpcE02YXh3TFZOMlJYdjNTWjRhSHo2M05PMnRjcklSRE44eHA1ZXRY!2m2!1d43.0718834!2d-89.4034203!3f9.237327560526602!4f-9.633180609814673!5f0.7820865974627469";
    frame.width = 600;
    frame.height = 450;
    content.appendChild(title);
    content.appendChild(frame);
    inside.appendChild(content);
    outside.appendChild(inside);

    var list = document.getElementById("taskList");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    var task = document.createElement("p");
    task.innerHTML = "TASK: ";
    list.appendChild(task);
    CHAR_SPEED = 5;
}

// ian
function ianModal() {
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
        partyModal();
    }
    content.appendChild(close);
    var title = document.createElement("h1");
    title.innerHTML = "Ian's Pizza";
    var frame = document.createElement("iframe");
    frame.src = "https://www.google.com/maps/embed?pb=!4v1541959193698!6m8!1m7!1sCAoSLEFGMVFpcE1TS05RbzQ1eFZYVHJ2bzdMYlBaYUhEeEJvVXlTN0p6aWNFa21U!2m2!1d43.072929570428!2d-89.39565281989331!3f290.5757159629932!4f0!5f0.7820865974627469";
    frame.width = 600;
    frame.height = 450;
    content.appendChild(title);
    content.appendChild(frame);
    inside.appendChild(content);
    outside.appendChild(inside);

    var list = document.getElementById("taskList");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    var task = document.createElement("p");
    task.innerHTML = "TASK: ";
    list.appendChild(task);
    CHAR_SPEED = 5;
    finishLunch = true;
}

//qq
function qqModal() {
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
        partyModal();
    }
    content.appendChild(close);
    var title = document.createElement("h1");
    title.innerHTML = "QQ Express";
    var frame = document.createElement("iframe");
    frame.src = "https://www.google.com/maps/embed?pb=!4v1541955805767!6m8!1m7!1sCAoSLEFGMVFpcFBDU2R0TFB1MEN1azYySFRkdEREaklCaTJQcE5DZlZDTHdBQ0h1!2m2!1d43.0733747!2d-89.4093363!3f35.84241597345263!4f-3.407392806931199!5f0.7820865974627469";
    frame.width = 600;
    frame.height = 450;
    content.appendChild(title);
    content.appendChild(frame);
    inside.appendChild(content);
    outside.appendChild(inside);

    var list = document.getElementById("taskList");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    var task = document.createElement("p");
    task.innerHTML = "TASK: ";
    list.appendChild(task);
    CHAR_SPEED = 5;
    finishLunch = true;
}

//create party model
function partyModal() {
    console.log("test");
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
        var list = document.getElementById("taskList");
        var task = document.createElement("p");
        task.innerHTML = "Underdevelopment. Feel free to explore the map! ";
        list.appendChild(task);
        CHAR_SPEED = 5;
        finishLunch = true;
    }
    content.appendChild(close);
    var title = document.createElement("h1");
    title.innerHTML = "No matter Game Day or Thursdays, it's party time!";
    var activity = document.createElement("h3");
    activity.innerHTML = "Activitiy: <del>Beer</del>Water Pong";
    var img = document.createElement("img");
    img.src = "img/party.jpg";
    img.setAttribute('class', 'image');
    var subtitle = document.createElement("h4");
    subtitle.innerHTML = "Does the party have any milk?";
    var credit = document.createElement("h5");
    credit.innerHTML = "Cr. to Jacob Kenyon from Milk-Chugging Teens";
    content.appendChild(title);
    content.appendChild(activity);
    content.appendChild(img);
    content.appendChild(subtitle);
    content.appendChild(credit);
    inside.appendChild(content);
    outside.appendChild(inside);
}
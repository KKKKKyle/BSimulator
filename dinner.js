//dining modal
function dinnerModal() {
    var outside = document.getElementById("modal");

    var content = document.createElement("div");
    content.setAttribute('class', 'modal-content');

    //close
    var close = document.createElement("span");
    close.setAttribute('class', 'close');

    close.innerHTML = "&times";

    close.onclick = function() {
        outside.style.display = "none";
    }

    content.appendChild(close);

    //header content
    var header = document.createElement("div");
    header.setAttribute('class', 'modal-header');
    header.setAttribute('id', 'dinner-header');
    //text
    var title = document.createElement("h1");
    title.innerHTML = "IT'S DINNER TIME!"
    header.appendChild(title);
    content.appendChild(header);

    //buttom content
    var footer = document.createElement("div");
    footer.setAttribute('class', 'modal-footer');
    footer.setAttribute('id', 'dinner-footer');
    //button and text
    // var chooseButton = document.createElement("button");
    // chooseButton.setAttribute('class', 'modal-button');
    // chooseButton.setAttribute('id', 'dinner-button');

    // var t = document.createTextNode("RESTAURANT!");
    // chooseButton.appendChild(t);


    var imageOne = document.createElement("IMG");
    imageOne.setAttribute("class", "image");
    imageOne.setAttribute("src", "img/dorm.jpg");

    var imageTwo = document.createElement("IMG");
    imageTwo.setAttribute("class", "image");
    imageTwo.setAttribute("src", "img/dorm.jpg");


    imageOne.onclick = function() {
        var elements = outside.childNodes;
        while (outside.firstChild) {
            outside.removeChild(outside.firstChild);
        }
        content = document.createElement("div");
        content.setAttribute('class', 'modal-content');
        outside.style.display = "block";
        outside.appendChild(content);

    }

    imageTwo.onclick = function() {
        var elements = outside.childNodes;
        while (outside.firstChild) {
            outside.removeChild(outside.firstChild);
        }
        content = document.createElement("div");
        content.setAttribute('class', 'modal-content');
        outside.style.display = "block";
        outside.appendChild(content);

    }

    footer.appendChild(imageOne);
    footer.appendChild(imageTwo);
    content.appendChild(footer);
    outside.appendChild(content);

}


dinnerModal();
//dining modal
function diningModal() {
  var outside = document.getElementById("modal");
  var inside = document.createElement("div");
  inside.setAttribute("class", "modal");
  var content = document.createElement("div");
  content.setAttribute('class', 'modal-content');


  //close
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

  //header content
  var header = document.createElement("div");
  header.setAttribute('class', 'modal-header');
  //text
  var title = document.createElement("h1");
  title.innerHTML = "IT'S LUNCH TIME!"
  header.appendChild(title);
  content.appendChild(header);

  //buttom content
  var footer = document.createElement("div");
  footer.setAttribute('class', 'modal-footer');
  //button and text
  var chooseButton = document.createElement("button");
  chooseButton.setAttribute('class', 'modal-button');
  var t = document.createElement("span");
  t.innerHTML = 'Dining Hall';
  t.setAttribute('class', 'text');
  chooseButton.appendChild(t);
  footer.appendChild(chooseButton);
  content.appendChild(footer);

  inside.appendChild(content);
  outside.appendChild(inside);
  console.log("test");

  chooseButton.onclick = function() {
    var inside = document.createElement("div");
    inside.setAttribute("class", "modal");
    var elements = outside.childNodes;
    while (outside.firstChild) {
      outside.removeChild(outside.firstChild);
    }
    content = document.createElement("div");
    content.setAttribute('class', 'modal-content');
    outside.style.display = "block";
    outside.appendChild(content);

    //close
    close = document.createElement("span");
    close.setAttribute('class', 'close');

    close.innerHTML = "&times";

    close.onclick = function() {
      while (outside.firstChild) {
        outside.removeChild(outside.firstChild);
      }
      CHAR_SPEED = 5;
    }
    content.appendChild(close);

    //second header content
    header = document.createElement("div");
    header.setAttribute('class', 'modal-header');

    //text
    title = document.createElement("h1");
    title.innerHTML = "Dining Hall!"
    header.appendChild(title);
    content.appendChild(header);

    var subtitle = document.createElement("h2");
    subtitle.innerHTML = "These are the only choices you have for lunch 'on campus'";
    //second body content
    body = document.createElement("div");
    body.setAttribute('class', 'modal-body');
    var titleone = document.createElement("h3");
    titleone.innerHTML = "Rheta's Market";
    var imageOne = document.createElement("IMG");
    imageOne.setAttribute("class", "image");
    imageOne.setAttribute("src", "img/rhetas.png");

    var titletwo = document.createElement("h3");
    titletwo.innerHTML = "Liz Water's Market";
    var imageTwo = document.createElement("IMG");
    imageTwo.setAttribute("class", "image");
    imageTwo.setAttribute("src", "img/waters.png");
    body.appendChild(subtitle);
    body.appendChild(titleone);
    body.appendChild(imageOne);
    body.appendChild(titletwo);
    body.appendChild(imageTwo);
    content.appendChild(body);


    inside.appendChild(content);
    outside.appendChild(inside);
  }
}

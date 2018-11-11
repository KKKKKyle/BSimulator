//ice cream modal
function iceCreamModal() {
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
      CHAR_SPEED = 5;
    }
  }

  content.appendChild(close);

  //header content
  var header = document.createElement("div");
  header.setAttribute('class', 'modal-header');
  header.setAttribute('id', 'lake-header');
  //text
  var title = document.createElement("h1");
  title.innerHTML = "ICE CREAM TIME!"
  header.appendChild(title);
  content.appendChild(header);

  //buttom content
  var footer = document.createElement("div");
  footer.setAttribute('class', 'lake-footer');
  //footer.setAttribute('id', 'lake-footer');

  //button and text
  // var chooseButton = document.createElement("button");
  // chooseButton.setAttribute('class', 'modal-button');
  // chooseButton.setAttribute('id', 'dinner-button');

  // var t = document.createTextNode("RESTAURANT!");
  // chooseButton.appendChild(t);


  var imageOne = document.createElement("IMG");
  imageOne.setAttribute("class", "image");
  imageOne.setAttribute("src", "img/ice-cream.jpg");

  // var imageTwo = document.createElement("IMG");
  // imageTwo.setAttribute("class", "image");
  // imageTwo.setAttribute("src", "img/IMG_2339.jpg");


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

  // imageTwo.onclick = function() {
  //     var elements = outside.childNodes;
  //     while (outside.firstChild) {
  //         outside.removeChild(outside.firstChild);
  //     }
  //     content = document.createElement("div");
  //     content.setAttribute('class', 'modal-content');
  //     outside.style.display = "block";
  //     outside.appendChild(content);
  //
  // }

  footer.appendChild(imageOne);
  //footer.appendChild(imageTwo);
  content.appendChild(footer);
  inside.appendChild(content);
  outside.appendChild(inside);

}

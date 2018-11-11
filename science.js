function scienceModal() {
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

	var title = document.createElement("h1");
  title.innerHTML = "Welcome to ghost hall!";
  console.log(title);
  content.appendChild(title);
  inside.appendChild(content);
  outside.appendChild(inside);
  console.log("test");
}

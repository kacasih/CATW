document.addEventListener("DOMContentLoaded", function() {

var paths = ["/public/images/dog.png", "/public/images/mushroom.png", "/public/images/flyy.png"];
var counter = 0;
var img = document.getElementById('obstacle');
var defaultbottom = img.style.bottom;
var defaultright = img.style.right;
setInterval(function() {
  if (counter >= paths.length) {
    counter = 0;
  }
  img.src = paths[counter++];
  if (img.src.endsWith('flyy.png')) {
    img.style.bottom = "40%";
    img.style.right = "9%";
    counter = 0;
  } 
  else {
    img.style.bottom = defaultbottom;
    img.style.right = defaultright;
  }
}, 4000);

const catcharacter = document.getElementsByName('cat-character')[0];
const addinganimation = 'cat-animation'
document.addEventListener('keydown', function(event) {
  if (event.keyCode === 32) {
    if (event.target === document.body) {
      event.preventDefault();
    }
    if (!catcharacter.classList.contains(addinganimation)) {
      catcharacter.classList.add(addinganimation);
    }
    else {
      catcharacter.classList.remove(addinganimation);
      void catcharacter.offsetWidth;
      catcharacter.classList.add(addinganimation);
    }
  }
});

});
document.addEventListener("DOMContentLoaded", function() {
  
let newPosition;  
const paths = ["/public/images/dog.png", "/public/images/mushroom.png", "/public/images/flyy.png"];
var counter = 0;
const img = document.getElementById('obstacle');
const obstacleData = getComputedStyle(img);//camel case necessary for get
var defaultbottom = img.style.bottom;
var defaultright = img.style.right;
const catcharacter = document.getElementsByName('cat-character')[0];
const catData = getComputedStyle(catcharacter);//camel case necessary for get
const addinganimation = 'cat-animation';
const startmessage = document.getElementById('start-message');

function gameloop() {
  newPosition = requestAnimationFrame(gameloop);
}
function collisioncheck(catData, obstacleData) {
  console.log("Cat Data:", catData);
  console.log("Obstacle Data:", obstacleData);

  const catRight = parseFloat(catData.right);
  const catTop = parseFloat(catData.top);
  const catBottom = parseFloat(catData.bottom);
  const catLeft = parseFloat(catData.left);

  const obstacleLeft = parseFloat(obstacleData.left);
  const obstacleTop = parseFloat(obstacleData.top);
  const obstacleBottom = parseFloat(obstacleData.bottom);
  const obstacleRight = parseFloat(obstacleData.right);

  if (catRight >= obstacleLeft && catTop >= obstacleBottom && catBottom <= obstacleTop && catLeft <= obstacleRight) {
    console.log("Collision Occurred!");
    return true; // Collision occurred
  } else {
    console.log("No Collision");
    return false; // No collision
  }
}

document.addEventListener('keydown', function(event) {
    if (event.keyCode === 32) {
      if (event.target === document.body) {
        event.preventDefault();
      }
      if (!startmessage.style["display"].endsWith("none")) {
        startmessage.style["display"] = "none";
      }
      if (!collisioncheck(catData, obstacleData)) {
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
      }, 2000); 
        if (!catcharacter.classList.contains(addinganimation)) {//first way to check if the cat element has already been added the animation with the jump. An easier method used later but I want to test out different ways just for practice 
          catcharacter.classList.add(addinganimation);
        }
        else {
          catcharacter.classList.remove(addinganimation);
          void catcharacter.offsetWidth;
          catcharacter.classList.add(addinganimation);
        }  
      }
        if (img.style.animationPlayState = 'paused') {//second type of way to manipulate animation state, which is easier
          img.style.animationPlayState = 'running';
        }

      else {
        startmessage.style["display"] = "block";
        startmessage.innerText = "You Lost!";
      }   
    } 
});

});
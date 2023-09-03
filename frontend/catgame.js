
document.addEventListener("DOMContentLoaded", function () {
  const paths = ["/public/images/mushroom.png", "/public/images/dog.png", "/public/images/flyy.png"];
  var counter = 0;
  const img = document.getElementById('obstacle');
  const defaultbottom = img.style.bottom;
  const defaultright = img.style.right;
  const catcharacter = document.getElementsByName('cat-character')[0];
  const addinganimation = 'cat-animation';
  const startmessage = document.getElementById('start-message');
  const score = document.getElementById('score');
  var bestscore = 0;
  var scorecount = 0;
  var scorecounting, obstaclecounting;
  //const imgclone = img.cloneNode('true');
  let animationFrameId; // To store the requestAnimationFrame ID
  let isRunning = false;

  function startGame() {
    isRunning = true;
    if (!startmessage.style["display"].endsWith("none")) {
      startmessage.style["display"] = "none";
    }
    //if (!img.parentNode.contains(img)) {
      //img.parentNode.appendChild(img);
    //}
    var obstacledurationflag = false;
    var obstacleduration = 4000, scoreduration = 200;
    img.style.animation = '';
    img.style.animationPlayState = 'running'; 
    scorecounting = setInterval(function() {
      if (!isRunning) {
        return;
      }
      scorecount += 1;
      score.innerHTML = `Score:  `+ scorecount;
      if (scorecount > bestscore) {
        bestscore = scorecount; 
      }
      UpdateObstacleDuration();
    }, scoreduration);

    function UpdateObstacleDuration() {
      if (scorecount % 100 == 0 && !obstacledurationflag) {
        obstacleduration = 2000;
        obstacledurationflag = true;
        console.log("obstacleduration: " + obstacleduration);
        console.log("obstacledurationflag: " + obstacledurationflag);
      }
      if (scorecount == 500) {
          img.style.animationDuration = '3s';
          console.log("obstacledurationflag: " + img.style.animationDuration);
      }
      else if (scorecount == 1000)
        img.style.animationDuration = '2s';

      else if (scorecount == 1500)
      img.style.animationDuration = '1s';
    }
    function obstaclecounting () {
      if (!isRunning) {
        return;
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
      setTimeout(obstaclecounting, obstacleduration);
    };
    
    obstaclecounting();
    updateanimations();
  }

  function updateanimations() {
    if (!isRunning) { 
      return;
    }

    if (collisioncheck()) {
      isRunning = false;
      stopGame();
      return;
    }
    animationFrameId = requestAnimationFrame(updateanimations);
  }


function collisioncheck() {
  const catRect = catcharacter.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  if (
    catRect.right >= obstacleRect.left &&
    catRect.top <= obstacleRect.bottom &&
    catRect.bottom >= obstacleRect.top &&
    catRect.left <= obstacleRect.right
  )
   {
    console.log("Collision Occurred!");
    return true; // Collision occurred
  } else {
    console.log("No Collision");
    return false; // No collision
  }
}


  function stopGame() {
    fetch('/bestscoreroute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',//so backend knows that new score is json
      },
      body: JSON.stringify({bestscore}),
    })
      .then((response) => {
      if (!response.ok) {
        throw new Error('could not connect to backend');
      }
      else {
        console.log('success' + bestscore);
      }
      return response.json();
    });
    isRunning = false;
    clearInterval(scorecounting);
    clearInterval(obstaclecounting);
    scorecount = 0;
    score.innerHTML = `Score:  ` + scorecount;
    startmessage.style["display"] = "block";
    startmessage.innerText = "CLICK SPACE TO START";
    cancelAnimationFrame(animationFrameId);
    img.style.animation = 'none';
    //img.parentNode.replaceChild(imgclone, img);
    //imgclone.style.animationPlayState = 'paused';
  }

  document.addEventListener('keydown', function (event) {
    if (event.keyCode === 32) {
      if (event.target === document.body) {
        event.preventDefault();
      }

      if (!isRunning) {
        startGame();
      }
      else {
        if (!catcharacter.classList.contains(addinganimation)) {
          catcharacter.classList.add(addinganimation);
        } else {
          catcharacter.classList.remove(addinganimation);
          void catcharacter.offsetWidth;
          catcharacter.classList.add(addinganimation);
          }
      }
    }
  });  
});
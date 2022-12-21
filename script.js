function draw() {
  visual();
  character.update();
  character.display();
  ai.display();
  ai.aimove(character.x, character.y, character.w, character.h);
  blocks.forEach(b => b.draw());
}

function visual(){
  background(0);
  updatecamera();
  image(barbackground, 0, 0, W, H);
}

function updatecamera(){
  if (cameraMode == "still") {
    gamecamera.setPosition(W/2, H/2, 780);
  } else if (cameraMode == "shake") {
    gamecamera.setPosition(W/2+random(-5.0, 5.0), H/2+random(-5.0, 5.0), 780);
  }
}

function cameraShake(){
  cameraMode = "shake";
  setTimeout(function() {
    cameraMode = "still";
    ai.attacking = false;
  }, 200); // milliseconds = 0.2 seconds
}

function mousePressed() {
  console.log(`Mouse pressed at: (${mouseX}, ${mouseY})`);
}


//User input
function keyPressed() {
  // Aply on character
  if (keyCode === 32) { //space
    character.jump();
  } 
  // Outside character
  if (keyCode === 72) { //H
    character.push(-10, -4);
    cameraShake();
  } if (keyCode === 74) { //J
    character.push(10, -4);
    cameraShake();
  } if (keyCode === 75) { //K
    character.attacking = true;
    ai.attacked = true;
    setTimeout(function() {
      ai.attacked = false;
      character.attacking = false;
    }, 400); // milliseconds = 0.4 seconds
    ai.push(0, -10);
  }
}
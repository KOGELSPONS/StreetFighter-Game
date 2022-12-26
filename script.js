function draw() {
  visual();

  character.update();
  ai.random();
  ai.aimove(character.x, character.y, character.w, character.h);

  charvisual();

  blocks.forEach(b => b.draw());
}

function visual(){
  background(0);
  updatecamera();
  image(barbackground, 0, 0, W, H);
}

function charvisual(){
  ai.display();
  character.display();
}

function updatecamera(){
  if ((frameCount - cameraFrameCount) >= 20){
    cameraMode = "still";
  } 
  if (cameraMode == "still") {
    gamecamera.setPosition(W/2, H/2, 780);
  } else if (cameraMode == "shake") {
    gamecamera.setPosition(W/2+random(-5.0, 5.0), H/2+random(-5.0, 5.0), 780);
  }
}

function cameraShake(){
  cameraMode = "shake";
  cameraFrameCount = frameCount;
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
    if (ai.freeze) {
      ai.freeze = false;
      ai.attacked = false;
      character.attacking = false;
    } else {
      character.attacking = true;
      ai.attacked = true;
      ai.push(0, -10);
      ai.freeze = true;
    }
  }
}
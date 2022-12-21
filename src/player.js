class Player {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.w = options.w;
    this.h = options.h;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.jumping = false;
    this.attacking = false;
    this.attacked = false;
    this.facing = options.facing;
    this.mx = options.x + (options.w/2);
    this.my = options.y + (options.h/2);
  }

  // Update player position and apply gravity
  update() {
    this.mx = this.x + (this.w/2);
    this.my = this.y + (this.h/2);
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    //Player input on character
    if (keyIsDown(65)){ //A
      this.xSpeed = -7;
    } if (keyIsDown(68)){ //D
      this.xSpeed = 7;
    } if (keyIsDown(65) && keyIsDown(68)){
      this.xSpeed = 0;
    }

    if (ai.x < this.x){
      this.facing = "left";
    } else if (ai.x > this.x) {
      this.facing = "right";
    }

    this.ySpeed += 0.5; // Apply gravity
    if (this.xSpeed < 1 && this.xSpeed > -1){
        this.xSpeed = 0;
    } else if (this.xSpeed > 0){
        this.xSpeed += -1
    } else if (this.xSpeed < 0){
      this.xSpeed += 1
    } 

    // Check for edges and bounce
    if (this.x > WIDTH - this.w) {
      this.x = WIDTH - this.w;
    }
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y > H-this.h) {
      this.y = H-this.h;
      this.ySpeed = 0;
      this.jumping = false;
    }

    //debug
    if (frameCount % 120 == 0){
      console.log("x: " + this.xSpeed);
      console.log("y: " + this.ySpeed);
    }
  }

  // Display player
  display() {
    strokeWeight(2);
    fill(255, 0 , 100);
    //rect(this.x, this.y, this.w, this.h);
    if (!this.jumping && this.xSpeed == 0 && this.ySpeed <= 0.5) {
      if (this.facing == "right") {
        image(char1.right_idle, this.x, this.y, this.w, this.h);
      } else if (this.facing == "left"){
        image(char1.left_idle, this.x, this.y, this.w, this.h);
      }
    } else if (this.xSpeed < 0){
      if (this.facing == "right") {
        image(char1.right_walking_backward, this.x, this.y, this.w+70, this.h);
      } else if (this.facing == "left"){
        image(char1.left_walking_forward, this.x, this.y, this.w+70, this.h);
      }
    } else if (this.xSpeed > 0){
      if (this.facing == "right") {
        image(char1.right_walking_forward, this.x, this.y, this.w+70, this.h);
      } else if (this.facing == "left"){
        image(char1.left_walking_backward, this.x, this.y, this.w+70, this.h);
      }
    } else if (this.xSpeed > 0 && this.xSpeed < 0){
      if (this.facing == "right") {
        image(char1.right_idle, this.x, this.y, this.w, this.h);
      } else if (this.facing == "left"){
        image(char1.left_idle, this.x, this.y, this.w, this.h);
      }
    } 
  }

  // Jump
  jump() {
    if (!this.jumping) {
      this.ySpeed += -20; // Apply upward force
      this.jumping = true;
    }
  }
  push(pushx, pushy) {
    this.xSpeed += pushx;
    this.ySpeed += pushy;
  }
  aimove(playerx, playery, playerw, playerh){
    this.mx = this.x + (this.w/2);
    this.my = this.y + (this.h/2);
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    let playermx = playerx + (playerw/2);
    let playermy = playery + (playerh/2);
    
    strokeWeight(0);
    fill(0, 255 , 100);
    rect(playermx - 5, playermy - 5, 10, 10);
    rect(this.mx - 5, this.my - 5, 10, 10);
    
    if (playermx - this.mx < this.w && playermx - this.mx > 1){
      if (frameCount % 30 == 0 && !this.attacking && !this.attacked && random(["a","b"]) == "a"){
        console.log("attack right");
        setTimeout(function() {
          character.attacked = false;
          ai.attacking = false;
        }, 400); // milliseconds = 0.4 seconds
        this.attacking = true;
        character.attacked = true;
        character.push(10, -4);
        cameraShake();
      }
    } else if (playermx - this.mx > -this.w && playermx - this.mx < -1){
      if (frameCount % 30 == 0 && !this.attacking && !this.attacked && random(["a","b"]) == "a"){
        console.log("attack left");
        this.attacking = true;
        character.attacked = true;
        setTimeout(function() {
          character.attacked = false;
          ai.attacking = false;
        }, 400); // milliseconds = 0.4 seconds
        character.push(-10, -4);
        cameraShake();
      }
    } else if (playermx < this.mx){
      this.xSpeed = -7;
      this.facing = "left";
    } else if (playermx > this.mx){
      this.xSpeed = 7;
      this.facing = "right";
    }

    
    this.ySpeed += 0.5; // Apply gravity
    if (this.xSpeed < 1 && this.xSpeed > -1){
        this.xSpeed = 0;
    } else if (this.xSpeed > 0){
        this.xSpeed += -1
    } else if (this.xSpeed < 0){
      this.xSpeed += 1
    } 

    // Check for edges and bounce
    if (this.x > WIDTH - this.w) {
      this.x = WIDTH - this.w;
    }
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y > H-this.h) {
      this.y = H-this.h;
      this.ySpeed = 0;
      this.jumping = false;
    }
  }
}
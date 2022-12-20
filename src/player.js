class Player {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.w = options.w;
    this.h = options.h;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.jumping = false;
  }

  // Update player position and apply gravity
  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    //Player input on character
    if (keyIsDown(65)){ //A
      this.xSpeed = -10;
    } if (keyIsDown(68)){ //D
      this.xSpeed = 10;
    } if (keyIsDown(65) && keyIsDown(68)){
      this.xSpeed = 0;
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
    if (this.y > H-this.h-platform.h) {
      this.y = H-this.h-platform.h;
      this.ySpeed = 0;
      this.jumping = false;
    }

    //debug
    if (frameCount % 60 == 0){
      console.log("x: " + this.xSpeed);
      console.log("y: " + this.ySpeed);
    }
  }

  // Display player
  display() {
    strokeWeight(2);
    fill(255, 0 , 100);
    rect(this.x, this.y, this.w, this.h);
  }

  // Jump
  jump() {
    if (!this.jumping) {
      this.ySpeed += -10; // Apply upward force
      this.jumping = true;
    }
  }
  push(pushx, pushy) {
    this.xSpeed += pushx;
    this.ySpeed += pushy;
  }
}
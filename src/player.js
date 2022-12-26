class Player {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.w = options.w;
    this.h = options.h;
    this.facing = options.facing;

    this.mx = options.x + (options.w / 2);
    this.my = options.y + (options.h / 2);
    
    this.xSpeed = 0;
    this.ySpeed = 0;
    
    this.jumping = false;
    this.freeze = false;

    this.attacking = false;
    this.attacked = false;
    
    this.attackingcounter = 0;
    this.attackedcounter = 0;
    
    this.attackingframecount = 0;
    this.attackedframecount = 0;
    
    this.hp = 100;
    this.hpbar = new Bar(options.hpbarx, 50, 100, 50, "#ff0000", this.hp);

  }

  // Update player position and apply gravity
  update() {
    this.mx = this.x + (this.w / 2);
    this.my = this.y + (this.h / 2);
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    //Player input on character
    if (keyIsDown(65)) { //A
      this.xSpeed = -7;
    } if (keyIsDown(68)) { //D
      this.xSpeed = 7;
    } if (keyIsDown(65) && keyIsDown(68)) {
      this.xSpeed = 0;
    }

    if (ai.x < this.x) {
      this.facing = "left";
    } else if (ai.x > this.x) {
      this.facing = "right";
    }

    this.ySpeed += 0.5; // Apply gravity
    if (this.xSpeed < 1 && this.xSpeed > -1) {
      this.xSpeed = 0;
    } else if (this.xSpeed > 0) {
      this.xSpeed += -1
    } else if (this.xSpeed < 0) {
      this.xSpeed += 1
    }

    // Check for edges and bounce
    if (this.x > WIDTH - this.w) {
      this.x = WIDTH - this.w;
    }
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y > H - this.h) {
      this.y = H - this.h;
      this.ySpeed = 0;
      this.jumping = false;
    }
  }

  // Display player
  display() {
    strokeWeight(2);
    fill(255, 0, 100);
    //rect(this.x, this.y, this.w, this.h);

    this.hpbar.display(this.hp);

    if (this.attacking) {
      fill(255, 0, 0);
      rect(this.mx, this.my - 500, 50, 50);
    } if (this.attacked) {
      fill(0, 0, 255);
      rect(this.mx, this.my - 500, 50, 50);
    }

    if (!this.jumping && this.xSpeed == 0 && this.ySpeed <= 0.5) {
      if (this.facing == "right") {
        image(char1.right_idle, this.x, this.y, this.w, this.h);
      } else if (this.facing == "left") {
        image(char1.left_idle, this.x, this.y, this.w, this.h);
      }
    } else if (this.xSpeed < 0) {
      if (this.facing == "right") {
        image(char1.right_walking_backward, this.x, this.y, this.w + 70, this.h);
      } else if (this.facing == "left") {
        image(char1.left_walking_forward, this.x, this.y, this.w + 70, this.h);
      }
    } else if (this.xSpeed > 0) {
      if (this.facing == "right") {
        image(char1.right_walking_forward, this.x, this.y, this.w + 70, this.h);
      } else if (this.facing == "left") {
        image(char1.left_walking_backward, this.x, this.y, this.w + 70, this.h);
      }
    } else if (this.xSpeed > 0 && this.xSpeed < 0) {
      if (this.facing == "right") {
        image(char1.right_idle, this.x, this.y, this.w, this.h);
      } else if (this.facing == "left") {
        image(char1.left_idle, this.x, this.y, this.w, this.h);
      }
    }

    if ((frameCount - this.attackingframecount) >= 20){
      this.attacking = false;
    } if ((frameCount - this.attackedframecount) >= 25){
      this.attacked = false;
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
  random() {

  }
  damage() {

  }

  aimove(playerx, playery, playerw, playerh) {
    if (!this.freeze) {
      this.mx = this.x + (this.w / 2);
      this.my = this.y + (this.h / 2);
      this.x += this.xSpeed;
      this.y += this.ySpeed;

      let playermx = playerx + (playerw / 2);
      let playermy = playery + (playerh / 2);

      strokeWeight(0);
      fill(0, 255, 100);
      rect(playermx - 5, playermy - 5, 10, 10);
      rect(this.mx - 5, this.my - 5, 10, 10);

      if (playermx - this.mx < this.w && playermx - this.mx > 1) {
        if (frameCount % 30 == 0 && !this.attacking && !this.attacked && random(["a", "b"]) == "a") {
          this.attackingframecount = frameCount;
          character.attackedframecount = frameCount
          this.attackcounter += 1;
          this.attacking = true;
          character.attacked = true;
          character.push(10, -4);
          cameraShake();
        }
      } else if (playermx - this.mx > -this.w && playermx - this.mx < -1) {
        if (frameCount % 30 == 0 && !this.attacking && !this.attacked && random(["a", "b"]) == "a") {
          this.attackingframecount = frameCount;
          character.attackedframecount = frameCount
          this.attackcounter += 1;
          this.attacking = true;
          character.attacked = true;
          character.push(-10, -4);
          cameraShake();
        }
      } else if (playermx < this.mx) {
        this.xSpeed = -7;
        this.facing = "left";
      } else if (playermx > this.mx) {
        this.xSpeed = 7;
        this.facing = "right";
      }

      this.ySpeed += 0.5; // Apply gravity
      if (this.xSpeed < 1 && this.xSpeed > -1) {
        this.xSpeed = 0;
      } else if (this.xSpeed > 0) {
        this.xSpeed += -1
      } else if (this.xSpeed < 0) {
        this.xSpeed += 1
      }

      // Check for edges and bounce
      if (this.x > WIDTH - this.w) {
        this.x = WIDTH - this.w;
      }
      if (this.x < 0) {
        this.x = 0;
      }
      if (this.y > H - this.h) {
        this.y = H - this.h;
        this.ySpeed = 0;
        this.jumping = false;
      }
    }
  }
}
class Player{
  constructor(options){
    this.x = options.x;
    this.y = options.y;
    this.w = options.w;
    this.h = options.h;
    this.vis = options.vis;
    this.velx = 0;
    this.vely = 0;
    
  }
  draw(){
    rect(this.x,this.y,this.w,this.h);
    
  }
  move(){
    if (keyIsDown(65) && !keyIsDown(68)){
      this.velx = -MOVESPEED
    }

    if (keyIsDown(68) && !keyIsDown(65)){
      this.velx = MOVESPEED
    }
    
    if (!keyIsDown(68) && !keyIsDown(65) && this.velx != 0 || keyIsDown(68) && keyIsDown(65) && this.velx != 0){
      if (this.velx < 0){
        if ((this.velx + 4) > 0) {
          this.velx += (-this.velx);
        }
        else {
          this.velx += 4;
        }
      }
      if (this.velx > 0){
        if ((this.velx - 4) < 0){
          this.velx -= (this.velx);
        }
        else {
          this.velx -= 4;
        }
      }
    }
      
    this.x += this.velx;

    // spatie
    
    if (keyIsDown(87)) {
      this.y += JUMPPOWER;
    } else if (keyIsDown(83)){
      this.y -= JUMPPOWER;
    }
  
  }
  
}
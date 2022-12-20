class Block{
  constructor(options){
    this.x = options.x;
    this.y = options.y;
    this.w = options.w;
    this.h = options.h;
    this.vis = options.vis;
    this.halfWidth = this.w / 2;
    this.halfHeight = this.h / 2 ;
  }

  draw(){ 
    if (this.vis){
      strokeWeight(4);
      fill(0, 255 , 100);
      rect(this.x, this.y, this.w, this.h);
    }
  }
}
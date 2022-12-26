class Bar {
  constructor(x, y, width, height, color, hp) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.hp = hp;
  }

  display(hp) {
    this.hp = hp;
    strokeWeight(2);
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }
}

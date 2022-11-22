//Important Variables
var [WIDTH, W, HEIGHT, H] = [1600, 1600, 900, 900]; //16:9 ratio
var [MOVESPEED, FALLSPEED, JUMPPOWER] = [10,2,-25];

//call classes
var player;
var block;

//new Player/Block
  player = new Player({x:100, y:650, w:50, h:100, vis:true});
  block = new Block({x:150, y:0, w:4000, h:40, vis:true});
  blocks = [block];

function setup() {
  myCanvas = createCanvas(W, H);
  myCanvas.parent("canvas-wrapper");
  background(0);
  frameRate(60);
}

// Variables
var myCanvas;

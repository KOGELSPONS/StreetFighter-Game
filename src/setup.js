//Important Variables
var [WIDTH, W, HEIGHT, H] = [1600, 1600, 900, 900]; //16:9 ratio
var [MOVESPEED, FALLSPEED, JUMPPOWER] = [10,2,-25];

//call classes
var player;
var block;
var blocks = [];

//new Player/Block
  character = new Player({x:100, y:H-500, w:100, h:500, vis:true});
  platform = new Block({x:-5, y:H-50, w:1610, h:50, vis:true});
  blocks = [platform];


// Variables
var myCanvas;
var cameraMode = "still";

function setup() {
  myCanvas = createCanvas(W, H, WEBGL);
  myCanvas.parent("canvas-wrapper");
  background(0);
  frameRate(60);
  gamecamera = createCamera();
  updatecamera("still");

  //Load image
  overlay = loadImage("data/extra/overlay.png")
}



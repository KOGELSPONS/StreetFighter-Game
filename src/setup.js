//Important Variables
var [WIDTH, W, HEIGHT, H] = [1600, 1600, 900, 900]; //16:9 ratio
var [MOVESPEED, FALLSPEED, JUMPPOWER] = [10,2,-25];

//call classes
var player;
var block;
var blocks = [];

//new Player/Block
  character = new Player({x:200, y:H-444, w:312, h:444, facing:"right" ,vis:true});
  ai = new Player({x:1088, y:H-444, w:312, h:444, facing:"left" ,vis:true});
  platform = new Block({x:-5, y:H, w:1610, h:10, vis:true, color: '#1F0E1E'});
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
  barbackground = loadImage("data/background/barbackground.gif");

  //Load character
    //Character 1:
    char1.right_idle = loadImage("data/character/character%201/ken-idleR.gif");
    char1.left_idle = loadImage("data/character/character%201/ken-idleL.gif");
    char1.right_walking_forward = loadImage("data/character/character%201/ken-walkfR.gif");
    char1.right_walking_backward = loadImage("data/character/character%201/ken-walkbR.gif");
    char1.left_walking_forward = loadImage("data/character/character%201/ken-walkfL.gif");
    char1.left_walking_backward = loadImage("data/character/character%201/ken-walkbL.gif");
    char1.right_jump = loadImage("data/character/character%201/ken-jumpR.gif");
    char1.left_jump = loadImage("data/character/character%201/ken-jumpL.gif");
    //Character 2:

    //Character 3:

    //Character 4:

  
}


//Image variables

var barbackground;

var char1 = [];
var char2 = [];
var char3 = [];
var char4 = [];
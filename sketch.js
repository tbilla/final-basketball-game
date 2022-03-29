const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg;
var ball, slingshot;
var net, score, player;
var isTouching;

gameState = "onsling";
score = 0;
isTouching = false;
function preload() {
  backgroundImg = loadImage("sprites/court.jpeg");
}

function setup() {
  var canvas = createCanvas(1200, 400);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(600, height, 1200, 20);

  ball = new Ball(200, 50);
  net = new Net(890, 340, 50, 50);

  player = new Player(300, 200, 50, 120);

  //log6 = new Log(230,180,80, PI/2);
  slingshot = new SlingShot(ball.body, { x: 200, y: 50 });
}

function draw() {
  background(backgroundImg);
  Engine.update(engine);

  ground.display();

  ball.display();
  slingshot.display();
  net.display();
  player.display();
  text("Score: " + score,700,200);
  textSize(30);
  //893, 182 --> net coordinates for shooting
  if (ball.body !== undefined && net.body !== undefined) {
    var collision = Matter.SAT.collides(ball.body, net.body);
    console.log(collision.collided);
    if (collision.collided && isTouching === false) {
      score = score + 3;
      isTouching = true;
    }
  }
}

function mouseDragged() {
  if (gameState !== "launched") {
    Matter.Body.setPosition(ball.body, { x: mouseX, y: mouseY });
  }
}

function mouseReleased() {
  slingshot.fly();
  gameState = "launched";
}

function keyPressed() {
  if (keyCode === 32) {
      gameState = "onsling";
    Matter.Body.setPosition(ball.body, { x: 200, y: 50 });
    slingshot.attach(ball.body);
  }
}

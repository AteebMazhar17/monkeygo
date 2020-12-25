var PLAY=1;
var END=0;
var gameState=PLAY;

var gameOver,restart;
var gameOverimage,restartimage;


var backimage, player_running, bananaimage, obstacle_img, bg,monkey,ground,bananagroup,Obstaclegroup,obstacle,banana;

var score=0;

function preload(){
  backimage = loadImage("jungle.jpg");
  
  player_running = loadAnimation
("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaimage=loadImage("banana.png");
  
  obstacle_img=loadImage("stone.png");

  gameOverimage=loadImage("gameOver.png");
  
  restartimage=loadImage("restart.png");
}

function setup() {
  createCanvas(500, 400);
  
  ground = createSprite(200,380,800,20);
  ground.visible=false;
  
  bg=createSprite(200,200);
  bg.addImage("bg", backimage);
  bg.x = bg.width /2;
  
  monkey=createSprite(200,340,20,20);
  monkey.scale=0.1;
  monkey.x=55;
  monkey.addAnimation("running",player_running);
  
   
  gameOver=createSprite(250,150);
  gameOver.addImage(gameOverimage);
  gameOver.scale=0.5;
  
  restart=createSprite(250,200);
  restart.addImage(restartimage);
  restart.scale=0.5;
  
  gameOver.visible=false;
  restart.visible=false;
  
   bananagroup = new Group();
  Obstaclegroup = new Group();
}

function draw() {
  background(220);
  
  if(gameState===PLAY){
  
     bg.velocityX=-5;
  if (bg.x < 0){
      bg.x = bg.width/2;
    }
  
   if(keyDown("space") ){
    monkey.velocityY=-12;
  }
  
  if (bananagroup.isTouching(monkey)){
    score=score+2;
    bananagroup.destroyEach();
      }
  
  if (Obstaclegroup.isTouching(monkey)){
    monkey.scale=0.1;
    
    gameState=END;
  }
  
   switch(score) {
      case 6: monkey.scale=0.12;
              break;
      case 12: monkey.scale=0.14;
              break;
      case 18: monkey.scale=0.16;
              break;
      case 24: monkey.scale=0.18;
           default: break;
    }
  
  monkey.velocityY=monkey.velocityY+0.8;
   monkey.collide(ground);
 }
  
  
  else if(gameState===END){
     
    gameOver.visible = true;
    restart.visible = true;
    
    bg.velocityX=0;
     ground.velocityX = 0;
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    Obstaclegroup.setVelocityXEach(0);
    bananagroup.setVelocityXEach(0);
    
    
      if(mousePressedOver(restart)) {
    reset();
  }
  
  }
  
 
   
     
  drawSprites();
  fill("white");
  textSize(20);
  stroke("white");
  text("SCORE : " + score,300,50);
  
  food();
  Obstacles();
  
}
  
  function reset(){
  
  gameState = PLAY;
  gameOver.visible=false;
  restart.visible=false;
  Obstaclegroup.destroyEach();
  bananagroup.destroyEach();
  monkey.changeAnimation("running",player_running);
  score = 0; 
  }


function food(){
  
  if(frameCount % 80 === 0){
    var banana=createSprite(500,90,10,10);
     banana.y = Math.round(random(120,200));
    banana.addImage(bananaimage);
    banana.scale = 0.09;
    banana.velocityX = -10;
    
     bananagroup.add(banana);
    banana.lifetime = 200;
  }
}

function Obstacles() {
  
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(500,350,10,40);
    obstacle.velocityX = -6;
    
    obstacle.addImage(obstacle_img);
   
     
    obstacle.scale = 0.15;
    obstacle.lifetime = 200;
    
    Obstaclegroup.add(obstacle);
  }
}

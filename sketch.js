var PLAY=1;
var END =0;
var gamestate = PLAY;
var ground;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;

function preload(){
  
  
  monkey_running =    loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400)
  monkey = createSprite(100,265,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(300,300,10000,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  obstacleGroup=createGroup();
  score = 0;
  FoodGroup = createGroup();  
  monkey.setCollider("rectangle",0,0,500,monkey.height);
  //monkey.debug = true
  
     
  
}


function draw() {
background("white");
   //displaying score
  textSize(20);
  text("SURVIVAL TIME: "+ score, 200,50);
  
  if(gamestate === PLAY){
    monkey.velocityY = monkey.velocityY+0.8;
    if(keyDown("space") && monkey.y>=264){
      monkey.velocityY=-14;
    }
    
      if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     obs();
    bananas();
       score = score + Math.round(getFrameRate()/60);
    if(obstacleGroup.isTouching(monkey)){
     gamestate=END; 
    }
   
  }if(gamestate === END){
    obstacleGroup.setVelocityXEach(0);
     obstacleGroup.setLifetimeEach(-1);
    monkey.velocityY=0;
    FoodGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
   ground.velocityX=0;
  }
   monkey.collide(ground);
drawSprites();  
}

function obs(){
   if (frameCount % 60 === 0){
    obstacle = createSprite(600,267,10,40);
   obstacle.velocityX = -(6 + score/100);  
     obstacle.addImage("image",obstacleImage);
     obstacle.scale=0.15;
     obstacle.depth=ground.depth;
     obstacle.lifetime =200;
       
 obstacle.setCollider("circle",5,10,230);
// obstacle.debug = true
  
     obstacleGroup.add(obstacle);
   }
}

function bananas(){
   if (frameCount % 40 === 0) {
    banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(6 + score/100);
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
}

}





var Mia, Rover;
var bird,stone,fruit;
var ground;
var invisibleGrd;
var backGrdImg,backGrd;
var fruitsGroup,stonesGroup;
var gameOver;
var PLAY = 1;
var END = 0;
var gameState = PLAY ;
var distance1 = 0;
var distance;
function preload() {
appleImg = loadImage("images/apple.png");
bananaImg = loadImage("images/banana.png");
orangeImg = loadImage("images/orange.png");
pearImg = loadImage("images/pear.png");
miaImg = loadImage("images/mia.png");
backGrdImg = loadImage("images/sky.png");
stoneImg = loadImage("images/stone.png");
gameOverImg = loadImage("images/game over.jpg")
RoverImg = loadImage("images/rover.png")
}

function setup(){
    var canvas = createCanvas(750,700);
    gameOver = createSprite(375,350,750,700);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 4;

    backGrd = createSprite(0,300);
    backGrd.addImage(backGrdImg)
    backGrd.scale = 3;
    backGrd.velocityX = -5;
    backGrd.x = backGrd.width/8;

    Mia = createSprite(50,300,50,50);
    Mia.addImage(miaImg);
    Mia.setCollider("rectangle",0,0,100,150);
    Mia.debug = false;

    Rover = createSprite(650,650,50,50);
    Rover.addImage(RoverImg);
    Rover.visible = false;

    invisibleGrd = createSprite(600,650,1200,25);
    invisibleGrd.visible = false;

    

    fruitsGroup = new Group();
    stonesGroup = new Group();
}

function draw(){
    background("lightblue");
     
    if(gameState === PLAY ){
      gameOver.visible = false;
    
    distance1 = distance1 + (getFrameRate()/100)
    distance = Math.round(distance1)
    if(keyDown(UP_ARROW)){
        Mia.velocityY = -8;
      }
      Mia.velocityY =  Mia.velocityY+0.5;
     
      if(keyDown(RIGHT_ARROW)){
        Mia.velocityX = +10;
      }
      if(keyDown(LEFT_ARROW)){
        Mia.velocityX = -10;
      }
      if(Mia.isTouching(fruitsGroup)){
        fruitsGroup.destroyEach();
        stonesGroup.destroyEach();
      }
      
      backGrd.velocityX = -3;

      if(backGrd.x<0){
      backGrd.x = backGrd.width/8;
      }
      

      Mia.collide(invisibleGrd);
      Rover.collide(invisibleGrd);

if (distance > 3850){
  Rover.visible =true;
 Rover.velocityX = -3;

  fruitsGroup.destroyEach();
  stonesGroup.destroyEach();

  

}



      Fruits();
      Stones();

if(Mia.isTouching(stonesGroup)){
        gameState = END ; 
      }
    }

if(gameState === END){
  gameOver.visible = true;
  fruitsGroup.destroyEach();
  stonesGroup.destroyEach();
  Rover.destroy();
  Mia.destroy();
}
    drawSprites();
    textSize(28);
    fill("black")
    text("DISTANCE : " + distance,300,50);  
    if(Mia.isTouching(Rover)){
      Rover.velocityX = 0
      Mia.velocityX = 0
      textSize("28")
      text("YOU WON!",300,250)
    }
}

function Fruits(){
  if(frameCount%250===0){
  fruit = createSprite(50,500,50,50);
  var r = Math.round(random(1,4));
  fruit.scale = 0.1;
  
  if(r ===1 ){
  fruit.addImage(appleImg);
  }
  else if (r ===2){
    fruit.addImage(pearImg);
  }
  else if (r === 3){
    fruit.addImage(bananaImg)
  }
  else if (r === 4){
    fruit.addImage(orangeImg)
  }
  
  fruit.x = Math.round(random(100,700));
  fruit.y = Math.round(random(450,500));
  fruit.lifetime = 100;
  fruitsGroup.add(fruit);
  }
  }
  
  function Stones (){
    if(frameCount%200===0){
      var stone = createSprite(50,500,50,50)
      stone.addImage(stoneImg);
      stone.scale =0.5;
    
      stone.x = Math.round(random(400,700));
      stone.y = Math.round(random(575,600));
      stone.velocityX = -1.5;
        
      stone.lifetime = 100;
      stonesGroup.add(stone);
         
       }
    }


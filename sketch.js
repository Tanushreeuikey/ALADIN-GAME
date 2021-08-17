const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;


var bg,bg2,bg3,bg4,form,system,code,security;

var nextButton,nextButtonImg,birdSound,aladinSound,playAgain,playAgainImg;
var aladin,aladinn,bird,bird_Img,coin,coin_Img,coinGroup,birdGroup,i=0;
var score=0;
var level=0;
var coinScore=0;
/*var PLAY=1
var END=0
var gameState= PLAY;*/

function preload() {
 
  
  bg= loadImage("aladdin_cave.jpg")
  bg2=loadImage("treasure.jpg")
  bg3=loadImage("Aladdin-Disney.jpg")
  bg4=loadImage("cavePlay.jpg")
  nextButtonImg=loadImage("nextbutton.png")
  coin_Img=loadAnimation("coin1.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png","coin7.png",)
  bird_Img=loadAnimation("bird1.png","bird2.png","bird3.png","bird4.png","bird5.png","bird6.png","bird7.png","bird8.png",)
  playAgainImg=loadImage("playAgain.png")

  bird_collided=loadAnimation("star1.png")
  birdSound=loadSound("EagleSound.mp3")
  aladinSound=loadSound("yuhu.mp3")
}

function setup() {
  createCanvas(1000,500);
  engine = Engine.create();
  world = engine.world;

  security = new Security();
  system = new System();
  

  coinGroup= new Group()
  birdGroup=new Group()
  aladin= new Aladin(180,100,50,50)
  
 
  nextButton=createSprite(450,300,50,50)
  nextButton.addImage(nextButtonImg)
  nextButton.scale=2

  playAgain=createSprite(500,250,50,50)
    playAgain.addImage(playAgainImg)


}

function draw() {
  background(180);
Engine.update(engine);

if(level === 0)
  {
    background(bg)
    clues();
  security.display();
  textSize(20);
  fill("white");
  text("Score: " + score, 450, 50);
  nextButton.visible=false;
  playAgain.visible=false;
}


  if(score === 3 ) 
{
   level=1 
}

if(level === 1)
{
  background(bg2)
  
  nextButton.visible=false;
  playAgain.visible=false;

  aladin.display();

  aladinn=createSprite(aladin.body.position.x+60,aladin.body.position.y+20,20,70)
  aladinn.visible=false;  

  console.log(aladinn.x)

  if(keyDown(UP_ARROW))
  {
  Matter.Body.setPosition(aladin.body,{x:aladin.body.position.x+0,y:aladin.body.position.y-5})
  }

  if(keyDown(DOWN_ARROW))
  {
  Matter.Body.setPosition(aladin.body,{x:aladin.body.position.x+0,y:aladin.body.position.y+5})
  }

  textSize(20);
  fill("white");
  text("Score: " + coinScore,500 , 50);

  spawnCoin();
  spawnBird();

  if(coinGroup.isTouching(aladinn))
  {
    coinScore+=10;
    coinGroup.get(i)
    coinGroup[i].destroy()

    //aladinSound.play();
  }

  if(aladinn.y<=0 || aladinn.y>=500)
  {
    coinScore-=1
  }

  if(birdGroup.isTouching(aladinn))
  {
    
    coinScore-=50

    birdGroup.get(i)
    birdGroup[i].destroy()
    
    birdSound.play();
  }

  if(coinScore >=150)
  {
    level=3
    
    coinGroup.setLifetimeEach(-1)
    birdGroup.setLifetimeEach(-1)

    coinGroup.setVelocityXEach(0)
    birdGroup.setVelocityXEach(0)

    coinGroup.destroyEach()
    birdGroup.destroyEach()
 
    
  }

  if(coinScore <=-100)
  {
    level=4

    coinGroup.setLifetimeEach(-1)
    birdGroup.setLifetimeEach(-1)

    coinGroup.setVelocityXEach(0)
    birdGroup.setVelocityXEach(0)

  }

}

if(level===4)
{
  playAgain.visible=true;

}

if(level===3)
{
  background(bg3)
  image(bg3,500,250,1000,600)
 
  textSize(40)
  fill("white")
  text("YOU WIN!!",790,400)

  
  
}

 if(mousePressedOver(playAgain) && level === 4)
{
  reset();
}
 
  drawSprites()
}


function reset()
{
   level=1

   coinGroup.destroyEach()
   birdGroup.destroyEach()

   coinScore=0;

}  

function spawnCoin()
{
  if(frameCount%70===0)
{
     var pos = aladin.body.position.x+1000
     coin=createSprite(pos,random(10,490),20,20)
     coin.addAnimation("round",coin_Img)
     coin.scale=0.080
     coin.velocityX=-6
     coinGroup.add(coin);
     coin.lifetime= 500
}

}

function spawnBird()
{
  if(frameCount%140===0)
  {
    var pos = aladin.body.position.x+1000
    bird=createSprite(pos,random(20,480),20,20)
    bird.addAnimation("flappy",bird_Img)
    bird.scale=0.50
    bird.velocityX=-(7 + coinScore/20)
    birdGroup.add(bird);
    bird.lifetime=500
  }
}
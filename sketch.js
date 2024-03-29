var bullet,wall,thickness;
var speed,weight,rating;
var damage;
var state="pre";

function setup() {
  createCanvas(1600,400);

  wall = createSprite(1200,200,thickness,height/2);
  wall.shapeColor=color(80,80,80);

  bullet = createSprite(50,200,60,20);
  bullet.shapeColor="white";
}

function draw() {
  background(0);

  if(state==="pre") {
    textSize(20);
    fill("white");

    text("Press SPACE BAR.",600,50);

    if(keyWentUp("space")) {
      state="running";
    }
  }

  if(state==="running") {
    weight = Math.round(random(30,52));
    speed = Math.round(random(223,245));
    thickness = random(22,83);
    bullet.velocityX = speed;

  if(isTouching(bullet,wall)) {
    wall.width=thickness;

    bullet.velocityX=0;
    damage = Math.round(0.5*weight*speed*speed/(thickness*thickness*thickness));
     
    if(damage>10) {
    wall.shapeColor="red";
    rating="BAD";
    }

    if(damage<10) {
      wall.shapeColor="green";
      rating="GOOD";
    }

    state="end";
  }
}
  if (hasCollided(bullet,wall)){
    bullet.velocityX=0;
    var damage=0.5*weight*speed*speed/(thickness *thickness *thickness);

    if(damage>10)
    {
      wall.shapeColor=color(255,0,0);
    }

    if(damage<10)
    {
      wall.shapeColor=color(0,255,0)
    }

  }
  if(state==="end") {

    if(damage>=10) {
      fill("red");
    }

    if(damage<10) {
      fill("green");
    }

    textSize(20);
    text("Speed: "+speed+"km/h",200,50);
    text("Weight: "+weight+"kg",400,50);
    text("Thickness: "+Math.round(thickness),600,50);

    textSize(25);
    text("Rating: "+rating,1000,50);
    text("Damage: "+damage,800,100);

    text("Press 'R' to reset",1200,50);
    if(keyDown("r")) {
      reset();
     
    }
  }

  drawSprites();
}


function reset() {
  state="pre";
  bullet.x=50;
  wall.shapeColor=color(127,127,127);
}

function hasCollided(lbullet,lwall){
   bulletRightEdge=lbullet.x +lbullet.width;
   wallLeftEdge=lwall.x;
   if(bulletRightEdge>=wallLeftEdge){
     return true
   }
   return false;
}

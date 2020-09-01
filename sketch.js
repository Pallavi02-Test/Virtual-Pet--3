var database;
var dog;
var normalDog;
var happyDog;
var foodS,foodStock;
var feedPet,addFood;
var fedTime,lastFed;
var foodObj;
var input,button;
var gameState,readingGameState;
var bedroom,garden,washRoom;

function preload()
{
  normalDog = loadImage("images/Dog.png");
  happyDog = loadImage("images/Happy.png");
  bedroom = loadImage("images/Bed Room.png");
  garden = loadImage("images/Garden.png");
  washRoom = loadImage("images/Wash Room.png");

}

function setup() {
  database = firebase.database();

  createCanvas(1000,600);
  
  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  readingGameState = database.ref('gameState');
  readingGameState.on("value",function(data)
  {
    gameState = data.val();
  })

  dog = createSprite(500,300,10,10);
  dog.addImage(normalDog);
  dog.scale = 0.2;
  
  feedPet = createButton("Feed The Dog");
  feedPet.position(700,95);
  feedPet.mousePressed(feedDog);

  addFood = createButton("Add Some Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  input = createInput('Name');
  input.position(430,450);

  button = createButton("ENTER");
  button.position(482.5,480);

  var dogName = createElement('h4');

  button.mousePressed(function()
  {
    var name = input.value();
    dogName.html("Dog's Name: " +name);
    dogName.position(700,300);
  })
}

function draw() {  
  background(46,139,87);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data)
  {
    lastFed = data.val();
  });
  if(gameState == "hungry")
  {
    fill(255,255,254);
    textSize(15);
    if(lastFed <= 12)
    {
      text("Last Fed: "+lastFed+" AM",460,50);
    }
    else if(lastFed == 12)
    {
      text("Last Fed: 12 PM",460,50);
    }
    else
    {
      text("Last Fed: "+lastFed+" PM",460,50);
    }
  }

  currentTime = hour();
  if(currentTime == (lastFed + 1))
  {
    update("playing");
    foodObj.garden();
  }
  else if(currentTime == (lastFed + 2))
  {
    update("sleeping");
    foodObj.bedroom();
  }
  else if(currentTime > (lastFed + 2) && currentTime <= (lastFed + 4))
  {
    update("bathing");
    foodObj.washRoom();
  }
  else
  {
    update("hungry");
    foodObj.display();
  }

  if(gameState != "hungry")
  {
     feedPet.hide();
     addFood.hide();
     button.hide();
     input.hide();
     dog.remove();
  }
  else
  {
     feedPet.show();
     addFood.show();
     button.show();
     input.show();
     dog.addImage(normalDog);
  }

  drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

/*function writeStock(x){
  if(x <= 0)
  {
    x = 0;
  }
  else
  {
    x = x - 1;
  }

  database.ref('/').update({
    Food:x
  })
}*/

function feedDog()
{
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update
  ({
     Food: foodObj.getFoodStock(),
     FeedTime: hour()
  })
}

function addFoods()
{
  foodS++;
  database.ref('/').update
  ({
     Food: foodS
  })
}

function update(state)
{
  database.ref('/').update(
  {
    gameState: state
  });
}




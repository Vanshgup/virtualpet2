var dog,happyDog,dogImage;
var foodS, foodStock,lastFed,database;
var feed,addFood;
var foodObj;


function preload()
{
	happyDog=loadImage("dogImg1.png");
  dogImage=loadImage("dogImg.png");
}

function setup() {
	createCanvas(800, 700);
  database=firebase.database();

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImage);
  dog.scale=0.3

  foodStock=database.ref('Food');
   foodStock.on("value",readStock);

   feed=createButton("Feed food");
   feed.position(700,95);
   feed.mousePressed(feedDog);

   addFood=createButton("Add food");
   addFood.position(800,95);
   addFood.mousePressed(addFoods);

   foodObj=new Food();

   foodStock=database.ref('Food');
   foodStock.on("value",readStock);
}


function draw() {  
  background(46, 139, 87);
  
 foodObj.show();

  drawSprites();
}

function addFoods()
{ 
   foodS++; database.ref('/').update({ Food:foodS }) 
}

function feedDog(){
    dog.addImage(happyDog); 
    if(foodObj.getFoodStock()<= 0){ 
       foodObj.updateFoodStock(foodObj.getFoodStock()*0);
       }else{ foodObj.updateFoodStock(foodObj.getFoodStock()-1);
       }
database.ref('/').update({ Food:foodObj.getFoodStock()})}

function readStock(data)
{ 
   foodObj.updateFoodStock(foodS)
  foodS=data.val();
 }

 function writeStock(x)
 {
    if(x<=0)
    { x=0; }else{ x=x-1; }
     database.ref('/').update({ Food:x }) 
  }
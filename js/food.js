class Food{
   constructor()
   {
      this.foodStock = 0;
      this.lastFed;
      this.image = loadImage('images/milk.png');
   }

   updateFoodStock(foodStock)
   {
     this.foodStock = foodStock;
   }

   deductFood()
   {
     if(this.foodStock > 0)
     {
       this.foodStock = this.foodStock - 1;
     }
   } 

   getFoodStock()
   { 
     return this.foodStock
   }

   bedroom()
   {
      background(bedroom,500,300);
   }

   garden()
   {
      background(garden,500,300);
   }

   washRoom()
   { 
      background(washRoom,500,300);
   }

   display()
   {
     var x = 80;
     var y = 100;

     imageMode(CENTER);
     //image(this.image,1000,100,70,70);

     if(this.foodStock != 0)
     {
       for(var i = 0; i < this.foodStock; i++)
       {
          if(i % 10 == 0)
          {
            x = 80;
            y = y + 50;
          }
          image(this.image,x,y,50,50);
          x = x + 30;
       }
     }
   }
}
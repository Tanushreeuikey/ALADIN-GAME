class Aladin{

 constructor(x,y,width,height)
 {
     this.body = Bodies.rectangle(x, y, width, height,{isStatic:true});
     this.width = width;
     this.height = height;
     this.image = loadImage("Aladinn.png");
     World.add(world, this.body);
   }
   display(){

     
     var pos =this.body.position;
    
     rectMode(CENTER);
     fill("white")
     rect(pos.x,pos.y,20,20)
     imageMode(CENTER);
     image(this.image,pos.x,pos.y, 200,140);

 }



}
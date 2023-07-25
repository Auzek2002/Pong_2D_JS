const canvas= document.querySelector("canvas");
const c= canvas.getContext('2d');
canvas.width= 1280;
canvas.height= 520;
const gravity= 0.5;
class Player{
    static time=0;
    constructor(){
        this.pos = {
            x:550,
            y:canvas.height-10
        }
        this.velocity= {
            x:0,
            y:0
        }
        this.width=200;
        this.height=20;
    }

    draw(){
        c.fillStyle = 'red';
        c.fillRect(this.pos.x,this.pos.y,this.width,this.height);
    }
    update(){
        this.draw();
        if(this.pos.x + this.velocity.x >= 0 &&this.pos.x + this.width + this.velocity.x <= canvas.width){
            this.pos.x += this.velocity.x;
        }
        else{
            this.velocity.x=0;
        }
    }
}

class Ball{
    constructor(){
        this.pos= {
            x:canvas.width/2,
            y:canvas.height/2
        }
        const direction = {
            x: Math.random() - 0.5 >= 0 ? -4 : 4,
            y: Math.random() - 0.5 >= 0 ? -4: 4
        }
        this.velocity= {
            x:direction.x,
            y:direction.y
        }
        this.width=10;
        this.height=10;
    }
    draw(){
        c.fillStyle = 'white';
        c.fillRect(this.pos.x,this.pos.y,this.width,this.height);
    }
    update(){
        this.draw();
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
        if(this.pos.x + this.width+ this.velocity.x >= canvas.width || this.pos.x + this.velocity.x <=0){
            this.velocity.x = -this.velocity.x;
        }
        if(this.pos.y + this.height+ this.velocity.y >= canvas.height || this.pos.y + this.velocity.y <=0){
            this.velocity.y = -this.velocity.y;
        }
        // if(this.pos.y + this.height + this.velocity.y <= canvas.height){
        // this.velocity.y+=gravity;
        // }
        // else{
        //     this.velocity.y+= -gravity;
        // }
    }
}
//creating the player and ball objects: 
const player= new Player();
const ball = new Ball();
const player_speed=17;
//alert(canvas.height);
let count=1;
function animate(){
    //game loop logic:

    requestAnimationFrame(animate);
    c.fillStyle="black";
    c.clearRect(0,0,canvas.width,canvas.height);
    player.update();
    ball.update();

    //ball and platform collision detection: 

    if(ball.pos.y+ball.height <= player.pos.y && ball.pos.y + ball.height + ball.velocity.y >= player.pos.y
        && ball.pos.x+ball.width >= player.pos.x && ball.pos.x+ball.width+ball.velocity.x <=player.pos.x+player.width)
          {
              count++;
              if(count%2 ==0){
                c.fillStyle="yellow";
              }
              else{
                c.fillStyle="black";
              }
              ball.velocity.x= -ball.velocity.x;
              ball.velocity.y= -ball.velocity.y;
          }

    //Loss condition: 
    if(ball.pos.y + ball.height >= canvas.height-5){
        console.log("You lose!");

    }      
    
    
}

animate();

//checking for key press events: 

window.addEventListener('keydown',(event) =>{
    console.log(event.key);
    switch(event.key){
        case "ArrowRight":
            player.velocity.x =player_speed;
            break;
        case "ArrowLeft":
            player.velocity.x = -player_speed;
            break;
    }
})
window.addEventListener('keyup',(event) =>{
    console.log(event.key);
    switch(event.key){
        case "ArrowRight":
            player.velocity.x=0;
            break;
        case "ArrowLeft":
            player.velocity.x=0;
            break;
    }
})
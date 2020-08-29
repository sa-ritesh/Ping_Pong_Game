var canvas=document.querySelector("canvas");
var c=canvas.getContext("2d");
var W=canvas.width=window.innerWidth-20;
var H=canvas.height=window.innerHeight-25;

window.addEventListener("resize",function(){
     W=canvas.width=window.innerWidth-20;
     H=canvas.height=window.innerHeight-25;
});
var dx=0;
var rod=new Image();
var ball=new Image();
ball.src="ball.png";
rod.src="rod.png";
window.addEventListener("keypress",function(event){
	if(event.key=="d"){
		dx+=15;
	}
	else if(event.key=="a"){
		dx-=15;
	}
});

if(localStorage.getItem("highest")==0){
	window.alert("This is your First Time...Hope you Enjoy It");
}
else{
	window.alert( "Highest score is-> " + localStorage.getItem("highest") + "  But You can break it");
}

var score=0;
var x;
var radius=15;
var rodHeight=20;
var rodWidth=200;
var ballX=W/2;
var ballY=H-(radius+rodHeight);
var ballDy=-2;
var ballDx=4;
var ballDirection=Math.floor(Math.random()*2);
var arr=["-1","1"];
ballDx*=arr[ballDirection];
var collision=false;


function draw(){
	c.fillStyle="rgba(41,223,230,0.10)";
	c.fillRect(0,0,W,H);
    x=(W/2)-100+dx;
  c.beginPath();
  c.fillStyle="black";
  c.clearRect(0,0,W,20);
  c.clearRect(0,H-20,W,H);
  c.drawImage(rod,x,0,rodWidth,rodHeight);
  c.drawImage(rod,x,H-rodHeight,rodWidth,rodHeight);
  c.fillStyle="#f23400";
  c.arc(ballX,ballY,radius,Math.PI*2,false);
  c.fill();
  c.stroke();
}


function update(){
localStorage.setItem("your",score);
if(score>localStorage.getItem("highest")){
localStorage.setItem("highest",score);
}
var last=x+200;
if(last>W){
	dx-=15;
}
if(x<0){
	dx+=15;
}	
ballX+=ballDx;
ballY+=ballDy;
if(ballX>W-radius || ballX-radius<0){
	ballDx*=-1;
}
if(ballY-radius<rodHeight && ballX>x && ballX<last ){
	ballDy*=-1;
	score++;
}
if(ballY+radius>H-rodHeight && ballX>x && ballX<last ){
	ballDy*=-1;
	score++;
}
/*
console.log("ballX->" + ballX);
console.log("x->" + x);
console.log("x+200->" + last);
console.log(ballY-radius);
console.log("rodHeight->" + rodHeight);
*/
if(ballY-radius<0 || ballY+radius>H){
	window.alert("Highest-> "+localStorage.getItem("highest") + "  Your Score-> " +localStorage.getItem("your"));
	clearInterval(id);
}

}
function gameLoop(){
	draw();
	update();
}
var id=setInterval(gameLoop,10);

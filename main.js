const heigthBar = 20
const widthBar = 80
let playerPositionX = 0 //min = 0 max = 480
const playerSpeed = 10 //pixels each time the key is pressed
//const playerPositionY = (canvas.height-25) - heigthBar
const sizeBall  = 10
let ballPositionX
let ballPositionY
let ballSpeed = 12
let score = 0
let crash = false
let winner = false
let pause = false


window.onload = function(){
	this.hidingElementAndFadingOut('note')
	
	canvas = document.getElementById("canvas")
	context = canvas.getContext('2d')
	// player
	document.addEventListener('keydown',keyDown)
	setInterval(mainLoop, 30);
    ballPositionX = canvas.width / 2;
	ballPositionY = -10
}
function hidingElementAndFadingOut(elementId){
	setTimeout(function () {
		document.getElementById(elementId).style.opacity='0';
		setTimeout(function () {
			document.getElementById(elementId).style.display='none'
		},1000)
	},3000)
}
function keyDown(e){
	if(e.keyCode == 37 && pause == false){
		if(playerPositionX > 0){ //bigger than 0 because  canvas start in 0 width
			playerPositionX -= playerSpeed
		}
	}
	if(e.keyCode == 39 && pause == false){//smaller than canvas total width 
		if(playerPositionX < canvas.width-widthBar){
			playerPositionX += playerSpeed
		}
	}

	if(e.keyCode == 83 && pause == false){
		ballSpeed = 0
		pause = !pause
	}
	else if(e.keyCode == 83 && pause == true){
		ballSpeed = 10
		pause = !pause
	}
}
function mainLoop(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillRect(playerPositionX, (canvas.height-25) - heigthBar, widthBar, heigthBar);
	context.beginPath();
    context.arc(ballPositionX, ballPositionY, sizeBall, 0, Math.PI * 2, true);
	context.fill();
	
	if (ballPositionY <= canvas.height){
		ballPositionY += ballSpeed
	}
	else{
		ballPositionX = Math.random() * 600;
		ballPositionY = -10
		crash = false
	}

	if((ballPositionX > playerPositionX && ballPositionX < playerPositionX+widthBar) && ballPositionY >= (canvas.height-25) - heigthBar && crash == false){
		score += 1
		crash = true
	}

	// if(score == 2 && winner == false){
	// 	console.log('oi')
	// 	winner = true
	// 	this.start()
	// }
	context.font = "32pt monospace";
	context.fillText(score, canvas.width - 300,50);
}
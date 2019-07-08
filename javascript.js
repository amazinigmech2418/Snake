var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
// Add Settings to Game
var SPEED = {
	SLOW: 1,
	MEDIUM: 3,
	FAST: 5
};

var settings = {
	lives: 3,
	apples: 5,
	speed: SPEED.SLOW
};
// Game things
function setup() {
var player = {
	dir:"up",
	x:200,
	y:200,
	appleX:[0],
	appleY:[0],
	points:0,
	pastX:[200],
	pastY:[200],
	length:10,
	lives: settings.lives;
}

// Make apple on load
apple();
}

function renderApple() {
	for(var xyz=0; xyz<settings.apples, xyz++) {
	c.fillStyle = "red";
	c.fillRect(player.appleX[xyz],player.appleY[xyz],6,6);
	}
}

// Detect if snake is touching apple
if (player.x == player.appleX && player.y == player.appleY) {
	apple();
	alert();
	player.points++
}

// Main Loop
var main;
function loopStart() {
	if(main) {
clearInterval(main);
}
main = setInterval(function() {
	c.font = "50px Arial";
	if (player.dir == "up") {
		player.y -= settings.speed;
	} else if (player.dir == "down") {
		player.y += settings.speed;
	} else if (player.dir == "right") {
		player.x += settings.speed;
	} else if (player.dir == "left") {
		player.x -= settings.speed;
	}
	// Check if Game Over
	if((player.pastX.indexOf(player.x)==player.pastY.indexOf(player.y) &&player.pastX.indexOf(player.x)!=-1)||player.x<0||player.y<0||player.x>500||player.y>500) {
		if(player.lives>0) {
			player.lives--;
		loopStart();
		} else {c.fillText("Game Over",50,200);
		c.fillText("Score: "+((player.length-10)/6),50,270);
		dir="";
		setInterval(gameOver,20);
		clearInterval(main);}
	}
	// Clear Screen
	c.clearRect(0,0,1000,1000);
	c.fillStyle = "green";
	// Render Snake
	for(i in player.pastX) {
	c.fillRect(player.pastX[i] - 1,player.pastY[i] - 1,3,3);
	}
	// Render Current Position
	c.fillRect(player.x - 1,player.y - 1,3,3);
	// Save Current Position
	player.pastX.push(player.x);
	player.pastY.push(player.y);
	// Keep Positions Saved To Length;
	if(player.pastX.length>player.length) {
		player.pastX.shift();
		player.pastY.shift();
	}
	// Check if apple is eaten
	if(Math.sqrt(((player.x-player.appleX)*(player.x-player.appleX))+((player.y-player.appleY)*(player.y-player.appleY)))<6) {
		player.length+=6;
		apple();
	}
	renderApple();
},20);}

// Detect Keys
document.body.onkeydown = function(event) {
	if (event.key == "ArrowUp") {
		player.dir = "up";
	} else if (event.key == "ArrowDown") {
		player.dir = "down";
	} else if (event.key == "ArrowRight") {
		player.dir = "right";
	} else if (event.key == "ArrowLeft") {
		player.dir = "left";
	}
}

// Function to make an apple at a random position
function apple() {
	player.appleX = [];
	player.appleY= [];
	for(var xyz=0; xyz<settings.apples; xyz++) {
	c.fillStyle = "red";
	player.appleX.push(Math.floor(Math.random() * 394) + 6);
	player.appleY.push(Math.floor(Math.random() * 394) + 6);
	c.fillRect(player.appleX[xyz],player.appleY[xyz],6,6);
	}
}
function gameOver() {
c.fillText("Game Over",50,200);
c.fillText("Score: "+((player.length-10)/6),50,270);
}

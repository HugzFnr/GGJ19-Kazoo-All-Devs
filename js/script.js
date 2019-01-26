var canvas = document.getElementById("room");
var context = canvas.getContext("2d");

var bear = document.getElementById("sprite-bear");


var x = 20;
var y = 10;
var largeur = 100;
var longeur = 69;


function table(couleur, x, y)
{

	context.fillStyle = couleur;
	context.fillRect(x,y,largeur,longeur);
}


function drawBear(x,y)
{
	context.drawImage(bear, x ,y, bear.width/4, bear.height/4);
}

var delta = 1000/60; // 60 fps trop ouf

var frame = 0;
setInterval(function()
{
	context.clearRect(0,0, canvas.width, canvas.height);
	frame++;

	drawBear(0+frame,0+frame*2);

}, delta);

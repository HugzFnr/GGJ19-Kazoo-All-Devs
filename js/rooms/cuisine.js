cuisine = {};
rooms.cuisine = cuisine;

cuisine.x = (100 + 200)*zoomRooms;
cuisine.y = (80 + 250)*zoomRooms;

cuisine.width = 300*zoomRooms;
cuisine.height = 150*zoomRooms;

var refx = cuisine.x;
var refy = cuisine.y;
var cw = cuisine.width;
var ch = cuisine.height;

//Le canvas
//cuisine.cvs;

var boxCook = {
    x : 70,
    y : 80,
    w : 200,
    h : 80,
}

var boxSmoke =
{
    x : 100,
    y : 20,
    w : 140,
    h : 60,
}

cuisine.begin = function ()
{

  var ctx = cuisine.cvs.getContext("2d");
  var left = true;
  var dangerLvl = 0; //goes up to 5 = lose
  var clicksNeeded = 5;
  var deltaChange = 3000;
  var timeSpent=0;

  drawRect("blue",boxCook);

  var heatup = setInterval(function()
  {
      dangerLvl++;
      clicksNeeded=5;
      updateSmoke(dangerLvl);

  },deltaChange);

  var frame = setInterval(function()
  {
    if (timeSpent>gameDur) endGame("WIN");
    timeSpent+=1000/30;
  },deltaT);

    cuisine.cvs.onclick = function() //faut pouvoir la désactiver à la fin
{
    clicksNeeded--;
    if (clicksNeeded<=0)
    dangerLvl--;
    clicksNeeded=5;
    updateSmoke(dangerLvl);
    
    if (left)
    {
    drawRect("blue",boxCook);
    left=false;
    }
    else {
    drawRect("red",boxCook);
    left=true;
    }   

    console.log(clicksNeeded);
}

function drawRect(color,box)
{
    ctx.fillStyle = color;
    ctx.fillRect(box.x,box.y,box.w,box.h);
}

function updateSmoke(lvl)
{
    if (lvl==4) drawRect("black",boxSmoke);
    else if (lvl==3) drawRect("gray",boxSmoke);
    else if (lvl==2) drawRect("silver",boxSmoke);
    else if (lvl==5) endGame("DEFEAT");
    else drawRect("green",boxSmoke);
}

function endGame(end)
{
    console.log(end + " CUISINE");
    ctx.clearRect(0,0,cw,ch);
    clearInterval(heatup);
    clearInterval(frame);
}

}


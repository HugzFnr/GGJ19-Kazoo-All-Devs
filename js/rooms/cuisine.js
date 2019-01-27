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
cuisine.cvs;
cuisine.playing = false;

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
    cuisine.playing = true;

  var ctx = cuisine.cvs.getContext("2d");

  var dangerLvl = 0; //goes up to 5 = lose
  var clicksNeeded = 5;
  var deltaChange = 2500;
  var timeSpent=0;

  var left = true;
  drawRect("blue",boxCook);

  var heatup = setInterval(function()
  {
      dangerLvl++;
      clicksNeeded=5;
      updateSmoke(dangerLvl);

  }, deltaChange);

  var frame = setInterval(function()
  {
    if (timeSpent>gameDur) endGame("WIN");
    timeSpent+=1000/30;
  }, deltaT);

    cuisine.cvs.onclick = function()
{
    clicksNeeded--;
    if (clicksNeeded<=0) 
    {
    dangerLvl--;
    clicksNeeded=5;
    updateSmoke(dangerLvl);
    }
    
    if (left)
    {
    drawRect("blue",boxCook);
    left=false;
    }
    else {
    drawRect("red",boxCook);
    left=true;
    }   
}

function drawRect(color,box)
{
    ctx.fillStyle = color;
    ctx.fillRect(box.x,box.y,box.w,box.h);
}

function updateSmoke(lvl)
{
    if (lvl==4) ctx.drawImage(sprite.smoke5,boxSmoke.x,boxSmoke.y);
    else if (lvl==3) ctx.drawImage(sprite.smoke4,boxSmoke.x,boxSmoke.y);
    else if (lvl==1) ctx.drawImage(sprite.smoke2,boxSmoke.x,boxSmoke.y);
    else if (lvl==2) ctx.drawImage(sprite.smoke3,boxSmoke.x,boxSmoke.y);
    else if (lvl==0) ctx.drawImage(sprite.smoke1,boxSmoke.x,boxSmoke.y);
    else if (lvl==5) endGame("DEFEAT");
    else drawRect("green",boxSmoke);
}

function endGame(end)
{
    console.log(end + " CUISINE");
    clearInterval(heatup);
    clearInterval(frame);
    cuisine.cvs.onclick = null;
    ctx.clearRect(0,0,cw,ch);
    cuisine.playing = false;
}

}


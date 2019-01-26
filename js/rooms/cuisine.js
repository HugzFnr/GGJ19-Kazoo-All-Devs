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

var box = {
    x : 80,
    y : 20,
    w : 200,
    h : 140,
} 

cuisine.begin = function ()
{
    console.log("cuisineBBB");
  var ctx = cuisine.cvs.getContext("2d");
  
  var dangerLvl = 0; //goes up to 5 = lose
  var clicksNeeded = 5;

  ctx.fillStyle = "blue";
  ctx.fillRect(box.x,box.y,box.w,box.h);

    cuisine.cvs.onclick = function()
{
    clicksNeeded--;
    console.log(clicksNeeded);
} 
}


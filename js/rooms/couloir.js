couloir = {};
rooms.couloir = couloir;


couloir.x = (100 + 200)*zoomRooms;
couloir.y = (80 + 150)*zoomRooms;

couloir.width = 600*zoomRooms;
couloir.height = 100*zoomRooms;

var refx = couloir.x;
var refy = couloir.y;
var cw = couloir.width;
var ch = couloir.height;

//Le canvas
couloir.cvs;

couloir.begin = function()
{
  var ctx = couloir.cvs.getContext("2d");

  var nbFails = 2;

  var boxP = {
    x : cw*(1/60),
    y : ch*(1/120),
    w : cw*(1/30),
    h : ch*(1/2),
}

var boxL = {
    x : cw*(19/20),
    y : ch*(1/6),
    w : cw*(1/30), 
    h : ch*(1/5), 
}

  var speed = 5;
  setInterval(function()
  {
    boxL.x-=speed;

    ctx.clearRect(0,0,cw,ch);  

    ctx.fillStyle= "green";
    ctx.fillRect(boxP.x,boxP.y,boxP.w,boxP.h);

    ctx.fillStyle = "red";
    ctx.fillRect(boxL.x,boxL.y,boxL.w,boxL.h);
  }, deltaT);


    


}

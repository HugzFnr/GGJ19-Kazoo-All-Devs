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
  var pos=0;

  var boxP = {
    x : cw*(1/60),
    y : ch*(1/120),
    w : cw*(1/30),
    h : ch*(1/2),
}

var tabL = [];
var deltaSpawn = 1000; //1000 is like a lil hard
var speed = 10;
var timeSpent=0;

setInterval(function()
{ //spawn of new legos
    var boxL = {
        x : cw*(19/20), //initial values for obstacles
        y : ch*(1/6) + rand(0,1)*60,
        w : cw*(1/30), 
        h : ch*(1/5), 
    }
    tabL.push({...boxL}); //deepcopy
    
}, deltaSpawn);

  setInterval(function()
  {
    ctx.clearRect(0,0,cw,ch);
    
    if (nbFails>0) { //displays parent
    ctx.fillStyle= "green";
    boxP.y=ch/120 + pos*55 //UP AND DOWN
    ctx.fillRect(boxP.x,boxP.y,boxP.w,boxP.h);
    }
    
    if (checkAllColli(tabL))
    {
        nbFails--;
    }  

    updateLegos(tabL);
    timeSpent+=1000/30;

  }, deltaT);

  shortcut.add("Down",function() {
    pos = 1;
},{
    'type':'keydown',
    'propagate':false,
    'target':document
});

shortcut.add("Up",function() {
    pos = 0;
},{
    'type':'keydown',
    'propagate':false,
    'target':document
});

function checkCollision(rect1,rect2)
{
	if ( (rect2.x >= rect1.x + rect1.w)
	|| (rect2.x + rect2.w <= rect1.x)
	|| (rect2.y >= rect1.y + rect1.h)
	|| (rect2.y + rect2.h <= rect1.y) )
	{
		return false;
	}
	else 
	{
		return true;
	}
}

function checkAllColli(tab)
{
    for(var iter=0;iter<tab.length;iter++) {
        if (tab[iter]!=null) {
        console.log(tab[iter].x);
        if (checkCollision(boxP,tab[iter])) {
            tab[iter] = null;
            return true;
        }
        else { return false; }
    }
}
}

function updateLegos(tab)
{
    console.log(tab.length);
    for(var iter=0;iter<tab.length;iter++)
    {
        if (tab[iter]!=null && tab[iter].x<=20) 
        {
            tab[iter]= null;
        }

        if (tab[iter]!=null) {
        tab[iter].x-=speed;
        ctx.fillStyle = "red";
        ctx.fillRect(tab[iter].x,tab[iter].y,tab[iter].w,tab[iter].h);
        }
        
    }
}

}

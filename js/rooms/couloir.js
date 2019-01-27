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
couloir.playing = false;

couloir.begin = function()
{
  var ctx = couloir.cvs.getContext("2d");
  couloir.playing=true;

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
var speed = 7;
var timeSpent=0;

var spawn = setInterval(function()
{ //spawn of new legos

    var boxL = {
        x : cw*(19/20), //initial values for obstacles
        y : ch*(1/6) + rand(0,1)*60,
        w : cw*(1/30), 
        h : ch*(1/5), 
    }
    tabL.push({...boxL}); //deepcopy
    
}, deltaSpawn);

  var frame = setInterval(function()
  {

    if (nbFails==0)
    {
        endGame("DEFEAT");
    }

    else if (timeSpent>gameDur)
    {
        endGame("WIN");       
    }

    else {
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
    }

  }, deltaT);

shortcut.add("Down",function() {
    if (couloir.playing) pos = 1;
},{
    'type':'keydown',
    'propagate':false,
    'target':document
});

shortcut.add("Up",function() {
    if ((couloir.playing) && (pos = 1)) pos = 0;
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
    for(var iter=0;iter<tab.length;iter++)
    {
        if (tab[iter]!=null && tab[iter].x<=20) 
        {
            tab[iter]= null;
        }

        if (tab[iter]!=null) {
        tab[iter].x-=speed;

        if (tab[iter].y>50) ctx.drawImage(sprite.LegoOrange, tab[iter].x,tab[iter].y);
        else ctx.drawImage(sprite.LegoRose, tab[iter].x,tab[iter].y)
        
        }
        
    }
}

function endGame(end)
{
    console.log(end + " COULOIR");
    clearInterval(frame);
    clearInterval(spawn);
    ctx.clearRect(0,0,couloir.cvs.width,couloir.cvs.height);
    couloir.playing=false;
}

}



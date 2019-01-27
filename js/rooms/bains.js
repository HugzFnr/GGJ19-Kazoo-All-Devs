bains = {};
rooms.bains = bains;

bains.x = (100 + 200)*zoomRooms;
bains.y = (80 + 0)*zoomRooms;

bains.width = 350*zoomRooms;
bains.height = 150*zoomRooms;

var frame = 0;
var delta = 1000/60; // 60 fps trop ouf
var robinet;

shortcut.add("A",function() 
    {
        robinet = 1;
    },{
        'type':'keydown',
        'propagate':false,
        'target':document
    });

shortcut.add("A",function() 
    {
        robinet = 0;
    },{
        'type':'keyup',
        'propagate':false,
        'target':document
    });


bains.begin = function()
{        
    var canvas = bains.cvs;
    var context = bains.context = canvas.getContext("2d");

    // Green rectangle
    context.beginPath();
    context.lineWidth = "4";
    context.strokeStyle = "black";
    context.rect(bains.width-60, 8, 50, 158);
    context.stroke();

    var remplissage = 0;
    setInterval( function()
    {
        //context.clearRect(0,0, canvas.width, canvas.height);
        frame++;
        //30*60 fps = 1800 frames
        //h=120 donc 1px toutes les 15 frames

        if(frame%15==0 && frame <=1800 && robinet == 1) remplissage ++;



        context.fillStyle = "blue";
        context.fillRect(bains.width-58, bains.height - 16 - remplissage, 46, remplissage);
        context.fillStyle = "black";




    },delta);
    
}


bains = {};
rooms.bains = bains;

bains.x = (100 + 200)*zoomRooms;
bains.y = (80 + 0)*zoomRooms;

bains.width = 350*zoomRooms;
bains.height = 150*zoomRooms;

bains.playing = false;
bains.timer;

bains.playing = false;

var frame = 0;
var delta = 1000/60; // 60 fps trop ouf
var robinet;

//remplissage ON / OFF
shortcut.add("F",function()
    {
        if(bains.playing)robinet = 1;
    },{
        'type':'keydown',
        'propagate':false,
        'target':document
    });

shortcut.add("F",function()
    {
        if(bains.playing)robinet = 0;
    },{
        'type':'keyup',
        'propagate':false,
        'target':document
    });


bains.begin = function()
{
    bains.playing = true;
    var canvas = bains.cvs;
    var context = bains.context = canvas.getContext("2d");

    //jauge
    context.beginPath();
    context.lineWidth = "4";
    context.strokeStyle = "black";
    context.rect(bains.width-60, 8, 50, 158);
    context.stroke();

    //baignoire
    context.beginPath();
    context.lineWidth = "4";
    context.strokeStyle = "black";
    context.rect(50, 50, 200, 100);
    context.stroke();

    var remplissage = 0;
    var jauge = 0;
    bains.timer = setInterval( function()
    {
        //context.clearRect(0,0, canvas.width, canvas.height);
        frame++;
        //30*60 fps = 1800 frames
        //h=120 donc 1px toutes les 15 frames

        if(frame%15==0 && frame <=1800 && robinet == 1) remplissage+=5;

        if(remplissage <= 159) jauge = remplissage;


        context.fillStyle = "blue";
        context.fillRect(bains.width-58, bains.height - 16 - jauge, 46, jauge);
        context.fillStyle = "black";

        if(remplissage <= 50 && remplissage >= 25)
        {
            context.fillStyle = "lightblue";
            context.fillRect(120, 100, 40, 20);
            context.fillStyle = "black";
        }
        else if (remplissage <= 140 && remplissage > 50)
        {
            context.fillStyle = "lightblue";
            context.fillRect(120, 80, 80, 40);
            context.fillStyle = "black";
        }
        else if (remplissage > 140 && remplissage <= 160)
        {
            context.fillStyle = "lightblue";
            context.fillRect(54, 54, 192, 92);
            context.fillStyle = "black";
            if(robinet == 0) bains.end();
        }
        else if (remplissage > 160)
        {
            context.fillStyle = "lightblue";
            context.fillRect(20, 20, 300, 150);
            context.fillStyle = "black";
            bains.end();
        }
        else {}

        if(frame >= 1800)
        {
            bains.end();
        }

        if(!bains.playing) bains.context.clearRect(0,0,bains.cvs.width,bains.cvs.height);

    },delta);

}

bains.end = function(){
    clearInterval(bains.timer);

    bains.playing = false;
    bains.context.clearRect(0,0,bains.cvs.width,bains.cvs.height);

    bains.playing = false
}

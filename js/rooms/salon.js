salon = {};
rooms.salon = salon;





salon.x = (100 + 0)*zoomRooms;
salon.y = (80 + 0)*zoomRooms;



salon.width = 200*zoomRooms;
salon.height = 400*zoomRooms;



salon.begin = function()
{
    var direction = 0;

    var x = 0;
    var y = 0;
    var largeur = 50;
    var hauteur = 50;

    var largeur2 = 40;
    var hauteur2 = 50;
    var x2 = (salon.width - largeur2) /2;
    var y2 = salon.height - hauteur2;


    shortcut.add("Left",function() 
    {
        direction = -1;
    },{
        'type':'keydown',
        'propagate':false,
        'target':document
    });

    shortcut.add("Left",function() {
        direction = 0;
    },{
        'type':'keyup',
        'propagate':false,
        'target':document
    });

    shortcut.add("Right",function() {
        direction = 1;
    },{
        'type':'keydown',
        'propagate':false,
        'target':document
    });

    shortcut.add("Right",function() {
        direction = 0;
    },{
        'type':'keyup',
        'propagate':false,
        'target':document
    });


    var canvas = salon.cvs;

    var context = canvas.getContext("2d");
    
    
    

    context.fillRect(x, y, largeur, hauteur);

   //ctx.clearRect(20, 20, 100, 50);

   var delta = 1000/60; // 60 fps trop ouf
   var frame = 0;


   setInterval(function()
{
    context.clearRect(0,0, canvas.width, canvas.height);
    frame++;
    
    if (x < x2 + largeur2 &&
        x + largeur > x2 &&
        y < y2 + hauteur2 &&
        y + hauteur > y2)
        {
            context.fillRect(x2, y2, largeur2, hauteur2);
        }
    else
    {
        y++;
        if(direction == -1 && x2 != 0)
        {
            x2 += direction*2;
        }

        if(direction == 1 && x2 != salon.width - largeur2)
        {
            x2 += direction*2;
        }
        
        context.fillRect(x, y, largeur, hauteur);
        context.fillRect(x2, y2, largeur2, hauteur2);
    }
        
}, delta);
}

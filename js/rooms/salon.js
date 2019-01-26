salon = {};
rooms.salon = salon;


salon.x = (100 + 0)*zoomRooms;
salon.y = (80 + 0)*zoomRooms;


salon.width = 200*zoomRooms;
salon.height = 400*zoomRooms;



salon.begin = function()
{
    var direction = 0;

    //dimensions des vases
    var x = 0;
    var y = 0;
    var largeur = 50;
    var hauteur = 50;

    //tableau des  vases
    var tableau = [];

    for(i = 0; i<15 ; i++)
    {
        var vase = {};
        vase.x = rand(0,salon.width-largeur);
        vase.y = 0;
        vase.gravite = 0;
        tableau.push(vase);
    }

    //position parent
    var largeur2 = 40;
    var hauteur2 = 100;
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

    for(j=0;j<15;j++)
    {
        if(frame == j*100)
        {
            tableau[j].gravite = 1;
        }

        //détection de collision
        if (tableau[j].x < x2 + largeur2 &&
            tableau[j].x + largeur > x2 &&
            tableau[j].y < y2 + hauteur2 &&
            tableau[j].y + hauteur > y2 &&
            tableau[j].gravite == 1)
            {
                //tableau[j] = null; VOIR AVEC YOUNES
                tableau[j].x = -largeur;
                tableau[j].y = salon.height;
                tableau[j].gravite = 0;
            }            
        else
        if (tableau[j].gravite == 1)
        {
            tableau[j].y+=3;
            context.fillRect(tableau[j].x, tableau[j].y, largeur, hauteur);
        }

        if(tableau[j].y >= salon.height - hauteur)
        {
            tableau[j].gravite = 0;
            context.fillStyle = "red";
            context.fillRect(tableau[j].x, tableau[j].y, largeur, hauteur);
            context.fillStyle = "black";
        }  
    }
    

    if(direction == -1 && x2 != 0)
    {
        x2 += direction*2;
    }

    if(direction == 1 && x2 != salon.width - largeur2)
    {
        x2 += direction*2;
    }

    context.fillRect(x2, y2, largeur2, hauteur2);
    
        
}, delta);
}

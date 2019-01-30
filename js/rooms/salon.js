salon = {};
rooms.salon = salon;

salon.init = function()
{
  rooms.salon.theme = sound.musicSalon;
  rooms.salon.alerte = sound.EventSalon;

}

salon.x = (100 + 0)*zoomRooms;
salon.y = (80 + 0)*zoomRooms;


salon.width = 200*zoomRooms;
salon.height = 400*zoomRooms;

salon.timer;
salon.playing = false;

salon.begin = function()
{
    salon.playing = true;
    var direction = 0;

    //position Kevin
    var vk = 1;
    var xk = 0;
    var yk = 0;
    var lk = sprite.KevinLacheVase.width/8;
    var hk = sprite.KevinLacheVase.height/8;

    //vases
    var x = 0;
    var y = 0;
    var largeurVase = sprite.Vase.width/3;
    var hauteurVase = sprite.Vase.height/3;

    //tableau des  vases
    var tableau = [];

    for(i = 0; i<15 ; i++)
    {
        var vase = {};
        vase.x = rand(0,salon.width-largeurVase);
        vase.y = - hauteurVase;
        vase.gravite = 0;
        tableau.push(vase);
    }

    //position parent
    var largeurParent = sprite.AdulteCourseDCouleur.width/5;
    var hauteurParent = sprite.AdulteCourseDCouleur.height/5;
    var x2 = (salon.width - largeurParent) /2;
    var y2 = salon.height - hauteurParent - 4;


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

    var context = salon.context =  canvas.getContext("2d");

    //context.fillRect(x, y, largeurVase, hauteurVase);
    context.drawImage(sprite.Vase, x, y, largeurVase, hauteurVase);


   //ctx.clearRect(20, 20, 100, 50);

   var delta = 1000/60; // 60 fps trop ouf
   var frame = 0;
   var vasesCasses = 0;

   salon.timer = setInterval(function()
    {
        context.clearRect(0,0, canvas.width, canvas.height);
        frame++;
        
        //affichage fleches UI
        if(frame%20<=10){
            context.drawImage(sprite.left1, 10 , salon.height/2, sprite.left1.width, sprite.left1.height);
            context.drawImage(sprite.right1, salon.width - sprite.right1.width -10, salon.height/2, sprite.right1.width, sprite.right1.height);

        }
        else{
            context.drawImage(sprite.left2, 10 , salon.height/2, sprite.left2.width, sprite.left2.height);
            context.drawImage(sprite.right2, salon.width - sprite.right2.width - 10, salon.height/2, sprite.right2.width, sprite.right2.height);

        }

        //déplacements de kevin
        if(xk + lk >= salon.width && vk >= 0) vk = -vk;
        if(xk <= 0 && vk <= 0) vk = -vk;

        xk+=vk;

        if(frame%100 <= 50) context.drawImage(sprite.KevinLacheVase, xk , yk, lk, hk)
        else context.drawImage(sprite.KevinTientVase, xk , yk, lk, hk);

        //déplacements parent
        if(direction == -1 && x2 >= 0)
        {
            x2 += direction*2;
        }

        if(direction == 1 && x2 <= salon.width - largeurParent)
        {
            x2 += direction*2;
        }



        for(j=0;j<15;j++)
        {
            if(frame == j*100)
            {
                tableau[j].gravite = 2;
            }

            //détection de collision
            if (tableau[j].x < x2 + largeurParent &&
                tableau[j].x + largeurVase > x2 &&
                tableau[j].y < y2 + hauteurParent &&
                tableau[j].y + hauteurVase > y2 &&
                tableau[j].gravite == 2)
                {
                    //tableau[j] = null; VOIR AVEC YOUNES
                    tableau[j].x = -largeurVase;
                    tableau[j].y = salon.height;
                    tableau[j].gravite = 0;

                    if(j==14)
                    {
                        salon.end();
                        manager.wingame();
                    } 
                }
            else
            if (tableau[j].gravite == 2)
            {
                tableau[j].y+=3;
                //context.fillRect(tableau[j].x, tableau[j].y, largeurVase, hauteurVase);
                context.drawImage(sprite.Vase, tableau[j].x , tableau[j].y, largeurVase, hauteurVase);
            }

            if(tableau[j].y >= salon.height - hauteurVase && tableau[j].gravite == 2)
            {
                vasesCasses++;
            }

            if(tableau[j].y >= salon.height - hauteurVase)
            {
                tableau[j].gravite = 0;

                context.drawImage(sprite.VasePete, tableau[j].x , tableau[j].y, sprite.VasePete.width/3, sprite.VasePete.height/3);


                if(j==14 || vasesCasses == 2)
                {
                    salon.end();
                    manager.loosegame();
                } 
            }

            //affichage parent
            //context.fillRect(x2, y2, largeurParent, hauteurParent);
            if(frame%30 <= 15 && direction != 0)
            {
                context.drawImage(sprite.AdulteCourseDCouleur, x2 ,y2, largeurParent, hauteurParent);
            }
            else if(frame%30 > 15 && direction != 0)
            {
                context.drawImage(sprite.AdulteCourseGCouleur, x2 ,y2, largeurParent, hauteurParent);
            }
            else
            {
                context.drawImage(sprite.AdulteBrasLeveCouleur, x2 ,y2, largeurParent, hauteurParent);
            }



            if(!salon.playing) salon.context.clearRect(0,0,salon.cvs.width,salon.cvs.height);
        }



    }, delta);
    }

salon.end = function(){

    clearInterval(salon.timer);

    salon.context.clearRect(0,0,salon.cvs.width,salon.cvs.height);

    salon.playing = false;

    salon.theme.pause();

}

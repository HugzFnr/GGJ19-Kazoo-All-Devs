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


bains.init = function()
{
  rooms.bains.theme = sound.musicBain;
rooms.bains.alerte = sound.EventBain;
}


bains.begin = function()
{

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
          sound.BruitBaignoire.pause();
      },{
          'type':'keyup',
          'propagate':false,
          'target':document
      });


    bains.playing = true;
    var canvas = bains.cvs;
    var context = bains.context = canvas.getContext("2d");

    

    //baignoire
    /*context.beginPath();
    context.lineWidth = "4";
    context.strokeStyle = "black";
    context.rect(50, 50, 200, 100);
    context.stroke();*/

    var remplissage = 0;
    var jauge = 0;
    bains.timer = setInterval( function()
    {
        
        frame++;
        context.clearRect(0,0, bains.width, bains.height);

        //jauge
        context.beginPath();
        context.lineWidth = "4";
        context.strokeStyle = "black";
        context.rect(bains.width-60, 8, 50, 158);
        context.stroke();


        if(frame%15==0 && frame <=1800 && robinet == 1)
        {
            remplissage+=4;
            sound.BruitBaignoire.play();
        } 

        if(remplissage <= 159) jauge = remplissage;

        //remplir jauge
        context.fillStyle = "blue";
        context.fillRect(bains.width-58, bains.height - 16 - jauge, 46, jauge);
        context.fillStyle = "black";

        var ctx = context;

        if(remplissage <= 25)
            ctx.drawImage(sprite.Bainouare, 60, 40 , sprite.Bainouare.width/2,sprite.Bainouare.height/2);
        
        else
        if(remplissage <= 50 && remplissage >= 25)
            ctx.drawImage(sprite.Bainouare1, 60, 40 , sprite.Bainouare1.width/2,sprite.Bainouare.height/2);

        
        else if (remplissage <= 140 && remplissage > 50)

            ctx.drawImage(sprite.Bainouare2, 60, 40 , sprite.Bainouare2.width/2,sprite.Bainouare.height/2);
        
        else if (remplissage > 140 && remplissage <= 160)
        {       
            ctx.drawImage(sprite.Bainouare3, 60, 40 , sprite.Bainouare3.width/2,sprite.Bainouare.height/2);
            bains.end(true);
        }

        else if (remplissage > 160)
        {
            ctx.drawImage(sprite.Bainouare4, 60, 40 , sprite.Bainouare4.width/2,sprite.Bainouare.height/2);
            bains.end(false);

        }    

        if(frame >= 1800)
        {
            
            if(remplissage < 140 || remplissage >160)
            {
                bains.end(false);
            }                
            else 
            {
                bains.end(true);
            }
        }

        if(!bains.playing) bains.context.clearRect(0,0,bains.cvs.width,bains.cvs.height);

    },delta);

}

bains.end = function(win){
    clearInterval(bains.timer);

    bains.playing = false;

    bains.theme.pause();
    bains.playing = false
    
    if (win) manager.wingame("bains");
    else manager.loosegame("bains");
}

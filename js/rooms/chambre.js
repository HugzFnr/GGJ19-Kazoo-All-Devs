chambre = {};
rooms.chambre = chambre;
chambre.init = function()
{
rooms.chambre.theme   =  sound.musicChambre;
rooms.chambre.alerte  =  sound.BruitHelp;
}
chambre.x = (100 + 500)*zoomRooms;
chambre.y = (80 + 250)*zoomRooms;

chambre.width = 300*zoomRooms;
chambre.height = 150*zoomRooms;

chambre.shortcut;
chambre.playing = false;
chambre.life;
chambre.timer;
chambre.answered = false;

var canvas = chambre.cvs;

chambre.begin = function()
{
    chambre.playing = true;

    

    chambre.life = 2;
    chambre.shortcut = shortcut.add("Space",function()
    {
        if(chambre.playing && chambre.answered == false)
        {
            clearTimeout(chambre.timer);
            yell();
            if(C == A*B) //Valide
            {
              error();
            }
            else
            {
              valid();
            }
        }
  });

  var delta = 1000/60; // 60 fps trop ouf
  var frame = 0;
  chambre.loop = setInterval(function()
  {
    frame ++;
    //affiche kevin
    var ctx = chambre.ctx;
    ctx.clearRect(0,90, sprite.KevinChambre1.width/6 + 20, sprite.KevinChambre2.height/6);


    if(frame%100 <= 50 && chambre.playing)
    {
      ctx.drawImage(sprite.KevinChambre1, 
        10, 
        100, 
        sprite.KevinChambre1.width/6, 
        sprite.KevinChambre1.height/6);
        ctx.drawImage(sprite.space1,100,130);
      }
    
    else if(frame%100 >= 50 && chambre.playing)
    {
      ctx.drawImage(sprite.KevinChambre2, 
        0, 
        100, 
        sprite.KevinChambre2.width/6, 
        sprite.KevinChambre2.height/6);
        ctx.drawImage(sprite.space2,100,130);
      }
    

    //rooms.chambre.begin()
    
  },delta);

    chambre.timerMax = setTimeout(function()
  {
      if(chambre.playing) // Limite de temps dépassée
      {
          chambre.end(true);
      }
  },gameDur)


    ctx = chambre.ctx = chambre.cvs.getContext("2d");
    ctx.textBaseline = "top";
    ctx.font = '48px serif';

    var A = 0;
    var B = 0;
    var C = 0;
    var bigDelta = 3000;
    var lilDelta = 1500;
    genQuestion();



    function genQuestion()
    {
      chambre.answered = false
      ctx.clearRect(0,0,chambre.cvs.width,chambre.cvs.height);


      A = rand(0,9);
      B = rand(0,9);

      if(rand(0,1) == 0) // Fausse réponse
      {
        C = A*B + rand(1,Math.min(A*B,12))*(-1+2*rand(0,1))
      }
      else
      {
          C = A*B;
      }

      write(A+" x "+B+" = "+C);

      //Timer attente entre question
      chambre.timer = setTimeout(function()
      {

        if(C == A*B)
        {
            valid();
        }
        else
        {
            error();

        }
        //genQuestion();
      },bigDelta);
    }

    function write(str)
    {
      var ctx = chambre.ctx;

      ctx.drawImage(sprite.bullePenseeKevin, 50 , 5, 300, 80);

      ctx.strokeStyle = "black";
      ctx.strokeText(str,120,22);
    }

    function yell()
    {
      var ctx = chambre.ctx;

      ctx.drawImage(sprite.bullePenseeParent, 
        /*chambre.width - sprite.bullePenseeParent.width/4*/ 200, 
        /*chambre.height - sprite.bullePenseeParent.height/4*/80, 
        /*sprite.bullePenseeParent.width/4*/150, 
        /*sprite.bullePenseeParent.height/4*/90)

      ctx.strokeStyle = "black";
      ctx.strokeText("NO !",220,100);
    }

    function error()
    {
      chambre.answered = true;

      ctx.drawImage(sprite.bullePenseeParent, 
        /*chambre.width - sprite.bullePenseeParent.width/4*/ 200, 
        /*chambre.height - sprite.bullePenseeParent.height/4*/80, 
        /*sprite.bullePenseeParent.width/4*/150, 
        /*sprite.bullePenseeParent.height/4*/90);

      ctx.strokeStyle = "red";
      ctx.strokeText("X",250,100);

      chambre.life--;


      if(chambre.life <= 0)
      {
          setTimeout(function()
          {
            chambre.end(false)
          }
        ,lilDelta);
      }
      else {

        chambre.timer2 = setTimeout(genQuestion,lilDelta);
      }


    }

    function valid()
    {
      chambre.answered = true;

      ctx.drawImage(sprite.bullePenseeParent, 
        /*chambre.width - sprite.bullePenseeParent.width/4*/ 200, 
        /*chambre.height - sprite.bullePenseeParent.height/4*/80, 
        /*sprite.bullePenseeParent.width/4*/150, 
        /*sprite.bullePenseeParent.height/4*/90);

      ctx.strokeStyle = "green";
      ctx.strokeText("V",250,100);
      chambre.timer3 = setTimeout(genQuestion,lilDelta)
    }


}


chambre.end = function(win)
{
  clearTimeout(chambre.timer);
  clearTimeout(chambre.timerMax);
  clearTimeout(chambre.timer2);
  clearTimeout(chambre.timer3);

  clearInterval(chambre.loop);
  chambre.theme.pause();
  chambre.playing = false;

  ctx.clearRect(0,0,chambre.cvs.width,chambre.cvs.height);

  if (win==true) 
  {
    manager.wingame("chambre");
  }
  else 
  {  
    manager.loosegame("chambre");
  }

}

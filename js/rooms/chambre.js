chambre = {};
rooms.chambre = chambre;


chambre.x = (100 + 500)*zoomRooms;
chambre.y = (80 + 250)*zoomRooms;

chambre.width = 300*zoomRooms;
chambre.height = 150*zoomRooms;

chambre.shortcut;
chambre.playing = false;
chambre.life;
chambre.timer;
chambre.answered = false;

chambre.begin = function()
{
    chambre.playing = true;

    chambre.life = 3;
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

      if(rand(0,2) == 0) // Fausse réponse
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

      ctx.drawImage(sprite.bullePenseeKevin, 20 , 20, 200, 80);

      ctx.strokeStyle = "black";
      ctx.strokeText(str,10,10);
    }

    function yell()
    {
      var ctx = chambre.ctx;
      ctx.strokeStyle = "black";
      ctx.strokeText("NO !",120,70);
    }

    function error()
    {
      chambre.answered = true;
      ctx.strokeStyle = "red";
      ctx.strokeText("X",120,120);

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

        setTimeout(genQuestion,lilDelta);
      }


    }

    function valid()
    {
      chambre.answered = true;
      ctx.strokeStyle = "green";
      ctx.strokeText("V",120,120);
      setTimeout(genQuestion,lilDelta)
    }


}


chambre.end = function(win)
{
  ctx.clearRect(0,0,chambre.cvs.width,chambre.cvs.height);
  chambre.playing = false;
  clearTimeout(chambre.timer);
  clearTimeout(chambre.timerMax);
}

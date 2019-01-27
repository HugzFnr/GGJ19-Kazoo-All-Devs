chambre = {};
rooms.chambre = chambre;


chambre.x = (100 + 500)*zoomRooms;
chambre.y = (80 + 250)*zoomRooms;

chambre.width = 300*zoomRooms;
chambre.height = 150*zoomRooms;


chambre.begin = function()
{
    shortcut.add("Space",function()
    {
      yell();
      if(C == A*B) //Valide
      {
        error();
      }
      else
      {
        valid();
      }

      clearTimeout(timer);

    });


    ctx = chambre.ctx = chambre.cvs.getContext("2d");
    ctx.textBaseline = "top";
    ctx.font = '48px serif';

    var A = 0;
    var B = 0;
    var C = 0;
    var timer;
    var delta = 6000;
    genQuestion();

    function genQuestion()
    {
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
      timer = setTimeout(function()
      {
        genQuestion();
      },delta)
    }

    function write(str)
    {
      var ctx = chambre.ctx;
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
      //...
      ctx.strokeStyle = "red";
      ctx.strokeText("X",120,120);

      //GAMEOVER ou pas

    }

    function valid()
    {
      ctx.strokeStyle = "green";
      ctx.strokeText("V",120,120);
      setTimeout(genQuestion,1500)
    }


}

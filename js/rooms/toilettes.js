toilettes = {};
rooms.toilettes = toilettes;


toilettes.x = (100 + 550)*zoomRooms;
toilettes.y = (80 + 0)*zoomRooms;

toilettes.width = 250*zoomRooms;
toilettes.height = 150*zoomRooms;
toilettes.playing = false;
toilettes.timerMax;
toilettes.timer;
toilettes.life;
toilettes.letters = "CHIT";
toilettes.answered;


toilettes.begin = function()
{
  toilettes.playing = true;
  toilettes.life = 3;

  var cvs = toilettes.cvs;
  var ctx = cvs.getContext("2d");

  var KEY;
  var PRESS;
  var switchDelta = 1500;
  var waitingDelta = 2000;

  ctx.textBaseline = "top";
  ctx.font = '36px serif';


  for(var i in toilettes.letters)
  {

    //JAVASCRIPT MAGIC ??????
    var f = function(f,key)
    {
        press(f.key)
    }

    f.key = toilettes.letters[i];

    shortcut.add(toilettes.letters[i],f)

  }

    generate();


    toilettes.timerMax = setTimeout(function()
    {
      toilettes.end(true);

    }, gameDur)




  function generate()
  {

      do {
            NEW = toilettes.letters[rand(0,toilettes.letters.length-1)];
      } while (NEW == KEY);
      KEY = NEW;
      PRESS = rand(0,3) > 0;

      toilettes.answered = false;
      write(( PRESS ? "" : "DON'T " )+ "PRESS "+KEY)

      //LAISSÉ PASSÉ
      toilettes.timer = setTimeout(function()
      {
          if(toilettes.answered == false)
          {
              if(PRESS)
              {
                error();
              }
              else {
                  valid();
              }

          }

      }, waitingDelta)



  }


  function press(letter)
  {
    letter= letter.toUpperCase();
    if(toilettes.playing && toilettes.answered == false)
    {
        if(letter == KEY)
        {
          toilettes.answered = true;

          if(PRESS)
          {
            valid();
          }
          else {

            error();
          }

        }
    }
  }
  function write(str)
  {
    var ctx = toilettes.ctx;
    ctx.clearRect(0,0,cvs.width,cvs.height)
    ctx.strokeStyle = "black";
    ctx.strokeText(str,10,10);
  }


  function error()
  {
    toilettes.answered = true;
    ctx.strokeStyle = "red";
    ctx.strokeText("X",120,120);

    toilettes.life--;


    if(toilettes.life <= 0)
    {
        setTimeout(function()
        {
          toilettes.end(false)
        }
      ,switchDelta);
    }
    else {

      setTimeout(generate,switchDelta);
    }

    function valid()
    {
      toilettes.answered = true;
      ctx.strokeStyle = "green";
      ctx.strokeText("V",120,120);
      setTimeout(generate,switchDelta)
    }


  }

  function valid()
  {
    toilettes.answered = true;
    ctx.strokeStyle = "green";
    ctx.strokeText("V",120,120);
    //setTimeout(generate,lilDelta)
  }


}

toilettes.end = function(win)
{

  toilettes.ctx.clearRect(0,0,toilettes.cvs.width,toilettes.cvs.height),
  toilettes.playing = false;

}

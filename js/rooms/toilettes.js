toilettes = {};
rooms.toilettes = toilettes;


toilettes.init = function () {
rooms.toilettes.theme   =  sound.musicToilettes;
rooms.toilettes.alerte  =  sound.EventToilet;
}

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

  var PRESS;
  var switchDelta = 1500;
  var waitingDelta = 2000;

  ctx.textBaseline = "top";
  ctx.font = '20px Serif';


  for(var i in toilettes.letters)
  {

    //JAVASCRIPT MAGIC ??????
    var f = function(f,key)
    {
        press(f.key)
    }

    f.key = toilettes.letters[i];

    shortcut.add(toilettes.letters[i],f)

    
  var delta = 1000/60; // 60 fps trop ouf
  var frame = 0;
  toilettes.timer = setInterval(function()
  {
    frame ++;
    //affiche kevin
    var ctx = toilettes.ctx;
    ctx.clearRect(160,0, sprite.ChiottesVentousePlonge.width, sprite.ChiottesVentousePlonge.height);
    ctx.clearRect(20,120, 80, 80);



    if(frame%200 <= 100 && toilettes.playing)
      ctx.drawImage(sprite.ChiottesVentouseHaute, 
        160, 
        12, 
        sprite.ChiottesVentouseHaute.width/2, 
        sprite.ChiottesVentouseHaute.height/2);
    
    else
    if(frame%200 >= 100 && toilettes.playing)
      ctx.drawImage(sprite.ChiottesVentousePlonge, 
        160, 
        0, 
        sprite.ChiottesVentousePlonge.width/2, 
        sprite.ChiottesVentousePlonge.height/2);
    
    if(frame%60 <= 30)
    {
      ctx.drawImage(sprite[toilettes.KEY+"1"], 
        20, 
        120, 
        sprite[toilettes.KEY+"1"].width, 
        sprite[toilettes.KEY+"1"].height);
      
    }
    else{
      ctx.drawImage(sprite[toilettes.KEY+"2"], 
        20, 
        120, 
        sprite[toilettes.KEY+"2"].width, 
        sprite[toilettes.KEY+"2"].height);
    }

    //rooms.chambre.begin()
    
  },delta);

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
      } while (NEW == toilettes.KEY);
      toilettes.KEY = NEW;
      PRESS = rand(0,3) > 0;

      toilettes.answered = false;
      ctx.font = '24px Serif';
      write(( PRESS ? "" : "DON'T " )+ "PRESS "+toilettes.KEY)

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
        if(letter == toilettes.KEY)
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
    ctx.fillStyle = "white";
    ctx.fillText(str,10,10);
  }


  function error()
  {
    toilettes.answered = true;
    ctx.fillStyle = "red";
    ctx.font = '40px Serif';
    ctx.fillText("X",80,80);

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



  }

  function valid()
  {
    toilettes.answered = true;
    ctx.fillStyle = "green";
    ctx.font = '40px Serif';
    ctx.fillText("V",80,80);

    setTimeout(generate,switchDelta)

  }

}

toilettes.end = function(win)
{

  toilettes.ctx.clearRect(0,0,toilettes.cvs.width,toilettes.cvs.height),
  toilettes.playing = false;
  toilettes.theme.pause();
}

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

toilettes.begin = function()
{
  toilettes.playing = true;
  letters = "GHJK";

  for(var i in letters)
  {

    //JAVASCRIPT MAGIC ??????
    var f = function(f,key)
    {
        press(f.key)
    }

    f.key = letters[i];

    shortcut.add(letters[i],f)


    toilettes.timerMax = setTimeout(function()
    {
      //Finir le jeu

    }, gameDur)

  }




  function press(letter)
  {
    letter= letter.toUpperCase();

  }


}

toilettes.end = function()
{
  toilettes.playing = false;

}

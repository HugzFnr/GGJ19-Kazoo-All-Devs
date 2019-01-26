toilettes = {};
rooms.toilettes = toilettes;


toilettes.x = (100 + 550)*zoomRooms;
toilettes.y = (80 + 0)*zoomRooms;

toilettes.width = 250*zoomRooms;
toilettes.height = 150*zoomRooms;
toilettes.playing = false;


toilettes.begin = function()
{
  toilettes.playing = true;
  letters = "GHJKL";

  for(var i in letters)
  {

    //JAVASCRIPT MAGIC ??????
    var f = function(f,key)
    {
        alert(f.key)
    }

    f.key = letters[i];


    shortcut.add(letters[i],f)

  }


}

toilettes.end = function()
{
  toilettes.playing = false;

}

var rooms = {};
var manager = {};
//to do : gérer le score, le temps, les events, les events perdus, les events rates,


var entropy = 25; // game ends when it reaches 100
var score = 0; //PROPOSITION : le score prend +10*minutesSurvécues par seconde et +400*(jeuxactifsenmêmetemps) à chaque mini jeu réussi
var deltaCycle = 20000; //PROPOSITION : l'intervalle entre deux spawns d'event est de 20s et accélère progressivement
var cycles = 0; //game's length

//NOUS FAUT UN ECRAN DE FIN = VICTOIRE PCK YA PAS DE DEFAITE EN FAIT


manager.boredTimer;
manager.boredInterval = 10000;
manager.waitingTime = 7000;

manager.themeTimer;
manager.timers = [];
manager.themes =
{


}

manager.start = function()
{


  manager.newCycle();
  manager.boredTimer = setInterval(manager.checkBored, manager.boredInterval)

  sound.musicNOEVENT.loop = true;
  sound.musicNOEVENT.volume = 0.4;
  sound.musicNOEVENT.replay();
  manager.themeTimer = setInterval(function()
  {
    for(i in rooms)
    {
      var room = rooms[i];

      if(room.playing && room.theme.paused)
      {
        room.theme.replay();
      }

    }

  },7000)

}


manager.newCycle = function()
{
  cycles++;

  manager.playRandGame();

  setTimeout(manager.newCycle,deltaCycle);

}

manager.checkBored = function()
{
  var state = manager.getState();
  if(state.playing.length == 0)
  {
    manager.playRandGame();
  }

}


manager.getState = function()
{
  var playing = [];
  var paused = [];
  for(var i in rooms)
  {
    if(rooms[i].playing)
    {
      playing.push(i);
    }
    else {
    paused.push(i);
    }
  }

  return {playing:playing, paused:paused};


}


manager.alert = function(name)
{
    var room = rooms[name];

    room.alerte.replay();

    //AFFICHER ALERTE
    var alarme = sprite["kevinAlert"+name];
    room.ctx.drawImage(alarme,(room.width-alarme.width)/2,(room.height-alarme.height)/2);


    room.cvs.onclick = function()
    {
        var name = this.id;

        clearInterval(manager.timers[name]);

        room.alerte.pause();

        rooms[name].begin();
        //EFFACER ALERTE
          room.ctx.clearRect(0,0,room.width,room.height);
        room.cvs.onclick = null;
    }


    manager.timers[name] =
    setTimeout(function()
    {
        manager.missed(name);
    },manager.waitingTime);



}

manager.missed = function(name)
{
  var room = rooms[name];
  room.alerte.pause();

  room.ctx.clearRect(0,0,room.width,room.height);
  room.cvs.onclick = null;

  //EFFACER ALARME
}


manager.playRandGame = function()
{
  var state = manager.getState();
  if(state.paused.length > 0)
  {
    nextRoom = state.paused[rand(0,state.paused.length-1)];
    //rooms[nextRoom].begin();
    manager.alert(nextRoom);
  }
}

manager.wingame = function()
{
}

manager.loosegame = function()
{
}

manager.missgame = function()
{

}

manager.addEntropy = function(e)
{
  entropy += e;
  draw.entropy();
}

manager.addScore = function(s)
{
  score += s;
}

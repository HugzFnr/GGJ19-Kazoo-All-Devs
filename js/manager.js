var rooms = {};
var manager = {};
//to do : gérer le score, le temps, les events, les events perdus, les events rates,


var entropy = 0; // game ends when it reaches 100
var score = 0; //PROPOSITION : le score prend +10*minutesSurvécues par seconde et +400*(jeuxactifsenmêmetemps) à chaque mini jeu réussi
var deltaCycle = 20000; //PROPOSITION : l'intervalle entre deux spawns d'event est de 20s et accélère progressivement
var cycles = 0; //game's length

//NOUS FAUT UN ECRAN DE FIN = VICTOIRE PCK YA PAS DE DEFAITE EN FAIT


manager.start = function()
{


  manager.newCycle();

}


manager.newCycle = function()
{
  cycles++;
  setTimeout(manager.newCycle,deltaCycle);

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
    pause.push(i);
    }
  }

  return {playing:playing, paused:paused};


}


manager.wingame = function()
{


}

manager.loosegame = function()
{


}

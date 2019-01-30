var rooms = {};
var manager = {};
//to do : gérer le score, le temps, les events, les events perdus, les events rates,


var entropy = 0; // game ends when it reaches 100
var score = 0;
var deltaCycle = 21000;
var cycles = 0;

manager.boredTimer;
manager.boredInterval = 10000;
manager.waitingTime = 7000;
var bonusProba = 0;
var deltaBonus = 35000;
var gamelength = 0; //in seconds

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

  manager.countSeconds = setInterval(function()
  {
    gamelength ++;
    if (gamelength%7==0) { //every 7 seconds, bonus spawns get faster
      console.log(deltaBonus, "temps", gamelength);
      if (deltaBonus>1000) deltaBonus -= Acceleration;
      if (deltaBonus<1000) deltaBonus=1000;
      
       } 
      if ((gamelength*1000)%deltaBonus == 0) 
       {
         manager.playRandGame();     
    } 
    
  },1000);

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

manager.bonusCycle = function() //unused
{
  if (rand(0,Acceleration)<bonusProba) {
    console.log("bonus !")
    manager.playRandGame();
  }
  //starts at 0 out of Acceleration probability to spawn a bonus alert, reaching 100% chance
  // to spawn a bonus event every 7 seconds after 280s of game
 
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


        //EFFACER ALERTE
          room.ctx.clearRect(0,0,room.width,room.height);

              rooms[name].begin();

        if(name != "cuisine")
        {
        room.cvs.onclick = null;
      }
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
  room.cvs.style.backgroundColor = "";
  manager.addEntropy(increaseMissed);

}

manager.blink = function(name,win)
{
  var room = rooms[name];

  if (win) room.ctx.fillStyle = "lime";
  else room.ctx.fillStyle = "red";
  room.ctx.fillRect(0,0,room.width,room.height);
  setTimeout(function(){
    room.ctx.clearRect(0,0,room.width,room.height);
  },500);
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

manager.wingame = function(name)
{
  manager.addScore(400*(1+manager.getState().playing.length)); //score is multiplied by the numberof active games
  manager.blink(name,true);
  console.log("score :" + score);
}

manager.loosegame = function(name)
{

  manager.blink(name,false);
  manager.addEntropy(increaseFailed);
}

manager.missgame = function()
{

}

manager.addEntropy = function(e)
{
  entropy += e;
  draw.entropy();

	if(entropy >= 100)
	{
		endgame();
	}
	

}

manager.addScore = function(s)
{
  score += s;
}


function endgame()
{

  mutePage();
  
  sound.GameOverEntropie.play();
  setTimeout(function()
  {
    muteMe(sound.GameOverEntropie);
    sound.GameOverContinue.play();
  },6500);

  clearInterval(manager.countSeconds);
  
	end.style.display = "block";
	end.width = 1200;
	end.height = 600;
	map.style.display = "none";
	end.style.backgroundImage = "url("+sprite.KevinDabEcranFin.src+")";
	ctx = end.getContext("2d");
  ctx.fillStyle="fuchsia";
	ctx.font = '40px Calibri';
  ctx.fillText(score,385,102);
  ctx.fillStyle = "aqua";
  ctx.fillText(gamelength + " seconds",385,150);
  
}




function muteMe(elem) {
    elem.muted = true;
    elem.pause();
}

// Try to mute all video and audio elements on the page
function mutePage() {
    var videos = document.querySelectorAll("video"),
        audios = document.querySelectorAll("audio");

    [].forEach.call(videos, function(video) { muteMe(video); });
    [].forEach.call(audios, function(audio) { if ((audio != sound.GameOverEntropie) && (audio != sound.GameOverContinue)) muteMe(audio);});
}

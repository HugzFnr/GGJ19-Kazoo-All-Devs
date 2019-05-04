var audio = {},sound = {},songs={};

audio.list = ["BruitBaignoire","BruitHelp","BruitPleure","BruitVaseCasse","BruitVentouse","EventBain",
"EventCuisine","EventSalon","EventToilet","Gameover2","GameOverContinue","GameOverEntropie","GameOvereventdynam",
"musicBain","musicChambre","musicCouloir","musicCuisine","musicIntrokazoo","musicNOEVENT","musicNoEventKAZOO",
"musicSalon","musicToilettes","BruitDouleur"];
audio.songs = []; //Songs : Quand on en joue une nouvelle, on éteint l'ancienne
audio.init = function(callb)
{
	audio.load(audio.list,callb);
}

audio.load = function(arr,callb)
{
	for(var i = 0,loads=0;i<arr.length;i++)
	{
		var sfx = new Audio();
		sfx.addEventListener("canplaythrough",loaded,false);
		sfx.preload = "auto";
		ext = (~arr[i].indexOf(".")) ? "": ".mp3";
		sfx.src = "sound/"+arr[i]+ext;

		sfx.replay = function()
		{
			this.currentTime = 0;
			this.play();
		}


		sound[arr[i].split(".")[0]] = invisible.appendChild(sfx);
	}

	function loaded()
	{
		loads++;
		if(loads == arr.length)callb();
	}

	if(arr.length == 0)callb();

}


/*
songs.play = function(name)
{
	if(songs.last != "")
	{
		songs.stop(songs.last)
	}
	songs[name].currentTime = 0;
	songs[name].volume = 1;
	songs[name].play();
	songs.last = name;
}

songs.stop = function()
{
	last = songs[songs.last]
	if(!last)
	{
		return false
	}
	last.pause();
}
*/
/*
songs.fade = function(callb)
{

	if(!last)
	{
		callb();
		return false
	}

	var steps = 500,i=1;
	function step()
	{

		last.volume -= 1/steps;
		i++


		if(i>=steps)
		{
			last.volume = 0;
			if(callb)
			{
				callb();
			}
		}
		else
		{
			setTimeout(step,1);
		}
	}
	step();
}

songs.fadein = function(name,callb)
{
	var steps = 500,i=1;
	songs.play(name);
	last = songs[songs.last];
	last.volume = 0;
	function step()
	{

		last.volume += 1/steps;
		i++


		if(i>=steps)
		{
			last.volume = 1;
			if(callb)
			{
				callb();
			}
		}
		else
		{
			setTimeout(step,1);
		}
	}
	step();
}
*/

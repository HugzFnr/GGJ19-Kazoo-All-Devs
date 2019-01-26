function qs(s){return document.getElementById(s)};
function dc(s){return document.createElement(s)};
function rand(a,b){return Math.floor(Math.random()*(b-a+1))+a};
function shuffle(r){for(var a=r.length-1;a>0;a--){var f=Math.floor(Math.random()*(a+1)),n=r[a];r[a]=r[f],r[f]=n}return r};


var hidden = qs("invisible");






function init()
{

	initDraw = false;
	initAudio = false;


	draw.init(function()
	{
			initDraw = true;
			checkInit();
	})

	audio.init(function()
	{
			initAudio = true;
			checkInit();
	})

	function checkInit()
	{
		if(initAudio && initDraw)
		{

			draw.initRoom();

		//	alert("Chargé ! ");
		}
	}


}


init();

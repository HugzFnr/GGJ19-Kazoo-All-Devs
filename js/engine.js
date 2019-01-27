function qs(s){return document.getElementById(s)};
function dc(s){return document.createElement(s)};
function rand(a,b){return Math.floor(Math.random()*(b-a+1))+a};
function shuffle(r){for(var a=r.length-1;a>0;a--){var f=Math.floor(Math.random()*(a+1)),n=r[a];r[a]=r[f],r[f]=n}return r};


var hidden = qs("invisible");


function colliding(a,b)// Retourne si il y a une collision entre deux box
{// ATTENTION : les box doivent avoir des attributs x,y,w,h pas de width ni height !
	return (a.x < b.x + b.w && a.x + a.w > b.x &&a.y < b.y + b.h && a.h + a.y > b.y)
}

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


			manager.start();
		/*
			salon.begin();
			couloir.begin();
			chambre.begin();
			bains.begin();
			cuisine.begin();
			toilettes.begin();
			*/
			//alert("Chargé ! ");
		}
	}


}

init();

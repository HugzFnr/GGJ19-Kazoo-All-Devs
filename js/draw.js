var draw = {},sprite={};



draw.imgs = ["kevinAlertchambre","entropieVide","entropiePleine","interieur","AdulteBrasLeveCouleur", "AdulteCourseDCouleur","AdulteCourseGCouleur","KevinLacheVase",
"KevinTientVase","LegoOrange","LegoRose","Vase","VasePete","smoke1","smoke2","smoke3","smoke4","smoke5",
"DominiqueCavale11","DominiqueCavale22","DominiqueCavale33","DominiqueCavale44","bullePenseeKevin",
"bullePenseeParent","KevinChambre1","KevinChambre2","ChiottesVentouseHaute","ChiottesVentousePlonge","CookingRight","CookingLeft",
"kevinAlertcouloir","kevinAlertcuisine","kevinAlertbains","kevinAlertsalon","kevinAlerttoilettes",
"left1","left2","right1","right2","C1","C2","H1","H2","I1","I2","T1","T2",
"bainouare","bainouare1","bainouare2","bainouare3","bainouare4","up1","up2","down1","down2"];

draw.init = function(callb)
{
	draw.load(draw.imgs,callb);
}

draw.load = function(arr,callb)
{
	for(var i = 0,loads=0;i<arr.length;i++)
	{
		var img = dc("img");
		img.addEventListener("load",loaded,false);
		img.src = "sprites/"+arr[i]+".png"
		sprite[arr[i]] = hidden.appendChild(img);
	}

	function loaded()
	{
		loads++

		if(loads == arr.length)callb();
	}

	if(arr.length == 0)callb();

}


draw.initRoom = function()
{

	var wind = window.innerWidth;


	var maisonX = salon.x;
	var maisonY = salon.y;
	var maisonWidth 	= 960;
	var maisonHeight = 481;

	var barreX = 0;
	var barreY = 0;
	var barreWidth 	= sprite.entropieVide.width;
	var barreHeight = sprite.entropieVide.height;


		var map =qs("map");

//BARRE ENTROPIE
			var cvs = dc("canvas");
			cvs.width = barreWidth;
			cvs.height = barreHeight;

			cvs.id = "barre";
			cvs.style.position = 'absolute';
			cvs.style.left = (barreX+110)+'px';
			cvs.style.top = (barreY)+'px';
			cvs.style.padding = '0px';
			cvs.style.margin = '0px';
			cvs.style.backgroundImage = "url("+sprite.entropieVide.src+")";

			map.appendChild(cvs);


//MAISON
			var map =qs("map");

				var maisonX = salon.x;
				var maisonY = salon.y+60;
				var width 	= 960;
				var height = 481;
				var cvs = dc("canvas");
				cvs.width = maisonWidth;
				cvs.height = maisonHeight;

				cvs.id = "maison";
				cvs.style.position = 'absolute';
				cvs.style.left = maisonX+'px';
				cvs.style.top = maisonY+'px';
				cvs.style.padding = '0px';
				cvs.style.margin = '0px';
				cvs.style.backgroundImage = "url("+sprite.interieur.src+")";

				map.appendChild(cvs);


		for(var i in rooms)
		{
			var room = rooms[i];
			rooms[i].init();
			var cvs = dc("canvas");

			cvs.width = rooms[i].width;
			cvs.height = rooms[i].height;
			room.cvs = cvs;

			cvs.id = i;
			cvs.style.position = 'absolute';
			cvs.style.left = room.x+'px';
			cvs.style.top = (room.y+60)+'px';
			cvs.style.padding = '0px';
			cvs.style.margin = '0px';

		//	cvs.style.backgroundImage = "url("+sprite[i].src+")";

			room.ctx = cvs.getContext("2d");
			map.appendChild(cvs);


		}
}


draw.entropy = function()
{
	var ctx = qs("barre").getContext("2d");
	ctx.drawImage(sprite.entropiePleine,0, 0, sprite.entropiePleine.width*entropy/100, sprite.entropiePleine.height, 0, 0,sprite.entropiePleine.width*entropy/100, sprite.entropiePleine.height)
}

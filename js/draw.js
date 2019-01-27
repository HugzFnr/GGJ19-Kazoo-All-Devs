var draw = {},sprite={};



draw.imgs = ["interieur","AdulteBrasLeveCouleur", "AdulteCourseDCouleur","AdulteCourseGCouleur","KevinLacheVase",
"KevinTientVase","LegoOrange","LegoRose","Vase","VasePete","smoke1","smoke2","smoke3","smoke4","smoke5",
"DominiqueCavale11","DominiqueCavale22","DominiqueCavale33","DominiqueCavale44","bullePenseeKevin", "bullePenseeParent"];


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

		var map =qs("map");

			var maisonX = salon.x;
			var maisonY = salon.y;
			var width 	= 960;
			var height = 481;
			var cvs = dc("canvas");
			cvs.width = width;
			cvs.height = height;

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

			cvs.width = room.width;
			cvs.height = room.height;
			room.cvs = cvs;

			cvs.id = i;
			cvs.style.position = 'absolute';
			cvs.style.left = room.x+'px';
			cvs.style.top = room.y+'px';
			cvs.style.padding = '0px';
			cvs.style.margin = '0px';

		//	cvs.style.backgroundImage = "url("+sprite[i].src+")";

			room.ctx = cvs.getContext("2d");
			map.appendChild(cvs);


		}
}

var draw = {},sprite={};


draw.imgs = ["AdulteBrasLeve", "AdulteCourseDCouleur","AdulteCourseGCouleur","KevinLacheVase","KevinTientVase","Vase"];



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


		for(var i in rooms)
		{
			var room = rooms[i];
			var cvs = dc("canvas");

			cvs.width = room.width;
			cvs.height = room.height;
			room.cvs = cvs;

			cvs.style.position = 'absolute';
			cvs.style.left = room.x+'px';
			cvs.style.top = room.y+'px';
			cvs.style.padding = '0px';
			cvs.style.margin = '0px';

			room.ctx = cvs.getContext("2d");

			map.appendChild(cvs);


		}
}

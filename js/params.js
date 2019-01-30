var zoomRooms = 1.2; // optimal for 15" screens
var deltaT = 1000/60; // fps
var gameDur = 1000 * 30; //duration of a mini-game in milliseconds

var bonusInit = 35000;
var Acceleration = 2000; //gradually increases the speed of event spwn : the higher, the faster
var increaseMissed = 15; //entropy % increase when an event is missed
var increaseFailed = 10; //entropy % increase when a game is failed
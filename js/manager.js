var rooms = {};

//to do : gérer le score, le temps, les events, les events perdus, les events rates,


var entropy = 0; // game ends when it reaches 100
var score = 0; //PROPOSITION : le score prend +10*minutesSurvécues par seconde et +400*(jeuxactifsenmêmetemps) à chaque mini jeu réussi
var deltaEvent = 20; //PROPOSITION : l'intervalle entre deux spawns d'event est de 20s et accélère progressivement
var timeSurvived = 0; //game's length

//NOUS FAUT UN ECRAN DE FIN = VICTOIRE PCK YA PAS DE DEFAITE EN FAIT
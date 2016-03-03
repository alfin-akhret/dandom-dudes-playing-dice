var Player = require('./player');

// prepare the players
// assign each of them 6 misterious dice
var players = [];
for (var i = 0; i < 6; ++i) {
    players[i] = new Player(new Array(6));
}

// game rules
var diceToMove = 1;
var diceToRemove = 6;
var winner = 0;

// start
// lets each player role their dice
for (var i = 0, l = players.length; i < l; ++i) {
    players[i].roll();
}

console.log('players dices after roll:');
console.log(players)

// judging the result
var dicesToOffer = [];
for (var i = 0, l = players.length; i < l; ++i) {
    // remove
    players[i].removeDice(diceToRemove);
    dicesToOffer.push(players[i].moveDice(diceToMove));
}

// offers the dices to other players
for (var i = 0, l = players.length; i < l; ++i) {
    if(i == l-1)
        players[0].addDice(dicesToOffer[i]);
    else
        players[i+1].addDice(dicesToOffer[i]);
}

console.log('players dices after offer:');
console.log(players);








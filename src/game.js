// game.js
// 
// Game object prototype
// desc: 
// Data structure for Game object containing properties such a number of players, 
// what dice is the lucky dice or the bad one, etc
// everything containing the game logic should reside here
// 

var Player = require('./player');   // a game needs player of course

function Game(playerNum, diceToRemove, diceToPass) {
    this.playerNum = playerNum;
    this.players = [];
    this.winners = [];
    this.diceToRemove = diceToRemove;
    this.diceToPass = diceToPass;
    this.round = 1;
    
    // constructor
    this.init();
}

// prepare the players
// assign each of them 6 mysterious dice
// it's so mysterious it's not even contain anything
Game.prototype.init = function() {
    for (var i = 0; i < this.playerNum; ++i) {
        var chr = String.fromCharCode(97 + i).toUpperCase(); // generate player name
        this.players.push(new Player(chr, new Array(6)));
    }
}

// start the round
// lets the dudes roll the dice
Game.prototype.start = function() {
    for (var i = 0; i < this.playerNum; ++i) {
        this.players[i].roll();
    }

    return this.players;
}

// check the round result
Game.prototype.result = function() {
    // remove lucky dice from player's dice stack
    var dicesToOffer = [];
    for (var i = 0; i < this.playerNum; ++i) {
        // remove
        this.players[i].removeDice(this.diceToRemove);
        dicesToOffer.push(this.players[i].passDice(parseInt(this.diceToPass)));
    }

    // pass bad-luck dice to another user
    for (var i = 0; i < this.playerNum; ++i) {
        if(i == (this.playerNum - 1))
            this.players[0].addDice(dicesToOffer[i]);
        else
            this.players[i+1].addDice(dicesToOffer[i]);
    }

    // get the winner for each round if any
    // push it to this.winners array
    for (var i = 0; i < this.playerNum; ++i) {
        if(this.players[i].dices.length < 1) {
            this.winners.push(this.players[i]);
        }
    }

    // add round by 1
    this.round++;

    return this.players;
}

module.exports = Game;


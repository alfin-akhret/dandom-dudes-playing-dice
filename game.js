var Player = require('./player');

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
// assign each of them 6 misterious dice
Game.prototype.init = function() {
    for (var i = 0; i < this.playerNum; ++i) {
        var chr = String.fromCharCode(97 + i).toUpperCase(); // generate player name
        this.players.push(new Player(chr, new Array(6)));
    }
}

Game.prototype.start = function() {
    for (var i = 0; i < this.playerNum; ++i) {
        this.players[i].roll();
    }

    return this.players;
}

Game.prototype.result = function() {
    // remove lucky dice from player's dice stack
    var dicesToOffer = [];
    for (var i = 0; i < this.playerNum; ++i) {
        // remove
        this.players[i].removeDice(this.diceToRemove);
        dicesToOffer.push(this.players[i].passDice(this.diceToPass));
    }


    // pass bad-luck dice to another user
    for (var i = 0; i < this.playerNum; ++i) {
        if(i == (this.playerNum - 1))
            this.players[0].addDice(dicesToOffer[i]);
        else
            this.players[i+1].addDice(dicesToOffer[i]);
    }

    // get the winner
    this.getWinners();

    // add round by 1
    this.round++;

    return this.players;
}

Game.prototype.getWinners = function() {
    // check the winner
    for (var i = 0; i < this.playerNum; ++i) {
        if(this.players[i].dices.length < 1) {
            this.winners.push(this.players[i]);
        }
    }
}

module.exports = Game;


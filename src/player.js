// player.js
// 
// Player object prototype
// desc: 
// Data structure for player object containing dude's properties like name and dices
// and all methods a dude can do in the game

function Player(name, dices) {
    this.dices = dices;
    this.name = name;
}

// this function roll the dice for the dude
// asigning random number between 1 to 6 for each dice
// return void
Player.prototype.roll = function() {
    for (var i = 0, l = this.dices.length; i < l; ++i) {
        this.dices[i] = Math.floor(Math.random() * 6) + 1;
    }
}

// when dude get lucky dice(s)
// he can remove the dice(s) from the remaining
// return void
Player.prototype.removeDice = function(dice) {
    remove(dice, this.dices);
}

// when dude get a cursed dice(s) from a roll
// he need to separate this dice(s) from the remaining
// and let the game engine pass it to the next dude in the row
// return Array
Player.prototype.passDice = function(dice) {
    return remove(dice, this.dices);
}

// but sometimes dude get unpredictable gift from the dude before him
// this array add cursed-dices to current dice stack
// return void
Player.prototype.addDice = function(diceToAdd) {
    this.dices = this.dices.concat(diceToAdd);
}

// Helper
// ------
// seek and destroy
function remove(token, arr) {
    var tokenFound = [];
    var i = arr.length;
    while(i--) {
        if (arr[i] == token) {
            arr.splice(arr.indexOf(token), 1);
            tokenFound.push(token);  
        } 
    }
    return tokenFound;
}

module.exports = Player;


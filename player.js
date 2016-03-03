function Player(dices) {
    this.dices = dices;
}

// this function roll the dice for the player
// return void
Player.prototype.roll = function() {
    for (var i = 0, l = this.dices.length; i < l; ++i) {
        this.dices[i] = Math.floor(Math.random() * 6) + 1;
    }
}

// this function just remove unwanted dice
// return void
Player.prototype.removeDice = function(dice) {
    remove(dice, this.dices);
}

// this function move dices
// and save it for later use
// return Array
Player.prototype.moveDice = function(dice) {
    return remove(dice, this.dices);
}

// this array add dices to current dice stack
// return void
Player.prototype.addDice = function(diceToAdd) {
    this.dices = this.dices.concat(diceToAdd);
}

// Helpers
// ----------------------------------------------
// search
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


var Game = require('./game');

var g = new Game(6, 6, 1); // 6 players, diceToRemove = 6, diceToPass = 1
// play
console.log(g.start());
console.log('===================================');
console.log(g.result());







// cli_version.js
// 
// Place your bid on your hero-dude
// ask your buddies to join, place bids,
// and watch your hero-dude trying his luck 
// in "THE GAME OF RANDOM DUDES PLAYING RANDOM DICE"
// 
// author: alfin.akhret@gmail.com
// by request of tribehired dudes.

// this is a CLI version of the game
// how to run:
// - npm install
// - node cli_version <player number> <lucky dice> <badluck dice>
// ex:
// node cli_version 6 6 1 --> six players, luckydice = 6, badluck dice = 1

// import all dependencies
var prompt = require('prompt'),
    program = require('commander'),
    colors = require('colors'),
    Game = require('./src/game'); // import Game object prototype   

// start the program
program
    .arguments('<players>')
    .arguments('<luckyDice>')
    .arguments('<badluckDice>')
    .action(function(players, luckyDice, badluckDice){
        // create new game
        var g = new Game(parseInt(players), parseInt(luckyDice), parseInt(badluckDice));

        // set global style of the prompt
        prompt.message = colors.rainbow(">>");
        prompt.delimiter = " ";
                   
        // ask the user to start a new round
        // ask again and again and again
        // until a winner comes up or user get bored and type 'no' or 'n'
        (function ask(round){

            // set local style for the prompt.
            var property = {
                name: 'start',
                message: colors.green('start round '+ round + ' ?'),
                validator: /y[es]*|n[o]?/,
                warning: 'Must respond yes or no',
                default: 'yes',
            };

            prompt.get(property, function(err, result){
                if (err) { return onErr(err); }
                var answer = result.start;
                if(answer === 'no' || answer === 'n') {
                    console.log('we are done.');
                    return;
                } else {
                    // play the game
                    console.log('ROUND ' + round + '\n========================');
                    g.start();
                    console.log('After dice rolled\n------------------------');
                    g.players.forEach(formatOutput);

                    console.log('\n');
                    console.log('After dice moved/removed\n------------------------');
                    
                    g.result();
                    g.players.forEach(formatOutput);

                    if(g.winners.length > 0) {
                        console.log(colors.yellow('\nWinners:'));
                        for(var i = 0, l = g.winners.length; i < l; ++i) {
                            console.log('Player ' + g.winners[i].name);
                        }
                        return;
                    }
                    ask(g.round);
                }
            });
        })(g.round);
        
    })
    .parse(process.argv);


// some helpers
// need refactoring to separate files offcourse... but i'm too lazy to do that
function onErr(err) {
    console.log(err);
    return 1;
}

function formatOutput(num, index) {
    console.log('Player '+ num.name + ' : ' + num.dices.toString());
}










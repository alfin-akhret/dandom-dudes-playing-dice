var prompt = require('prompt'),
    program = require('commander'),
    colors = require('colors'),
    Game = require('./game');


program
    .arguments('<players>')
    .arguments('<luckyDice>')
    .arguments('<badluckDice>')
    .action(function(players, luckyDice, badluckDice){
        // create new game
        var g = new Game(parseInt(players), parseInt(luckyDice), parseInt(badluckDice));

        prompt.message = colors.rainbow(">>");
        prompt.delimiter = " ";
                   
        (function ask(round){

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
function onErr(err) {
    console.log(err);
    return 1;
}

function formatOutput(num, index) {
    console.log('Player '+ num.name + ' : ' + num.dices.toString());
}










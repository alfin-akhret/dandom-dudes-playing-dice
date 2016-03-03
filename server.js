var program = require('commander'),
    Game = require('./game');

program
    .version('0.0.1')
    .arguments('<start>')
    .option('-p, --players <n>', 'Number of players to play in a game', parseInt)
    .option('-l, --lucky-dice <n>', 'The lucky dice', parseInt)
    .option('-b, --badluck-dice <n>', 'The bad luck dice', parseInt)
    .action(function() {
        // do something
        
    })
    .parse(process.argv);










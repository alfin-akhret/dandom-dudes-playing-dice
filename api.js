var Game = require('./src/game');

module.exports = function(app, express) {
    var apiRouter = express.Router();
    var g = {};

    // simple route
    apiRouter.post('/init', function(req, res) {
        g = new Game(req.body.players, req.body.luckyDice, req.body.badluckDice);
        res.json({
            success: true,
            message: 'Players are ready. Let\'s the game begin!'
        })
    });

    apiRouter.post('/start', function(req, res) {
        // PS: have no idea why JS 'deep copy is not working here... gotta figure out'
        var response = {};

        function formatOutput(num, index) {
            return 'Player '+ num.name + ' : ' + num.dices.toString();
        }

        g.start();
        response.afterRoll = g.players.map(formatOutput);

        response.round = g.round;

        g.result();
        response.afterMove = g.players.map(formatOutput);

        response.continueGame = true;

        if(g.winners.length > 0) {
            response.continueGame = false;
            response.winners = g.winners;
        }

        res.json(response);

    });

    return apiRouter;
}

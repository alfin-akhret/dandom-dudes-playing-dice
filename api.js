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

        // populate result
        g.start();
        var gameRound = g.round;
        response.afterRoll = g.players;
        console.log(response.afterRoll);

        g.result();
        response.afterMove = g.players;
        console.log(response.afterMove);


        var winners = g.winners;
        var continueGame = true;
        
        if(winners.length > 0) continueGame = false;
        
        response.success = true,
        response.round = gameRound,
        response.continueGame = continueGame

        // send result
        res.json(response);

    });

    return apiRouter;
}

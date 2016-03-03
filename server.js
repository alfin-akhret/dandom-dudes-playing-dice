// server.js
// 
// web server for
// 'RANDOM DUDE PLAYING RANDOM DICE'

var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    // require the Game engine
    Game = require('./src/game'),
    port = process.env.PORT || 8888;

// CREATE APP
var app = express();

// APP CONFIGURATION -----------------------------
// use body-parser so we can grab information from POST request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure app to handle CORS request
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});

// log all request to the console
app.use(morgan('dev'));

// set static path location
app.use(express.static(__dirname + '/public'));

// ROUTES FOR API ---------------------------------
// ================================================
var apiRoutes = require('./api')(app, express);
app.use('/api/game', apiRoutes);

// MAIN CATCHALL ROUTES ---------------------------
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// START THE SERVER -------------------------------
// ================================================
app.listen(port);
console.log('Server is listening on http://localhost:' + port);
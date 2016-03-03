// server.js
// 
// web server for
// 'RANDOM DUDE PLAYING RANDOM DICE'

var ecstatic = require('ecstatic');

var port = process.env.PORT || 8888;
var s = require('http').createServer(
        ecstatic({root: __dirname + '/public', handleError:false}),
        function(req, res) {
            if (req.url === '/') {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.sendFile(__dirname + '/public/index.html');
            } else {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('');
            }
        }
    );

s.listen(port, function(){
    console.log('Server is listening on localhost:' + port);
});

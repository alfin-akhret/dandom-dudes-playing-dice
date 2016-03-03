// server.js
// 
// web server for
// 'RANDOM DUDE PLAYING RANDOM DICE'

var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    port = process.env.PORT || 8888;


var s = http.createServer();

s.on('request', function(req, res) {
    var url = req.url.split('/');
    var ext = url[url.length-1].split('.');

    if (req.url == '/') {
        res.writeHead(200, {'Content-Type':'text/html'});
        fs.createReadStream(path.resolve(__dirname + '/public/index.html')).pipe(res);
        
    } else if (ext[ext.length-1] == ('js' || 'css')) {
        res.writeHead(200, {'Content-Type':'text/plain'});
        fs.createReadStream(path.resolve(__dirname + '/public/' + req.url)).pipe(res);
    } else if (url[1] == 'api') {
        res.writeHead(200, {'Content-Type':'text/plain'});
        res.end('hello api\n');
    } else {
        return err404(res);
    }
})

function err404(res) {
    res.writeHead(404, {'Content-Type':'text/plain'});
    res.end('Nothing\'s here\n');
}

s.listen(port, function(){
    console.log('Server is listening on localhost:' + port);
});

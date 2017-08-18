var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    path = require('path');

app.use('/app', express.static('app'));
app.use('/', function (req, res) {
    res.sendfile(path.join(__dirname + '/index.html'));
});
app.listen(port);

console.log('Server started at http://localhost:%s/', port);

/*var express = require('express')
var app = express()
var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){
    fs.readFile('app/index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
}).listen(process.env.PORT || 5000);*/
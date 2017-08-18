var express = require('express')
var app = express()
var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){
    fs.readFile('app/index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
}).listen(8000, function() {
  console.log("Node app is running at localhost:" + app.get('port'))
}));
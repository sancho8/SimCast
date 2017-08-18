var express = require('express')
var app = express()
var http = require('http');
var fs = require('fs');

app.use(express.static('app'));

http.createServer(function(req, res){
    fs.readFile('app/index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
	fs.readFile('app/css/main.min.css',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/css','Content-Length':data.length});
        res.write(data);
        res.end();
    });
}).listen(process.env.PORT || 5000);
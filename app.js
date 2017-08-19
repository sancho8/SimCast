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

var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname)));
app.use("/app/", express.static(__dirname));
app.use("/app/img", express.static(__dirname + '/img'));
app.use("/app/js", express.static(__dirname + '/js'));

// viewed at based directory http://localhost:8080/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'app/index.html'));
});

app.listen(process.env.PORT || 8080);
var http = require('http');
var httpProxy = require('http-proxy');
var express = require('express');

// create server
var app = express();
var proxy = httpProxy.createProxyServer({ ws: true });
var server = require('http').createServer(app);

// proxy HTTP
app.get('/', function(req, res) {
  try{
    proxy.web(req, res, {target: "http://52.53.196.35:21"});
  } catch(e) {
    
  }
});

// Proxy websocket
server.on('upgrade', function (req, socket, head) {
  proxy.ws(req, socket, head, {target: "ws://52.53.196.35:21"});
});

// serve static content
app.use('/', express.static(__dirname + "/public"));
console.log('started')
server.listen(8080);
console.log('port 8080 binded')

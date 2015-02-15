var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

//////////////////////
// setting http
app.set('port', port);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
//  res.send('Hello World! welcome!');
	res.render('index.jade');
});

var server = http.createServer(app);
server.listen(port);
console.log("Node app is running at localhost:" + app.get('port'));


///////////////////
// setting ws

var wss = new WebSocketServer({server:server});
console.log("websocket server created");

wss.on('connection', function(ws) {
	var sendTimeTask = setInterval(function() {
		ws.send(JSON.stringify(new Date()), function() {});
	}, 1000);

	console.log('websocket connection open');

	ws.on('close', function() {
		console.log('websocket connection close');
		clearInterval(sendTimeTask);
	});
});

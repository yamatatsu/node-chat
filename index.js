var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');
var app = express();

//////////////////////
// setting http server

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
//  res.send('Hello World! welcome!');
	res.render('index.jade');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

///////////////////
// setting ws server

var wss = new WebSocketServer({server:http.createServer(app)});
console.log("websocket server created");

wss.on('connection', function(ws) {
	var sendTimeTask = setInterval(function() {
		ws.send(JSON.stringify(new Date(), function() {}));
	}, 1000);

	console.log('websocket connection open');

	ws.on('close', function() {
		console.log('websocket connection close');
		clearInterval(sendTimeTask);
	});
});

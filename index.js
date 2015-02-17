var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

//////////////////////
// setting http
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index.jade');
});

var server = http.createServer(app);
server.listen(port);
console.log("Node app is running at localhost:" + port);

///////////////////
// setting ws

var wss = new WebSocketServer({server:server});
console.log("websocket server created");

var userId = 1;

// 接続開始
wss.on('connection', function(ws) {
	console.log('websocket connection open');

	// clientに対してuserIdを振る
	ws.send(JSON.stringify({
		type: 'userId',
		userId: userId
	}));
	userId++;

	/**
	 * ws受信時
	 * メッセージを受けたら、時間を付与して、接続している全員にsend
	 */
	ws.on('message', function(json) {
		console.log('message is ' + json);
		var data = JSON.parse(json);
		data.time = new Date();
		wss.clients.forEach(function(client) {
			client.send(JSON.stringify(data));
		});
	});

	// クローズ
	ws.on('close', function() {
		console.log('websocket connection close');
	});
});

var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

//////////////////////
// setting http
app.use(express.static('public'));
app.set("views", "src");

app.get('/', function(req, res) {
	res.render('jade/chat.jade');
});

var server = http.createServer(app);
server.listen(port);
console.log("Node app is running at localhost:" + port);

///////////////////
// setting ws

var wss = new WebSocketServer({server:server});
console.log("websocket server created");

var connections = [];

// 接続開始
wss.on('connection', function(ws) {
	console.log('websocket connection open');

	connections.push(ws);
	/**
	 * ws受信時
	 * メッセージを受けたら、時間とuserIdを付与して、接続している全員にsend
	 */
	ws.on('message', function(json) {
		console.log('message is ' + json);
		var data = JSON.parse(json);
		data.time = getDatetime();
		data.userId = connections.indexOf(ws) + 1;
		wss.clients.forEach(function(client) {
			client.send(JSON.stringify(data));
		});
	});

	// クローズ
	ws.on('close', function() {
		console.log('websocket connection close');
	});
});

function getDatetime() {
	var ret = "";
	var date = new Date();
	ret += date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
	ret += " ";
	ret += date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	return ret;
}

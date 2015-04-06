var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

//////////////////////
// setting http
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/build/public'));
app.set("views", "src-back");

// root画面
app.get('/', function(req, res) {
	res.render('jade/root.jade');
});
// チャット画面
app.get('/chat', function(req, res) {
	res.render('jade/chat.jade');
});
// 回答画面
app.get('/answer', function(req, res) {
	res.render('jade/answer.jade');
});
// css3画面
app.get('/css3', function(req, res) {
	res.render('jade/css3.jade');
});
// bbbb画面
app.get('/bbbb', function(req, res) {
	res.render('jade/bbbb.jade');
});

// RESTful
app.use('/api/user', require('./src-back/api/user.js'))

// 出題画面

var server = http.createServer(app);
server.listen(port);
console.log("Node app is running at localhost:" + port);

///////////////////
// setting ws

var wss = new WebSocketServer({server:server});
console.log("websocket server created");

var userIdCounter = 1;
var userIdMapper = {};

// 接続開始
wss.on('connection', function(ws) {
	console.log('websocket connection open');

	// clientに対してuserIdを振る
	userIdMapper[ws] = userIdCounter; // TODO hash の触り方わすれた
	userIdCounter++;

	/**
	 * ws受信時
	 * メッセージを受けたら、時間とuserIdを付与して、接続している全員にsend
	 */
	ws.on('message', function(json) {
		console.log('message is ' + json);
		var data = JSON.parse(json);
		data.time = new Date();
		data.userId = userIdMapper[ws]; // TODO test not yet
		wss.clients.forEach(function(client) {
			client.send(JSON.stringify(data));
		});
	});

	// クローズ
	ws.on('close', function() {
		console.log('websocket connection close');
	});
});

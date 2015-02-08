var express = require('express'),
    app = express(),
    WebSockerServer = require('ws').Server,
    Game = require('./game_logic/game'),
    game = Game.create(40, 40);

app.use(express.static(__dirname + '/ui'));

server = app.listen((process.env.PORT || 3000), function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Game server listening at http://%s:%s', host, port);
});

var wss = new WebSockerServer({server: server});

game.loop();

wss.on('connection', function(ws) {
    game.join(ws);

    ws.on('close', function() {
        game.remove(ws);
    });
});

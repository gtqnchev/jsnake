var express = require('express'),
    app = express(),
    WebSockerServer = require('ws').Server,
    wss = new WebSockerServer({ port: 1337 }),
    Game = require('./game_logic/game'),
    game = Game.create(40, 40);

game.loop();

wss.on('connection', function(ws) {
    game.join(ws);

    ws.on('close', function() {
        game.remove(ws);
    });
});

app.use(express.static(__dirname + '/ui'));

server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Game server listening at http://%s:%s', host, port);
});

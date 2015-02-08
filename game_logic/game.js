var _ = require('underscore');
    Snake = require('./snake'),
    Board = require('./board');

module.exports = {
    create: function(board_x, board_y) {
        var self = Object.create(this);

        self.board = Board.create(board_x, board_y, []);
        self.board.generateFood();
        self.players = [];

        return self;
    },

    join: function(ws) {
        var free_cell = this.board.findRandomFreeCell();
        var snake = Snake.create(free_cell.x, free_cell.y);
        var player = {ws: ws, buffer: []};

        player.ws.on('message', function(message) {
            player.buffer.push(message);
        });

        this.players.push(player);
        this.board.addSnake(snake);
    },

    remove: function(ws) {
        var player_index = _.chain(this.players)
                .map(function(player) { return player.ws; })
                .indexOf(ws).value();

        this.players.splice(player_index, 1);
        this.board.snakes.splice(player_index, 1);
    },

    loop: function() {
        if(!this.board.end) {
            var messageStr = JSON.stringify(this.board.matrix);

            _.each(this.players, function(player, i) {
                player.ws.send(messageStr);

                if (player.buffer.length > 0) {
                    var move = player.buffer.shift();
                    this.board.snakes[i].changeDirection(move);
                }
            }, this);

            this.board.moveSnakes();
            setTimeout(this.loop.bind(this), 100);
        }
        else {
            this.ui.loose();
        }
    }
};

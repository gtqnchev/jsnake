var Game = {
    create: function(ui, board_x, board_y, snake_x, snake_y, snake_direction, input_buffer) {
        var self = Object.create(this);

        self.ui = ui;
        self.snake = Snake.create(snake_x, snake_y, snake_direction);
        self.board = Board.create(board_x, board_y, [self.snake]);
        self.board.generateFood();
        self.input_buffer = input_buffer;

        ui.initialize(board_x, board_y);

        return self;
    },

    loop: function() {
        if(!this.board.end) {
            this.ui.render(this.board.matrix);
            if (this.input_buffer.length > 0) {
                var move = this.input_buffer.shift();
                this.snake.changeDirection(move);
            }
            this.board.moveSnakes();
            setTimeout(this.loop.bind(this), 100);
        }
        else {
            this.ui.loose();
        }
    }
};

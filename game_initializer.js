function startGame(board_length_x, board_length_y, snake_pos_x, snake_pos_y, snake_dir) {
    var game = Game.create(UI, board_length_x, board_length_y, snake_pos_x, snake_pos_y, snake_dir);

    document.onkeydown = function(e) {
        if(_.contains(_.keys(UI.directions), (e.keyCode).toString())) {
            game.snake.changeDirection(UI.directions[e.keyCode]);
        }
    };

    game.loop();
};

startGame(40, 40, 20, 20, "right");

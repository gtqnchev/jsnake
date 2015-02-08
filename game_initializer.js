function startGame(board_length_x, board_length_y, snake_pos_x, snake_pos_y, snake_dir) {
    var input_buffer = [];
    var game = Game.create(UI, board_length_x, board_length_y, snake_pos_x, snake_pos_y, snake_dir, input_buffer);

    document.onkeydown = function(e) {
        if(_.contains(_.keys(UI.directions), (e.keyCode).toString())) {
                input_buffer.push(UI.directions[e.keyCode]);
        }
    };

    game.loop();
};

startGame(40, 40, 20, 20, "right");

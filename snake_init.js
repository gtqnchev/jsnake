function start() {
    var snake = Snake.create(20,20, 'right');
    var board = Board.create(42, 42, [snake]);

    UI.drawBoard(42,42);

    setInterval(function() {
        UI.updateBoard(board.matrix);
        board.moveSnakes();
    }, 500);
}

start();

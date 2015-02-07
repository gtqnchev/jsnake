function start() {
    var directions = {
        38: 'up',
        40: 'down',
        37: 'left',
        39: 'right'
    };

    var snake = Snake.create(20,20, 'right');
    var board = Board.create(50, 50, [snake]);
    board.generateFood();
    UI.drawBoard(50,50);

    setInterval(function() {
        UI.updateBoard(board.matrix);
        board.moveSnakes();
    }, 100);

    document.onkeydown = function(e) {
        console.log(_.keys(directions), (e.keyCode).toString());
        if(_.contains(_.keys(directions), (e.keyCode).toString())) {
            snake.direction = directions[e.keyCode];
            console.log(snake);
        }
    };
}

start();

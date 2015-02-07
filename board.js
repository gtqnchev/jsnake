var Board = (function(){
    var cell = { free:  0,
                 snake: 1,
                 food:  2  };

    function generateMatrix(n, m, fill) {
        var matrix = [], row, i, j;

        for(i = 0; i < m; i++) {
            row = [];

            for(j = 0; j < n; j++) {
                row[j] = fill;
            }

            matrix[i] = row;
        }

        return matrix;
    }

    function clearSnakes(matrix) {
        for(i = 0; i < matrix.length; i++) {
            for(j = 0; j < matrix[i].length; j++) {
                if(matrix[i][j] === cell.snake){
                    matrix[i][j] = cell.free;
                }
            }
        }
    }

    function findRandomFreeCell() {
        var x = _.random(0, this.m - 1),
            y = _.random(0, this.n - 1);

        // TODO: this will block if there are no free cells
        while(this.matrix[x][y] != this.cell.free) {
            x = (x + 1) % this.m;
            y = (y + 1) % this.n;
        }

        return { x: x, y: y };
    }

    return {
        cell: cell,

        create: function(n, m, snakes) {
            var self = Object.create(this);

            self.n = n;
            self.m = m;
            self.snakes = snakes;
            self.matrix = generateMatrix(n, m, cell.free);
            self.end = false;

            self.markSnakes();
            return self;
        },

        moveSnakes: function() {
            _.each(this.snakes, this.decideSnakeMove.bind(this));
            clearSnakes(this.matrix);
            this.markSnakes();
        },

        decideSnakeMove: function(snake) {
            var move = snake.nextPosition();

            if(move.x >= 0 && move.x < this.m && move.y >= 0 && move.y < this.n) {
                switch(this.matrix[move.x][move.y]){
                case this.cell.free:
                    snake.move();
                    return;
                case this.cell.food:
                    snake.feed();
                    snake.move();
                    this.generateFood();
                    return;
                }
            }

            this.end = true;
        },

        markSnakes: function() {
            var matrix = this.matrix;

            _.chain(this.snakes)
                .map(function(snake) {
                    return snake.bodyParts();
                })
                .flatten()
                .each(function(part) {
                    matrix[part.x][part.y] = cell.snake;
                })
                .value();
        },

        generateFood: function() {
            var freeCell = findRandomFreeCell.bind(this)();
            this.matrix[freeCell.x][freeCell.y] = this.cell.food;
        }
    };
})();

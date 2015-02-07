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

    function clearSnakes(matrix, fill) {
        for(i = 0; i < matrix.length; i++) {
            for(j = 0; j < matrix[i].length; j++) {
                if(matrix[i][j] === 1){
                    matrix[i][j] = fill;
                }
            }
        }
    }

    function findRandomFreeCell() {
        var x = _.random(0, this.m - 1),
            y = _.random(0, this.n - 1);
        console.log(x,y, this.matrix);
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

            self.markSnakes();
            return self;
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

        moveSnakes: function() {
            _.each(this.snakes, this.decideSnakeMove.bind(this));
            clearSnakes(this.matrix, this.cell.free);
            this.markSnakes();
        },

        decideSnakeMove: function(snake) {
            var move = snake.nextPosition();

            if(move.x >= 0 && move.x < this.m && move.y >= 0 && move.y < this.n) {
                switch(this.matrix[move.x][move.y]){
                case this.cell.free:
                    snake.move();
                    break;
                case this.cell.food:
                    snake.feed();
                    snake.move();
                    this.generateFood();
                    break;
                case this.cell.snake:
                    break;
                }
            }
        },

        generateFood: function() {
            var freeCell = findRandomFreeCell.bind(this)();
            this.matrix[freeCell.x][freeCell.y] = this.cell.food;
        }
    };
})();

var Snake = (function() {
    var directions =  { up:    { dx: -1,  dy:  0 },
                        down:  { dx:  1,  dy:  0 },
                        left:  { dx:  0,  dy: -1 },
                        right: { dx:  0,  dy:  1 }};


    return {
        directions: directions,

        nextPosition: function() {
            var x = this.body[0].x + directions[this.direction].dx,
                y = this.body[0].y + directions[this.direction].dy;

            return { x: x, y: y };
        },

        move: function() {
            this.body.unshift(this.nextPosition());
            if(this.stomach === 0) {
                this.body.pop();
            }
            else {
                this.stomach--;
            }
        },

        create: function(x,y, direction) {
            var self = Object.create(this);

            self.body      = [{ x: x, y: y }];
            self.direction = direction;
            self.stomach   = 0;

            return self;
        },

        head: function() {
            return this.body[0];
        },

        bodyParts: function() {
            return this.body;
        },

        feed: function() {
            this.stomach =+ 1;;
        }
    };
})();

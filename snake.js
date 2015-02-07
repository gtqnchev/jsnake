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

    function setMatrix(matrix, fill) {
        for(i = 0; i < matrix.length; i++) {
            for(j = 0; j < matrix[i].length; j++) {
                matrix[i][j] = fill;
            }
        }
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
            _.each(this.snakes, function(snake) {
                snake.move();
            });

            setMatrix(this.matrix, this.cell.free);
            this.markSnakes();
        }
    };
})();

var Snake = (function() {
    var directions =  { up:    { dx: -1,  dy:  0 },
                        down:  { dx:  1,  dy:  0 },
                        left:  { dx:  0,  dy: -1 },
                        right: { dx:  0,  dy:  1 }};

    function nextPosition(position, direction) {
        var x = position.x + directions[direction].dx,
            y = position.y + directions[direction].dy;

        return { x: x, y: y };
    }

    return {
        directions: directions,

        move: function() {
            var nextHead = nextPosition(this.head(), this.direction);
            this.body.unshift(nextHead);
            this.body.pop();
        },

        create: function(x,y, direction) {
            var self = Object.create(this);
            self.body = [{ x: x, y: y }];
            self.direction = direction;
            return self;
        },

        head: function() {
            return this.body[0];
        },

        bodyParts: function() {
            return this.body;
        }
    };
})();

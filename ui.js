var UI = (function() {
    var nodesArray = function() {
        var boardNode = document.getElementById('board');

        return  _.map(boardNode.children, function(row) {
            return row.children;
        });
    };

    return {
        cellClasses: { 0: "", 1: "snake", 2: "food" },
        directions: { 38: 'up', 40: 'down', 37: 'left', 39: 'right' },

        initialize: function(width, height) {
            var board = document.createElement('div'),
                i,j, row, cell;

            board.id = 'board';

            for(i = 0; i < height; i++) {
                row = document.createElement('div');
                row.className = 'row';

                for(j = 0; j < width; j++) {
                    cell = document.createElement('div');
                    row.appendChild(cell);
                }

                board.appendChild(row);
            }

            document.body.appendChild(board);
        },

        render: function(matrix) {
            var m, n, nodes = nodesArray();

            for(m = 0; m < matrix.length; m++) {
                for(n = 0; n < matrix[m].length; n++) {
                    nodes[m][n].className = this.cellClasses[matrix[m][n]];
                }
            }
        },

        loose: function() {
            alert("GAME OVER");
        }
    };
})();

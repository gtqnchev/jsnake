var UI = (function() {
    var nodesArray = function() {
        var boardNode = document.getElementById('board');

        return  _.map(boardNode.children, function(row) {
            return row.children;
        });
    };

    var drawBoard = function(width, height) {
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
    };

    var directions = { 38: 'up', 40: 'down', 37: 'left', 39: 'right' };

    var setupKeyHandlers = function(ws) {
        document.onkeydown = function(e) {
            if(_.contains(_.keys(directions), (e.keyCode).toString())) {
                ws.send(directions[e.keyCode]);
            }
        };
    };

    return {
        cellClasses: { 0: "", 1: "snake", 2: "food" },
        directions: directions,

        initialize: function(width, height) {
            drawBoard(width, height);
            this.setupWebSocket();
            setupKeyHandlers(this.ws);
        },

        setupWebSocket: function() {
            self = this;
            var host = location.origin.replace(/^http/, 'ws');
            self.ws = new WebSocket(host);

            // ws.onopen = function() {
            //     ws.send('create');
            // };

            self.ws.onmessage = function(message) {
                self.render(JSON.parse(message.data));
            };
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

UI.initialize(40,40);

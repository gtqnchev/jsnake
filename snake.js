var Snake = {
    directions: { up:    { dx: -1,  dy:  0 },
                  down:  { dx:  1,  dy:  0 },
                  left:  { dx:  0,  dy: -1 },
                  right: { dx:  0,  dy:  1 }},

    create: function(x,y, direction) {
        var self = Object.create(this);

        self.body      = [{ x: x, y: y }];
        self.direction = direction;
        self.stomach   = 0;

        return self;
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

    nextPosition: function() {
        var x = this.body[0].x + this.directions[this.direction].dx,
            y = this.body[0].y + this.directions[this.direction].dy;

        return { x: x, y: y };
    },

    changeDirection: function(new_direction) {
        if(this.directions[new_direction].dx !== -this.directions[this.direction].dx &&
           this.directions[new_direction].dy !== -this.directions[this.direction].dy) {
            this.direction = new_direction;
        }
    },

    feed: function() {
        this.stomach =+ 1;
    },

    head: function() {
        return this.body[0];
    },

    bodyParts: function() {
        return this.body;
    }
};

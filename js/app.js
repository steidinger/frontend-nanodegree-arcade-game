// Enemies our player must avoid
"use strict";
var convertColumnToX = function (column) {
    return column * 101;
};

var convertRowToY = function (row) {
    return 60 + (row - 1) * 83;
};

var Enemy = function(row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.width = 101;
    this.x = 0;
    this.y = convertRowToY(row);
    this.speed = speed || Enemy.defaultSpeed;
};

Enemy.defaultSpeed = 10;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if (this.x > 505) {
        this.x = 0 - this.width;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.row = 5;
    this.column = 2;
    this.move = Player.MOVES.none;
};

Player.MOVES = {
    left:  { dx: -1, dy:  0 },
    up:    { dx:  0, dy: -1 },
    right: { dx: +1, dy:  0 },
    down:  { dx:  0, dy: +1 },
    none:  { dx:  0, dy:  0 }
};

Player.prototype.update = function () {
    this.column += this.move.dx;
    if (this.column < 0) {
        this.column = 0;
    }
    if (this.column > 4) {
        this.column = 4;
    }
    this.row += this.move.dy;
    if (this.row < 0) {
        this.row = 0;
    }
    if (this.row > 5) {
        this.row = 5;
    }
    this.move = Player.MOVES.none;
};

Player.prototype.render = function () {
    var x = convertColumnToX(this.column);
    var y = convertRowToY(this.row);

    ctx.drawImage(Resources.get(this.sprite), x, y);
};

Player.prototype.handleInput = function (direction) {
    this.move = Player.MOVES[direction] || Player.MOVES.NONE;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(1, 20),
    new Enemy(2, 30),
    new Enemy(3, 10)
];

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    var direction = allowedKeys[e.keyCode];

    if (direction) {
        player.handleInput(direction);
    }
});

document.addEventListener("load", function () {
    Engine.init();
});
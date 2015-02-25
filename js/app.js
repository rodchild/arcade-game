// Enemies our player must avoid
var score = 0;
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;

}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
//alert("OKK: "+Math.min(Math.floor(Math.random() * (320 - 60)) + 60, 320));
  if (this.x < 505)
  {
    this.x += (this.speed * dt);
  }
  else
  {
    this.x = -100;
  }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
  this.boy = 'images/char-boy.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
}

Player.prototype.update = function() {
  if(this.y < 25)
  {
    this.x = 200;
    this.y = 400;
    score += 10;
  }

}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.boy), this.x, this.y);
  player.getScore();
}

//when the player hits a bug, the game resets.
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
  score -= 10;
  if (score < 0)
  {
    score = 0;
  }
}

Player.prototype.getScore = function(){
  ctx.font="bold 20px Verdana";
  ctx.fillText("Score",420,80);
  ctx.fillText(score ,440,110);
}

Player.prototype.handleInput = function(num)
{
  switch (num) {
// Left arrow.
    case "left":
      this.x = this.x - 100;
      if ( this.x < 0)
      {// If at edge, reset player x position.
        this.x = 0;
      }
      break;

// Right arrow.
    case "right":
      this.x =  this.x + 100;
      if ( this.x > 400)
      {// If at edge, reset player x position.
        this.x = 400;
      }
      break;

// Down arrow
    case "down":
      this.y = this.y + 80;
      if (this.y > 415)
      {//If at edge, reset player y position.
        this.y = 415;
      }
      break;

// Up arrow
    case "up":
      this.y = this.y - 85;
      if (this.y < 0)
      {// If at edge, reset player y position.
        this.y = 0;
      }
      break;
}

}

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
(function setEnemies(){
    allEnemies.push(new Enemy(-2, 60, Math.floor((Math.random() * (500 -100) ) + 100)));
    allEnemies.push(new Enemy(-2, 100, Math.floor((Math.random() * (500 - 100)) + 100)));
    allEnemies.push(new Enemy(-2,150, Math.floor((Math.random() * (500 - 100)) + 100)));
    allEnemies.push(new Enemy(-2,220, Math.floor((Math.random() * (500 - 100)) + 100)));
}());


var player = new Player(200, 430, 20 );


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

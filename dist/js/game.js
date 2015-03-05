(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'beer-run');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":9,"./states/gameover":10,"./states/menu":11,"./states/play":12,"./states/preload":13}],2:[function(require,module,exports){
'use strict';

var Beer = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'beer', frame);

  this.game.physics.arcade.enable(this);

  this.enableBody = true;
  this.body.velocity.x = 0;
  this.outofBoundsKill = true;
  this.checkWorldBounds = true;
};

Beer.prototype = Object.create(Phaser.Sprite.prototype);
Beer.prototype.constructor = Beer;

Beer.prototype.update = function() {
};

module.exports = Beer;

},{}],3:[function(require,module,exports){
'use strict';

var Dude = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'dude', frame);

  //enable physics for the dude object
  this.game.physics.arcade.enable(this);

  //dude properties
  this.body.gravity.y = 720;
  this.body.velocity.x = 400;
  this.body.collideWorldBounds = false;
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;

  //dude animation frames
  this.animations.add('jump', [1], 10, true );
  this.animations.add('run', [0, 1, 2, 3], 8, true);

  this.lives = 3;

};

Dude.prototype = Object.create(Phaser.Sprite.prototype);
Dude.prototype.constructor = Dude;
Dude.prototype.update = function() {
};
//lets the dude jump
Dude.prototype.jump = function(){
  this.body.velocity.y = -550;
}

module.exports = Dude;



},{}],4:[function(require,module,exports){
'use strict';

var GameOverPanel = function(game, parent) {
  Phaser.Group.call(this, game, parent);

  // Add panel
  this.panel = this.game.add.sprite(0, 0, 'gameOverPanel');
  this.panel.width = 400;
  this.panel.height = 170;
  this.add(this.panel);

  this.y = 50;
  this.x = 400;
  this.alpha = 0; 
};

GameOverPanel.prototype = Object.create(Phaser.Group.prototype);
GameOverPanel.prototype.constructor = GameOverPanel;
// GameOverPanel.prototype.update = function() {
// };
//show the game over panel when paused
GameOverPanel.prototype.show = function(){
  // this.game.add.tween(this).to({alpha: 1.0, y:150}, 800, Phaser.Easing.Exponential.In, true, 0);
  this.game.add.tween(this).to({alpha: 1, y:110}, 50, Phaser.Easing.Bounce.Out, true);
  this.game.add.text(450, 150, 'SCORE', { fontSize: '500px', fill: '#ffa800' });
  this.playAgain = this.game.add.button(25, 95, 'restart-btn', this.restartGame, this);
  this.playAgain.anchor.setTo(0, 0);
  this.add(this.playAgain);
};

//callback function, when activated starts the play state
GameOverPanel.prototype.restartGame = function() {  
  this.game.state.start('play');
  // this.game.state.initGame();
};

module.exports = GameOverPanel;
  
},{}],5:[function(require,module,exports){
'use strict';

var Ground = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'ground', frame);

  //enable physics for the ground object
  this.game.physics.arcade.enable(this);

  //ground properties
  this.body.velocity.x = -400;
  this.body.immovable = true;
  this.checkWorldBounds = true;
  this.outOfBoundsDestroy = true;
  this.body.allowGravity = false;
  
};
Ground.prototype = Object.create(Phaser.Sprite.prototype);
Ground.prototype.constructor = Ground;
Ground.prototype.update = function() {};
//reset function for ground obj
Ground.prototype.reset = function(x, y) {

  this.game.physics.arcade.enable(this);

  this.x = x;
  this.y = y;
  this.body.velocity.x = -400;
  this.body.immovable = true;
  this.body.checkWorldBounds = true;
  this.body.outOfBoundsKill = true;
  this.body.allowGravity = false;
};

module.exports = Ground;

},{}],6:[function(require,module,exports){
'use strict';

var Heart = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'heart', frame);
};

Heart.prototype = Object.create(Phaser.Sprite.prototype);
Heart.prototype.constructor = Heart;

Heart.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Heart;

},{}],7:[function(require,module,exports){
'use strict';

var Keg = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'keg', frame);

  this.game.physics.arcade.enable(this);

  this.enableBody = true;
  this.body.velocity.x = 0;
  this.outofBoundsKill = true;
  this.checkWorldBounds = true;
};

Keg.prototype = Object.create(Phaser.Sprite.prototype);
Keg.prototype.constructor = Keg;

Keg.prototype.update = function() {
};

module.exports = Keg;

},{}],8:[function(require,module,exports){
'use strict';

var PausePanel = function(game, parent) {
  Phaser.Group.call(this, game, parent);

  // Add panel
  this.panel = this.game.add.sprite(0, 0, 'pausePanel');
  this.panel.width = 500;
  this.panel.height = 280;
  this.add(this.panel);

  //creates the unpause/resume button
  this.playBtn = this.game.add.button(170, 140, 'play-btn', this.unpause, this, 3, 2, 3, 2);
  this.playBtn.anchor.setTo(0, 0);
  this.add(this.playBtn);

  this.y = 110;
  this.x = 370;
  this.alpha = 0;  
};

PausePanel.prototype = Object.create(Phaser.Group.prototype);
PausePanel.prototype.constructor = PausePanel;
PausePanel.prototype.update = function() {
};
//show the pause panel when paused
PausePanel.prototype.show = function(){
  this.game.add.tween(this).to({alpha:0.6, y:150}, 800, Phaser.Easing.Exponential.In, true, 0);
};
//hides the pause panel when unpaused
PausePanel.prototype.unpause = function(){
  this.game.add.tween(this).to({alpha:0, y:150}, 800, Phaser.Easing.Exponential.Out, true, 0);
  this.game.state.getCurrentState().unpauseGame();
};

module.exports = PausePanel;
  
},{}],9:[function(require,module,exports){

'use strict';

function Boot() {
}
//if the assets are still loading run this
Boot.prototype = {
  preload: function() {
    //loads an loading gif 
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],10:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],11:[function(require,module,exports){

'use strict';
function Menu() {}
//creates the starting/title page of the game
Menu.prototype = {
  preload: function() {

  },
  create: function() {
    //adds the background image
    this.background = this.game.add.tileSprite(0, -35, 653, 352, 'background');
    this.background.scale.setTo(2, 2);

    //adds a ground image
    this.ground = this.game.add.tileSprite(0, 530, this.game.world.width, this.game.world.height, 'ground');

    //shows the "Beer Run" and sets its size
    this.title = this.game.add.sprite(this.game.width/2, 250,'title');
    this.title.scale.setTo(1.2, 1.2);
    this.title.anchor.setTo(0.5, 1);

    //makes the "Beer Run" go up and down in a loop
    this.game.add.tween(this.title).to({y:200}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    //creates the start button and once click runs the play state
    this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
    this.startButton.scale.setTo(2, 2);
    this.startButton.anchor.setTo(0.5,0.5);
  },
  //callback function, when activated starts the play state
  startClick: function() {  
    this.game.state.start('play');
  },
  update: function() {
  }
};

module.exports = Menu;

},{}],12:[function(require,module,exports){
'use strict';

var Dude = require('../prefabs/dude');
var Ground = require('../prefabs/ground');
var Beer = require('../prefabs/beer');
var Keg = require('../prefabs/keg');
var PausePanel = require('../prefabs/pausePanel');
var GameOverPanel = require('../prefabs/gameOverPanel');
var Heart = require('../prefabs/heart');
var paused = false;

function Play() {}
Play.prototype = {
  create: function() {
    //enable physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 750;

    //background
    this.background = this.game.add.tileSprite(0, -35, 653, 352, 'background');
    this.background.autoScroll(-100, 0);
    this.background.scale.setTo(2, 2);

    //ground 
    this.groundGroup = this.game.add.group();

    //creates the first ledge when the player lands
    this.initial_ground = new Ground(this.game, 0, this.game.world.height - 64, 300, 150);
    this.initial_ground.scale.setTo(4.5, 3);
    this.game.add.existing(this.initial_ground);

    //player 
    this.player = new Dude(this.game, 500, 0)
    this.game.add.existing(this.player);

    //score
    this.score = 0;

    //beer 
    this.beers = this.game.add.group();

    //keg
    this.kegs = this.game.add.group();

    //game controls
    this.jumpKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.shift = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT = 16);
    // this.pauseKey = this.game.input.keyboard.addKey(32);

    // makes spacebar not scroll down 
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    //pause button
    this.btnPause = this.game.add.button(1150, 40, 'pause-btn', this.pauseGame, this);
    this.btnPause.anchor.setTo(0.5,0.5);
    this.btnPause.alpha = 1;

    //pause panel
    this.pausePanel = new PausePanel(this.game);
    this.game.add.existing(this.pausePanel);

    //game over panel
    this.gameOverPanel = new GameOverPanel(this.game);
    this.game.add.existing(this.gameOverPanel)

    //player lives
    this.lives = this.game.add.group();

    this.generateLife(0);
    this.generateLife(44);
    this.generateLife(88);

    this.initGame();
  },
  update: function() {
      

    //calls the checkcollisions function 
    this.checkCollisions();

    //if game is not paused enable player animation and update movement
    if(!paused){
      //player speed
      this.player.body.velocity.x = 400;

      if (this.jumpKey.isDown && this.player.body.touching.down)
      {
        this.game.sound.play('dudeJump', 1, 0, false, false);
        this.player.jump();
      }
      else if(!this.player.body.touching.down){
        this.player.animations.play('jump');
        this.player.body.velocity.x = 0; 
      }
      else{
        this.player.animations.play('run');
      };

      if(!this.player.alive) {
        this.damageLife();
        this.damageLife();
        this.damageLife();
        this.gameOver();
      };
    };

    console.log(this.player.alive);
    // if (this.player.body.coll) {
    //   this.player.kill();
    // }


    // if(this.player.y > 520 && this.player.y < 530) {
    //   console.log("player dead");
    //   this.damageLife();
    //   this.damageLife();
    //   this.damageLife();
    //   this.player.kill();
    //   this.gameOver();
    // }

  },

  //collision between elements
  checkCollisions: function(){
    //lets player run on the first ground
    this.game.physics.arcade.collide(this.player, this.initial_ground);
    this.game.physics.arcade.collide(this.beers, this.initial_ground);

    // this.beers.forEach(function(beers){
    //   this.addScore(beers);
    // }, this);

    //lets player run on the random generated ground
    this.game.physics.arcade.collide(this.player, this.groundGroup);
    this.game.physics.arcade.collide(this.beers, this.groundGroup);

    //lets player collect beers, kegs
    this.game.physics.arcade.overlap(this.player, this.beers, this.collectBeer, null, this);
    this.game.physics.arcade.overlap(this.player, this.kegs, this.collectKegs, null, this);
  },
  //generates grounds with random y-value(height)
  generateGrounds: function() {  
    // console.log(this.game.world.height - 64);
    var randomY = this.game.rnd.integerInRange(440, 520);
    var randGround = this.groundGroup.getFirstExists(false);
      if(!randGround) {
        randGround = new Ground(this.game, 1200, randomY, 300, 150);
        randGround.scale.setTo(1.5, 10);
        this.groundGroup.add(randGround);
      }
      randGround.reset(1200, randomY);
  },
  //generate beers 
  generateBeers: function(){
    // console.log('beer');
    var beer = new Beer(this.game, 1199, 300)
    this.beers.add(beer);
  },
  //generates kegs
  generateKegs: function(){
    // console.log('keg');
    var keg = new Keg(this.game, 1199, 300)
    this.beers.add(keg);
  },
  collectBeer: function(player, beer) {
    // Removes the beer from the screen
    beer.kill();
    //  Add and update the score
    // score += 1;
    // scoreText.text = 'Score: ' + score;
  },
  collectKeg: function(player, keg) {
    // Removes the beer from the screen
    keg.kill();
    //  Add and update the score
    // score += 5;
    // scoreText.text = 'Score: ' + score;
  },
  // Generate Life
  generateLife: function(i){
    var life = new Heart(this.game, i, 0);
    this.lives.add(life);
  },
  damageLife: function(){
    this.lives.children.pop();
  },
  //
  killDude: function(player){
    this.player.lives--;
  },
  //when the game initializes start timers for the generators and play game
  initGame: function(){
    //creates grounds at intervals
    this.groundGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.generateGrounds, this);
    this.groundGenerator.timer.start();

    //creates beer at intervals
    this.beerGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 0.6, this.generateBeers, this);
    this.beerGenerator.timer.start();

    //creates kegs at intervals
    this.kegGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 2.6, this.generateKegs, this);
    this.kegGenerator.timer.start();

    //runs the game
    this.playGame();
  },
  playGame: function(){
    if(paused){
      paused = false;
      //enables to pause the game when out of focus
      this.game.stage.disableVisibilityChange = false;

      // Show pause button
      this.game.add.tween(this.btnPause).to({alpha:1}, 1000, Phaser.Easing.Exponential.In, true);
    };
  },
  //manually made pause function
  //stops all movement to mimic a paused state and show a pop up paused panel
  pauseGame: function(){
    //if game is not paused and pauseGame is called run the function
    if(!paused){
      paused = true;
      //disables to pause the game when out of focus
      //this function starts the game if paused so we need to disable it
      this.game.stage.disableVisibilityChange = true;

      //stop animations, auto scrolls, and physics
      this.background.autoScroll(0, 0);
      this.initial_ground.body.velocity.x = 0;
      this.groundGroup.forEach(function(randGround){
        randGround.body.velocity.x = 0;
      }, this);
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;
      this.player.animations.currentAnim.paused = true;
      this.player.body.allowGravity = false;

      //pause generators
      this.groundGenerator.timer.pause();
      this.beerGenerator.timer.pause();
      this.kegGenerator.timer.pause();

      //hide pause button
      this.game.add.tween(this.btnPause).to({alpha:0}, 1000, Phaser.Easing.Exponential.Out, true);
      this.btnPause.alpha = 0;

      //only show the paused panel if the game is not over
      if(!this.gameover){
        // Show pause panel
        this.pausePanel.show();
      };//else do nothing
    };//else do nothing
  },
  //manually made unpause function
  //resumes the game state
  unpauseGame: function(){
    //if game is paused and the unpauseGame is called run the fucntion
    if(paused){
      paused = false;
      //disables to pause the game when out of focus
      this.game.stage.disableVisibilityChange = false;

      //start animations
      this.background.autoScroll(-100, 0);
      this.initial_ground.body.velocity.x = -400;
      this.groundGroup.forEach(function(randGround){
        randGround.body.velocity.x = -400;
      }, this);
      this.player.body.velocity.x = -400;
      this.player.animations.currentAnim.resume = true;
      this.player.body.allowGravity = true;

      //resume generators
      this.groundGenerator.timer.resume();
      this.beerGenerator.timer.resume();
      this.kegGenerator.timer.resume();

      //show pause button
      this.game.add.tween(this.btnPause).to({alpha:1}, 1000, Phaser.Easing.Exponential.In, true);
    };//else do nothing
  },
  addScore: function(input) {  
    if(input.exists && !input.hasScored) {
        input.hasScored = true;
        this.score++;
        this.scoreText.setText(this.score.toString());
    }
  },
  gameOver: function(){
    console.log('game over!');
    // Gamover
    this.gameover = true;
    // Pause game
    // Show gameover panel
    this.gameOverPanel.show();
  }

};

module.exports = Play;


},{"../prefabs/beer":2,"../prefabs/dude":3,"../prefabs/gameOverPanel":4,"../prefabs/ground":5,"../prefabs/heart":6,"../prefabs/keg":7,"../prefabs/pausePanel":8}],13:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}
//preloads all the assets for the game
Preload.prototype = {
  preload: function() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.asset = this.add.sprite(this.width/2, this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.asset);

    //images for the game
    this.load.image('background', 'assets/citybackground.png');
    this.load.image('title', 'assets/title.png');
    this.load.image('startButton', 'assets/start-button.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('beer', 'assets/beer.png');
    this.load.image('keg', 'assets/keg.png');
    this.load.image('heart', 'assets/heart.png');
    this.load.image('pause-btn', 'assets/pause-btn.png');
    this.load.image('pausePanel', 'assets/pausePanel.png');
    this.load.image('gameOverPanel', 'assets/panelGray.png');
    this.load.image('play-btn', 'assets/play-btn.png');
    this.load.image('restart-btn', 'assets/playagain.png');

    //spritesheets for the game
    this.load.spritesheet('dude', 'assets/dude.png', 45, 62);
    this.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);

    //sounds for the game
    this.load.audio('dudeJump', 'assets/audio/jump_07.wav');
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    //if all assets have been preloaded and ready, run the menu state(title page)
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])
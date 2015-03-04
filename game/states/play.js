'use strict';

var Dude = require('../prefabs/dude');
var Ground = require('../prefabs/ground');
var Beer = require('../prefabs/beer');
var Keg = require('../prefabs/keg');
var PausePanel = require('../prefabs/pausePanel');
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

    //beer 
    this.beers = this.game.add.group();

    //keg
    this.kegs = this.game.add.group();

    //game controls
    this.jumpKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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

    //player lives
    this.lives = this.game.add.group();

    console.log(this.lives);

    this.generateLife(0);
    this.generateLife(44);
    this.generateLife(88);

    this.initGame();

    this.shift = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT = 16);
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
    };

    console.log(this.player.alive);
    console.log(this.player.y);
    // if (this.player.body.coll) {
    //   this.player.kill();
    // }

    if(this.player.y > 520) {
      console.log("player dead");
      this.damageLife();
      this.damageLife();
      this.damageLife();
      this.player.kill();
      this.gameOver();
    }

  },
  //collision between elements
  checkCollisions: function(){
    //lets player run on the first ground
    this.game.physics.arcade.collide(this.player, this.initial_ground);
    this.game.physics.arcade.collide(this.beers, this.initial_ground);

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
  gameOver: function(){
    console.log('game over!');
    // Gamover
    this.gameover = true;
    // Pause game
    this.pauseGame();
    // Show gameover panel
    this.gameoverPanel.show(this.score);
  }

};

module.exports = Play;


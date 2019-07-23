const gameState = {};

class Gamescene extends Phaser.Scene{
    constructor(){
        super({key: 'Gamescene'})
    }

    create(){
        //Player 1 
        gameState.playerOne = this.add.rectangle(0, config.height/2, 20, 64, '0xffffff', 1).setOrigin(0, 0.5);
        this.physics.add.existing(gameState.playerOne);
        gameState.playerOne.body.collideWorldBounds = true;
        gameState.playerOne.body.bounce.x = 1;
        gameState.playerOne.body.bounce.y = 1;

        //Player 2 
        gameState.playerTwo = this.add.rectangle(config.width, config.height/2, 20, 64, '0xffffff', 1).setOrigin(1, 0.5);
        this.physics.add.existing(gameState.playerTwo);
        gameState.playerTwo.body.collideWorldBounds = true;
        gameState.playerTwo.body.bounce.x = 1;
        gameState.playerTwo.body.bounce.y = 1;

        //Adds in the keys for control and sets the player speeds
        gameState.playerSpeed = 400;
        gameState.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        gameState.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        gameState.cursors = this.input.keyboard.createCursorKeys();


        gameState.middleLine = this.add.rectangle(config.width/2, config.height/2, 5, config.height, '0xffffff', 0.2).setOrigin(0.5, 0.5);

        //Ball
        gameState.ball = this.add.circle(config.width/2, config.height/2, 15, '0xffffff');
        this.physics.add.existing(gameState.ball);
        gameState.ball.body.collideWorldBounds = true;
        gameState.ball.body.velocity.x = Phaser.Math.Between(-100, -200);
        gameState.ball.body.velocity.y = Phaser.Math.Between(-100, -200);
        gameState.ball.body.bounce.x = 1;
        gameState.ball.body.bounce.y = 1;

        //Collision
        this.physics.add.collider(gameState.playerOne, gameState.ball);
        this.physics.add.collider(gameState.playerTwo, gameState.ball);
        
    }
    
    update(){
        //Player 1 movement
        if(gameState.keyW.isDown){
            gameState.playerOne.body.velocity.y = -gameState.playerSpeed;
        }
        if(gameState.keyS.isDown){
            gameState.playerOne.body.velocity.y = gameState.playerSpeed;
        }
        if(!gameState.keyS.isDown && !gameState.keyW.isDown){
            gameState.playerOne.body.velocity.y = 0;
        }

        //Player 2 movement
        if(gameState.cursors.up.isDown){
            gameState.playerTwo.body.velocity.y = -gameState.playerSpeed;
        }
        if(gameState.cursors.down.isDown){
            gameState.playerTwo.body.velocity.y = gameState.playerSpeed;
        }
        if(!gameState.cursors.up.isDown && !gameState.cursors.down.isDown){
            gameState.playerTwo.body.velocity.y = 0;
        }
    }
}

const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    type: Phaser.AUTO,
    backgroundColor: '0x000000',
    physics: {
        default: 'arcade'
    },
    scene: [Gamescene]
}

const game = new Phaser.Game(config);
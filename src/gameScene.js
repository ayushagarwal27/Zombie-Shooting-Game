import Phaser from "phaser";

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
    this.player = null;
    this.gameStarted = true;
    this.bulletObjects = [];
    this.enemyObjects = [];
    this.score = 0;
    this.scoreText = null;
    this.playerName = null;
    this.isSoundOn = true;
    this.isMusicOn = true;
    this.soundVolume = 10;
    this.musicVolume = 10;
  }

  init(data) {
    const { isSoundOn, isMusicOn, soundVolume, musicVolume } = data;
    this.isSoundOn = isSoundOn;
    this.isMusicOn = isMusicOn;
    this.soundVolume = soundVolume;
    this.musicVolume = musicVolume;
  }

  preload() {}

  create() {
    // // Background
    const bg = this.physics.add
      .image(0, 0, "bg")
      .setOrigin(0, 0)
      .setDisplaySize(this.game.config.width, this.game.config.height);
    bg.body.allowGravity = false;
    bg.body.immovable = true;
    bg.setBodySize(7000, 670);
    bg.setOffset(0, 2950);

    // Player
    this.player = this.physics.add
      .sprite(100, this.game.config.height - 300, "player")
      .setScale(3, 3);
    this.player.setBodySize(38, 66);
    this.player.setOffset(40, 63);

    this.player.play("idle");

    // Collision
    this.physics.add.collider(this.player, bg);

    this.scoreText = this.add.text(10, 10, "Score 0", {
      font: "bold 30px sans-serif",
      color: "white",
    });

    // Enemy
    let timer = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        const enemy = this.physics.add
          .sprite(this.game.config.width + 100, 320, "enemy")
          .setScale(3.2, 3.2);

        enemy.setBodySize(38, 65);
        enemy.setOffset(30, 34);
        enemy.play("ew");
        enemy.flipX = true;
        enemy.setVelocityX(-100);

        let playerColliding = this.physics.add.collider(
          this.player,
          enemy,
          () => {
            const deadSound = this.sound.add("dead-sound");
            deadSound.setVolume(this.soundVolume);
            deadSound.setMute(!this.isSoundOn);
            deadSound.play();

            this.player.play("dead");
            this.time.addEvent({
              delay: 700,
              callback: () => {
                playerColliding.destroy();
                timer.paused = true;
                this.scene.start("GameOverScreen", {
                  score: this.score,
                  isSoundOn: this.isSoundOn,
                  isMusicOn: this.isMusicOn,
                  soundVolume: this.soundVolume,
                  musicVolume: this.musicVolume,
                });
              },
            });
          },
        );
        this.physics.add.collider(enemy, this.enemyObjects, () => {});
        this.physics.add.collider(bg, enemy);
        this.enemyObjects.push(enemy);
      },
      callbackScope: this,
    });

    this.input.keyboard.addListener("keydown-A", (e) => {
      if (this.gameStarted) {
        this.player.setVelocityX(-60);
        if (this.player.anims.currentAnim.key !== "walk") {
          this.player.play("walk");
        }
        this.player.flipX = true;
      }
    });
    this.input.keyboard.addListener("keyup-A", (e) => {
      if (this.gameStarted) {
        this.player.setVelocityX(0);
        this.player.play("idle");
      }
    });
    this.input.keyboard.addListener("keydown-W", (e) => {
      if (this.gameStarted && this.player.body.velocity.y === 0) {
        this.player.setVelocityY(-50);
      }
    });
    this.input.keyboard.addListener("keydown-D", (e) => {
      if (this.gameStarted) {
        this.player.setVelocityX(60);
        if (this.player.anims.currentAnim.key !== "walk") {
          this.player.play("walk");
        }
        this.player.flipX = false;
      }
    });
    this.input.keyboard.addListener("keyup-D", (e) => {
      if (this.gameStarted) {
        this.player.setVelocityX(0);
        this.player.play("idle");
      }
    });
    this.input.keyboard.addListener("keydown-F", (e) => {
      if (this.gameStarted) {
        const fireSound = this.sound.add("fire-sound");
        fireSound.setVolume(this.soundVolume);
        fireSound.setMute(!this.isSoundOn);
        fireSound.play();

        const bulletObject = this.physics.add
          .image(this.player.x + 90, this.player.y + 90, "bullet")
          .setScale(0.1);
        bulletObject.setVelocityX(500);
        bulletObject.body.allowGravity = false;
        // bulletObject.body.setGravityY(0);
        this.player.play("shoot");
        this.bulletObjects.push(bulletObject);

        this.physics.add.overlap(
          bulletObject,
          this.enemyObjects,
          (objA, objB) => {
            objA.destroy();
            objB.destroy();
            this.score += 1;
            this.updateScoreText();
          },
        );
      }
    });
    this.input.keyboard.addListener("keyup-F", (e) => {
      if (this.gameStarted) {
        this.time.addEvent({
          delay: 250,
          callback: () => {
            this.player.play("idle");
          },
        });
      }
    });
  }

  // Game Loop
  update() {
    if (this.bulletObjects.length > 0) {
      this.bulletObjects.forEach((bullet, idx) => {
        if (bullet.x > this.game.config.width) {
          bullet.destroy();
          this.bulletObjects.splice(idx, 1);
        }
      });
    }
    this.enemyObjects.forEach((enemy, idx) => {
      if (enemy.x < 0) {
        enemy.destroy();
        this.enemyObjects.splice(idx, 1);
      }
    });
  }

  updateScoreText() {
    this.scoreText.setText("Score " + this.score);
  }
}

export default GameScene;

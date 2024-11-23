import Phaser from "phaser";

class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: "LoadingScene" });
  }

  preload() {
    this.load.image("bg", "/assets/background.jpg");
    this.load.image("player", "/assets/walk/tile000.png");
    this.load.image("bullet", "/assets/bullet.png");
    this.load.image("enemy", "/assets/enemy/tile000.png");
    this.load.image("smoke", "/assets/smoke.png");
    this.load.audio("fire-sound", "/assets/shoot.mp3");
    this.load.audio("dead-sound", "/assets/dead.mp3");
    this.load.audio("walk-sound", "/assets/walk.mp3");
    this.load.audio("enemy-sound", "/assets/enemy.m4a");

    this.load.html("settings", "/html/settings.html");

    for (let i = 1; i <= 7; i++) {
      this.load.image(`walk-${i}`, `/assets/walk/tile00${i - 1}.png`);
    }

    for (let i = 1; i <= 7; i++) {
      this.load.image(`idle-${i}`, `/assets/idle/tile00${i - 1}.png`);
    }

    for (let i = 1; i <= 4; i++) {
      this.load.image(`shoot-${i}`, `/assets/shoot/tile00${i - 1}.png`);
    }

    for (let i = 1; i <= 4; i++) {
      this.load.image(`dead-${i}`, `/assets/dead/tile00${i - 1}.png`);
    }

    for (let i = 1; i <= 8; i++) {
      this.load.image(`enemy-${i}`, `/assets/enemy/tile00${i - 1}.png`);
    }

    this.add
      .text(
        this.game.config.width / 2,
        this.game.config.height / 2,
        "Loading...",
        { fontSize: 20, color: "yellow", align: "center" },
      )
      .setOrigin(0.5, 0.5);

    this.load.on("complete", () => {
      // Walk Animation
      this.anims.create({
        key: "walk",
        frameRate: 10,
        frames: [
          { key: "walk-1" },
          { key: "walk-2" },
          { key: "walk-3" },
          { key: "walk-4" },
          { key: "walk-5" },
          { key: "walk-6" },
          { key: "walk-7" },
        ],
        repeat: -1,
      });

      // Idle Animation
      this.anims.create({
        key: "idle",
        frameRate: 8,
        frames: [
          { key: "idle-1" },
          { key: "idle-2" },
          { key: "idle-3" },
          { key: "idle-4" },
          { key: "idle-5" },
          { key: "idle-6" },
          { key: "idle-7" },
        ],
        repeat: -1,
      });

      // Shoot Animation
      this.anims.create({
        key: "shoot",
        frameRate: 10,
        frames: [
          { key: "shoot-1" },
          { key: "shoot-2" },
          { key: "shoot-3" },
          { key: "shoot-4" },
        ],
        repeat: 0,
      });

      this.anims.create({
        key: "dead",
        frameRate: 10,
        frames: [
          { key: "dead-1" },
          { key: "dead-2" },
          { key: "dead-3" },
          { key: "dead-4" },
        ],
        repeat: 0,
      });

      // Enemy Animation
      this.anims.create({
        key: "ew",
        frameRate: 10,
        frames: [
          { key: "enemy-1" },
          { key: "enemy-2" },
          { key: "enemy-3" },
          { key: "enemy-4" },
          { key: "enemy-5" },
          { key: "enemy-6" },
          { key: "enemy-7" },
          { key: "enemy-8" },
        ],
        repeat: -1,
      });
    });
  }

  create() {
    this.scene.start("MainMenuScene", {
      isSoundOn: true,
      isMusicOn: true,
      soundVolume: 5,
      musicVolume: 5,
    });
  }

  update() {}
}

export default LoadingScene;

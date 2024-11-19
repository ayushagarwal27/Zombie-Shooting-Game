import Phaser from "phaser";

class GameOverScreen extends Phaser.Scene {
  constructor() {
    super({ key: "GameOverScreen" });
    this.score = 0;
    this.scoreText = null;
  }

  init(data) {
    this.score = data;
  }

  preload() {}

  create() {
    this.add
      .text(this.game.config.width / 2, 120, "Game Over", {
        font: "bold 38px sans-serif",
        color: "white",
      })
      .setOrigin(0.5, 0.5);

    this.add
      .text(
        this.game.config.width / 2,
        this.game.config.height / 2 - 130,
        `Your score: ${this?.score}`,
        { font: "bold 24px sans-serif", color: "#ccceee" },
      )
      .setOrigin(0.5, 0.5);

    const textBtn = this.add
      .text(0, 0, "Play Again", {
        font: "bold 30px sans-serif",
        color: "black",
      })
      .setOrigin(0.5, 0.5);

    const containerBtn = this.add.container(
      this.game.config.width / 2,
      this.game.config.height / 2,
    );
    const containerBg = this.add
      .rectangle(0, 0, 260, 60, 0xffffff)
      .setOrigin(0.5, 0.5);
    containerBtn.add(containerBg);
    containerBtn.add(textBtn);

    containerBg.on("pointerover", () => {
      containerBg.setFillStyle(0xffffff, 0.8);
    });

    containerBg.on("pointerout", () => {
      containerBg.setFillStyle(0xffffff, 1);
    });

    containerBg.setInteractive();

    containerBg.on("pointerup", (e) => {
      this.scene.start("GameScene");
    });
  }

  update() {}
}

export default GameOverScreen;

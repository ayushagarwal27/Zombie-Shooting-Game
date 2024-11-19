import Phaser from "phaser";

class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenuScene" });
  }

  init(data) {}

  preload() {}

  create() {
    const textBtn = this.add
      .text(0, 0, "Start the Game", {
        font: "bold 30px sans-serif",
        color: "black",
      })
      .setOrigin(0.5, 0.5);

    this.add
      .text(this.game.config.width / 2, 120, "Shooting Game", {
        font: "bold 42px sans-serif",
        color: "white",
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

export default MainMenuScene;

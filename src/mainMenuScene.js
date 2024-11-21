import Phaser from "phaser";

class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenuScene" });

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
    this.add
      .text(this.game.config.width / 2, 120, "Shooting Game", {
        font: "bold 42px sans-serif",
        color: "white",
      })
      .setOrigin(0.5, 0.5);

    // Game Start Button
    const textBtn = this.add
      .text(0, 0, "Start the Game", {
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
      this.scene.start("GameScene", {
        isSoundOn: this.isSoundOn,
        isMusicOn: this.isMusicOn,
        soundVolume: this.soundVolume,
        musicVolume: this.musicVolume,
      });
    });

    this.add
      .text(this.game.config.width / 2, 120, "Shooting Game", {
        font: "bold 42px sans-serif",
        color: "white",
      })
      .setOrigin(0.5, 0.5);

    //   Settings Button

    const settingsText = this.add
      .text(0, 0, "Settings", {
        font: "bold 30px sans-serif",
        color: "black",
      })
      .setOrigin(0.5, 0.5);
    const settingsBtn = this.add.container(
      this.game.config.width / 2,
      this.game.config.height / 2 + 70,
    );
    const settingsBtnBg = this.add
      .rectangle(0, 0, 260, 60, 0xffffff)
      .setOrigin(0.5, 0.5);
    settingsBtn.add(settingsBtnBg);
    settingsBtn.add(settingsText);

    settingsBtnBg.on("pointerover", () => {
      settingsBtnBg.setFillStyle(0xffffff, 0.8);
    });

    settingsBtnBg.on("pointerout", () => {
      settingsBtnBg.setFillStyle(0xffffff, 1);
    });

    settingsBtnBg.setInteractive();

    settingsBtnBg.on("pointerup", (e) => {
      this.scene.start("SettingsScene", {
        isSoundOn: this.isSoundOn,
        isMusicOn: this.isMusicOn,
        soundVolume: this.soundVolume,
        musicVolume: this.musicVolume,
      });
    });
  }

  update() {}
}

export default MainMenuScene;

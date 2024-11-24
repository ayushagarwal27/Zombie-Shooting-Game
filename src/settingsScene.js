import Phaser from "phaser";

class SettingsScene extends Phaser.Scene {
  constructor() {
    super({ key: "SettingsScene" });
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
      .text(this.game.config.width / 2, 80, "Settings", {
        font: "bold 42px sans-serif",
        color: "white",
      })
      .setOrigin(0.5, 0.5);

    const htmlContainer = this.add
      .dom(this.game.config.width / 2, this.game.config.height / 2)
      .createFromCache("settings");

    const sound = htmlContainer.getChildByID("sound");
    const music = htmlContainer.getChildByID("music");
    const soundVolume = htmlContainer.getChildByID("sound-volume");
    const musicVolume = htmlContainer.getChildByID("music-volume");

    // Set Initial Values
    sound.checked = this.isSoundOn;
    music.checked = this.isMusicOn;
    soundVolume.value = this.soundVolume;
    musicVolume.value = this.musicVolume;

    sound.addEventListener("change", (e) => {
      this.isSoundOn = sound.checked;
    });

    music.addEventListener("change", (e) => {
      this.isMusicOn = music.checked;
    });

    soundVolume.addEventListener("change", (e) => {
      this.soundVolume = +e.target.value;
    });

    musicVolume.addEventListener("change", (e) => {
      this.musicVolume = +e.target.value;
    });

    const textBtn = this.add
      .text(0, 0, "Go back", {
        font: "bold 30px sans-serif",
        color: "black",
      })
      .setOrigin(0.5, 0.5);

    const containerBtn = this.add.container(
      this.game.config.width / 2,
      this.game.config.height - 60,
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
      const clickSound = this.sound.add("click-sound");
      clickSound.setMute(!this.isSoundOn);
      clickSound.setVolume(this.soundVolume * 0.1);
      clickSound.play();
      this.time.addEvent({
        delay: 250,
        callback: () => {
          this.scene.start("MainMenuScene", {
            isSoundOn: this.isSoundOn,
            isMusicOn: this.isMusicOn,
            soundVolume: this.soundVolume,
            musicVolume: this.musicVolume,
          });
        },
      });
    });
  }

  update() {}
}

export default SettingsScene;

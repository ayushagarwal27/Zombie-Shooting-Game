import Phaser from "phaser";
import GameScene from "./gameScene.js";
import LoadingScene from "./loadingScene.js";
import MainMenuScene from "./mainMenuScene.js";
import GameOverScreen from "./gameOverScreen.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#2d2d2d",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: {
        y: 100,
      },
    },
  },
  scene: [LoadingScene, MainMenuScene, GameScene, GameOverScreen],
};

const game = new Phaser.Game(config);

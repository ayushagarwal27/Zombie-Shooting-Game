import Phaser from "phaser";

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "bullet");
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
  }

  update() {
    if (this.x > this.scene.game.config.width) {
      this.destroy();
    }
  }
}

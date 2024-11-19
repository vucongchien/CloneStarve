
import Phaser from "phaser";
import Player from "./player"; 

class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
  }

  preload() {
    this.load.image("bg", "assets/background.png");
    this.load.image("player", "assets/skins/eogito.png");
  }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0, 0).setDisplaySize(this.scale.width, this.scale.height);

    this.player = new Player(this, this.scale.width / 2, this.scale.height / 2, "player");
  }

  update(time, delta) {
    this.player.update(delta / 1000); 
  }
}

export default GameScene;

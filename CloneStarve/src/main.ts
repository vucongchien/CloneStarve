// main.js
import Phaser from "phaser";
import GameScene from "./GameScene"; 
const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE, 
    width: "100%", 
    height: "100%",
    autoCenter: Phaser.Scale.CENTER_BOTH, 
  },
  scene: [GameScene],
};

const game = new Phaser.Game(config);

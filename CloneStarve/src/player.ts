import Phaser from "phaser";

export default class Player {
  private scene: Phaser.Scene;
  private sprite: Phaser.GameObjects.Sprite;
  private hp: number;
  private maxHp: number;
  private state: string;
  private speed: number;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    this.scene = scene;
    this.sprite = scene.add.sprite(x, y, texture).setOrigin(0.5, 0.5);

    this.hp = 100;
    this.maxHp = 100;
    this.state = "idle";
    this.speed = 200;
    this.cursors = (scene.input.keyboard as Phaser.Input.Keyboard.KeyboardPlugin).createCursorKeys();
  
  }

  update(delta: number) {
    this.movement(delta);
    this.rotateTowardsMouse();
  }

  private movement(delta: number) {
    let velocityX = 0;
    let velocityY = 0;

    if (this.cursors.left?.isDown) {
      velocityX = -this.speed;
      this.heal(10);
    } else if (this.cursors.right?.isDown) {
      velocityX = this.speed;
    }

    if (this.cursors.up?.isDown) {
      velocityY = -this.speed;
    } else if (this.cursors.down?.isDown) {
      velocityY = this.speed;
      this.takeDamage(10);
    }

    this.sprite.x += velocityX * delta;
    this.sprite.y += velocityY * delta;

    this.state = velocityX !== 0 || velocityY !== 0 ? "moving" : "idle";
  }

  private rotateTowardsMouse() {
    const pointer = this.scene.input.activePointer;
    const angle = Phaser.Math.Angle.Between(this.sprite.x, this.sprite.y, pointer.x, pointer.y);
    this.sprite.setRotation(angle); 
  }

  private takeDamage(amount: number) {
    this.hp = Math.max(this.hp - amount, 0);
    if (this.hp === 0) {
      this.state = "dead";
      console.log("Player is dead!");
    }

    this.sprite.setTint(0xff0000);
    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0,
      duration: 100,
      yoyo: true,
      onComplete: () => {
        this.sprite.clearTint();
        this.sprite.alpha = 1;
      },
    });
  }

  private heal(amount: number) {
    this.hp = Math.min(this.hp + amount, this.maxHp);

    this.sprite.setTint(0x00ff00);
    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 2,
      duration: 100,
      yoyo: true,
      onComplete: () => {
        this.sprite.clearTint();
        this.sprite.alpha = 1;
      },
    });
  }
}

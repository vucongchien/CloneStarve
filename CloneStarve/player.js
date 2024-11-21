import Phaser from "phaser";

export default class Player {
  constructor(scene, x, y, texture) {
    this.scene = scene;
    this.sprite = scene.add.sprite(x, y, texture).setOrigin(0.5, 0.5);

    this.hp = 100;
    this.maxHp = 100;
    this.state = "idle";
    this.speed = 200;
    this.cursors = scene.input.keyboard.createCursorKeys();
    
  }

  update(delta) {
    this.movement(delta);
    this.rotateTowardsMouse();
  }

  movement(delta) {
    let velocityX = 0;
    let velocityY = 0;

    if (this.cursors.left.isDown) {
      velocityX = -this.speed;
      this.heal(10);
    } else if (this.cursors.right.isDown) {
      velocityX = this.speed;
    }

    if (this.cursors.up.isDown) {
      velocityY = -this.speed;
    } else if (this.cursors.down.isDown) {
      velocityY = this.speed;
      this.takeDamage(10);
    }

    this.sprite.x += velocityX * delta;
    this.sprite.y += velocityY * delta;

    if (velocityX !== 0 || velocityY !== 0) {
      this.state = "moving";
    } else {
      this.state = "idle";
    }
  }
  rotateTowardsMouse() {
    const pointer = this.scene.input.activePointer; 
    const angle = Phaser.Math.Angle.Between(
      this.sprite.x+this.sprite.displayWidth/2,
      this.sprite.y,
      pointer.x,
      pointer.y
    );
    this.sprite.setRotation(angle-90); 
  }

  takeDamage(amount) {
    this.hp -= amount;
    if (this.hp <= 0) {
      this.hp = 0;
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

  heal(amount) {
    this.hp += amount;
    if (this.hp > this.maxHp) {
      this.hp = this.maxHp;
    }

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

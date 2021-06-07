class Player {

    constructor(x, y) {

        this.x = x;
        this.y = y;
        this.tile = person6;
    }

    display() {

        imageMode(CENTER);
        image(this.tile, this.x * cellSize, this.y * cellSize - 65, 382/3, 805/3);
    }

    move(key) {

        if (key == UP_ARROW || key == 87) {
            plant(player.x, player.y);
            this.y -= 1;

        } else if (key == DOWN_ARROW || key == 83) {
            plant(player.x, player.y);
            this.y += 1;

        } else if (key == LEFT_ARROW || key == 65) {
            plant(player.x, player.y);
            this.x -= 1;

        } else if (key == RIGHT_ARROW || key == 68) {
            plant(player.x, player.y);
            this.x += 1;
        }
        if (this.x < 0) {
            this.x = cells.length - 1;

        } else if (this.x >= cells.length) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = cells[0].length - 1;

        } else if (this.y >= cells[0].length) {
            this.y = 0;
        }
    }

    morph(creature) {

        this.tile = creature.tile;
    }
}

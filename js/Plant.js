class Plant {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.tiles = [agave1, cactus1, dandelion1, flower1, flower3, fungus1, pumpkin1, reed2, rose1, tropical2, tropical3];

        this.tile = "";
        this.alive = false;
        this.cached = this.alive;
    }

    display() {

        if (this.tile != "") {

            imageMode(CENTER);
            image(this.tile, this.x * cellSize, this.y * cellSize - 75, 382/3, 805/3);
        }
    }

    die() {

        if (this.tile != "") {
            this.tile = "";
            this.alive = false;
        }
    }

    birth() {

        if (this.tile == "") {
            this.tile = random(this.tiles);
            this.alive = true;
        }
    }

    cache() {

        this.cached = this.alive;
    }

    continue() {

        this.alive = this.cached;
    }
}

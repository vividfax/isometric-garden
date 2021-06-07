class Plant {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.tiles = [agave1, cactus1, dandelion1, flower1, flower3, fungus1, pumpkin1, reed2, rose1, tropical2, tropical3];

        this.tile = "";
        this.cached = "";
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
        }
    }

    birth() {

        if (this.tile == "") {
            this.tile = random(this.tiles);
        }
    }

    cache() {

        this.cached = this.tile;
    }

    continue() {

        this.tile = this.cached;
    }
}

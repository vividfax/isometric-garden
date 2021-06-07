class Tree {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.tiles = [bamboo1, bush4, fruit_tree1, palm2, tomato1, tree2, tree3, tropical1];

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

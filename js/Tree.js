class Tree {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.tiles = [bamboo1, bush4, fruit_tree1, palm2, tomato1, tree2, tree3, tropical1];

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

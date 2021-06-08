class Plant {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.shrubs = [agave1, cactus1, dandelion1, flower1, flower3, fungus1, pumpkin1, reed2, rose1, tropical2, tropical3];
        this.trees = [bamboo1, bush4, fruit_tree1, palm2, tomato1, tree2, tree3, tropical1];

        this.tile = "";
        this.isTree = false;
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

            if (random() > 0.5) {

                this.tile = random(this.trees);
                this.isTree = true;

            } else {

                this.tile = random(this.shrubs);
                this.isTree = false;
            }
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

class Cell {

    constructor(x, y, state) {

        this.x = x;
        this.y = y;
        this.state = state;
        this.cache;
        this.tile;
        this.age;
        this.size = 0;

        this.tile = "";
    }

    display() {

        if (this.tile != " " && this.tile != "") {
            imageMode(CENTER);
            image(this.tile, this.x * cellSize, this.y * cellSize - 75, 382/3, 805/3);
        }
        if (this.x == player.x && this.y == player.y) {

            player.display();
            return;
        }

    }

    update() {

        if (!this.cache && this.state && (this.tile == "" || this.tile == " ")) {
            this.tile = this.assignType();

        } else if (!this.state) {
            this.tile = " ";

        } else if (this.tile == "") {
            this.tile = this.assignType();
        }
        if (player.x == this.x && player.y == this.y) {
            return;
        }
        if (this.cache == this.state && this.state) {
            this.age += 1;
        } else {
            this.age = 0;
        }
    }

    assignType() {

        let tileset = [agave1, bamboo1, bush4, cactus1, dandelion1, flower3, fruit_tree1, fungus1, palm2, pumpkin1, reed2, rose1, tomato1, tree2, tree3, tropical1, tropical2, tropical3];

        return random(tileset);
    }
}

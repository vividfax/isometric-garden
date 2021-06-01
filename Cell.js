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

        if (this.x == player.x && this.y == player.y) {

            player.display();
            return;
        }
        if (this.tile != " " && this.tile != "") {
            imageMode(CENTER);
            image(this.tile, this.x * cellSize, this.y * cellSize - 40, 382/5, 805/5);
        }
    }

    update() {

        let tileset = [agave1, bamboo1, bush3, bush4, cactus1, dandelion1, flower1, flower3, fruit_tree1, fungus1, palm2, pumpkin1, reed2, reeds1, rose1, tomato1, tree2, tree3, tropical1, tropical2, tropical3];

        if (!this.cache && this.state) {
            this.tile = random(tileset);

        } else if (!this.state) {
            this.tile = " ";

        } else if (this.tile == "") {
            this.tile = random(tileset);
        }
        if (player.x == this.x && player.y == this.y) {
            return;
        }
        if (this.cache == this.state && this.state) {
            this.age += 1;
        } else {
            this.age = 0;
        }
        if (this.age == 6 && random() > 0.7) {
            this.tile = random(tileset);
        }
    }
}

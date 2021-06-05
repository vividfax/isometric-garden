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
        }
        let animalCount = countPlants() / 20;

        if (animalCount > animals.length) {
            animalCount = animals.length;
        }
        // animalCount -= player.shadows.length;

        for (let i = 0; i < animalCount; i++) {
            if (this.x == animals[i].x && this.y == animals[i].y) {

                animals[i].display();
            }
        }
        // for (let i = 0; i < player.shadows.length; i++) {
        //     if (this.x == player.xFootsteps[i+1] && this.y == player.yFootsteps[i+1]) {
        //     player.displayShadow(i);
        //     }
        // }
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

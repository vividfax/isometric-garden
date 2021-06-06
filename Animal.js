class Animal {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        let animals = [bee1, beetle1, bird1, crow1, deer1, duck1, fox1, goose1, hedgehog1, possum1, rabbit2];

        this.tile = random(animals);
    }

    display() {

        if (this.tile != "") {

            imageMode(CENTER);
            image(this.tile, this.x * cellSize, this.y * cellSize - 65, 382/3, 805/3);
        }
    }

    move() {

        let direction = random([0, 1, 2, 3]);

        if (random() > 0.5) {

            switch (direction) {
                case 0:
                    this.x += 1;
                    break;
                case 1:
                    this.x -= 1;
                    break;
                case 2:
                    this.y += 1;
                    break;
                case 3:
                    this.y -= 1;
                    break;
            }
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
}

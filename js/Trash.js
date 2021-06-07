let trashInteracted = false;
let trashClearedCount = 0;

class Trash {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        let tiles = [bag1, book1, book2, card1, cinderblock1, coin1, cone2, dice1, envelope1, gas_can1, laundry1, mug1, pencil1, rubble1, sandal1, shoe1, teddybear1, tire1, trash1];

        this.tile = random(tiles);
    }

    display() {

        if (this.tile != "") {

            imageMode(CENTER);
            image(this.tile, this.x * cellSize, this.y * cellSize - 75, 382/3, 805/3);
        }
    }

    clear() {

        if (this.tile != "") {

            this.tile = "";
            trashInteracted = true;
            trashClearedCount++;
        }
    }
}

class Word {

    constructor(words, x, y) {

        this.words = words;
        this.x = x;
        this.y = y;
    }

    display() {

        push();

        fill("#333");
        textFont("Fredericka the Great");
        textAlign(CENTER, CENTER);
        textSize(16);
        text(this.words, this.x * cellSize, this.y * cellSize);

        pop();
    }
}

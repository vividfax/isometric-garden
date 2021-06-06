let colors = {
    dark: "#CAAED3",
    mid: "#D8CDDF",
    light: "#ffffff",
}
let cells;
let player;
let animals = [];

let cellSize = 30;

let animalCount = 0;

let hint = "";

let sine;
let waves;
let interacted = false;

function setup() {

    createCanvas(windowWidth, windowHeight);

    createBackground();

    let cols = floor(windowWidth / cellSize - 1);
    let rows = floor(windowHeight / cellSize - 1);

    if (cols % 2 == 1) {
        cols += 1;
    }
    cells = [...Array(cols)].map(e => Array(rows));

    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {

            cells[i][j] = new Cell(i, j, "");
            cells[i][j].state = false;
        }
    }
    player = new Player(int(cells.length / 2) - 1, int(cells[0].length / 2) - 1);

    for (let i = 0; i < 50; i++) {

        animals[i] = new Animal(floor(random(cols)), floor(random(rows)));
    }

    sine = new Audio("sine.ogg");
    sine.loop = true;
    waves = new Audio("waves.ogg");
    waves.loop = true;
}

function draw() {

    updatePixels();

    if (frameCount % (floor(24 * 0.5)) == 1) {
        mirror();
        live();
        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                cells[i][j].update();
            }
        }
        for (let i = 0; i < animals.length; i++) {

            animals[i].move();
        }
    }
    for (let i = 0; i < animalCount; i++) {
        if (animals[i].x == player.x && animals[i].y == player.y) {

            if (player.tile == person6) {
                hint = "press spacebar to switch creature";
            }
            if (keyIsDown(32)) {
                player.tile = animals[i].tile;
            }
        }
    }
    push();

    translate(width - cells.length * cellSize, height - cells[0].length * cellSize);

    for (let j = 0; j < cells[0].length; j++) {
        for (let i = 0; i < cells.length; i++) {
            cells[i][j].display();
        }
    }
    pop();

    noStroke();
    fill(186, 149, 192, 120);
    rect(0, 0, width, height);

    filter(POSTERIZE, 40);

    displayHint();
    hint = "";

}

function keyPressed() {

    if (!interacted) {

	    sine.play();
        // waves.play();
        interacted = true;
    }
    player.move(keyCode);
}

function live() {

    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {

            cells[i][j].cache = cells[i][j].state;
        }
    }
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {

            let neighbours = 0;

            for (let k = -1; k <= 1; k++) {
                for (let l = -1; l <= 1; l++) {

                    let x = i + k;
                    let y = j + l;

                    if (x < 0) {
                        x = cells.length - 1;

                    } else if (x >= cells.length) {
                        x = 0;
                    }
                    if (y < 0) {
                        y = cells[i].length - 1;

                    } else if (y >= cells[i].length) {
                        y = 0;
                    }
                    neighbours += cells[x][y].cache;
                }
            }
            neighbours -= cells[i][j].cache;

            if (!cells[i][j].cache && neighbours == 3) {
                cells[i][j].state = true;

            } else if (cells[i][j].cache && neighbours <= 1) {
                cells[i][j].state = false;

            } else if (cells[i][j] && neighbours >= 4) {
                cells[i][j].state = false;

            } else {
                cells[i][j].state = cells[i][j].cache;
            }
        }
    }
}

function mirror() {

    for (let i = 0; i < cells.length / 2; i++) {
        for (let j = 0; j < cells[i].length; j++) {

            if (cells[i][j].state) {
                cells[cells.length - 1 - i][j].state = true;
            }
        }
    }
    for (let i = 0; i < cells.length / 2; i++) {
        for (let j = 0; j < cells[i].length; j++) {

            if (cells[cells.length - 1 - i][j].state) {
                cells[i][j].state = true;
            }
        }
    }
}

function countPlants() {

    let plantCount = 0;

    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {

            if (cells[i][j].state) {
                plantCount++;
            }
        }
    }
    return plantCount;
}

function plant(x, y) {

    cells[x][y].state = true;
    cells[x][y].assignType();
    cells[x][y].update();
}

function createBackground() {

    let colorA = colors.dark;
    let colorB = colors.light;

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {

            let col;

            if (random() > 0.5) {
                col = colorLerp(colorA, colorB, noise(i*0.002, j*0.002));

            } else {
                col = colors.mid;
            }
            set(i, j, color(col));
        }
    }
    updatePixels();
}

function colorLerp(a, b, ratio) {

    let ah = parseInt(a.replace(/#/g, ""), 16),
        ar = ah >> 16,
        ag = ah >> 8 & 0xff,
        ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ""), 16),
        br = bh >> 16,
        bg = bh >> 8 & 0xff,
        bb = bh & 0xff,
        rr = ar + ratio * (br - ar),
        rg = ag + ratio * (bg - ag),
        rb = ab + ratio * (bb - ab);

    return "#" + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}

function displayHint() {

    if (hint == "") {
        return;
    }
    fill(0, 50);
    rect(0, height - 100, width, height);
    fill(colors.light);
    textSize(20);
    textFont("Fredericka the Great");
    textAlign(CENTER, CENTER);
    text(hint, width / 2, height - 50);
}

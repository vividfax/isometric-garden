let colors = {
    dark: "#CAAED3",
    mid: "#D8CDDF",
    light: "#ffffff",
};
let cols, rows;

let trees;
let plants;
let player;
let animals = [];
let trash = [];

let cellSize = 30;

let hint = "";

let interacted = false;

function setup() {

    createCanvas(windowWidth, windowHeight);
    createBackground();

    cols = floor(windowWidth / cellSize - 1);
    rows = floor(windowHeight / cellSize - 1);

    if (cols % 2 == 1) {
        cols += 1;
    }
    cells =[...Array(cols)].map(e => Array(rows));
    trees = [...Array(cols)].map(e => Array(rows));
    plants = [...Array(cols)].map(e => Array(rows));

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            trees[i][j] = new Tree(i, j);
            plants[i][j] = new Plant(i, j);
        }
    }
    player = new Player(cols / 2 - 1, rows / 2 - 1);

    for (let i = 0; i < 50; i++) {

        animals[i] = new Animal(floor(random(cols)), floor(random(rows)));
    }
    for (let i = 0; i < 10; i++) {

        trash[i] = new Trash(floor(random(cols)), floor(random(rows)));
    }
}

function draw() {

    updatePixels();

    if (frameCount % (floor(24 * 0.5)) == 1) {

        live(trees);
        live(plants);

        trashKill();

        for (let i = 0; i < animals.length; i++) {

            animals[i].move();
        }
    }
    displayAll();

    displayFilter();
    displayHint();
}

function live(species) {

    mirror(species);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            species[i][j].cache();
        }
    }
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            let neighbours = getNeighbours(species, i, j);

            if (species[i][j].cached == "" && neighbours == 3) {
                console.log('hi')
                species[i][j].birth();

            } else if (species[i][j].cached != "" && neighbours <= 1) {
                species[i][j].die();

            } else if (species[i][j].cached != "" && neighbours >= 4) {
                species[i][j].die();

            } else {
                species[i][j].continue();
            }
        }
    }
}

function mirror(species) {

    for (let i = 0; i < cols / 2; i++) {
        for (let j = 0; j < rows; j++) {

            if (species[i][j].tile != "") {
                species[cols - 1 - i][j].birth();
            }
        }
    }
    for (let i = 0; i < cols / 2; i++) {
        for (let j = 0; j < rows; j++) {

            if (species[cols - 1 - i][j].tile != "") {
                species[i][j].birth();
            }
        }
    }
}

function getNeighbours(species, i, j) {

    let neighbours = 0;

    for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {

            let x = i + k;
            let y = j + l;

            if (x < 0) {
                x = cols - 1;

            } else if (x >= cols) {
                x = 0;
            }
            if (y < 0) {
                y = rows - 1;

            } else if (y >= rows) {
                y = 0;
            }
            if (species[x][y].cached != "") {
                neighbours++;
            }
        }
    }
    if (species[i][j].cached != "") {
        neighbours--;
    }
    return neighbours;
}


function trashKill() {

    for (let i = 0; i < trash.length; i++) {

        plants[trash[i].x][trash[i].y].die();
        trees[trash[i].x][trash[i].y].die();
    }
}

function displayAll() {

    push();

    translate(width - cells.length * cellSize, height - cells[0].length * cellSize);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            trees[i][j].display();
            plants[i][j].display();

            if (player.x == i && player.y == j) {
                player.display();
            }
            for (let k = 0; k < trash.length; k++) {

                if (trash[k].x == i && trash[k].y == j) {
                    trash[k].display();
                }
            }

            let animalCount = floor(countGreenery() / 20 - 1);

            if (animalCount > animals.length) {
                animalCount = animals.length;
            }
            for (let k = 0; k < animalCount; k++) {

                if (animals[k].x == i && animals[k].y == j){
                    animals[k].display();
                }
                if (animals[k].x == player.x && animals[k].y == player.y) {

                    if (player.tile == person6) {
                        hint = "press SPACE to switch creature";
                    }
                    if (keyIsDown(32)) {
                        player.morph(animals[k]);
                    }
                }
            }
        }
    }
    pop();
}

function keyPressed() {

    if (!interacted) {

	    sine.play();
        interacted = true;
    }
    player.move(keyCode);
}

function countGreenery() {

    let count = 0;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            if (trees[i][j].tile != "" || plants[i][j].tile != "") {
                count++;
            }
        }
    }
    return count;
}

function plant(x, y) {

    if (random() > 0.5) {
        trees[x][y].birth();
    } else {
        plants[x][y].birth();
    }
    trashKill();
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

function displayFilter() {

    noStroke();
    fill(186, 149, 192, 120);
    rect(0, 0, width, height);

    filter(POSTERIZE, 40);
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

    hint = "";
}

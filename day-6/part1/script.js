const fs = require('fs');
const {displayMap} = require("./utils/utils");
const text = fs.readFileSync('./input.txt', 'utf8');

const lines = text.split('\n');

const GUARDIAN = "^";
const OBSTRUCTION = "#";
const VISITED = "X";

let textMatrix = [[]];
let guardianPosition = {
    x: 0, // horizontal
    y: 0, // vertical
    direction: "up"
};

let isFinal = false;

lines.forEach((line, index) => {
    const letters = line.split('');

    if (letters.includes(GUARDIAN)) {
        const xPos = letters.indexOf(GUARDIAN); // horizontal
        const yPos = index; // vertical

        guardianPosition.x = xPos;
        guardianPosition.y = yPos;
    }

    // create textMatrix using the line and index
    textMatrix[index] = letters;
});

let {x, y, direction} = guardianPosition;

const goUp = () => {
    if (direction === "up") {
        if (!textMatrix?.[y - 1]?.[x]) {
            isFinal = true;
            return;
        }

        if (textMatrix[y - 1][x] === OBSTRUCTION) {
            direction = "right";
        } else {
            textMatrix[y - 1][x] = VISITED;
            y--;
        }
    }
}

const goRight = () => {
    if (direction === "right") {
        if (!textMatrix?.[y]?.[x + 1]) {
            isFinal = true;
            return;
        }

        if (textMatrix[y][x + 1] === OBSTRUCTION) {
            direction = "down";
        } else {
            textMatrix[y][x + 1] = VISITED;
            x++;
        }
    }
}

const goDown = () => {
    if (direction === "down") {
        if (!textMatrix?.[y + 1]?.[x]) {
            isFinal = true;
            return;
        }

        if (textMatrix[y + 1][x] === OBSTRUCTION) {
            direction = "left";
        } else {
            textMatrix[y + 1][x] = VISITED;
            y++;
        }
    }
}

const goLeft = () => {
    if (direction === "left") {
        if (!textMatrix?.[y]?.[x - 1]) {
            isFinal = true;
            return;
        }

        if (textMatrix?.[y]?.[x - 1] === OBSTRUCTION) {
            direction = "up";
        } else {
            textMatrix[y][x - 1] = VISITED;
            x--;
        }
    }
}

while (!isFinal) {
    textMatrix[y][x] = VISITED;
    goUp();
    goLeft();
    goRight();
    goDown();
    displayMap(x, y, direction, textMatrix);
}

const csvText = textMatrix.map(row => row.join("")).join("\n");

const result = textMatrix.flat().filter(item => item === VISITED).length;

// Displayed lines to check for logic inconsistencies in code
fs.writeFile('./export.txt', csvText, err => {
    if (err) {
        console.error(err);
    } else {
        // file written successfully
    }
});

console.log(result);

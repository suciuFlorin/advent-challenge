const fs = require('fs');
const {displayMap} = require("./utils/utils");
const text = fs.readFileSync('./example.txt', 'utf8');

const lines = text.split('\n');

const GUARDIAN = "^";
const OBSTRUCTION = "#";

let totalInstancesFound = 0;
let textMatrix = [[]];
let guardianPosition = {
    x: 0, // horizontal
    y: 0, // vertical
    direction: "up"
};

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

let {x, y, up} = guardianPosition;

for (let i = 0; i <= 10; i++) {
    if (y > -1) {
        displayMap(x, y, textMatrix);
        y = y - 1;
    }
}




console.log(guardianPosition);

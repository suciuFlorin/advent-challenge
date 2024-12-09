const fs = require('fs');
const {searchDiagonally} = require("../../utils/utils");

// tested the script with "small.txt" for easy debugging
const text = fs.readFileSync('./vertical.txt', 'utf8');
const lines = text.split('\n');

const SEARCHED_WORD = "XMAS";

let totalInstancesFound = 0;
let textMatrix = [[]];

lines.forEach((line, index) => {
    const letters = line.split('');
    // create textMatrix using the line and index
    textMatrix[index] = letters;
});

const revTextMatrix = textMatrix.map((line) => line.slice().reverse())

totalInstancesFound+= searchDiagonally(textMatrix, SEARCHED_WORD);

totalInstancesFound+= searchDiagonally(revTextMatrix, SEARCHED_WORD);

if (totalInstancesFound === 2) {
    console.log("correct", totalInstancesFound);
} else {
    console.log("fail", totalInstancesFound);
}

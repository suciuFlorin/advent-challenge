const fs = require('fs');
const { searchAndFindWord} = require("./utils/utils");

// tested the script with "small.txt" for easy debugging
const text = fs.readFileSync('./input.txt', 'utf8');

const lines = text.split('\n');

const SEARCHED_WORD = "MAS";

let textMatrix = [[]];


lines.forEach((line, index) => {
    const letters = line.split('');
    // create textMatrix using the line and index
    textMatrix[index] = letters;
});



// searching for matching Items
const result = searchAndFindWord(SEARCHED_WORD, textMatrix);

console.log(result);

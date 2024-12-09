const fs = require('fs');
const {searchDiagonally, searchVertically, searchHorizontally} = require("./utils/utils");

// tested the script with "small.txt" for easy debugging
const text = fs.readFileSync('./input.txt', 'utf8');

const lines = text.split('\n');

const SEARCHED_WORD = "XMAS";

let totalInstancesFound = 0;
let textMatrix = [[]];


function revSearchDiagonally(textData, searchedWord) {
    const reversedTextData = textData.map((line) => line.reverse());

    return searchDiagonally(reversedTextData, searchedWord);
}

lines.forEach((line, index) => {
    const letters = line.split('');
    // create textMatrix using the line and index
    textMatrix[index] = letters;
});

// run horizontal lookup
const horizInstances = searchHorizontally(textMatrix,SEARCHED_WORD)
totalInstancesFound+= horizInstances;

// run vertical lookup
const vertInstances = searchVertically(textMatrix,SEARCHED_WORD)
totalInstancesFound+= vertInstances;

// run diagonal lookup
const diagInstances = searchDiagonally(textMatrix,SEARCHED_WORD)
totalInstancesFound += diagInstances;

// rum rev diagonal lookup
const revDiagInstances = revSearchDiagonally(textMatrix,SEARCHED_WORD)
totalInstancesFound += revDiagInstances;

console.log(totalInstancesFound);

const fs = require('fs');
const {searchDiagonally} = require("./utils/utils");

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
const {leftDiag, rightDiag} = searchDiagonally(textMatrix, SEARCHED_WORD);

console.log(leftDiag, rightDiag);

// create matching list with results and sum
let matchingList = { left: {}, right: {} };

// assign left to normal diag search
leftDiag.forEach((matchedElem) => {
    matchingList["left"][matchedElem.position] = matchedElem;
})

// assign right to reverse diag search
rightDiag.forEach((matchedElem) => {
    matchingList["right"][matchedElem.position] = matchedElem;
})

// split into left and right for clarity
const {left, right} = matchingList;

function getTotalMatching(left, right, table) {
    let matching = 0;
    const heightLen = table.length;
    const widthLen = table[0].length;

    let objectMapLeft = {};
    let objectMapRight = {};
    let arrayLeft = [];
    let arrayRight = [];

    for (let i = 0; i < heightLen; i++) {
        objectMapLeft[i] = Array.from(Array(widthLen).fill("-"));
        objectMapRight[i] = Array.from(Array(widthLen).fill("-"));
    }

    Object.keys(left).forEach(indexes => {
        const [ lineIndex, letterIndex ] = indexes.split("-");

        const row = objectMapLeft[lineIndex];
        row[letterIndex] = "A";
        objectMapLeft[lineIndex] = row;
    })

    Object.keys(right).forEach(indexes => {
        const [ lineIndex, letterIndex ] = indexes.split("-");

        const row = objectMapRight[lineIndex];
        row[letterIndex] = "A";
        objectMapRight[lineIndex] = row;
    })

   Object.values(objectMapLeft).map(row => {
        arrayLeft.push(row.join(""));
    })

    Object.values(objectMapRight).map(row => {
        arrayRight.push(row.join(""));
    })

    console.log(arrayRight)
    console.log(arrayLeft)

    arrayLeft.forEach((row, index) => {
        row.split("").forEach((letter, letterIndex) => {
            const rightRowLetter =  arrayRight[index].split("")[letterIndex];
            if (letter !== "-") {
                if ( letter === rightRowLetter) {
                    matching++;
                }
            }

        })
    })

    return matching;
}

// too high 2819
console.log(getTotalMatching(left, right, textMatrix));
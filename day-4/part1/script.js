const fs = require('fs');

const text = fs.readFileSync('./example.txt', 'utf8');

const lines = text.split('\n');

const SEARCHED_WORD = "XMAS";

let totalInstancesFound = 0;
let textMatrix = [[]];

function isMatchingWord(word) {
    let matchingWord = false;

    // we don't bother checking if the length doesn't match
    if (word.length !== SEARCHED_WORD.length) {
        return matchingWord;
    }

    // check if exact word
    if (word === SEARCHED_WORD) {
        return true;
    }

    // reverse word
    const reverseWord = word.split("").reverse().join('');

    // check if exact word but reversed
    if (reverseWord === SEARCHED_WORD) {
        return true;
    }

    return matchingWord;
}

function getWord(text, startIndex) {
    let word = "";
    const endIndex = startIndex + (SEARCHED_WORD.length - 1);

    text.forEach((letter, textIndex) => {
        if (textIndex >= startIndex && textIndex <= endIndex) {
            word+= letter;
        }
    })

    return word;
}

function searchVertically(textData) {
    let instancesFound = 0;
    const possibleResults = {};
    let verticalTextData = [[]];

    // read matrix vertically
    textData.forEach((line, lineIndex) => {
        for (let i = 0; i < line.length - 1; i++) {
            const letter = textData[lineIndex][i];

            if (letter) {
                // new array must be constructed before adding to it
                if (!verticalTextData[i]) {
                    verticalTextData[i] = [];
                }

                // transform into array
                verticalTextData[i]+=letter;
            }
        }
    })

    verticalTextData.forEach((textLine, textLineIndex) => {
        const line = textLine.split('');
        // read array letter by letter
        // get word and get is matching
        line.forEach((letter, letterIndex) => {
            // determine the word based on the letters index to satisfy the overlap rule
            const word = getWord(line, letterIndex);

            const isMatching = isMatchingWord(word);

            if (isMatching) {
                possibleResults[`${textLineIndex}-${letterIndex}`] = isMatching;
                instancesFound++;
            }
        })
    })

    return instancesFound;
}

function searchHorizontally(textData) {
    let instancesFound = 0;
    const possibleResults = {};

    textData.forEach((line, lineIndex) => {
        line.forEach((letter, letterIndex) => {
            // determine the word based on the letters index to satisfy the overlap rule
            const word = getWord(line, letterIndex);

            const isMatching = isMatchingWord(word);

            if (isMatching) {
                possibleResults[`${lineIndex}-${letterIndex}`] = isMatching;
                instancesFound++;
            }
        })
    })


    return instancesFound;
}

function searchDiagonally(textData) {
    // given a matrix of numbers find occurrences of the word XMAS diagonally
}

lines.forEach((line, index) => {
    const letters = line.split('');
    // create textMatrix using the line and index
    textMatrix[index] = letters;
});

// run horizontal lookup
totalInstancesFound+= searchHorizontally(textMatrix);

// run vertical lookup
totalInstancesFound+= searchVertically(textMatrix);

console.log(totalInstancesFound);
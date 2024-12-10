function getWord(text, startIndex, searchedWord) {
    let word = "";
    const endIndex = startIndex + (searchedWord.length - 1);

    // sometimes text can be empty (Not having TS can do this)
    if (!text.length) {
        return word;
    }

    text.forEach((letter, textIndex) => {
        if (textIndex >= startIndex && textIndex <= endIndex) {
            word+= letter;
        }
    })

    return word;
}

function isMatchingWord(word, searchedWord) {
    let matchingWord = false;

    // we don't bother checking if the length doesn't match
    if (word.length !== searchedWord.length) {
        return matchingWord;
    }

    // check if exact word
    if (word === searchedWord) {
        return true;
    }

    // reverse word
    const reverseWord = word.split("").reverse().join('');

    // check if exact word but reversed
    if (reverseWord === searchedWord) {
        return true;
    }

    return matchingWord;
}

function searchDiagonally(textData, searchedWord) {
    // creating the base index array
    let indexArray = Array.from(Array(textData[0].length).keys())
    let matchingItems = [];
    let revMatchingItems = [];

    let diagonalMatchedItems = {};
    let revDiagonalMatchedItems = {};

    let offset = textData[0].length - 1;

    textData.forEach((line, lineIndex) => {
        if (offset >= line.length) {
            indexArray.pop(); // we just pop the last index
            indexArray.unshift((offset)); // add the offset to the array to continue the order
        }

        for (let letterIndex = line.length - 1; letterIndex >= 0; letterIndex--) {
            if (!revDiagonalMatchedItems[indexArray[letterIndex]]) {
                revDiagonalMatchedItems[indexArray[letterIndex]] = [];
            }

            revDiagonalMatchedItems[indexArray[letterIndex]].push({letter: line[letterIndex], position: `${lineIndex}-${letterIndex}`});
        }

        for (let letterIndex = 0; letterIndex <= line.length - 1; letterIndex++) {
            if (!diagonalMatchedItems[indexArray[letterIndex]]) {
                diagonalMatchedItems[indexArray[letterIndex]] = [];
            }

            diagonalMatchedItems[indexArray[letterIndex]].push({letter: line[letterIndex], position: `${lineIndex}-${letterIndex}`});

            if ((line.length - 1) === letterIndex) {
                offset++;
            }
        }
    })

    Object.values(diagonalMatchedItems).map((diagObj, lineIndex, ) => {
        const line = diagObj.map((obj) => obj.letter);
        if (line.length >= searchedWord.length) {
            line.forEach((letter, letterIndex) => {
                // determine the word based on the letters index to satisfy the overlap rule
                const word = getWord(line, letterIndex, searchedWord);

                const isMatching = isMatchingWord(word, searchedWord);

                if (isMatching) {
                    diagonalMatchedItems[lineIndex][letterIndex].isMatching = isMatching;
                    matchingItems.push({isMatching, ...diagonalMatchedItems[lineIndex][letterIndex + 1]}); // To get the middle Letter
                }
            })
        }
    })

    Object.values(revDiagonalMatchedItems).map((diagObj, lineIndex, ) => {
        const line = diagObj.map((obj) => obj.letter);
        if (line.length >= searchedWord.length) {
            line.forEach((letter, letterIndex) => {
                // determine the word based on the letters index to satisfy the overlap rule
                const word = getWord(line, letterIndex, searchedWord);

                const isMatching = isMatchingWord(word, searchedWord);

                if (isMatching) {
                    revDiagonalMatchedItems[lineIndex][letterIndex].isMatching = isMatching;
                    revMatchingItems.push({isMatching, ...revDiagonalMatchedItems[lineIndex][letterIndex + 1]}); // To get the middle Letter
                }
            })
        }
    })

    return {leftDiag: matchingItems, rightDiag: revMatchingItems};
}

function printMatchingMap(data, table, isRev) {
    const heightLen = table.length;
    const widthLen = table[0].length;

    let objectMap = {};

    for (let i = 0; i < heightLen; i++) {
        objectMap[i] = Array.from(Array(widthLen).fill(" - "))
    }


    Object.keys(data).forEach(indexes => {
        const [ lineIndex, letterIndex ] = indexes.split("-");

        const row = objectMap[lineIndex];
        row[letterIndex] = " A ";
        objectMap[lineIndex] = row;
    })

    if (isRev) {
        console.log("Reversed");
    }

    Object.values(objectMap).map(row => {
        if (isRev) {
            console.log(row.reverse().join(""))
            row.reverse().join("");
        } else {
            console.log(row.join(""))
            row.join("");
        }
    })

    console.log("\n");
}

module.exports = {
    isMatchingWord,
    getWord,
    searchDiagonally,
    printMatchingMap
};
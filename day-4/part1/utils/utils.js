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
    let instancesFound = 0;

    const possibleResults = {};

    let diagonalArray = [[]];
    let offset = 0;

    // creating the base index array
    let indexArray = textData[0].map((_letter, letterIndex) => (letterIndex));

    textData.forEach((line) => {
        // this is the desired output we want to recreate using diagonal search
        // 1 2 3 4
        // 5 1 2 3
        // 6 5 1 2
        // 7 6 5 1
        // 8 7 6 5
        // 9 8 7 6

        if (offset >= line.length) {
            indexArray.unshift(offset); // add the offset to the array to continue the order
            indexArray.length = line.length; // we just cut to the right length because we no longer need out of bounds indexes
        }

        line.forEach((letter, letterIndex) => {
            if (!diagonalArray[indexArray[letterIndex]]) {
                diagonalArray[indexArray[letterIndex]] = [];
            }

            diagonalArray[indexArray[letterIndex]]+= letter;
            offset++;
        })
    })

    diagonalArray.forEach((diagLine, lineIndex, ) => {
        const line = diagLine.split('');
        const revLine = diagLine.split('').reverse(); // quick and dirty reverse

        line.forEach((letter, letterIndex) => {
            // determine the word based on the letters index to satisfy the overlap rule
            const word = getWord(line, letterIndex, searchedWord);

            const isMatching = isMatchingWord(word, searchedWord);

            if (isMatching) {
                possibleResults[`${lineIndex}-${letterIndex}`] = isMatching;
                instancesFound++;
            }
        })
    })

    return instancesFound;
}

function searchVertically(textData, searchedWord) {
    let instancesFound = 0;
    const possibleResults = {};
    let verticalTextData = [[]];

    // read matrix vertically
    textData.forEach((line, lineIndex) => {
        for (let i = 0; i < line.length; i++) {
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
            const word = getWord(line, letterIndex, searchedWord);

            const isMatching = isMatchingWord(word, searchedWord);

            if (isMatching) {
                possibleResults[`${textLineIndex}-${letterIndex}`] = isMatching;
                instancesFound++;
            }
        })
    })

    return instancesFound;
}

function searchHorizontally(textData, searchedWord) {
    let instancesFound = 0;
    const possibleResults = {};

    textData.forEach((line, lineIndex) => {
        line.forEach((letter, letterIndex) => {
            // determine the word based on the letters index to satisfy the overlap rule
            const word = getWord(line, letterIndex, searchedWord);

            const isMatching = isMatchingWord(word, searchedWord);

            if (isMatching) {
                possibleResults[`${lineIndex}-${letterIndex}`] = isMatching;
                instancesFound++;
            }
        })
    })

    return instancesFound;
}

module.exports = {
    isMatchingWord,
    getWord,
    searchDiagonally,
    searchVertically,
    searchHorizontally
};
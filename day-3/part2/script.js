const fs = require('fs');

const text = fs.readFileSync('./input.txt', 'utf8');

const lines = text.split('\n');

let totalSum = 0;
let dataToMultiply = [];

// added breaks to make it readable
const startGlyph = "\n[----START----]";
const stopGlyph = "\n[----STOP----]";

const targetDo = "do()";
const targetDoNot = `don't()`;

function mul(a,b) {
    return a*b
}

// testing
let exportText = "";

lines.forEach((line) => {
    let validMultiplications = "";

    line = line.replaceAll(targetDo, startGlyph).replaceAll(targetDoNot,stopGlyph); // replace with more visible conditions
    exportText+= line;

    let stoppedMulls = line.split(stopGlyph);

    if (stoppedMulls[0]) {
        validMultiplications+= stoppedMulls[0]; // added the first multiplications before the Stop condition is actioned
    }

    stoppedMulls.forEach((possibleMull) => {
        const [_first,...restStartConditions] = possibleMull.split(startGlyph);

        if (restStartConditions.length) { // if the rest condition exists then we must check to see if we've Missed a Stop
            restStartConditions.forEach((resMul) => {
                validMultiplications+=resMul;
            })
        }
    })


    // split validMultiplications in valid multiply actions
    const separateMul = validMultiplications.split('mul('); // "mul(" + "1,2)"

    separateMul.forEach((resMul) => {
        if (resMul.length > 4) {
            const endingGlyph = resMul.split(")") // "1,2" + ")"
            const potentialValue = endingGlyph[0]; // could be 1,2 or 1m or 1,322p[
            const lastCharacter = potentialValue[potentialValue.length - 1]; // must be number
            if (!isNaN(Number(lastCharacter))) {
                dataToMultiply.push(potentialValue);
            }
        }
    })
});

dataToMultiply.forEach((data) => {
    const [left, right] = data.split(',');

    if (!isNaN(Number(left)) && !isNaN(Number(right))) { // do one last check to see if anything slipped
        totalSum+= mul(left,right);
    }
})

// Displayed lines to check for logic inconsistencies in code
fs.writeFile('test/export.txt', exportText, err => {
    if (err) {
        console.error(err);
    } else {
        // file written successfully
    }
});

// 48 example passed
console.log(totalSum);
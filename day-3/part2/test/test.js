const fs = require('fs');

const text = fs.readFileSync('./export.txt', 'utf8');

const lines = text.split('\n');

let totalSum = 0;
let dataToMultiply = [];

function mul(a,b) {
    return a*b
}

lines.forEach((line) => {
    // split line in valid multiply actions
    const separateMul = line.split('mul('); // "mul(" + "1,2)"

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

// run test to see if the hand corrected export gives a different result then check logic to see what can be improved
console.log(totalSum);
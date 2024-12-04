const fs = require('fs');

const text = fs.readFileSync('./input.txt', 'utf8');

const lines = text.split('\n');

let reports = {};
let safeReports = 0;

lines.forEach((line, index) => {
    const report = line.trim().split(/\s+/); // Split by whitespace
    reports[index] = report.map((reportValue) => +reportValue);
});

Object.values(reports).forEach((report) => {
    let isIncreasing = false;

    if (report.length >= 2) {
        isIncreasing = report[0] < report[1]; // determine order from first 2 numbers
    }

    const isSafe = report.every((currentNumber, index) => {
        if (index === report.length - 1) { // check for last index in order to not get NaN as the next number
            return true;
        }

        const nextNumber = report[index + 1];

        const distanceBetweenNumbers = Math.abs(currentNumber - nextNumber); // distance between current and next number

        if (isIncreasing && currentNumber <= nextNumber) {
            return distanceBetweenNumbers !== 0 && distanceBetweenNumbers <= 3; // distance has to be between 1 and 3
        }

        if (!isIncreasing && currentNumber >= nextNumber) {
            return distanceBetweenNumbers !== 0 &&  distanceBetweenNumbers <= 3; // distance has to be between 1 and 3
        }
    });

    if (isSafe) {
        safeReports++;
    }
})


console.log(safeReports); // 236
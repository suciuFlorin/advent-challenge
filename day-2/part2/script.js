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
    let direction = false;
    let isCorrectionUsed = false;

    const directionsMap = report.map((number, index) => {
        const NexNumber = report?.[index + 1];
        return NexNumber ? number <= NexNumber : false;
    });

    directionsMap.pop(); // remove the last value because it's not valid

    const points = directionsMap.reduce(
        (accumulator, currentValue) => accumulator + Number(currentValue),
        0,
    );

    direction = points >= 0; // determine order based on a points system

    function isSafe(reportItem) {
        return reportItem.map((currentNumber, index) => {
            if (index === reportItem.length - 1) { // check for last index in order to not get NaN as the next number
                return true;
            }

            const nextNumber = reportItem[index + 1];

            const distanceBetweenNumbers = Math.abs(currentNumber - nextNumber); // distance between current and next number

            const isRespectingDirection = direction ? currentNumber <= nextNumber : currentNumber >= nextNumber;
            const isRespectingDistance = distanceBetweenNumbers !== 0 && distanceBetweenNumbers <= 3;

            if (isRespectingDirection && isRespectingDistance) {
                return true;
            } else {
                if (!isRespectingDirection || !isRespectingDistance) {
                    if (!isCorrectionUsed) {
                        const correctedReport = reportItem.slice();
                        correctedReport.splice(index + 1, 1);
                        isCorrectionUsed = true;
                        return isSafe(correctedReport);
                    } else {
                        return false;
                    }
                }
            }
        }).every((condition) => {
            return condition;
        });
    }

    if (isSafe(report)) {
        safeReports++;
    }
})


console.log(safeReports); // 268 (too low) || 837 (too high) || 680, 359 (not good)

const fs = require('fs');

// Read the text file synchronously
const text = fs.readFileSync('./input.txt', 'utf8');

// Step 1: Split the text into lines
const lines = text.split('\n');

// Step 2: Initialize two arrays
const arrayA = [];
const arrayB = [];

// Step 3: Process each line
lines.forEach(line => {
    const [num1, num2] = line.trim().split(/\s+/); // Split by whitespace
    arrayA.push(+num1); // Add the first number to array1
    arrayB.push(+num2); // Add the second number to array2
});

// sort numbers from smallest to biggest

const arrayASorted = arrayA.sort((a,b) => a-b);
const arrayBSorted = arrayB.sort((a,b) => a-b);

let sum = 0;

for (let i = 0; i < arrayASorted.length; i++) {
    // count the sum
    if (arrayASorted[i] >= arrayBSorted[i]) {
        sum += arrayASorted[i] - arrayBSorted[i];
    } else {
        sum += arrayBSorted[i] - arrayASorted[i];
    }
}

console.log(sum);
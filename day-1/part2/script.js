const fs = require('fs');

const text = fs.readFileSync('./input.txt', 'utf8');

const lines = text.split('\n');

const arrayA = [];
const arrayB = [];

lines.forEach(line => {
    const [num1, num2] = line.trim().split(/\s+/); // Split by whitespace
    arrayA.push(+num1);
    arrayB.push(+num2);
});


let sum = 0;

for (let i = 0; i < arrayA.length; i++) {
    const numberA = arrayA[i];

    const multiplier = arrayB.filter((value) => value === numberA)?.length || 0;

    sum+= numberA * multiplier;
}

console.log(sum);
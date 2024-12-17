function displayMap(x, y, direction, table) {
    const range = 5;
    const outOfBounds = Array.from(Array(table[0].length).fill("#"));
    let topRow = (table?.[y - 1] || outOfBounds).join('');
    let row = (table?.[y] || outOfBounds).join("");
    let bottomRow = (table?.[y + 1] || outOfBounds).join("");

    const rowLength =topRow.length;

    if (x === rowLength - range) {
        topRow = topRow.slice(x - range, rowLength - 1);
        row = row.slice(x - range, rowLength - 1);
        bottomRow = bottomRow.slice(x - range, rowLength - 1);
    } else {
        topRow = topRow.slice(x - range, x + range);
        row = row.slice(x - range, x + range);
        bottomRow = bottomRow.slice(x - range, x + range);
    }

    if (x === 0) {
        topRow = topRow.slice(0, range);
        row = row.slice(0, range);
        bottomRow = bottomRow.slice(0, range);
    }

    if (x === rowLength) {
        topRow = topRow.slice(rowLength - range, rowLength);
        row = row.slice(rowLength - range, range);
        bottomRow = bottomRow.slice(rowLength - range, range);
    }

    // console.clear();
    console.log(topRow);
    console.log(row);
    console.log(bottomRow);
    console.log({x, y, direction}, "\n");
}

module.exports = {
    displayMap,
}
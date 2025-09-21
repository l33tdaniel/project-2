import type { GridTile } from "./localTypes";

export const fillGrid = (grid: HTMLDivElement, rows: number, cols:number): GridTile[][] => {
    let tileMatrix: GridTile[][] = Array(10).fill(0).map(e => []); // make an array of 10 empty arrays
    for(let row = 1; row <= rows; row++) {  // iterate over row indicies
        const currentRow = document.createElement("div"); // make a div for the row
        currentRow.id = `grid-row-${row}`; // set id
        currentRow.classList.add("grid-row"); // set classes
        grid.appendChild(currentRow); // add to dom
        for(let col = 1; col <= cols; col++) { // for each col index
            const currentTile = document.createElement("div"); // make div for tile at x,y
            currentTile.id = `grid-tile-${row}-${col}`; // set id
            currentTile.classList.add("grid-tile", `grid-tile-row-${row}`, `grid-tile-col-${col}`); // set classes
            currentRow.appendChild(currentTile); // add to dom
            tileMatrix[row-1]![col-1] = { // update tilematrix
                row: row,
                col: col,
                element: currentTile
            };
        }
    }
    return tileMatrix;
}

// helper funciton to generate a-z aa-zz, etch labels for columns
 const ColLabels =(count: number): string[] => {
    const labels: string[] = [];
    for (let i = 0; i < count; i++) {
        let label ="";
        let n=i;
        while (n >= 0) {
            label = String.fromCharCode((n % 26) + 65) + label;
            n = Math.floor(n / 26) - 1;
        }
        labels.push(label);
        
    }
    return labels;
}; 

// function to add labels to the grid
export const addLabels = (rows: number, cols: number): void => {
    // Get the header row and column containers
    const headerRow = document.querySelector(".grid-header-row")!;
    const headerColumn = document.querySelector(".grid-header-column")!;

    // fill the header row with column labels (A, B, C, ...)
    const colLabels = ColLabels(cols);
    colLabels.forEach((label) => {
        const columnHeaderTile = document.createElement("div");
        columnHeaderTile.classList.add("grid-header-tile");
        columnHeaderTile.textContent = label;
        headerRow.appendChild(columnHeaderTile);
    });

    // fill  header column with row labels (1, 2, 3, ...)
    for (let row = 1; row <= rows; row++) {
        const rowHeaderTile = document.createElement("div");
        rowHeaderTile.classList.add("grid-header-tile");
        rowHeaderTile.textContent = row.toString();
        headerColumn.appendChild(rowHeaderTile);
    }
};
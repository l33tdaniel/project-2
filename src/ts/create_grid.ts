/*
File: createGrid.ts
Authors: Addison Bartelli, Marco Martinez
Creation Date: September 3, 2025
Description: Provides functions to create a dynamic DOM grid with labeled rows and columns.

Functions:
1. fillGrid(grid, rows, cols): creates a grid of tiles and returns a 2D array of GridTile.
2. addLabels(rows, cols): adds row and column header labels to the grid.
3. ColLabels(count): generates spreadsheet-style column labels.

Inputs/Outputs:
- fillGrid: inputs – grid container, number of rows, number of columns; output – 2D array of GridTile.
- addLabels: inputs – number of rows and columns; output – none (modifies DOM).
- ColLabels: input – number of columns; output – array of column labels.

External Sources: None
*/

import type { GridTile } from "./localTypes"; // Type definition for grid tiles

/**
 * fillGrid
 * Creates a grid of tiles in the DOM and returns a 2D array of GridTile objects.
 * Authors: Addison Bartelli, Marco Martinez
 */
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
    return tileMatrix; // return the 2D array of GridTile objects
}


/**
 * ColLabels
 * Generates spreadsheet-style column labels (A-Z, AA-ZZ, etc.)
 * Authors: Addison Bartelli, Marco Martinez
 */
 const ColLabels =(count: number): string[] => {
    const labels: string[] = []; // initialize column label array
    for (let i = 0; i < count; i++) {
        let label ="";
        let n=i;
        // convert column indices to alphabet characters
        while (n >= 0) {
            label = String.fromCharCode((n % 26) + 65) + label; // convert 0 to 'A', 1 to 'B', etc.
            n = Math.floor(n / 26) - 1; // move to next digit
        }
        labels.push(label); // add alphabet character to column label array 
    }
    return labels;
}; 


/**
 * addLabels
 * Adds row and column labels to the grid headers.
 * Authors: Addison Bartelli, Marco Martinez
 */
export const addLabels = (rows: number, cols: number): void => {
    // Get the header row and column containers
    const headerRow = document.querySelector(".grid-header-row")!;
    const headerColumn = document.querySelector(".grid-header-column")!;

    // fill the header row with column labels (A, B, C, ...)
    const colLabels = ColLabels(cols);
    colLabels.forEach((label) => {
        const columnHeaderTile = document.createElement("div"); // create a div element for the column label
        columnHeaderTile.classList.add("grid-header-tile"); // 
        columnHeaderTile.textContent = label; // display the column label
        headerRow.appendChild(columnHeaderTile);
    });

    // fill  header column with row labels (1, 2, 3, ...)
    for (let row = 1; row <= rows; row++) {
        const rowHeaderTile = document.createElement("div"); // create a div element for the row label
        rowHeaderTile.classList.add("grid-header-tile");
        rowHeaderTile.textContent = row.toString(); // display the row label
        headerColumn.appendChild(rowHeaderTile);
    }
};
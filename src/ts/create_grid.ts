import type { GridTile } from "./localTypes";

export const fillGrid = (grid: HTMLDivElement): GridTile[][] => {
    let gridArr: GridTile[][] = Array(10).fill(0).map(e => []);
    for(let row = 1; row <= 10; row++) {
        const currentRow = document.createElement("div");
        currentRow.id = `grid-row-${row}`;
        currentRow.classList.add("grid-row");
        grid.appendChild(currentRow);
        for(let col = 1; col <= 10; col++) {
            const currentTile = document.createElement("div");
            currentTile.id = `grid-tile-${row}-${col}`;
            currentTile.classList.add("grid-tile", `grid-tile-row-${row}`, `grid-tile-col-${col}`);
            currentRow.appendChild(currentTile);
            gridArr[row-1]![col-1] = {
                row: row,
                col: col,
                element: currentTile,
                flagged: false,
                clicked: false
            };
        }
    }
    return gridArr;
}
import { generateMinefield } from "./minefield_gen";

let minefield: number[][] | null = null; // Initialize minefield as null (minefield starts empty)
const rows = 10;
const cols = 10;
const mineCount = 10; // hardcoded 

export function startGame() {
    // Wait for the first click to generate minefield
    console.log("startGame called");
    const container = document.getElementById("grid")!;
    console.log(container); // should not be null
    container.addEventListener("click", firstClickHandler, { once: true }); // runs firstClickHandler when user clicks the container grid
}

function firstClickHandler(event: MouseEvent) {
    const target = event.target as HTMLElement; // the HTML element that was clicked

    if (!target.classList.contains("grid-tile")) return; // if the clicked element is not a grid tile, exit

    const { row, col } = getCellCoordinates(target); // get the row and column indices of the clicked tile
    // Generate minefield with safe zone around first click
    minefield = generateMinefield({ row, col }, rows, cols, 1, mineCount) // safeZone is set to radius 1 (so 3x3 area is safe)
    revealCell(row, col); // reveal the clicked cell

    // Listen for subsequent clicks
    const container = document.getElementById("grid")!;
    container.addEventListener("click", normalClickHandler);
}

function normalClickHandler(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.classList.contains("grid-tile")) return;

    const { row, col } = getCellCoordinates(target);
    revealCell(row, col);
}

// Reveal a cell and apply flood-fill if needed
function revealCell(row: number, col: number) {
    if (!minefield) return; // If minefield is not generated yet, exit....is this necessary

    const cell = getCellElement(row, col); // div element for specific cell
    // if cell doesn't exist or is already revealed, exit (during recursive calls, this prevents re-revealing)
    if (!cell || cell.classList.contains("revealed")) return; 

    const value = minefield[row]![col]!; // get the value of the cell in the minefield (0, 1, or 2)

    if (value === 1) {
        cell.textContent = "💣"; // Display mine
        cell.classList.add("revealed"); // Mark cell as revealed
        alert("Game Over! You clicked on a mine.");
        return;
    }

    cell.classList.add("revealed"); // Mark cell as revealed

    const adjacentMines = countAdjacentMines(row, col); // number of adjacent mines
    if (adjacentMines > 0) {
        cell.textContent = adjacentMines.toString(); // Display number of adjacent mines in cell
    }
    else {
        cell.textContent = ""; // Empty cell for 0 adjacent mines
    }

    // If no adjacent mines, recursively reveal neighboring cells (flood-fill)
    if (adjacentMines === 0) {
        // rowOffset = -1, 0, 1 (above, same, below); colOffset = -1, 0, 1 (left, same, right)
        for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
            for (let colOffset = -1; colOffset <= 1; colOffset++) {
                const newRow = row + rowOffset;
                const newCol = col + colOffset;
                
                // Makes sure newRow and newCol are within bounds 
                if (newRow >=0 && newRow < rows && newCol >= 0 && newCol < cols) {
                    revealCell(newRow, newCol); // Recursive call to reveal neighboring cell
                }
            }
        }
    }   
}

function countAdjacentMines(row: number, col: number): number {
    if (!minefield) return 0; // If minefield is not generated yet, return 0
    let count = 0;

    // Check all 8 neighboring cells
    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        for (let colOffset = -1; colOffset <= 1; colOffset++) {
            if (rowOffset === 0 && colOffset === 0) continue; // Skip the current cell
            const newRow = row + rowOffset;
            const newCol = col + colOffset;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && minefield[newRow]![newCol]! === 1) {
                count++;
            }
        }
    }
    return count;
}

// Helper functions:
// Get row and column indices from a clicked cell element
function getCellCoordinates(cell: HTMLElement): {row: number, col: number} {
    const rowDiv = cell.parentElement; 
    const rowsArray = Array.from(rowDiv!.parentElement!.children); // array of all row divs
    const row = rowsArray.indexOf(rowDiv!); // index of the row div 

    const colsArray = Array.from(rowDiv!.children); // array of all cell divs in that row
    const col = colsArray.indexOf(cell); // index of the clicked cell div in that row

    return { row, col };
}
// Get HTML element for a given row and column
function getCellElement(row: number, col: number): HTMLElement | null {
    const rowDiv = document.getElementById(`grid-row-${row + 1}`);
    if (!rowDiv) return null; // if row doesn't exist, return null
    return rowDiv.children[col] as HTMLElement; // otherwise, return the div element for the specific cell at [row, col]
}
/*
File: reveal.ts
Authors: Elizabeth Miller, Anya Combs, Janna Dungao, Addison Bartelli, Hunter Long, Brett Balquist
Creation Date: September 1, 2025
Description: Initializes the game, handles first click, normal clicks, revealing cells, flood-fill, victory and game-over checks.

Functions:
1. startGame(): Initializes the game board, sets first-click listener, reset button, and mine counter.
2. firstClickHandler(event): Handles the first user click, generates the minefield with safe zone, and reveals the first cell.
3. normalClickHandler(event): Handles subsequent clicks after the first click, revealing cells unless flagged.
4. revealCell(row, col): Reveals a cell, displays mines or numbers, applies flood-fill for empty cells, and checks for victory.
5. checkVictory(): Checks if all non-mine cells are revealed and shows a victory message if true.
6. countAdjacentMines(row, col): Counts the number of mines adjacent to a given cell.
7. getCellCoordinates(cell): Returns the row and column indices of a clicked cell element.
8. getCellElement(row, col): Returns the HTML element corresponding to a cell at (row, col) in the grid.

Inputs/Outputs:
- Inputs: User clicks on grid cells; mineCount from user input
- Outputs: Updates DOM elements, minefield array, and game status messages

External Sources: GitHub Copilot

Updated on 9/29/2025 to include the AI and audio
*/
import { generateMinefield } from "./minefield_gen";
import { getMineCount, setMineCount } from "./userMineCount";
import { showPlayingStatus, hideStatus } from "./status";
import { getFlaggedTiles, resetFlaggedTiles } from "./flagging";
import { startTimer, stopTimer, resetTimer } from "./timer";
import { makeAIMove, AIDifficulty } from "./ai_solver";
import type { GridTile } from "./localTypes";
import bombSoundFile from "../assets/sounds/explosion.mp3";
import yaySoundFile from "../assets/sounds/yay.mp3";
import youLoseFile from "../assets/sounds/youLose.mp3";

let minefield: number[][] | null = null; // Initialize minefield as null (minefield starts empty)
const rows = 10;
const cols = 10;

const bombSound = new Audio(bombSoundFile);
const yaySound = new Audio(yaySoundFile);
const youLose = new Audio(youLoseFile);


/**
 * startGame
 * Initializes the Minesweeper game board and sets up event handlers.
 * Authors: Elizabeth Miller, Anya Combs, Janna Dungao, GitHub Copilot, Brett Balquist
 */
export function startGame(tileMatrix: GridTile[][]) {
    // Wait for the first click to generate minefield
    console.log("startGame called");
    const gameover = document.getElementById("gameover"); // set gameover back to hidden
    gameover != null ? gameover.style.visibility = 'hidden' : null;
    setMineCount(() => {
        showPlayingStatus(); // show status once game starts
        const container = document.getElementById("grid")!;
        console.log(container); // should not be null
        container.addEventListener("click", (event) => firstClickHandler(event, tileMatrix), { once: true }); // runs firstClickHandler when user clicks the container grid
    });
    const rstbtn = document.getElementById('reset') as HTMLButtonElement;
    let countInput = document.getElementById('mineCount') as HTMLInputElement;
    resetFlaggedTiles(); // reset flagged tiles 2D array
    rstbtn.onclick = function() {
        console.log('Game reset');        
        countInput.value = '';
        
        // hide gameover or victory message
        const msg = document.getElementById("game-message")!;
        msg.style.visibility = "hidden";

        // need to reset board back to beginning first...
        const tiles = document.getElementsByClassName('grid-tile');
        for(let i = 0; i < tiles.length; i++) {
            const tile = tiles[i];
            tile?.classList.remove('revealed',);
            tile != null ? tile.textContent = '': null;
        }
        hideStatus(); // hide status when resetting game
        minefield = null;
        
        
        const grid = document.getElementById('grid');
        grid?.classList.remove('grid-disabled',); // re-enable grid
        location.reload(); // reload the page to reset the game
    };
}

/**
 * firstClickHandler
 * Handles first user click, generates minefield, and reveals the first cell.
 * Authors: Elizabeth Miller, Janna Dungao, Addison Bartelli, Hunter Long, GitHub Copilot, Brett Balquist
 */
function firstClickHandler(event: MouseEvent, tileMatrix: GridTile[][]) {
    const target = event.target as HTMLElement; // the HTML element that was clicked

    if (!target.classList.contains("grid-tile")) return; // if the clicked element is not a grid tile, exit

    const { row, col } = getCellCoordinates(target); // get the row and column indices of the clicked tile
    const flagged = getFlaggedTiles(row, col); // get the flagged ststus of the tile
    const container = document.getElementById("grid")!; // get the outer grid
    if (flagged !== undefined && flagged > 0) { // if tile flagged
        console.log(`Tile (${row},${col}) is flagged, cannot reveal.`);
        container.addEventListener("click", (event) => firstClickHandler(event, tileMatrix), { once: true }); // reapply first click listener
        return
    }; // If the cell is flagged, do not reveal it
    // Get user inputted mine count
    const mineCount = getMineCount();
    // Generate minefield with safe zone around first click
    minefield = generateMinefield({ row, col }, rows, cols, 1, mineCount) // safeZone is set to radius 1 (so 3x3 area is safe)
    startTimer(); // Starts the timer
    revealCell(row, col); // reveal the clicked cell
    container.addEventListener("click", (event) => normalClickHandler(event, tileMatrix)); // Listen for subsequent clicks
}

/**
 * normalClickHandler
 * Handles all clicks after the first click; ignores flagged tiles. 
 * Updated to include the AI
 * Authors: Elizabeth Miller, Hunter Long, GitHub Copilot, Brett Balquist
 */
function normalClickHandler(event: MouseEvent, tileMatrix: GridTile[][]) {
    const target = event.target as HTMLElement; // determine elememt clicked

    if (!target.classList.contains("grid-tile")) return; // ensure element is a gridtile

    const { row, col } = getCellCoordinates(target); // get x,y of gridtile

    const flagged = getFlaggedTiles(row, col);
    if (flagged !== undefined && flagged > 0) {
        console.log(`Tile (${row},${col}) is flagged, cannot reveal.`);
        return
    }; // If the cell is flagged, do not reveal it


    revealCell(row, col); // reveal tile

    // Integrate AI
    const aiDifficultyElement = document.getElementById("aiDifficulty") as HTMLSelectElement;
    const aiDifficulty = aiDifficultyElement.value;

    // Do the pick difficulty depending on the AI and do that move
    if (aiDifficulty !== "none" && minefield) {
        let difficulty: AIDifficulty;
        if (aiDifficulty === "easy") {
            difficulty = AIDifficulty.Easy;
        } else if (aiDifficulty === "medium") {
            difficulty = AIDifficulty.Medium;
        } else {
            difficulty = AIDifficulty.Hard;
        }
        makeAIMove(difficulty, minefield, tileMatrix);
    }
}

/**
 * revealCell
 * Reveals a cell and applies flood-fill if needed.
 * Updated to include sound effects
 * Authors: Elizabeth Miller, GitHub Copilot, Brett Balquist
 */
export function revealCell(row: number, col: number) {
    if (!minefield) return; // If minefield is not generated yet, exit....is this necessary

    const cell = getCellElement(row, col); // div element for specific cell
    // if cell doesn't exist or is already revealed, exit (during recursive calls, this prevents re-revealing)
    if (!cell || cell.classList.contains("revealed")) return; 

    const value = minefield[row]![col]!; // get the value of the cell in the minefield (0, 1, or 2)

    if (value === 1) {
        cell.textContent = "💣"; // Display mine
        cell.classList.add("revealed"); // Mark cell as revealed
        bombSound.play();//bomb go BOOM

        const grid = document.getElementById('grid'); // get outer grid
        grid?.classList.add('grid-disabled',);

        // Show "Game Over"
        const msg = document.getElementById("game-message");
        const msgText = document.getElementById("message-text");
        if (msg && msgText) {
            msgText.textContent = "Game Over";
            msg.style.visibility = "visible";
        }
        // Play the audo and stop the timer
        youLose.play()
        stopTimer();

        // show mines
        const tiles = document.getElementsByClassName('grid-tile');
        for (const tile of tiles) {
            const {row, col} = getCellCoordinates(tile as HTMLElement)
            const tileValue = minefield[row]![col]!;
            tileValue === 1 ? tile.textContent = "💣": null;
        }

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
    // Play the sound
    yaySound.currentTime = 0;
    yaySound.play();

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
    
    // Check for victory after revealing this cell
    checkVictory();
}

/**
 * checkVictory
 * Checks if all non-mine cells are revealed; displays "You Win!" message if so.
 * Authors: Elizabeth Miller, GitHub Copilot
 */
function checkVictory() {
    if (!minefield) return; // If minefield is not generated yet, exit

    // iterate over the minefield to check if all non-mine cells have been revealed
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = getCellElement(r, c); // get the div element for the cell
            const value = minefield[r]![c]!; // get the value of the cell in the minefield (0, 1, or 2)

            // if the cell is not a mine (value 0 or 2) and is not revealed, the game is not yet won
            if (value !== 1 && cell && !cell.classList.contains("revealed")) {
                return; // exit the function 
            }
        }
    }

    // If all non-mine cells are revealed, player wins
    const msg = document.getElementById("game-message");
    const msgText = document.getElementById("message-text");
    if (msg && msgText) {
        msgText.textContent = "You Win!";
        msg.style.visibility = "visible";
    }
    stopTimer();

    const grid = document.getElementById("grid");
    grid?.classList.add("grid-disabled",); // disable further clicks on the grid
}

/**
 * countAdjacentMines
 * Counts mines in the 8 surrounding cells.
 * Authors: Elizabeth Miller, GitHub Copilot
 */
export function countAdjacentMines(row: number, col: number): number {
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

/**
 * getCellCoordinates
 * Returns row and column indices of a given grid tile element.
 * Authors: Elizabeth Miller, GitHub Copilot
 */
function getCellCoordinates(cell: HTMLElement): {row: number, col: number} {
    const rowDiv = cell.parentElement; 
    const rowsArray = Array.from(rowDiv!.parentElement!.children); // array of all row divs
    const row = rowsArray.indexOf(rowDiv!); // index of the row div 

    const colsArray = Array.from(rowDiv!.children); // array of all cell divs in that row
    const col = colsArray.indexOf(cell); // index of the clicked cell div in that row

    return { row, col };
}

/**
 * getCellElement
 * Returns the HTML element of a cell at (row, col), or null if it doesn't exist.
 * Authors: Elizabeth Miller, GitHub Copilot
 */
function getCellElement(row: number, col: number): HTMLElement | null {
    const rowDiv = document.getElementById(`grid-row-${row + 1}`);
    if (!rowDiv) return null; // if row doesn't exist, return null
    return rowDiv.children[col] as HTMLElement; // otherwise, return the div element for the specific cell at [row, col]
}


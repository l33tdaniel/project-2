/*
File: minefield_gen.ts
Authors: Marco Martinez, Addison Bartelli
Creation Date: September 3, 2025
Description: Generates a Minesweeper minefield as a 2D array, ensuring a safe zone around the first click.

Functions:
1. generateMinefield(Fclick, rows, cols, safeZone, mineCount): generates a 2D array with mines randomly placed
   - Inputs:
       Fclick: {row: number, col: number} – coordinates of the first click
       rows: number – number of rows in the minefield
       cols: number – number of columns in the minefield
       safeZone: number – radius around first click where no mines are placed (default 0)
       mineCount: number – total number of mines to place
   - Output: 2D array of numbers representing the minefield:
       0 = empty, 1 = mine, 2 = first click

External Sources: None
*/


/**
 * generateMinefield
 * Generates a Minesweeper minefield with a guaranteed safe zone around the first click.
 * Authors: Marco Martinez, Addison Bartelli
 */
export function generateMinefield(
    Fclick: {row: number, col: number},
    rows: number, 
    cols: number,
    safeZone: number = 0,
    mineCount: number
    ): number[][] {
    
        // Initialize empty minefield with 0s
        const minefield: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
        // Creates safe zone around first click
        const safeZoneArea = new Set<string>();
        const startRow = Math.max(0, Fclick.row - safeZone);
        const endRow = Math.min(rows - 1, Fclick.row + safeZone);
        const startCol = Math.max(0, Fclick.col - safeZone);
        const endCol = Math.min(cols - 1, Fclick.col + safeZone);

        for (let r = startRow; r <= endRow; r++) {
            for (let c = startCol; c <= endCol; c++) {
                safeZoneArea.add(`${r},${c}`); // store safe tile coordinates as strings
            }
        }
        // end of safe zone creation

        let placedMines = 0;
        // randomly places mines in minefield until mineCount is reached
        while (placedMines < mineCount) {
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);
            
            // skip if tile is in safe zone or already has a mine
            if (safeZoneArea.has(`${row},${col}`) || minefield[row]![col] === 1) {
                continue;
            }

            minefield[row]![col] = 1; // place a mine
            placedMines++;
        }

        // Mark the first click tile specially with a 2
        minefield[Fclick.row]![Fclick.col] = 2; // mark first click position

        return minefield;
    
        // Fallback return in case the above code path is not taken
        return Array.from({ length: rows }, () => Array(cols).fill(0));
    }
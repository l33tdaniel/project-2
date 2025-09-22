/*
File: flagging.ts
Authors: Hunter Long, Addison Bartelli, Janna Dungao, Elizabeth Miller
Creation Date: September 3, 2025
Description: Handles flagging behavior for Minesweeper grid tiles, including tracking flagged tiles, 
             resetting the flag matrix, and adding right-click event handlers to tiles.

Functions:
1. getFlaggedTiles(row, col): returns the flagging status of a specific tile.
   - Inputs: row (number), col (number)
   - Output: 1 if flagged, 0 if not flagged, undefined if out of bounds

2. resetFlaggedTiles(): resets all flagged tiles to 0.
   - Inputs: none
   - Output: none (modifies internal flaggedTiles matrix)

3. setFlaggingHandlers(tileMatrix): adds right-click handlers to each tile for placing/removing flags.
   - Inputs: tileMatrix – 2D array of GridTile objects
   - Output: none (modifies DOM and flaggedTiles matrix, dispatches events)

External Sources: GitHub Copilot
*/

import type { GridTile } from "./localTypes"; // type definition for grid tiles
import { getMineCount } from "./userMineCount"; // import to check if mine count is set

let flaggedTiles: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]; // 2D array to track flagged tiles

/**
 * getFlaggedTiles
 * Returns the flag status of a specific tile.
 * Authors: Hunter Long, GitHub Copilot
 */
export const getFlaggedTiles = (row: number, col: number) => {
  if (row >= 10 || col >= 10) { // check that row exists
    return;
  }
  return flaggedTiles[row]![col]; // return flagging status of tile
}

/**
 * resetFlaggedTiles
 * Sets all entries in matrix to zero
 * Authors: Hunter Long, GitHub Copilot
 */
export const resetFlaggedTiles = () => {
  for (let r = 0; r < flaggedTiles.length; r++) { // loop through rows
    for (let c = 0; c < flaggedTiles[r]!.length; c++) { // loop through columns
      flaggedTiles[r]![c] = 0; // reset flagged tile to 0
    }
  }
  console.log("Flagged tiles reset!"); // debug log
}

/**
 * setFlaggingHandlers
 * Adds right-click event handlers to each tile for placing/removing flags
 * Authors: Hunter Long, Janna Dungao, Addison Bartelli, Elizabeth Miller, GitHub Copilot
 */
export const setFlaggingHandlers = (tileMatrix: GridTile[][]) => {
  tileMatrix.flat().forEach(tile => { // for every tile
    tile.element.oncontextmenu = event => { // set right click behavior
      event.preventDefault(); // prevent contextmenu
      
      // only allow flagging if mineCount is set
      if (isNaN(getMineCount())) { 
        console.log("Cannot flag yet, mine count not set."); // debug log
        return;
      }

      if (flaggedTiles[Number(tile.row)-1]![Number(tile.col)-1] === 1) { // if flagged
        console.log(`Tile (${tile.row},${tile.col}) right-clicked!`);
        tile.element.textContent = ""; // remove marker
        document.dispatchEvent(new CustomEvent('flagPlaced', { detail: { change: 1 } })); // send event to userMineCount to update flag count
        flaggedTiles[Number(tile.row)-1]![Number(tile.col)-1] = 0; // update data
      } else if (!tile.element.classList.contains("revealed")) { // if not flagged
        tile.element.textContent = "🚩"; // set flag icon
        document.dispatchEvent(new CustomEvent('flagPlaced', { detail: { change: -1 } })); // send event to userMineCount
        flaggedTiles[Number(tile.row)-1]![Number(tile.col)-1] = 1; // update data
      }
    };
  })
}
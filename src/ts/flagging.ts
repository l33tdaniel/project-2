import type { GridTile } from "./localTypes";
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

export const getFlaggedTiles = (row: number, col: number) => {
  if (row >= 10 || col >= 10) { // check that row exists
    return;
  }
  return flaggedTiles[row]![col]; // return flagging status of tile
}

// set all entries in matrix to zero
export const resetFlaggedTiles = () => {
  for (let r = 0; r < flaggedTiles.length; r++) {
    for (let c = 0; c < flaggedTiles[r]!.length; c++) {
      flaggedTiles[r]![c] = 0;
    }
  }
  console.log("Flagged tiles reset!");
}


export const setFlaggingHandlers = (tileMatrix: GridTile[][]) => {
  tileMatrix.flat().forEach(tile => { // for every tile
    tile.element.oncontextmenu = event => { // set right click behavior
      event.preventDefault(); // prevent contextmenu
      
      // only allow flagging if mineCount is set
      if (isNaN(getMineCount())) {
        console.log("Cannot flag yet, mine count not set.");
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
import type { GridTile } from "./localTypes";

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
  if (!flaggedTiles[row]) {
    flaggedTiles[row] = [];
  }
  return flaggedTiles[row][col];
}

export const setFlaggingHandlers = (tileMatrix: GridTile[][]) => {
  tileMatrix.flat().forEach(tile => {
    /* 
    // Handeled by reveal.ts?

    tile.element.onclick = () => {
      if (!tile.flagged) {
        console.log(`Tile (${tile.row},${tile.col}) clicked!`);
      } else {
        console.log(`Tile (${tile.row},${tile.col}) is already flagged.`);
      }
    };
    */
    tile.element.oncontextmenu = event => {
      event.preventDefault();
      if (tile.flagged) {
        console.log(`Tile (${tile.row},${tile.col}) right-clicked!`);
        tile.element.textContent = "";
        tile.flagged = false;
        flaggedTiles[Number(tile.row)-1]![Number(tile.col)-1] = 0;
        console.table(flaggedTiles);
      } else {
        tile.element.textContent = "🚩";
        tile.flagged = true;
        flaggedTiles[Number(tile.row)-1]![Number(tile.col)-1] = 1;
        console.table(flaggedTiles);
      }
    };
  })
}
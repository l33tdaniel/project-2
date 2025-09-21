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

export const resetFlaggedTiles = () => {
  for (let r = 0; r < flaggedTiles.length; r++) {
    for (let c = 0; c < flaggedTiles[r]!.length; c++) {
      flaggedTiles[r]![c] = 0;
    }
  }
  console.log("Flagged tiles reset:");
  console.table(flaggedTiles);
}


export const setFlaggingHandlers = (tileMatrix: GridTile[][]) => {
  tileMatrix.flat().forEach(tile => {
    tile.element.oncontextmenu = event => {
      event.preventDefault();
      if (flaggedTiles[Number(tile.row)-1]![Number(tile.col)-1] === 1) {
        console.log(`Tile (${tile.row},${tile.col}) right-clicked!`);
        tile.element.textContent = "";
        document.dispatchEvent(new CustomEvent('flagPlaced', { detail: { change: 1 } })); // send event to userMineCount to update flag count
        flaggedTiles[Number(tile.row)-1]![Number(tile.col)-1] = 0;
        console.table(flaggedTiles);
      } else if (!tile.element.classList.contains("revealed")) {
        tile.element.textContent = "🚩";
        document.dispatchEvent(new CustomEvent('flagPlaced', { detail: { change: -1 } }));
        flaggedTiles[Number(tile.row)-1]![Number(tile.col)-1] = 1;
        console.table(flaggedTiles);
      }
    };
  })
}
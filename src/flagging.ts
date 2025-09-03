import type { GridTile } from "./localTypes";

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
      } else {
        tile.element.textContent = "🚩";
        tile.flagged = true;
      }
    };
  })
}
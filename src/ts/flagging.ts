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
        document.dispatchEvent(new CustomEvent('flagPlaced', { detail: { change: 1 } }));
      } else {
        tile.element.textContent = "🚩";
        tile.flagged = true;
        document.dispatchEvent(new CustomEvent('flagPlaced', { detail: { change: -1 } }));
      }
    };
  })
}
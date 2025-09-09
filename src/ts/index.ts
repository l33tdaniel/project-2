console.log("Hello!");

import "../css/index.css"

import { fillGrid } from "./create_grid";
import { setFlaggingHandlers } from "./flagging";
import { generateMinefield } from "./minefield_gen";
import { startGame } from "./reveal";
import { addLabels } from "./create_grid";

window.onload = () => {
    const rows = 10;
    const cols = 10;
    const grid: HTMLDivElement = document.querySelector("div#grid")!;
    const tileMatrix = fillGrid(grid,rows,cols);
    const gridheaders = addLabels(rows,cols);

    setFlaggingHandlers(tileMatrix);
    startGame();
};

//const minefield = generateMinefield({ row: 3, col: 5 }, 10, 10, 1, 10);
//console.table(minefield);
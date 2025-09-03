console.log("Hello!");

import "../css/index.css"

import { fillGrid } from "./create_grid";
import { setFlaggingHandlers } from "./flagging";
import { generateMinefield } from "./minefield_gen";
import { startGame } from "./reveal";

window.onload = () => {
    const grid: HTMLDivElement = document.querySelector("div#grid")!;
    const tileMatrix = fillGrid(grid);
    setFlaggingHandlers(tileMatrix);
    startGame();
};

//const minefield = generateMinefield({ row: 3, col: 5 }, 10, 10, 1, 10);
//console.table(minefield);
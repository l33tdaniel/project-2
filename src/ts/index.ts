console.log("Hello!");

// import "../css/index.css"

import { fillGrid } from "./create_grid";
import { setFlaggingHandlers } from "./flagging";
import { generateMinefield } from "./minefield_gen";
import { startGame } from "./reveal";
import { setMineCount } from "./userMineCount";

window.onload = () => {
    const grid: HTMLDivElement = document.querySelector("div#grid")!;
    const tileMatrix = fillGrid(grid);
    setFlaggingHandlers(tileMatrix);
    setMineCount();
    startGame();
};

//const minefield = generateMinefield({ row: 3, col: 5 }, 10, 10, 1, 10);
//console.table(minefield);
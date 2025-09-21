import "../css/index.css"

import { fillGrid } from "./create_grid";
import { setFlaggingHandlers } from "./flagging";
import { generateMinefield } from "./minefield_gen";
import { startGame } from "./reveal";
import { addLabels } from "./create_grid";
import { setMineCount } from "./userMineCount";

window.onload = () => {
    const rows = 10;
    const cols = 10;
    const grid: HTMLDivElement = document.querySelector("div#grid")!;
    const tileMatrix = fillGrid(grid,rows,cols);
    const gridheaders = addLabels(rows,cols);

    setFlaggingHandlers(tileMatrix);
    setMineCount();
    startGame();

    const aboutBtn: HTMLElement = document.querySelector("section#nav-authors>a")!;
    aboutBtn.onclick = () => alert("This Minesweeper was made by Addison, Anya, Marco, Janna, Elizabeth, and Hunter.");
};
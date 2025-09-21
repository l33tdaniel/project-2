import "../css/index.css"

import { fillGrid } from "./create_grid";
import { setFlaggingHandlers } from "./flagging";
import { startGame } from "./reveal";
import { addLabels } from "./create_grid";
import { setMineCount } from "./userMineCount";

window.onload = () => {
    const rows = 10;
    const cols = 10;
    const grid: HTMLDivElement = document.querySelector("div#grid")!; // get the outer grid to fill
    const tileMatrix = fillGrid(grid, rows, cols); // fill the outer grid
    const gridheaders = addLabels(rows, cols); // add labels to grid

    setFlaggingHandlers(tileMatrix); // set event handlers for right-click
    setMineCount(); // initialize the minecounter
    startGame(); // start the main game

    const aboutBtn: HTMLElement = document.querySelector("section#nav-authors>a")!; // get the about button
    aboutBtn.onclick = () => alert("This Minesweeper was made by Addison, Anya, Marco, Janna, Elizabeth, and Hunter."); // set the alert action
};
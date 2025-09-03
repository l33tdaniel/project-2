console.log("Hello!");

import { fillGrid } from "./create_grid";
import { generateMinefield } from "./minefield_gen";
import { startGame } from "./reveal";

window.onload = () => {
    const gridEle: HTMLDivElement = document.querySelector("div#grid")!;
    const tileMatrix = fillGrid(gridEle);
    startGame();
};

//const minefield = generateMinefield({ row: 3, col: 5 }, 10, 10, 1, 10);
//console.table(minefield);
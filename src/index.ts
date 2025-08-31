console.log("Hello!");

import { generateMinefield } from "./minefield_gen";
import { getMineCount } from "./userMineCount";

let mineField: number[][];

document.addEventListener('DOMContentLoaded', () => {
    getMineCount((mineCount: number) => {
        console.log(`User set mine count: ${mineCount}`);

        // Generate minefield
        mineField = generateMinefield({ row: 0, col: 0 }, 10, 10, 1, mineCount);
        console.table(mineField);
        console.log(`Minefield generated.`);
    });    
});


// const minefield = generateMinefield({ row: 3, col: 5 }, 10, 10, 1, 10);
// console.table(minefield);
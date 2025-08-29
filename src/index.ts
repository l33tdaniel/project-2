console.log("Hello!");

import { generateMinefield } from "./minefield_gen";
const minefield = generateMinefield({ row: 3, col: 5 }, 10, 10, 1, 10);
console.table(minefield);
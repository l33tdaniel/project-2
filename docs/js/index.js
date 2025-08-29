/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconsole.log(\"Hello!\");\n/**\n added  minefield generation function here for testing purposes, ESM import/export is causing conflicts with webpack\n@param rows - # of rows in the minefield\n@param cols- # of columns in the minefield\n@param mineCount- # of mines to place in minefield\n@param Fclick - first click coordinates\n@returns 2D array that represents a generated minefield\n*/\nfunction generateMinefield(Fclick, rows, cols, safeZone = 0, mineCount) {\n    // Initialize empty minefield\n    const minefield = Array.from({ length: rows }, () => Array(cols).fill(0));\n    // Creates safe zone around first click\n    const safeZoneArea = new Set();\n    const startRow = Math.max(0, Fclick.row - safeZone);\n    const endRow = Math.min(rows - 1, Fclick.row + safeZone);\n    const startCol = Math.max(0, Fclick.col - safeZone);\n    const endCol = Math.min(cols - 1, Fclick.col + safeZone);\n    for (let r = startRow; r <= endRow; r++) {\n        for (let c = startCol; c <= endCol; c++) {\n            safeZoneArea.add(`${r},${c}`);\n        }\n        // end of safe zone creation\n        let placedMines = 0;\n        // randomly places mines in minefield\n        while (placedMines < mineCount) {\n            const row = Math.floor(Math.random() * rows);\n            const col = Math.floor(Math.random() * cols);\n            if (safeZoneArea.has(`${row},${col}`) || minefield[row][col] === 1) {\n                continue;\n            }\n            minefield[row][col] = 1;\n            placedMines++;\n        }\n        minefield[Fclick.row][Fclick.col] = 2; // mark first click position\n        return minefield;\n    }\n    // Fallback return in case the above code path is not taken\n    return Array.from({ length: rows }, () => Array(cols).fill(0));\n}\nconst minefield = generateMinefield({ row: 3, col: 5 }, 10, 10, 1, 10);\nconsole.table(minefield);\n\n\n//# sourceURL=webpack://eecs581-minesweeper/./src/index.ts?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;
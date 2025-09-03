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

/***/ "./src/create_grid.ts":
/*!****************************!*\
  !*** ./src/create_grid.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fillGrid\": () => (/* binding */ fillGrid)\n/* harmony export */ });\nconst fillGrid = (grid) => {\n    let gridArr = Array(10).fill(0).map(e => []);\n    for (let row = 1; row <= 10; row++) {\n        const currentRow = document.createElement(\"div\");\n        currentRow.id = `grid-row-${row}`;\n        currentRow.classList.add(\"grid-row\");\n        grid.appendChild(currentRow);\n        for (let col = 1; col <= 10; col++) {\n            const currentTile = document.createElement(\"div\");\n            currentTile.id = `grid-tile-${row}-${col}`;\n            currentTile.classList.add(\"grid-tile\", `grid-tile-row-${row}`, `grid-tile-col-${col}`);\n            currentRow.appendChild(currentTile);\n            gridArr[row - 1][col - 1] = {\n                row: row,\n                col: col,\n                element: currentTile,\n                flagged: false,\n                clicked: false\n            };\n        }\n    }\n    return gridArr;\n};\n\n\n//# sourceURL=webpack://eecs581-minesweeper/./src/create_grid.ts?");

/***/ }),

/***/ "./src/flagging.ts":
/*!*************************!*\
  !*** ./src/flagging.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setFlaggingHandlers\": () => (/* binding */ setFlaggingHandlers)\n/* harmony export */ });\nconst setFlaggingHandlers = (tileMatrix) => {\n    tileMatrix.flat().forEach(tile => {\n        /*\n        // Handeled by reveal.ts?\n    \n        tile.element.onclick = () => {\n          if (!tile.flagged) {\n            console.log(`Tile (${tile.row},${tile.col}) clicked!`);\n          } else {\n            console.log(`Tile (${tile.row},${tile.col}) is already flagged.`);\n          }\n        };\n        */\n        tile.element.oncontextmenu = event => {\n            event.preventDefault();\n            if (tile.flagged) {\n                console.log(`Tile (${tile.row},${tile.col}) right-clicked!`);\n                tile.element.textContent = \"\";\n                tile.flagged = false;\n            }\n            else {\n                tile.element.textContent = \"🚩\";\n                tile.flagged = true;\n            }\n        };\n    });\n};\n\n\n//# sourceURL=webpack://eecs581-minesweeper/./src/flagging.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _create_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create_grid */ \"./src/create_grid.ts\");\n/* harmony import */ var _flagging__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./flagging */ \"./src/flagging.ts\");\n/* harmony import */ var _minefield_gen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./minefield_gen */ \"./src/minefield_gen.ts\");\n/* harmony import */ var _reveal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reveal */ \"./src/reveal.ts\");\nconsole.log(\"Hello!\");\n\n\n\n\nwindow.onload = () => {\n    const grid = document.querySelector(\"div#grid\");\n    const tileMatrix = (0,_create_grid__WEBPACK_IMPORTED_MODULE_0__.fillGrid)(grid);\n    (0,_flagging__WEBPACK_IMPORTED_MODULE_1__.setFlaggingHandlers)(tileMatrix);\n    (0,_reveal__WEBPACK_IMPORTED_MODULE_3__.startGame)();\n};\n//const minefield = generateMinefield({ row: 3, col: 5 }, 10, 10, 1, 10);\n//console.table(minefield);\n\n\n//# sourceURL=webpack://eecs581-minesweeper/./src/index.ts?");

/***/ }),

/***/ "./src/minefield_gen.ts":
/*!******************************!*\
  !*** ./src/minefield_gen.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"generateMinefield\": () => (/* binding */ generateMinefield)\n/* harmony export */ });\n/**\n@param rows - # of rows in the minefield\n@param cols- # of columns in the minefield\n@param mineCount- # of mines to place in minefield\n@param Fclick - first click coordinates\n@returns 2D array that represents a generated minefield\n*/\nfunction generateMinefield(Fclick, rows, cols, safeZone = 0, mineCount) {\n    // Initialize empty minefield\n    const minefield = Array.from({ length: rows }, () => Array(cols).fill(0));\n    // Creates safe zone around first click\n    const safeZoneArea = new Set();\n    const startRow = Math.max(0, Fclick.row - safeZone);\n    const endRow = Math.min(rows - 1, Fclick.row + safeZone);\n    const startCol = Math.max(0, Fclick.col - safeZone);\n    const endCol = Math.min(cols - 1, Fclick.col + safeZone);\n    for (let r = startRow; r <= endRow; r++) {\n        for (let c = startCol; c <= endCol; c++) {\n            safeZoneArea.add(`${r},${c}`);\n        }\n    }\n    // end of safe zone creation\n    let placedMines = 0;\n    // randomly places mines in minefield\n    while (placedMines < mineCount) {\n        const row = Math.floor(Math.random() * rows);\n        const col = Math.floor(Math.random() * cols);\n        if (safeZoneArea.has(`${row},${col}`) || minefield[row][col] === 1) {\n            continue;\n        }\n        minefield[row][col] = 1;\n        placedMines++;\n    }\n    minefield[Fclick.row][Fclick.col] = 2; // mark first click position\n    return minefield;\n    // Fallback return in case the above code path is not taken\n    return Array.from({ length: rows }, () => Array(cols).fill(0));\n}\n\n\n//# sourceURL=webpack://eecs581-minesweeper/./src/minefield_gen.ts?");

/***/ }),

/***/ "./src/reveal.ts":
/*!***********************!*\
  !*** ./src/reveal.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"startGame\": () => (/* binding */ startGame)\n/* harmony export */ });\n/* harmony import */ var _minefield_gen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./minefield_gen */ \"./src/minefield_gen.ts\");\n\nlet minefield = null; // Initialize minefield as null (minefield starts empty)\nconst rows = 10;\nconst cols = 10;\nconst mineCount = 10; // hardcoded\nfunction startGame() {\n    // Wait for the first click to generate minefield\n    console.log(\"startGame called\");\n    const gameover = document.getElementById(\"gameover\"); // set gameover back to hidden\n    gameover != null ? gameover.style.visibility = 'hidden' : null;\n    const container = document.getElementById(\"grid\");\n    console.log(container); // should not be null\n    container.addEventListener(\"click\", firstClickHandler, { once: true }); // runs firstClickHandler when user clicks the container grid\n    const rstbtn = document.getElementById('reset');\n    rstbtn.onclick = function () {\n        console.log('Game reset');\n        // need to reset board back to beginning first...\n        const tiles = document.getElementsByClassName('grid-tile');\n        for (let i = 0; i < tiles.length; i++) {\n            const tile = tiles[i];\n            tile?.classList.remove('revealed');\n            tile != null ? tile.textContent = '' : null;\n        }\n        minefield = null;\n        startGame(); // reset board\n        const grid = document.getElementById('grid');\n        grid?.classList.remove('grid-disabled'); // re-enable grid\n    };\n}\nfunction firstClickHandler(event) {\n    const target = event.target; // the HTML element that was clicked\n    if (!target.classList.contains(\"grid-tile\"))\n        return; // if the clicked element is not a grid tile, exit\n    const { row, col } = getCellCoordinates(target); // get the row and column indices of the clicked tile\n    // Generate minefield with safe zone around first click\n    minefield = (0,_minefield_gen__WEBPACK_IMPORTED_MODULE_0__.generateMinefield)({ row, col }, rows, cols, 1, mineCount); // safeZone is set to radius 1 (so 3x3 area is safe)\n    revealCell(row, col); // reveal the clicked cell\n    console.table(minefield); // for debugging\n    // Listen for subsequent clicks\n    const container = document.getElementById(\"grid\");\n    container.addEventListener(\"click\", normalClickHandler);\n}\nfunction normalClickHandler(event) {\n    const target = event.target;\n    if (!target.classList.contains(\"grid-tile\"))\n        return;\n    const { row, col } = getCellCoordinates(target);\n    revealCell(row, col);\n}\n// Reveal a cell and apply flood-fill if needed\nfunction revealCell(row, col) {\n    if (!minefield)\n        return; // If minefield is not generated yet, exit....is this necessary\n    const cell = getCellElement(row, col); // div element for specific cell\n    // if cell doesn't exist or is already revealed, exit (during recursive calls, this prevents re-revealing)\n    if (!cell || cell.classList.contains(\"revealed\"))\n        return;\n    const value = minefield[row][col]; // get the value of the cell in the minefield (0, 1, or 2)\n    if (value === 1) {\n        cell.textContent = \"💣\"; // Display mine\n        cell.classList.add(\"revealed\"); // Mark cell as revealed\n        const grid = document.getElementById('grid');\n        grid?.classList.add('grid-disabled');\n        const gameover = document.getElementById('gameover');\n        gameover != null ? gameover.style.visibility = 'visible' : null;\n        return;\n    }\n    cell.classList.add(\"revealed\"); // Mark cell as revealed\n    const adjacentMines = countAdjacentMines(row, col); // number of adjacent mines\n    if (adjacentMines > 0) {\n        cell.textContent = adjacentMines.toString(); // Display number of adjacent mines in cell\n    }\n    else {\n        cell.textContent = \"\"; // Empty cell for 0 adjacent mines\n    }\n    // If no adjacent mines, recursively reveal neighboring cells (flood-fill)\n    if (adjacentMines === 0) {\n        // rowOffset = -1, 0, 1 (above, same, below); colOffset = -1, 0, 1 (left, same, right)\n        for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {\n            for (let colOffset = -1; colOffset <= 1; colOffset++) {\n                const newRow = row + rowOffset;\n                const newCol = col + colOffset;\n                // Makes sure newRow and newCol are within bounds \n                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {\n                    revealCell(newRow, newCol); // Recursive call to reveal neighboring cell\n                }\n            }\n        }\n    }\n}\nfunction countAdjacentMines(row, col) {\n    if (!minefield)\n        return 0; // If minefield is not generated yet, return 0\n    let count = 0;\n    // Check all 8 neighboring cells\n    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {\n        for (let colOffset = -1; colOffset <= 1; colOffset++) {\n            if (rowOffset === 0 && colOffset === 0)\n                continue; // Skip the current cell\n            const newRow = row + rowOffset;\n            const newCol = col + colOffset;\n            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && minefield[newRow][newCol] === 1) {\n                count++;\n            }\n        }\n    }\n    return count;\n}\n// Helper functions:\n// Get row and column indices from a clicked cell element\nfunction getCellCoordinates(cell) {\n    const rowDiv = cell.parentElement;\n    const rowsArray = Array.from(rowDiv.parentElement.children); // array of all row divs\n    const row = rowsArray.indexOf(rowDiv); // index of the row div \n    const colsArray = Array.from(rowDiv.children); // array of all cell divs in that row\n    const col = colsArray.indexOf(cell); // index of the clicked cell div in that row\n    return { row, col };\n}\n// Get HTML element for a given row and column\nfunction getCellElement(row, col) {\n    const rowDiv = document.getElementById(`grid-row-${row + 1}`);\n    if (!rowDiv)\n        return null; // if row doesn't exist, return null\n    return rowDiv.children[col]; // otherwise, return the div element for the specific cell at [row, col]\n}\n\n\n//# sourceURL=webpack://eecs581-minesweeper/./src/reveal.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
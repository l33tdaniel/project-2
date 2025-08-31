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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _minefield_gen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./minefield_gen */ \"./src/minefield_gen.ts\");\n/* harmony import */ var _userMineCount__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./userMineCount */ \"./src/userMineCount.ts\");\nconsole.log(\"Hello!\");\n\n\nlet mineField;\ndocument.addEventListener('DOMContentLoaded', () => {\n    (0,_userMineCount__WEBPACK_IMPORTED_MODULE_1__.getMineCount)((mineCount) => {\n        console.log(`User set mine count: ${mineCount}`);\n        // Generate minefield\n        mineField = (0,_minefield_gen__WEBPACK_IMPORTED_MODULE_0__.generateMinefield)({ row: 0, col: 0 }, 10, 10, 1, mineCount);\n        console.table(mineField);\n        console.log(`Minefield generated.`);\n    });\n});\n// const minefield = generateMinefield({ row: 3, col: 5 }, 10, 10, 1, 10);\n// console.table(minefield);\n\n\n//# sourceURL=webpack://eecs581-minesweeper/./src/index.ts?\n}");

/***/ }),

/***/ "./src/minefield_gen.ts":
/*!******************************!*\
  !*** ./src/minefield_gen.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateMinefield: () => (/* binding */ generateMinefield)\n/* harmony export */ });\n/**\n@param rows - # of rows in the minefield\n@param cols- # of columns in the minefield\n@param mineCount- # of mines to place in minefield\n@param Fclick - first click coordinates\n@returns 2D array that represents a generated minefield\n*/\nfunction generateMinefield(Fclick, rows, cols, safeZone = 0, mineCount) {\n    // Initialize empty minefield\n    const minefield = Array.from({ length: rows }, () => Array(cols).fill(0));\n    // Creates safe zone around first click\n    const safeZoneArea = new Set();\n    const startRow = Math.max(0, Fclick.row - safeZone);\n    const endRow = Math.min(rows - 1, Fclick.row + safeZone);\n    const startCol = Math.max(0, Fclick.col - safeZone);\n    const endCol = Math.min(cols - 1, Fclick.col + safeZone);\n    for (let r = startRow; r <= endRow; r++) {\n        for (let c = startCol; c <= endCol; c++) {\n            safeZoneArea.add(`${r},${c}`);\n        }\n        // end of safe zone creation\n        let placedMines = 0;\n        // randomly places mines in minefield\n        while (placedMines < mineCount) {\n            const row = Math.floor(Math.random() * rows);\n            const col = Math.floor(Math.random() * cols);\n            if (safeZoneArea.has(`${row},${col}`) || minefield[row][col] === 1) {\n                continue;\n            }\n            minefield[row][col] = 1;\n            placedMines++;\n        }\n        minefield[Fclick.row][Fclick.col] = 2; // mark first click position\n        return minefield;\n    }\n    // Fallback return in case the above code path is not taken\n    return Array.from({ length: rows }, () => Array(cols).fill(0));\n}\n\n\n//# sourceURL=webpack://eecs581-minesweeper/./src/minefield_gen.ts?\n}");

/***/ }),

/***/ "./src/userMineCount.ts":
/*!******************************!*\
  !*** ./src/userMineCount.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getCurrentMineCount: () => (/* binding */ getCurrentMineCount),\n/* harmony export */   getMineCount: () => (/* binding */ getMineCount)\n/* harmony export */ });\n// get user specified mine count for minefield\nlet mineCount = 10;\n/**\n *\n * @param countSet - callback function called after minecount is entered by user\n * @returns void\n */\n// get mine count from user req. 10 - 20\nfunction getMineCount(countSet) {\n    const countInput = document.getElementById('mineCount');\n    const setMineCountBtn = document.getElementById('setMineCountBtn');\n    // error handling null inputs\n    if (!setMineCountBtn || !countInput) {\n        console.error('Required HTML elements not found');\n        return;\n    }\n    // check user input bounds\n    setMineCountBtn.addEventListener('click', () => {\n        mineCount = parseInt(countInput.value, 10);\n        if (isNaN(mineCount) || mineCount < 10 || mineCount > 20) {\n            alert('Please enter a number between 10 and 20.');\n            countInput.value = '';\n            countInput.focus();\n            return;\n        }\n        countSet(mineCount);\n        console.log(`Mine count set: ${mineCount}`);\n    });\n}\n/**\n *\n * @returns current mine count\n */\nfunction getCurrentMineCount() {\n    return mineCount;\n}\n\n\n//# sourceURL=webpack://eecs581-minesweeper/./src/userMineCount.ts?\n}");

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
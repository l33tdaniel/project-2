
/*
File: index.ts
Authors: Addison , Marco , Janna , Elizabeth
Creation Date: September 1, 2025
Description: Main entry point for the Minesweeper game. Initializes the grid, labels, flagging, mine counter, 
             and game start. Also handles UI interactions like the About button and modern UI enhancements.

Functions:
- window.onload: initializes the game after the page loads

Inputs/Outputs:
- Inputs: none (relies on DOM elements and imported modules)
- Outputs: none directly; modifies DOM and sets up game logic

External Sources: None

Edited on 9/29 to include the timer and AI
Updated on 9/30 to include modern UI enhancements
*/

// Modified by Daniel Neugent and Brett Balquist to add the AI, timer, and audio

import "../css/index.css" // global stylesheet for Minesweeper UI

import { fillGrid } from "./create_grid"; // grid creation
import { setFlaggingHandlers } from "./flagging"; // right-click flagging logic
import { startGame } from "./reveal"; // main game start logic
import { addLabels } from "./create_grid"; // labeling functions
import { setMineCount } from "./userMineCount"; // initialize number of mines
import { makeAIMove, AIDifficulty } from "./ai_solver"; // add ai solver
import { startTimer, stopTimer, resetTimer } from "./timer"; // add timer
import { setupUIInteractions } from "./ui_interactions"; // enhanced UI interactions
import { initializeUIEnhancements } from "./ui_enhancements"; // modern UI enhancements

// Initialize game once the window finishes loading
window.onload = () => {
    const rows = 10; // number of rows in the grid
    const cols = 10; // number of columns in the grid
    const grid: HTMLDivElement = document.querySelector("div#grid")!; // get the outer grid to fill
    const tileMatrix = fillGrid(grid, rows, cols); // fill the outer grid
    const gridheaders = addLabels(rows, cols); // add labels to grid

    setFlaggingHandlers(tileMatrix); // set event handlers for right-click
    setMineCount(); // initialize the minecounter
    startGame(tileMatrix); // start the main game
    
    // Initialize enhanced UI interactions
    setupUIInteractions();
    
    // Show game instructions by default for first-time users
    const instructions = document.querySelector('.game-instructions') as HTMLElement;
    if (instructions) {
        instructions.style.display = 'block';
    }
};

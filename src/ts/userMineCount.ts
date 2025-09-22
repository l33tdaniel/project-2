/*
File: userMineCount.ts
Authors: Janna Dungao, Hunter Long
Creation Date: August 30, 2025
Description: Manages user-specified mine count and tracks remaining flags in the Minesweeper game.

Functions:
1. setMineCount(): Reads user input for mine count (10–20) and initializes remaining flags.
   - Input: Optional callback called after valid mine count is set.
   - Output: Updates internal state and DOM.

2. getMineCount(): Returns the total number of mines set by the user.
   - Input: None
   - Output: Number of mines.

3. getFlagsRemaining(): Returns the number of flags left for the user.
   - Input: None
   - Output: Number of flags remaining.

4. updateRemaining(change): Updates the remaining flags count based on flag addition/removal.
   - Input: change (+1 or -1)
   - Output: Updates DOM.

5. updateDisplay(): Updates the displayed remaining flags count in the DOM.
   - Input: None
   - Output: Updates DOM.

External Sources: GitHub Copilot
*/
import { resetFlaggedTiles } from "./flagging";

// get user specified mine count for minefield
let mineCount: number; // total mines in game
let flagsRemaining: number; // flags left for user


/**
 * setMineCount
 * Sets the mine count (10 - 20) from user input and initializes remaining flags.
 * @param countSet Optional callback to run after mine count is set
 * Authors: Janna Dungao, GitHub Copilot
 */
export function setMineCount(countSet?: () => void) {
    const countInput = document.getElementById('mineCount') as HTMLInputElement;
    const setMineCountBtn = document.getElementById('setMineCountBtn') as HTMLButtonElement;

    // error handling null inputs
    if (!setMineCountBtn || !countInput) {
        console.error('Required HTML elements not found');
        return;
    }

    // check user input bounds
    setMineCountBtn.onclick = () => {
        mineCount = parseInt(countInput.value, 10);
        if (isNaN(mineCount) || mineCount < 10 || mineCount > 20) { // if invalid input, alert pops up
            alert('Please enter an integer between 10 and 20.');
            countInput.value = '';
            countInput.focus();
            return;
        }
        flagsRemaining = mineCount; 
        updateDisplay(); // show remaining flag count 
        console.log(`Mine count set: ${mineCount}`);
        countInput.disabled = true; // disable input box
        setMineCountBtn.disabled = true; // disable start game button
        if (countSet) countSet(); // for starting the game once mineCount inputted
    };
}

/**
 * getFlagsRemaining
 * Returns the number of flags remaining
 * Authors: Janna Dungao, GitHub Copilot
 */

export function getFlagsRemaining(): number {
    return flagsRemaining;
}
/**
 * getMineCount
 * Returns total mines in grid
 * Authors: Janna Dungao, GitHub Copilot
 */
export function getMineCount(): number {
    return mineCount;
}


/**
 * updateRemaining
 * Updates remaining flag count by given change (+1 remove flag, -1 add flag)
 * Authors: Janna Dungao, GitHub Copilot
 */
export function updateRemaining(change: number): void {
    flagsRemaining += change;
    updateDisplay();
}

/**
 * updateDisplay
 * Updates mine count for html
 * Authors: Janna Dungao, GitHub Copilot
 */
export function updateDisplay(): void {
    const mineDisplay = document.getElementById('minesRemaining');
    if (mineDisplay) {
        if (isNaN(flagsRemaining)) { 
            mineDisplay.textContent = '--';//if no minecount set yet
        } else {
            mineDisplay.textContent = flagsRemaining.toString(); // show flag count
        }
        console.log(`Count updated: ${flagsRemaining}`);
    }
}

/**
 * Listens for when flag added/removed
 * Authors: Janna Dungao, GitHub Copilot
 */
document.addEventListener('flagPlaced', (event: Event) => {
    const customEvent = event as CustomEvent<{ change: number }>; // get flag update from flagging.ts
    updateRemaining(customEvent.detail.change); // update flag count
});

/**
 * Listens for game reset
 * Authors: Janna Dungao, Hunter Long, GitHub Copilot
 */
const rstbtn = document.getElementById('reset') as HTMLButtonElement; // handle game reset
rstbtn.addEventListener('click', () => {
    flagsRemaining = NaN; // reset flag count and mine count on reset
    mineCount = NaN;    
    updateDisplay(); // update the display with reset words
    resetFlaggedTiles(); // reset flagged tiles array

    // allow new input for mine count
    const countInput = document.getElementById('mineCount') as HTMLInputElement;
    const setMineCountBtn = document.getElementById('setMineCountBtn') as HTMLButtonElement;
    if (countInput && setMineCountBtn) {
        countInput.disabled = false; // re-enable input box
        setMineCountBtn.disabled = false; // re-enable start game button
    }
})
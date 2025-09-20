import { resetFlaggedTiles } from "./flagging";

// get user specified mine count for minefield
let mineCount: number;
let flagsRemaining: number;

/**
 * 
 * @param countSet - callback function called after minecount is entered by user
 * @returns void
 */

// get mine count from user req. 10 - 20
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
 * 
 * @returns remaining flag count
 */

export function getFlagsRemaining(): number {
    return flagsRemaining;
}
/**
 * 
 * @returns total mines in grid
 */
export function getMineCount(): number {
    return mineCount;
}


/**
 * 
 * @param change - +1 when user removes a flag, -1 when user adds a flag
 */

export function updateRemaining(change: number): void {
    flagsRemaining += change;
    updateDisplay();
}

/**
 * Update count for html
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
 * listen for when flag added/removed
 */
document.addEventListener('flagPlaced', (event: Event) => {
    const customEvent = event as CustomEvent<{ change: number }>; // get flag update from flagging.ts
    updateRemaining(customEvent.detail.change); // update flag count
});

/**
 * listen for game reset
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
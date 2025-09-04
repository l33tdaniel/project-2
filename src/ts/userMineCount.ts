// get user specified mine count for minefield
let mineCount: number;
let flagsRemaining: number;
/**
 * 
 * @param countSet - callback function called after minecount is entered by user
 * @returns void
 */

// get mine count from user req. 10 - 20
export function setMineCount() {
    const countInput = document.getElementById('mineCount') as HTMLInputElement;
    const setMineCountBtn = document.getElementById('setMineCountBtn') as HTMLButtonElement;

    // error handling null inputs
    if (!setMineCountBtn || !countInput) {
        console.error('Required HTML elements not found');
        return;
    }

    // check user input bounds
    setMineCountBtn.addEventListener('click', () => {
        mineCount = parseInt(countInput.value, 10);
        if (isNaN(mineCount) || mineCount < 10 || mineCount > 20) {
            alert('Please enter a number between 10 and 20.');
            countInput.value = '';
            countInput.focus();
            return;
        }
        flagsRemaining = mineCount;
        updateDisplay();
        console.log(`Mine count set: ${mineCount}`);
        return mineCount;
    })

    if (mineCount && mineCount >= 10 && mineCount <= 20) {
        flagsRemaining = mineCount;
        console.log('Reset counts');
        updateDisplay();
    }
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
        mineDisplay.textContent = flagsRemaining.toString();
        console.log(`Count updated: ${flagsRemaining}`);
    }
}

/**
 * listen for when flag added/removed
 */
document.addEventListener('flagPlaced', (event: Event) => {
    const customEvent = event as CustomEvent<{ change: number }>;
    updateRemaining(customEvent.detail.change);
});

const rstbtn = document.getElementById('reset') as HTMLButtonElement;
rstbtn.addEventListener('click', () => {
    flagsRemaining = NaN;
    mineCount = NaN;    
    updateDisplay();    
})

// for flag handling file*
/*
if placing a flag 
{
    document.dispatchEvent(new CustomEvent('flagPlaced', { detail: { change: -1 } }));
} else if removing a flag {
    document.dispatchEvent(new CustomEvent('flagPlaced', { detail: { change: 1 } }));
}
*/
// get user specified mine count for minefield
let mineCount: number = 10;
let minesRemaining: number = 10;
/**
 * 
 * @param countSet - callback function called after minecount is entered by user
 * @returns void
 */

// get mine count from user req. 10 - 20
export function getMineCount(countSet: (mineCount: number) => void) {
    const countInput = document.getElementById('mineCount') as HTMLInputElement;
    const setMineCountBtn = document.getElementById('setMineCountBtn')as HTMLButtonElement;

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
        updateDisplay();
        countSet(mineCount);

        console.log(`Mine count set: ${mineCount}`);
    })
}

/**
 * 
 * @returns current mine count
 */

export function getMinesRemaining(): number {
    return mineCount;
}

/**
 * 
 * @param change - +1 when user removes a flag, -1 when user adds a flag
 */

export function updateRemaining(change: number): void {
    minesRemaining += change;
    updateDisplay();
}

/**
 * Update count for html
 */
export function updateDisplay(): void {
    const mineDisplay = document.getElementById('minesRemaining');
    if (mineDisplay) {
        mineDisplay.textContent = minesRemaining.toString();
        console.log(`Count updated.`);
    }
}

/**
 * listen for when flag added/removed
 */
document.addEventListener('flagPlaced', (event: Event) => {
    const customEvent = event as CustomEvent<{ change: number }>;
    updateRemaining(customEvent.detail.change);
});

// for flag handling file*
/*
if placing a flag 
{
    document.dispatchEvent(new CustomEvent('flagPlaced', { detail: { change: -1 } }));
} else if removing a flag {
    document.dispatchEvent(new CustomEvent('flagPlaced', { detail: { change: 1 } }));
}
*/
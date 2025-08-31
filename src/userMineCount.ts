// get user specified mine count for minefield
let mineCount: number = 10;

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

        countSet(mineCount);

        console.log(`Mine count set: ${mineCount}`);
    })
}

/**
 * 
 * @returns current mine count
 */

export function getCurrentMineCount(): number {
    return mineCount;
}

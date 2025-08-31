// get user specified mine count for minefield

export function getMineCount(countSet: (mineCount: number) => void) {
    const countInput = document.getElementById('mineCount') as HTMLInputElement | null;
    const setMineCountBtn = document.getElementById('setMineCountBtn');

    setMineCountBtn?.addEventListener('click', () => {
        if (!countInput) return;
        let mineCount = parseInt(countInput.value, 10);
        if (isNaN(mineCount) || mineCount < 10 || mineCount > 20) {
            alert('Please enter a number between 10 and 20.');
            countInput.value = '';
            countInput.focus();
            return;
        }

        countSet(mineCount);
    })
}
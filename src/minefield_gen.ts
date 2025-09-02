
/** 
@param rows - # of rows in the minefield
@param cols- # of columns in the minefield
@param mineCount- # of mines to place in minefield
@param Fclick - first click coordinates
@returns 2D array that represents a generated minefield
*/

export function generateMinefield(
    Fclick: {row: number, col: number},
    rows: number, 
    cols: number,
    safeZone: number = 0,
    mineCount: number
    ): number[][] {
    
        // Initialize empty minefield
        const minefield: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
        // Creates safe zone around first click
        const safeZoneArea = new Set<string>();
        const startRow = Math.max(0, Fclick.row - safeZone);
        const endRow = Math.min(rows - 1, Fclick.row + safeZone);
        const startCol = Math.max(0, Fclick.col - safeZone);
        const endCol = Math.min(cols - 1, Fclick.col + safeZone);

        for (let r = startRow; r <= endRow; r++) {
            for (let c = startCol; c <= endCol; c++) {
                safeZoneArea.add(`${r},${c}`);
            }
        }
        // end of safe zone creation

        let placedMines = 0;
        // randomly places mines in minefield
        while (placedMines < mineCount) {
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);

            if (safeZoneArea.has(`${row},${col}`) || minefield[row]![col] === 1) {
                continue;
            }

            minefield[row]![col] = 1;
            placedMines++;
        }
        minefield[Fclick.row]![Fclick.col] = 2; // mark first click position

            return minefield;
        
    
        // Fallback return in case the above code path is not taken
        return Array.from({ length: rows }, () => Array(cols).fill(0));
    }
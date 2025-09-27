/*
File: ai_solver.ts
Authors: Daniel Neugent
Creation Date: September 25, 2025
Description: Handles the AI solver logic for Minesweeper.
*/

import type { GridTile } from "./localTypes";
import { revealCell, countAdjacentMines } from "./reveal";
import { getFlaggedTiles } from "./flagging";

export enum AIDifficulty {
    Easy,
    Medium,
    Hard
}

export function makeAIMove(difficulty: AIDifficulty, minefield: number[][], tileMatrix: GridTile[][]) {
    switch (difficulty) {
        case AIDifficulty.Easy:
            easyMove(minefield, tileMatrix);
            break;
        case AIDifficulty.Medium:
            mediumMove(minefield, tileMatrix);
            break;
        case AIDifficulty.Hard:
            hardMove(minefield, tileMatrix);
            break;
    }
}

function easyMove(minefield: number[][], tileMatrix: GridTile[][]) {
    const unrevealedTiles: { row: number, col: number }[] = [];
    for (let r = 0; r < tileMatrix.length; r++) {
        for (let c = 0; c < tileMatrix[r]!.length; c++) {
            const tile = tileMatrix[r]![c]!;
            if (!tile.element.classList.contains("revealed") && !getFlaggedTiles(r, c)) {
                unrevealedTiles.push({ row: r, col: c });
            }
        }
    }

    if (unrevealedTiles.length > 0) {
        const randomIndex = Math.floor(Math.random() * unrevealedTiles.length);
        const randomTile = unrevealedTiles[randomIndex]!;
        revealCell(randomTile.row, randomTile.col);
    }
}

function mediumMove(minefield: number[][], tileMatrix: GridTile[][]) {
    // Find a revealed tile with a number
    let revealedTile: { row: number, col: number, adjacentMines: number } | null = null;
    for (let r = 0; r < tileMatrix.length; r++) {
        for (let c = 0; c < tileMatrix[r]!.length; c++) {
            const tile = tileMatrix[r]![c]!;
            if (tile.element.classList.contains("revealed") && tile.element.textContent) {
                const adjacentMines = parseInt(tile.element.textContent, 10);
                if (adjacentMines > 0) {
                    revealedTile = { row: r, col: c, adjacentMines };
                    break;
                }
            }
        }
        if (revealedTile) break;
    }

    if (revealedTile) {
        const { row, col, adjacentMines } = revealedTile;
        const neighbors = [];
        let flaggedNeighbors = 0;

        // Get neighbors and count flagged neighbors
        for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
            for (let colOffset = -1; colOffset <= 1; colOffset++) {
                if (rowOffset === 0 && colOffset === 0) continue;
                const newRow = row + rowOffset;
                const newCol = col + colOffset;
                if (newRow >= 0 && newRow < tileMatrix.length && newCol >= 0 && newCol < tileMatrix[0]!.length) {
                    const neighbor = tileMatrix[newRow]![newCol]!;
                    neighbors.push({ row: newRow, col: newCol, element: neighbor.element });
                    if (getFlaggedTiles(newRow, newCol)) {
                        flaggedNeighbors++;
                    }
                }
            }
        }

        // If the number of flagged neighbors equals the number of adjacent mines, reveal the other neighbors
        if (flaggedNeighbors === adjacentMines) {
            for (const neighbor of neighbors) {
                if (!neighbor.element.classList.contains("revealed") && !getFlaggedTiles(neighbor.row, neighbor.col)) {
                    revealCell(neighbor.row, neighbor.col);
                    return;
                }
            }
        }
    }

    // If no logical move can be made, make a random move
    easyMove(minefield, tileMatrix);
}

function hardMove(minefield: number[][], tileMatrix: GridTile[][]) {
    const safeTiles: { row: number, col: number }[] = [];
    for (let r = 0; r < tileMatrix.length; r++) {
        for (let c = 0; c < tileMatrix[r]!.length; c++) {
            const tile = tileMatrix[r]![c]!;
            if (!tile.element.classList.contains("revealed") && !getFlaggedTiles(r, c) && minefield[r]![c] !== 1) {
                safeTiles.push({ row: r, col: c });
            }
        }
    }

    if (safeTiles.length > 0) {
        const randomIndex = Math.floor(Math.random() * safeTiles.length);
        const randomTile = safeTiles[randomIndex]!;
        revealCell(randomTile.row, randomTile.col);
    }
}

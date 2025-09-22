/*
File: localTypes.ts
Authors: Addison Bartelli
Creation Date: September 3, 2025
Description: Defines GridTile type which links a DOM tile element to its row and column coordinates.

Types:
1. GridTile: Represents a single tile in the Minesweeper grid.
   - Inputs:
       row: number – the row index of the tile (1-based)
       col: number – the column index of the tile (1-based)
       element: HTMLDivElement – the corresponding DOM element for the tile
   - Output: N/A 
   
External Sources: None
*/

// a type for linking tiles to their x,y position
export type GridTile = {
    row: Number, // row index (1-based)
    col: Number, // column index (1-based)
    element: HTMLDivElement // reference to the DOM tile element
};
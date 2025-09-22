/*
File: status.ts
Author: Janna Dungao
Creation Date: September 9, 2025
Description: Shows "Playing" when the game is active and hides the indicator otherwise.

Functions:
1. showPlayingStatus(): Displays the status indicator with the text "Playing" on the screen.
   - Input: None (modifies DOM)
   - Output: Updates DOM to show status indicator.

2. hideStatus(): Hides the status indicator.
   - Input: None (modifies DOM)
   - Output: Updates DOM to hide status indicator.

External Sources: GitHub Copilot
*/


// Shows the playing status indicator once the game starts
// function is called in startGame()
export function showPlayingStatus() {
    const statusDiv = document.getElementById('statusIndicator');
    const statusText = document.getElementById('statusText');
    if (statusDiv && statusText) {
        statusText.textContent = "Playing"; // to appear on screen when playing
        statusDiv.style.display = "block";
    }
}

// Hides the playing status indicator before the game starts or after game ends
export function hideStatus() {
    const statusDiv = document.getElementById('statusIndicator');
    if (statusDiv) {
        statusDiv.style.display = "none"; // hides display
    }
}
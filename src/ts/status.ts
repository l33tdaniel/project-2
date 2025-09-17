// display playing status once game starts
// function is called in startGame()
export function showPlayingStatus() {
    const statusDiv = document.getElementById('statusIndicator');
    const statusText = document.getElementById('statusText');
    if (statusDiv && statusText) {
        statusText.textContent = "Playing"; // to appear on screen when playing
        statusDiv.style.display = "block";
    }
}

// hidden before game start and after game fail/win
export function hideStatus() {
    const statusDiv = document.getElementById('statusIndicator');
    if (statusDiv) {
        statusDiv.style.display = "none"; // hides display
    }
}
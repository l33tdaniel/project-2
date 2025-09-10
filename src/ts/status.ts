export function showPlayingStatus() {
    const statusDiv = document.getElementById('statusIndicator');
    const statusText = document.getElementById('statusText');
    if (statusDiv && statusText) {
        statusText.textContent = "Playing";
        statusDiv.style.display = "block";
    }
}

export function hideStatus() {
    const statusDiv = document.getElementById('statusIndicator');
    if (statusDiv) {
        statusDiv.style.display = "none";
    }
}
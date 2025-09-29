/*
File: timer.ts
Authors: Brett Balquist
Creation Date: September 25, 2025
Description: Handles the timer logic for Minesweeper.
*/

let timerInterval: number | null = null;
let seconds = 0;

/*
Authors: Brett Balquist
Inputs: None
Outputs: None
Description: Starts the game timer and changes the screen every second
*/
export function startTimer() {
    const timerElement = document.getElementById("timer")!;
    timerInterval = setInterval(() => {
        seconds++;
        timerElement.textContent = seconds.toString();
    }, 1000);
}

/*
Authors: Brett Balquist
Inputs: None
Outputs: None
Description: Stops the game timer
*/
export function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
}

/*
Authors: Brett Balquist
Inputs: None
Outputs: None
Description: Resets the game timer back to zero
*/
export function resetTimer() {
    stopTimer();
    seconds = 0;
    const timerElement = document.getElementById("timer")!;
    timerElement.textContent = "0";
}


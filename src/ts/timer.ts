/*
File: timer.ts
Authors: Daniel Neugent
Creation Date: September 25, 2025
Description: Handles the timer logic for Minesweeper.
*/

let timerInterval: number | null = null;
let seconds = 0;

export function startTimer() {
    const timerElement = document.getElementById("timer")!;
    timerInterval = setInterval(() => {
        seconds++;
        timerElement.textContent = seconds.toString();
    }, 1000);
}

export function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
}

export function resetTimer() {
    stopTimer();
    seconds = 0;
    const timerElement = document.getElementById("timer")!;
    timerElement.textContent = "0";
}


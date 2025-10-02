
/*
File: ui_enhancements.ts
Authors: Jay patel
Creation Date: September 30, 2025
Description: Enhanced UI interactions and modern UX improvements for Minesweeper.

Functions:
1. initializeUIEnhancements(): Sets up all modern UI interactions
2. setupPresetButtons(): Handles mine count preset buttons
3. setupModal(): Sets up the about modal functionality
4. setupAIControls(): Enhanced AI control interactions
5. addVisualFeedback(): Adds visual feedback for various game states
6. enhanceGridInteractions(): Improves grid tile interactions and animations

External Sources: None
*/

import { makeAIMove, AIDifficulty } from "./ai_solver";
import type { GridTile } from "./localTypes";

let currentTileMatrix: GridTile[][] | null = null;
let gameStarted = false;

/**
 * Initialize all UI enhancements for the modern Minesweeper experience
 * Inputs: None
 * Outputs: None
 */
export function initializeUIEnhancements(tileMatrix: GridTile[][]) {
    currentTileMatrix = tileMatrix;
    setupPresetButtons();
    setupModal();
    setupAIControls();
    setupGameInstructions();
    addVisualFeedback();
    enhanceGridInteractions();
    setupInputValidation();
}

/**
 * Setup preset mine count buttons for quick game setup
 * Inputs: None
 * Outputs: None
 */
function setupPresetButtons() {
    const presetButtons = document.querySelectorAll('.preset-btn');
    const mineCountInput = document.getElementById('mineCount') as HTMLInputElement;
    const startGameBtn = document.getElementById('setMineCountBtn') as HTMLButtonElement;

    presetButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const mines = (e.target as HTMLButtonElement).getAttribute('data-mines');
            if (mines && mineCountInput) {
                mineCountInput.value = mines;
                
                // Add visual feedback
                presetButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Auto-start game after preset selection
                setTimeout(() => {
                    startGameBtn?.click();
                }, 200);
            }
        });
    });
}

/**
 * Setup the about modal functionality
 * Inputs: None
 * Outputs: None
 */
function setupModal() {
    const aboutBtn = document.getElementById('about-btn');
    const modal = document.getElementById('about-modal');
    const closeBtn = modal?.querySelector('.close');

    aboutBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });

    closeBtn?.addEventListener('click', () => {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal when clicking outside
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

/**
 * Enhanced AI controls with better UX
 * Inputs: None
 * Outputs: None
 */
function setupAIControls() {
    const aiSelect = document.getElementById('aiDifficulty') as HTMLSelectElement;
    const aiMoveBtn = document.getElementById('aiMoveBtn') as HTMLButtonElement;

    aiSelect?.addEventListener('change', () => {
        const isAIEnabled = aiSelect.value !== 'none';
        if (aiMoveBtn) {
            aiMoveBtn.disabled = !isAIEnabled || !gameStarted;
            aiMoveBtn.textContent = isAIEnabled ? `🤖 ${aiSelect.value.toUpperCase()} Move` : 'AI Move';
        }
    });

    aiMoveBtn?.addEventListener('click', () => {
        if (aiSelect && currentTileMatrix && gameStarted) {
            const difficulty = getDifficultyFromString(aiSelect.value);
            if (difficulty !== null) {
                // Add loading state
                aiMoveBtn.textContent = '🔄 Thinking...';
                aiMoveBtn.disabled = true;
                
                // Simulate AI thinking time for better UX
                setTimeout(() => {
                    try {
                        // This would need to be updated when we have access to the minefield
                        // makeAIMove(difficulty, minefield, currentTileMatrix);
                    } catch (error) {
                        console.error('AI move failed:', error);
                    }
                    
                    aiMoveBtn.textContent = `🤖 ${aiSelect.value.toUpperCase()} Move`;
                    aiMoveBtn.disabled = false;
                }, 500);
            }
        }
    });
}

/**
 * Convert difficulty string to enum value
 * Inputs: None
 * Outputs: Difficulty
 */
function getDifficultyFromString(difficulty: string): AIDifficulty | null {
    switch (difficulty) {
        case 'easy': return AIDifficulty.Easy;
        case 'medium': return AIDifficulty.Medium;
        case 'hard': return AIDifficulty.Hard;
        default: return null;
    }
}

/**
 * Setup game instructions toggle
 * Inputs: None
 * Outputs: None
 */
function setupGameInstructions() {
    const instructionsToggle = document.createElement('button');
    instructionsToggle.textContent = '📖 Instructions';
    instructionsToggle.className = 'instructions-toggle';
    instructionsToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 12px 20px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        z-index: 50;
    `;

    const instructions = document.querySelector('.game-instructions') as HTMLElement;
    
    instructionsToggle.addEventListener('click', () => {
        if (instructions) {
            const isVisible = instructions.style.display !== 'none';
            instructions.style.display = isVisible ? 'none' : 'block';
            instructionsToggle.textContent = isVisible ? '📖 Instructions' : '❌ Hide';
        }
    });

    document.body.appendChild(instructionsToggle);
}

/**
 * Add visual feedback for various game states
 * Inputs: None
 * Outputs: None
 */
function addVisualFeedback() {
    // Add game state updates
    const statusIndicator = document.getElementById('statusIndicator');
    const statusText = document.getElementById('statusText');
    
    // Show status indicator when game starts
    document.addEventListener('gameStart', () => {
        gameStarted = true;
        if (statusIndicator) statusIndicator.style.display = 'block';
        if (statusText) statusText.textContent = 'Playing';
        
        // Enable AI button if AI is selected
        const aiSelect = document.getElementById('aiDifficulty') as HTMLSelectElement;
        const aiMoveBtn = document.getElementById('aiMoveBtn') as HTMLButtonElement;
        if (aiSelect && aiMoveBtn && aiSelect.value !== 'none') {
            aiMoveBtn.disabled = false;
        }
    });

    // Add mine count validation feedback
    const mineCountInput = document.getElementById('mineCount') as HTMLInputElement;
    if (mineCountInput) {
        mineCountInput.addEventListener('input', () => {
            const value = parseInt(mineCountInput.value);
            const isValid = value >= 10 && value <= 20;
            
            mineCountInput.style.borderColor = isValid ? 'var(--success)' : 'var(--danger)';
            
            const startBtn = document.getElementById('setMineCountBtn') as HTMLButtonElement;
            if (startBtn) {
                startBtn.disabled = !isValid;
                startBtn.style.opacity = isValid ? '1' : '0.5';
            }
        });
    }
}

/**
 * Enhance grid tile interactions with modern animations
 * Inputs: None
 * Outputs: None
 */
function enhanceGridInteractions() {
    if (!currentTileMatrix) return;

    currentTileMatrix.forEach((row, rowIndex) => {
        row.forEach((tile, colIndex) => {
            const element = tile.element;
            
            // Add smooth hover effects
            element.addEventListener('mouseenter', () => {
                if (!element.classList.contains('revealed')) {
                    element.style.transform = 'scale(1.05)';
                    element.style.zIndex = '10';
                }
            });
            
            element.addEventListener('mouseleave', () => {
                if (!element.classList.contains('revealed')) {
                    element.style.transform = 'scale(1)';
                    element.style.zIndex = '1';
                }
            });
            
            // Add ripple effect on click
            element.addEventListener('click', (e) => {
                if (!element.classList.contains('revealed')) {
                    addRippleEffect(e);
                }
            });
        });
    });
}

/**
 * Add ripple effect animation
 * Inputs: None
 * Outputs: None
 */
function addRippleEffect(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
    `;
    
    target.style.position = 'relative';
    target.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Setup input validation with visual feedback
 * Inputs: None
 * Outputs: None
 */
function setupInputValidation() {
    const mineCountInput = document.getElementById('mineCount') as HTMLInputElement;
    
    if (mineCountInput) {
        // Set default value
        mineCountInput.value = '15';
        
        // Add validation on blur
        mineCountInput.addEventListener('blur', () => {
            const value = parseInt(mineCountInput.value);
            if (isNaN(value) || value < 10 || value > 20) {
                mineCountInput.value = '15'; // Reset to default
                showTooltip(mineCountInput, 'Mine count must be between 10 and 20');
            }
        });
    }
}

/**
 * Show tooltip for user feedback
 * Inputs: HTML element and string
 * Outputs: None
 */
function showTooltip(element: HTMLElement, message: string) {
    const tooltip = document.createElement('div');
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--danger);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 14px;
        z-index: 1000;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        margin-top: 5px;
    `;
    
    element.parentElement?.appendChild(tooltip);
    
    setTimeout(() => {
        tooltip.remove();
    }, 3000);
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .preset-btn.active {
        background: linear-gradient(135deg, var(--primary), var(--primary-dark)) !important;
        color: var(--white) !important;
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);

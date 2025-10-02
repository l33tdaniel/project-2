/*
File: ui_interactions.ts
Authors: Jay Patel
Creation Date: September 30, 2025
Description: Handles UI interactions for modals, validations, and enhanced UX features.

Functions:
1. setupUIInteractions(): Initialize all UI interaction handlers
2. setupAIHelpModal(): Handle AI help modal functionality
3. setupMineCountValidation(): Add validation for mine count selection
4. showToast(): Display non-intrusive toast messages

External Sources: None
*/

let gameStarted = false;
let mineCountSelected = false;

/**
 * Initialize all UI interactions
 * Inputs: None
 * Outputs: None
 */
export function setupUIInteractions() {
    setupFloatingInstructions();
    setupMineCountValidation();
    setupPresetButtons();
    setupAIControls();
    setupAboutModal();
    
    // Listen for game start events
    document.addEventListener('gameStarted', () => {
        gameStarted = true;
        disableAISelection();
        disableMineCountControls();
    });
    
    // Listen for game reset events
    document.addEventListener('gameReset', () => {
        gameStarted = false;
        enableAISelection();
        enableMineCountControls();
    });
}

/**
 * Setup floating instructions panel
 * Inputs: None
 * Outputs: None
 */
function setupFloatingInstructions() {
    const toggleBtn = document.getElementById('instructionsToggle');
    const content = document.getElementById('instructionsContent');

    toggleBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        if (content) {
            const isVisible = content.style.display !== 'none';
            content.style.display = isVisible ? 'none' : 'block';
            toggleBtn.textContent = isVisible ? '📖 Instructions' : '✖️ Close';
        }
    });

    // Close instructions when clicking outside
    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const instructionsFloat = document.querySelector('.instructions-float');
        
        if (content && 
            content.style.display !== 'none' && 
            instructionsFloat && 
            !instructionsFloat.contains(target)) {
            content.style.display = 'none';
            if (toggleBtn) {
                toggleBtn.textContent = '📖 Instructions';
            }
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && content && content.style.display !== 'none') {
            content.style.display = 'none';
            if (toggleBtn) {
                toggleBtn.textContent = '📖 Instructions';
            }
        }
    });
}

/**
 * Setup preset button functionality for mine count selection
 * Inputs: None
 * Outputs: None
 */
function setupPresetButtons() {
    const presetButtons = document.querySelectorAll('.preset-btn');
    const mineCountInput = document.getElementById('mineCount') as HTMLInputElement;

    presetButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check if game has started - prevent changes mid-game
            if (gameStarted) {
                showToast('Cannot change mine count mid-game! Finish current game or refresh to start new.', 'warning');
                return;
            }
            
            // Get the mine count from data attribute
            const mineCount = button.getAttribute('data-mines');
            if (mineCount && mineCountInput) {
                // Update the input field
                mineCountInput.value = mineCount;
                
                // Update mine count validation state
                const value = parseInt(mineCount);
                mineCountSelected = !isNaN(value) && value >= 10 && value <= 20;
                
                // Remove active class from all buttons
                presetButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Dispatch input event to trigger any other listeners
                mineCountInput.dispatchEvent(new Event('input', { bubbles: true }));
                
                // Show toast notification
                showToast(`Mine count set to ${mineCount}`, 'success');
            }
        });
    });

    // Set initial active state based on current input value
    const currentValue = mineCountInput?.value;
    if (currentValue) {
        presetButtons.forEach(button => {
            if (button.getAttribute('data-mines') === currentValue) {
                button.classList.add('active');
            }
        });
    }
}

/**
 * Setup about modal functionality (if not already handled)
 * Inputs: None
 * Outputs: None
 */
function setupAboutModal() {
    const aboutBtn = document.getElementById('about-btn');
    const aboutModal = document.getElementById('about-modal');
    const closeBtn = aboutModal?.querySelector('.close');

    aboutBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        if (aboutModal) {
            aboutModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });

    closeBtn?.addEventListener('click', () => {
        if (aboutModal) {
            aboutModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal when clicking outside
    aboutModal?.addEventListener('click', (e) => {
        if (e.target === aboutModal) {
            aboutModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (aboutModal && aboutModal.style.display === 'block') {
                aboutModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
}

/**
 * Setup AI controls functionality
 * Handles AI selection changes and displays current selection
 * Inputs: None
 * Outputs: None
 */
function setupAIControls() {
    const aiSelect = document.getElementById('aiDifficulty') as HTMLSelectElement;
    const aiStatusDisplay = document.getElementById('currentAISelection');

    if (aiSelect && aiStatusDisplay) {
        // Handle AI selection changes
        aiSelect.addEventListener('change', (e) => {
            const target = e.target as HTMLSelectElement;
            
            // Check if game has started - prevent changes mid-game
            if (gameStarted) {
                showToast('Cannot change AI selection mid-game! Finish current game or refresh to start new.', 'warning');
                // Revert selection to previous value
                return;
            }
            
            updateAIDisplay(target.value, aiStatusDisplay);
            showToast(`AI Assistant set to ${getAIDisplayName(target.value)}`, 'success');
        });

        // Set initial display
        updateAIDisplay(aiSelect.value, aiStatusDisplay);
    }
}

/**
 * Update the AI status display
 * Inputs: string to change to and the html element that it is changing
 * Outputs: None
 */
function updateAIDisplay(aiValue: string, displayElement: HTMLElement): void {
    const displayText = getAIDisplayText(aiValue);
    displayElement.textContent = displayText;
}

/**
 * Get display text for AI selection
 * Inputs: String that determines the difficulty
 * Outputs: None
 */
function getAIDisplayText(aiValue: string): string {
    switch (aiValue) {
        case 'none': return '🧠 None Selected';
        case 'easy': return '😊 Easy AI Active';
        case 'medium': return '🤔 Medium AI Active';
        case 'hard': return '🤖 Hard AI Active';
        default: return '🧠 None Selected';
    }
}

/**
* ai selection 
 * Inputs: String that determines difficulty
 * Outputs: None
*/
function getAIDisplayName(aiValue: string): string {
    switch (aiValue) {
        case 'none': return 'None';
        case 'easy': return 'Easy AI';
        case 'medium': return 'Medium AI';
        case 'hard': return 'Hard AI';
        default: return 'None';
    }
}

/**
 * Disable AI selection during gameplay
 * Inputs: None
 * Outputs: None
 */
function disableAISelection(): void {
    const aiSelect = document.getElementById('aiDifficulty') as HTMLSelectElement;
    if (aiSelect) {
        aiSelect.disabled = true;
    }
}

/**
 * Enable AI selection when game is reset
 * Inputs: None
 * Outputs: None
 */
function enableAISelection(): void {
    const aiSelect = document.getElementById('aiDifficulty') as HTMLSelectElement;
    if (aiSelect) {
        aiSelect.disabled = false;
    }
}

/**
 * Disable mine count controls during gameplay
 * Inputs: None
 * Outputs: None
 */
function disableMineCountControls(): void {
    const presetButtons = document.querySelectorAll('.preset-btn') as NodeListOf<HTMLButtonElement>;
    const mineCountInput = document.getElementById('mineCount') as HTMLInputElement;
    const startGameBtn = document.getElementById('setMineCountBtn') as HTMLButtonElement;
    
    presetButtons.forEach(button => {
        button.disabled = true;
    });
    
    if (mineCountInput) {
        mineCountInput.disabled = true;
    }
    
    if (startGameBtn) {
        startGameBtn.disabled = true;
    }
}

/**
 * Enable mine count controls when game is reset
 * Inputs: None
 * Outputs: None
 */
function enableMineCountControls(): void {
    const presetButtons = document.querySelectorAll('.preset-btn') as NodeListOf<HTMLButtonElement>;
    const mineCountInput = document.getElementById('mineCount') as HTMLInputElement;
    const startGameBtn = document.getElementById('setMineCountBtn') as HTMLButtonElement;
    
    presetButtons.forEach(button => {
        button.disabled = false;
    });
    
    if (mineCountInput) {
        mineCountInput.disabled = false;
    }
    
    if (startGameBtn) {
        startGameBtn.disabled = false;
    }
}

/**
 Setup mine count validation and grid click prevention
 * Inputs: None
 * Outputs: None
 */
function setupMineCountValidation() {
    const mineCountInput = document.getElementById('mineCount') as HTMLInputElement;
    const startGameBtn = document.getElementById('setMineCountBtn');
    const grid = document.getElementById('grid');

    // Track when mine count is properly set
    mineCountInput?.addEventListener('input', () => {
        // Check if game has started - prevent changes mid-game
        if (gameStarted) {
            showToast('Cannot change mine count mid-game! Finish current game or refresh to start new.', 'warning');
            return;
        }
        
        const value = parseInt(mineCountInput.value);
        mineCountSelected = !isNaN(value) && value >= 10 && value <= 20;
    });

    startGameBtn?.addEventListener('click', () => {
        // Check if game has already started
        if (gameStarted) {
            showToast('Game already in progress! Finish current game or refresh to start new.', 'warning');
            return;
        }
        
        const value = parseInt(mineCountInput?.value || '0');
        if (value >= 10 && value <= 20) {
            mineCountSelected = true;
            gameStarted = true;
        }
    });

    // Add grid click validation
    grid?.addEventListener('click', (e) => {
        if (!mineCountSelected && !gameStarted) {
            e.preventDefault();
            e.stopPropagation();
            showToast('Please select the number of mines (10-20) before starting!', 'warning');
        }
    }, true); // Use capture phase to intercept before other handlers
}

/**
  Show a non-intrusive toast message
 * Inputs: String thats the message and a type var thats a string that can be 'info', 'warning', 'success', 'error' and defaults to 'info'
 * Outputs: None
 */
export function showToast(message: string, type: 'info' | 'warning' | 'success' | 'error' = 'info') {
    // Remove any existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Style the toast
    toast.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${getToastColor(type)};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 500;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 10);

    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}

/**
 * Get color for toast type
 * Inputs: string on what the Toast is
 * Outputs: Hex value associated with that (as a string)
 */
function getToastColor(type: string): string {
    switch (type) {
        case 'success': return '#4ecdc4';
        case 'warning': return '#f39c12';
        case 'error': return '#ff6b6b';
        default: return '#667eea';
    }
}

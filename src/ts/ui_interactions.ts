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
 Initialize all UI interactions
 */
export function setupUIInteractions() {
    setupFloatingInstructions();
    setupMineCountValidation();
    setupPresetButtons();
    setupAboutModal();
    
    // Listen for game start events
    document.addEventListener('gameStarted', () => {
        gameStarted = true;
    });
}

/**
 Setup floating instructions panel
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
 Setup preset button functionality for mine count selection
 */
function setupPresetButtons() {
    const presetButtons = document.querySelectorAll('.preset-btn');
    const mineCountInput = document.getElementById('mineCount') as HTMLInputElement;

    presetButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
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
 Setup mine count validation and grid click prevention
 */
function setupMineCountValidation() {
    const mineCountInput = document.getElementById('mineCount') as HTMLInputElement;
    const startGameBtn = document.getElementById('setMineCountBtn');
    const grid = document.getElementById('grid');

    // Track when mine count is properly set
    mineCountInput?.addEventListener('input', () => {
        const value = parseInt(mineCountInput.value);
        mineCountSelected = !isNaN(value) && value >= 10 && value <= 20;
    });

    startGameBtn?.addEventListener('click', () => {
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
 */
function getToastColor(type: string): string {
    switch (type) {
        case 'success': return '#4ecdc4';
        case 'warning': return '#f39c12';
        case 'error': return '#ff6b6b';
        default: return '#667eea';
    }
}
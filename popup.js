// Popup Component Class
class CustomPopup {
    constructor() {
        this.init();
    }

    init() {
        // Create a hidden popup container that's always ready
        this.popupContainer = document.createElement('div');
        this.popupContainer.style.display = 'none';
        document.body.appendChild(this.popupContainer);
    }

    show(options) {
        const {
            title = 'Confirm Action',
            icon = '⚠️',
            message,
            confirmText = 'OK',
            type = 'default',
            showCancel = false,
            autoClose = false,
            onConfirm = () => {}
        } = options;

        // Create popup element with inline styles for immediate rendering
        const popup = document.createElement('div');
        popup.id = 'customPopup';
        
        // Set popup HTML with inline styles
        popup.innerHTML = `
            <div class="popup-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 9999;">
                <div class="popup-content ${type}" style="background: #fff; padding: 20px; border-radius: 12px; min-width: 300px; max-width: 90%; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);">
                    <div class="popup-header" style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                        <span class="popup-icon" style="font-size: 24px;">${icon}</span>
                        <h3 style="margin: 0;">${title}</h3>
                    </div>
                    <div class="popup-body" style="margin-bottom: 20px;">
                        <p style="margin: 0;">${message}</p>
                    </div>
                    <div class="popup-footer" style="display: flex; justify-content: flex-end; gap: 10px;">
                        ${showCancel ? `<button class="popup-btn cancel" style="padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; background: #00203f; color: white;">Cancel</button>` : ''}
                        <button class="popup-btn confirm" style="padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; background: #00b764; color: white;">${confirmText}</button>
                    </div>
                </div>
            </div>
        `;

        // Add to DOM
        this.popupContainer.innerHTML = '';
        this.popupContainer.appendChild(popup);
        this.popupContainer.style.display = 'block';

        // Setup event listeners
        const confirmBtn = popup.querySelector('.confirm');
        const cancelBtn = popup.querySelector('.cancel');
        
        confirmBtn.onclick = () => {
            onConfirm();
            this.close();
        };

        if (cancelBtn) {
            cancelBtn.onclick = () => this.close();
        }

        // Close on overlay click
        popup.querySelector('.popup-overlay').onclick = (e) => {
            if (e.target.classList.contains('popup-overlay')) {
                this.close();
            }
        };

        // Close on ESC key
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.close();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);

        // Auto close if specified
        if (autoClose) {
            setTimeout(() => this.close(), autoClose);
        }
    }

    close() {
        this.popupContainer.style.display = 'none';
    }
}

// Create global popup instance
const popup = new CustomPopup();

// Make it globally available
window.popup = popup;   
(function() {
  "use strict";

  // ============================================
  // SwymConsentManager - Handles consent state
  // ============================================
  window.SwymConsentManager = window.SwymConsentManager || {
    hasConsent: null, // null = unknown, true = granted, false = denied

    // Check if user has given consent
    checkConsent() {
      const shopify = window.Shopify;
      const privacy = shopify?.customerPrivacy;
      
      // In design mode, always treat as consented
      if (shopify?.designMode) {
        this.hasConsent = true;
        return true;
      }
      
      const consent = privacy?.preferencesProcessingAllowed?.();
      
      if (consent === true) {
        this.hasConsent = true;
        return true;
      } else if (consent === false) {
        this.hasConsent = false;
        return false;
      }
      
      // Consent not yet determined - treat as no consent for safety
      this.hasConsent = false;
      return false;
    },

    // Set consent after user accepts
    async grantConsent() {
      const privacy = window.Shopify?.customerPrivacy;
      
      if (privacy?.setTrackingConsent) {
        try {
          await new Promise((resolve, reject) => {
            privacy.setTrackingConsent(
              {
                preferences: true,
                analytics: true,
                marketing: false
              },
              resolve,
              reject
            );
          });
          this.hasConsent = true;
          
          // Dispatch event for other components
          document.dispatchEvent(new CustomEvent('visitorConsentCollected'));
          
          return true;
        } catch (error) {
          console.warn('[SWYM] Failed to set consent via Shopify API:', error);
          return false;
        }
      }
      
      console.warn('[SWYM] Shopify Customer Privacy API not available');
      return false;
    }
  };

  // ============================================
  // SwymConsentPopupManager - Handles popup UI
  // ============================================
  window.SwymConsentPopupManager = window.SwymConsentPopupManager || {
    popupElement: null,
    isInitialized: false,
    pendingAction: null,
    source: null, // For instrumentation (e.g., 'advanced-pdp-button', 'advanced-header-icon')

    init() {
      if (this.isInitialized) return;
      
      this.popupElement = document.getElementById('swym-consent-popup');
      if (!this.popupElement) {
        return;
      }

      this.bindEvents();
      this.isInitialized = true;
    },

    bindEvents() {
      // Handle close button and overlay clicks
      this.popupElement.querySelectorAll('[data-swym-consent-close]').forEach(el => {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          this.hide();
        });
      });

      // Handle Accept button
      const acceptBtn = this.popupElement.querySelector('[data-swym-consent-accept]');
      if (acceptBtn) {
        acceptBtn.addEventListener('click', async (e) => {
          e.preventDefault();
          await this.handleAccept();
        });
      }

      // Handle Decline button
      const declineBtn = this.popupElement.querySelector('[data-swym-consent-decline]');
      if (declineBtn) {
        declineBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleDecline();
        });
      }

      // Handle Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isVisible()) {
          this.hide();
        }
      });
    },

    // Show popup with options
    // options: { source: string, pendingAction: function }
    show(options = {}) {
      if (!this.popupElement) {
        this.init();
      }
      if (!this.popupElement) return false;

      this.pendingAction = options.pendingAction || null;
      this.source = options.source || 'unknown';
      
      this.popupElement.setAttribute('aria-hidden', 'false');
      
      // Instrument: GDPR Consent Popup Shown (804)
      window._swat?.instrumentV3?.(804, {
        src: this.source,
        action: 'gdpr-consent-popup-shown'
      });
      
      // Focus the accept button for accessibility
      const acceptBtn = this.popupElement.querySelector('[data-swym-consent-accept]');
      if (acceptBtn) {
        setTimeout(() => acceptBtn.focus(), 100);
      }
      
      return true;
    },

    hide() {
      if (!this.popupElement) return;
      
      this.popupElement.setAttribute('aria-hidden', 'true');
      this.pendingAction = null;
      this.source = null;
    },

    isVisible() {
      return this.popupElement?.getAttribute('aria-hidden') === 'false';
    },

    async handleAccept() {
      const acceptBtn = this.popupElement?.querySelector('[data-swym-consent-accept]');
      
      // Show spinner on accept button
      if (acceptBtn) {
        acceptBtn.classList.add('swym-loading');
        acceptBtn.disabled = true;
      }
      
      // Instrument: GDPR Consent Accepted (805)
      window._swat?.instrumentV3?.(805, {
        src: this.source,
        action: 'gdpr-consent-accepted'
      });
      
      const success = await SwymConsentManager.grantConsent();
      
      // Remove spinner
      if (acceptBtn) {
        acceptBtn.classList.remove('swym-loading');
        acceptBtn.disabled = false;
      }
      
      // Store pending action before hiding (hide clears it)
      const actionToExecute = this.pendingAction;
      
      this.hide();
      
      // Execute pending action (component-specific logic)
      if (success && actionToExecute && typeof actionToExecute === 'function') {
        try {
          await actionToExecute();
        } catch (error) {
          console.warn('[SWYM] Pending action failed:', error);
        }
      }
    },

    handleDecline() {
      // Instrument: GDPR Consent Declined (806)
      window._swat?.instrumentV3?.(806, {
        src: this.source,
        action: 'gdpr-consent-declined'
      });
      
      this.hide();
      console.log('[SWYM] User declined consent');
    }
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      SwymConsentPopupManager.init();
    });
  } else {
    SwymConsentPopupManager.init();
  }
})();

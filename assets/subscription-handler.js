// assets/subscription-handler.js
class SubscriptionHandler {
  constructor() {
    this.subscribeRadio = document.getElementById('subscribe');
    this.oneTimeRadio = document.getElementById('oneTime');
    this.form = document.getElementById('product-form-banner');
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    if (this.subscribeRadio) {
      this.subscribeRadio.addEventListener('change', () => {
        if (this.subscribeRadio.checked) {
          this.initializeAppstleWidget();
        }
      });
    }

    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }
  }

  initializeAppstleWidget() {
    if (typeof window.appstleSubscription !== 'undefined') {
      const productId = this.form.dataset.productId;
      const variantId = document.getElementById('variant-id').value;

      window.appstleSubscription.init({
        productId: productId,
        variantId: variantId,
        container: '#appstle-subscription-widget-container'
      });
    } else {
      setTimeout(() => this.initializeAppstleWidget(), 500);
    }
  }

  handleFormSubmit(e) {
    if (this.subscribeRadio.checked) {
      e.preventDefault();
      this.addSubscriptionToCart();
    }
    // One-time purchase handled by existing code
  }

  async addSubscriptionToCart() {
    const appstleData = window.appstleSubscription?.getSelectedPlan();
    
    if (!appstleData) {
      alert('Please select a subscription plan');
      return;
    }

    const variantId = document.getElementById('variant-id').value;
    const quantity = parseInt(document.getElementById('product-quantity').value, 10);
    
    const formData = {
      items: [{
        id: parseInt(variantId, 10),
        quantity: quantity,
        properties: {
          'subscription_id': appstleData.subscriptionId,
          'delivery_frequency': appstleData.frequency,
          'delivery_interval': appstleData.interval,
          'discount_amount': appstleData.discountAmount || 0,
          '_appstle_subscription': 'true'
        }
      }]
    };

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to add subscription');

      const data = await response.json();
      console.log('✅ Subscription added:', data);

      // Trigger cart updates
      document.dispatchEvent(new CustomEvent('cart:updated'));
      
      // Open cart
      setTimeout(() => {
        if (typeof window.openCartPopup === 'function') {
          window.openCartPopup();
        }
      }, 400);

    } catch (error) {
      console.error('❌ Subscription error:', error);
      alert('Error: ' + error.message);
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SubscriptionHandler();
  });
} else {
  new SubscriptionHandler();
}
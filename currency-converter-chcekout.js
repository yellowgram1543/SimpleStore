document.addEventListener('DOMContentLoaded', function() {
  const USD_TO_INR_RATE = 83.12;
  let currentCurrency = localStorage.getItem('currency') || 'USD';

    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'currency-toggle-btn';
    toggleBtn.textContent = currentCurrency === 'USD' ? 'Switch to ₹ INR' : 'Switch to $ USD';
    toggleBtn.style.cssText = `
      background-color: #d9534f;
      color: white;
      border: none;
      padding: 8px 15px;
      border-radius: 5px;
      cursor: pointer;
      margin-left: 15px;
    `;

    // Add button to header (same as currency-converter.js)
    const headerIcons = document.querySelector('.header-icons');
    if (headerIcons) {
        headerIcons.appendChild(toggleBtn);
    }

    // Toggle button click handler
    toggleBtn.addEventListener('click', function() {
        currentCurrency = currentCurrency === 'USD' ? 'INR' : 'USD';
        localStorage.setItem('currency', currentCurrency);
        this.textContent = currentCurrency === 'USD' ? 'Switch to ₹ INR' : 'Switch to $ USD';
        updateCheckoutPrices();
    });

  function updateCheckoutPrices() {
      document.querySelectorAll('.checkout-item').forEach(item => {
          const priceElement = item.querySelector('.item-details p:nth-child(3)');
          const totalElement = item.querySelector('.item-details p:nth-child(4)');
          
          const usdPrice = parseFloat(priceElement.getAttribute('data-usd-price'));
          const quantity = parseInt(item.querySelector('.item-details p:nth-child(2)').textContent.split(': ')[1]);
          
          if (!isNaN(usdPrice)) {
              const price = currentCurrency === 'USD' ? usdPrice : usdPrice * USD_TO_INR_RATE;
              const total = price * quantity;
              
              priceElement.textContent = `Price: ${currentCurrency === 'USD' ? '$' : '₹'}${price.toFixed(2)}`;
              totalElement.textContent = `Total: ${currentCurrency === 'USD' ? '$' : '₹'}${total.toFixed(2)}`;
          }
      });

      // Update final totals
      const subtotalElement = document.querySelector('.subtotal');
      const shippingElement = document.querySelector('.shipping');
      const finalTotalElement = document.querySelector('.final-total');

      if (subtotalElement && shippingElement && finalTotalElement) {
          const subtotal = parseFloat(subtotalElement.getAttribute('data-usd-amount'));
          const shipping = parseFloat(shippingElement.getAttribute('data-usd-amount'));
          
          const convertedSubtotal = currentCurrency === 'USD' ? subtotal : subtotal * USD_TO_INR_RATE;
          const convertedShipping = currentCurrency === 'USD' ? shipping : shipping * USD_TO_INR_RATE;
          const convertedTotal = convertedSubtotal + convertedShipping;

          subtotalElement.textContent = `Subtotal: ${currentCurrency === 'USD' ? '$' : '₹'}${convertedSubtotal.toFixed(2)}`;
          shippingElement.textContent = `Shipping: ${currentCurrency === 'USD' ? '$' : '₹'}${convertedShipping.toFixed(2)}`;
          finalTotalElement.textContent = `Total: ${currentCurrency === 'USD' ? '$' : '₹'}${convertedTotal.toFixed(2)}`;
      }
  }

  toggleBtn.addEventListener('click', function() {
      currentCurrency = currentCurrency === 'USD' ? 'INR' : 'USD';
      localStorage.setItem('currency', currentCurrency);
      this.textContent = currentCurrency === 'USD' ? 'Switch to ₹ INR' : 'Switch to $ USD';
      updateCheckoutPrices();
  });
});
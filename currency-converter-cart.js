document.addEventListener('DOMContentLoaded', function () {
  const USD_TO_INR_RATE = 83.12;
  let currentCurrency = localStorage.getItem('currency') || 'USD';

  // Create currency toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'currency-toggle-btn';
  toggleBtn.textContent = currentCurrency === 'USD' ? 'Switch to ₹ INR' : 'Switch to $ USD';
  toggleBtn.style.cssText = `
      background-color: #d9534f;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      margin: 10px 0;
      display: block;
  `;
  
  // Wait for cart section to be populated
  setTimeout(() => {
      const cartSection = document.querySelector('.cart');
      if (cartSection) {
          const cartTitle = cartSection.querySelector('h1');
          if (cartTitle) {
              cartTitle.insertAdjacentElement('afterend', toggleBtn);
          }
      }
  }, 100);

  // Toggle button click handler
  toggleBtn.addEventListener('click', function () {
      currentCurrency = currentCurrency === 'USD' ? 'INR' : 'USD';
      localStorage.setItem('currency', currentCurrency);
      this.textContent = currentCurrency === 'USD' ? 'Switch to ₹ INR' : 'Switch to $ USD';
      updateCartPrices();
  });

  function updateCartPrices() {
      document.querySelectorAll('.cart-item').forEach(item => {
          const priceElement = item.querySelector('.item-price');
          const usdPrice = parseFloat(priceElement.getAttribute('data-usd-price'));
          if (!isNaN(usdPrice)) {
              priceElement.textContent = formatCurrency(usdPrice, currentCurrency);
          }
          
          // Update item total
          const quantity = parseInt(item.querySelector('p:nth-child(3)').textContent.split(': ')[1]);
          const itemTotal = usdPrice * quantity;
          item.querySelector('p:nth-child(4)').textContent = `Total: ${formatCurrency(itemTotal, currentCurrency)}`;
      });

      // Update total price
      const totalPriceElement = document.querySelector('.total-price');
      if (totalPriceElement) {
          const totalUsdPrice = parseFloat(totalPriceElement.getAttribute('data-usd-total'));
          if (!isNaN(totalUsdPrice)) {
              totalPriceElement.textContent = `Total Price: ${formatCurrency(totalUsdPrice, currentCurrency)}`;
          }
      }
  }

  function formatCurrency(amount, currency) {
      if (currency === 'USD') {
          return `$${amount.toFixed(2)}`;
      } else {
          return `₹${(amount * USD_TO_INR_RATE).toFixed(2)}`;
      }
  }
});
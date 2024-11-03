// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Constants
  const USD_TO_INR_RATE = 83.12;
  let currentCurrency = 'USD';

  // Create and add the currency toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.innerHTML = 'Switch to ₹ INR';
  toggleBtn.className = 'currency-toggle-btn';
  toggleBtn.style.cssText = `
      background-color: #d9534f;
      color: white;
      border: none;
      padding: 8px 15px;
      border-radius: 5px;
      cursor: pointer;
      margin-left: 15px;
  `;

  // Add button to header
  const headerIcons = document.querySelector('.header-icons');
  headerIcons.appendChild(toggleBtn);

  // Function to format currency
  function formatCurrency(amount, currency) {
      if (currency === 'USD') {
          return `$${amount.toFixed(2)}`;
      } else {
          return `₹${(amount * USD_TO_INR_RATE).toFixed(2)}`;
      }
  }

  // Function to update all prices
  function updatePrices() {
      // Update product prices
      document.querySelectorAll('.product-item p').forEach(priceElement => {
          // Get the original USD price
          let usdPrice = priceElement.getAttribute('data-usd-price');
          if (!usdPrice) {
              // Store original USD price if not already stored
              usdPrice = parseFloat(priceElement.textContent.replace('$', ''));
              priceElement.setAttribute('data-usd-price', usdPrice);
          }
          
          // Update the displayed price
          priceElement.textContent = formatCurrency(parseFloat(usdPrice), currentCurrency);
      });

      // Update add-to-cart button prices
      document.querySelectorAll('.add-to-cart').forEach(button => {
          let usdPrice = button.getAttribute('data-original-price');
          if (!usdPrice) {
              usdPrice = parseFloat(button.getAttribute('data-price'));
              button.setAttribute('data-original-price', usdPrice);
          }

          const newPrice = currentCurrency === 'USD' ? 
              usdPrice : 
              (usdPrice * USD_TO_INR_RATE);
          button.setAttribute('data-price', newPrice);
      });
  }

  // Toggle button click handler
  toggleBtn.addEventListener('click', function() {
      currentCurrency = currentCurrency === 'USD' ? 'INR' : 'USD';
      toggleBtn.innerHTML = currentCurrency === 'USD' ? 'Switch to ₹ INR' : 'Switch to $ USD';
      updatePrices();
  });

  // Initialize cart array
  let cart = [];

  // Add to cart functionality
  document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', function() {
          const productId = this.getAttribute('data-id');
          const productName = this.getAttribute('data-name');
          const productPrice = parseFloat(this.getAttribute('data-price'));

          // Add to cart
          cart.push({
              id: productId,
              name: productName,
              price: productPrice
          });

          // Update cart count
          const cartCount = document.querySelector('.cart-count');
          cartCount.style.display = 'block';
          cartCount.textContent = cart.length;

          // Add animation class
          this.classList.add('adding');
          setTimeout(() => {
              this.classList.remove('adding');
              this.classList.add('success');
              setTimeout(() => this.classList.remove('success'), 1000);
          }, 600);
      });
  });

  // Store initial USD prices
  updatePrices();
});
// checkout.js
document.addEventListener("DOMContentLoaded", function() {
  // Display cart items in checkout summary
  displayCheckoutSummary();

  // Handle form submission
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
      checkoutForm.addEventListener('submit', handleCheckout);
  }

  // Format card number input
  const cardNumberInput = document.getElementById('card-number');
  if (cardNumberInput) {
      cardNumberInput.addEventListener('input', function(e) {
          let value = e.target.value.replace(/\D/g, '');
          // Add spaces every 4 digits
          value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
          // Limit to 16 digits plus spaces
          e.target.value = value.substring(0, 19);
      });
  }

  // Format expiry date input
  const expiryInput = document.getElementById('expiry');
  if (expiryInput) {
      expiryInput.addEventListener('input', function(e) {
          let value = e.target.value.replace(/\D/g, '');
          if (value.length >= 2) {
              value = value.substring(0, 2) + '/' + value.substring(2, 4);
          }
          e.target.value = value.substring(0, 5);
      });
  }

  // Format CVV input
  const cvvInput = document.getElementById('cvv');
  if (cvvInput) {
      cvvInput.addEventListener('input', function(e) {
          let value = e.target.value.replace(/\D/g, '');
          e.target.value = value.substring(0, 3);
      });
  }
});

function displayCheckoutSummary() {
  const cartContainer = document.querySelector(".cart-items");
  const totalPriceElement = document.querySelector(".total-price");
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  if (!cartContainer || !totalPriceElement) return;

  if (cartItems.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      totalPriceElement.textContent = "Total: $0.00";
      return;
  }

  cartContainer.innerHTML = '';

  cartItems.forEach(item => {
      const itemTotal = item.price * (item.quantity || 1);
      total += itemTotal;

      const itemElement = document.createElement('div');
      itemElement.classList.add('checkout-item');
      itemElement.innerHTML = `
          <div class="item-details">
              <h3>${item.name}</h3>
              <p>Quantity: ${item.quantity || 1}</p>
              <p>Price: $${item.price.toFixed(2)}</p>
              <p>Total: $${itemTotal.toFixed(2)}</p>
          </div>
      `;
      cartContainer.appendChild(itemElement);
  });

  // Add shipping cost (you can modify this as needed)
  const shipping = 5.99;
  const finalTotal = total + shipping;

  totalPriceElement.innerHTML = `
      <div class="subtotal">Subtotal: $${total.toFixed(2)}</div>
      <div class="shipping">Shipping: $${shipping.toFixed(2)}</div>
      <div class="final-total">Total: $${finalTotal.toFixed(2)}</div>
  `;
}

function validateForm(formData) {
  // Basic validation rules
  const cardNumber = formData.get('card-number').replace(/\s/g, '');
  const expiry = formData.get('expiry');
  const cvv = formData.get('cvv');

  if (cardNumber.length !== 16) {
      alert('Please enter a valid 16-digit card number');
      return false;
  }

  const currentDate = new Date();
  const [expiryMonth, expiryYear] = expiry.split('/');
  const expiryDate = new Date(2000 + parseInt(expiryYear), parseInt(expiryMonth) - 1);

  if (expiryDate < currentDate) {
      alert('Card has expired');
      return false;
  }

  if (cvv.length !== 3) {
      alert('Please enter a valid 3-digit CVV');
      return false;
  }

  return true;
}

function handleCheckout(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  
  if (!validateForm(formData)) {
      return;
  }

  // Create order object
  const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      customer: {
          name: formData.get('name'),
          email: formData.get('email'),
          address: formData.get('address'),
          city: formData.get('city'),
          zip: formData.get('zip')
      },
      items: JSON.parse(localStorage.getItem('cart')) || [],
      total: calculateTotal()
  };

  // Save order to localStorage (in a real app, this would go to a server)
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  // Clear the cart
  localStorage.removeItem('cart');

  // Show success message and redirect
  alert('Order placed successfully! Thank you for your purchase.');
  window.location.href = 'order-confirmation.html'; // Create this page if needed
}

function calculateTotal() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const subtotal = cartItems.reduce((total, item) => {
      return total + (item.price * (item.quantity || 1));
  }, 0);
  const shipping = 5.99;
  return subtotal + shipping;
}


// Function to handle direct checkout from product page
function directCheckout(productId, productName, productPrice) {
  // Clear existing cart
  localStorage.setItem('cart', JSON.stringify([{
      id: productId,
      name: productName,
      price: parseFloat(productPrice),
      quantity: 1
  }]));
  
  // Redirect to checkout page
  window.location.href = 'checkout.html';
}



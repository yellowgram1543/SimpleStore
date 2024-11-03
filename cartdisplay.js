document.addEventListener("DOMContentLoaded", function () {
  displayCartItems();
});

function displayCartItems() {
  const cartContainer = document.querySelector(".cart-items");
  const totalPriceElement = document.querySelector(".total-price");
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    totalPriceElement.innerHTML = '';
    return;
  }

  // Clear the container before adding items
  cartContainer.innerHTML = '';

  // Display each item
  cartItems.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <h3>${item.name}</h3>
      <p class="item-price" data-usd-price="${item.price}">$${item.price.toFixed(2)}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Total: $${itemTotal.toFixed(2)}</p>
      <button class="remove-from-cart" data-id="${item.id}">Remove</button>
    `;
    cartContainer.appendChild(itemElement);
  });

  totalPriceElement.setAttribute('data-usd-total', total);
  totalPriceElement.innerHTML = `Total Price: $${total.toFixed(2)}`;

  // Add event listeners for remove buttons
  document.querySelectorAll('.remove-from-cart').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.dataset.id;
      removeFromCart(productId);
    });
  });
}

function removeFromCart(productId) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems = cartItems.filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  displayCartItems(); // Refresh the cart display
}

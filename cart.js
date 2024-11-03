document.addEventListener("DOMContentLoaded", function () {
  const cartCount = document.createElement("span");
  let itemCount = 0;

  // Update cart count from existing items
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  itemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const cartIcon = document.querySelector(".header-icons a:nth-child(2)"); // Select the Cart link
  cartIcon.style.position = "relative";
  cartCount.classList.add("cart-count");
  cartCount.innerText = itemCount;
  cartCount.style.display = itemCount > 0 ? "inline-block" : "none";
  cartIcon.appendChild(cartCount);

  // Function to add item to cart
  function addToCart(product) {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      
      // Check if product already exists in the cart
      const existingProduct = cartItems.find(item => item.id === product.id);
      if (existingProduct) {
          existingProduct.quantity = (existingProduct.quantity || 1) + 1;
      } else {
          product.quantity = 1;
          cartItems.push(product);
      }
      
      localStorage.setItem("cart", JSON.stringify(cartItems));
      
      // Update cart count display
      itemCount++;
      cartCount.innerText = itemCount;
      cartCount.style.display = "inline-block";
      
      alert(`${product.name} has been added to your cart!`);
  }

  // Add click handlers to all "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", function() {
          const product = {
              id: this.dataset.id,
              name: this.dataset.name,
              price: parseFloat(this.dataset.price)
          };
          addToCart(product);
      });
  });
});
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.add('adding');
    
    // Prevent multiple clicks while animating
    button.disabled = true;
    
    setTimeout(() => {
      button.classList.remove('adding');
      button.classList.add('success');
      
      // Update cart count
      const cartCount = document.querySelector('.cart-count');
      cartCount.style.display = 'flex';
      cartCount.classList.add('show');
      
      // Re-enable button after animation
      setTimeout(() => {
        button.disabled = false;
      }, 600);
    }, 600);
  });
});
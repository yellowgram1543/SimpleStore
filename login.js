// Get the form and input fields
const form = document.querySelector('form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Listen for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get the values from the input fields
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Basic validation
    if (email === '' || password === '') {
        alert('Please fill in both the email and password fields.');
        return;
    }

    // Simple validation for email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Temporary login success message
    alert('Login successful!');
    form.reset(); // Clear the form fields
});

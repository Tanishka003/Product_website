document.getElementById('itemForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const value = document.getElementById('value').value;
  
    const response = await fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, value }),
    });
  
    if (response.ok) {
      alert('Item added successfully');
      loadItems();
    } else {
      alert('Error adding item');
    }
  });
  
  async function loadItems() {
    const response = await fetch('http://localhost:3000/items');
    const items = await response.json();
  
    const itemsDiv = document.getElementById('items');
    itemsDiv.innerHTML = '';
    items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.textContent = `${item.name}: ${item.value}`;
      itemsDiv.appendChild(itemDiv);
    });
  }
  
  document.addEventListener('DOMContentLoaded', loadItems);
  // Form validation and submission
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();
  let nameInput = document.querySelector('input[type="text"]');
  let emailInput = document.querySelector('input[type="email"]');
  let messageInput = document.querySelector('textarea');
  let errorMessages = document.querySelectorAll('.error');

  // Remove existing error messages
  errorMessages.forEach(error => error.remove());

  // Validate inputs
  if (nameInput.value === '') {
      showError(nameInput, 'Please enter your name.');
  }

  if (emailInput.value === '') {
      showError(emailInput, 'Please enter your email address.');
  } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email address.');
  }

  if (messageInput.value === '') {
      showError(messageInput, 'Please enter your message.');
  }

  // Submit the form if no errors
  if (document.querySelectorAll('.error').length === 0) {
      // Create a data object to send to the backend
      const formData = {
          name: nameInput.value,
          email: emailInput.value,
          message: messageInput.value
      };

      // Send a POST request to the backend
      fetch('/api/contact', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          // Handle the response from the backend
          alert('Form submitted successfully!');
          document.querySelector('form').reset();
      })
      .catch(error => {
          console.error('Error submitting form:', error);
      });
  }
});

function showError(input, message) {
  let error = document.createElement('div');
  error.className = 'error';
  error.textContent = message;
  input.parentNode.appendChild(error);
}

function isValidEmail(email) {
  // Very basic email validation regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
// script.js

document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById('signupForm');

  signupForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Form के डिफॉल्ट सबमिशन को रोकता है

    const name = signupForm.querySelector('input[placeholder="Your Name"]').value;
    const email = signupForm.querySelector('input[placeholder="Your Email"]').value;
    const password = signupForm.querySelector('input[placeholder="Your Password"]').value;

    // Validate input
    if (name && email && password) {
      // यदि सब कुछ सही है, तो इसे सर्वर पर भेजने की प्रक्रिया लिखें
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Password:', password);
      
      // आप यहाँ AJAX, fetch API, या किसी भी तरीके से सर्वर पर डेटा भेज सकते हैं
      
      alert('Sign Up Successful!');
    } else {
      alert('Please fill in all fields');
    }
  });
});

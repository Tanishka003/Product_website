document.getElementById('itemForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const value = document.getElementById('value').value;

  try {
    const response = await fetch('http://localhost:3002/items', {
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
  } catch (error) {
    console.error('Error adding item:', error);
    alert('Error adding item');
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById('signupForm');

  if (signupForm) {
    signupForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = signupForm.querySelector('input[name="name"]').value;
      const email = signupForm.querySelector('input[name="email"]').value;
      const password = signupForm.querySelector('input[name="password"]').value;

      if (name && email && password) {
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);
        alert('Sign Up Successful!');
        signupForm.reset();
      } else {
        alert('Please fill in all fields');
      }
    });
  } else {
    console.error('Signup form element not found in the DOM.');
  }

  const itemForm = document.getElementById('itemForm');

  if (itemForm) {
    itemForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const name = document.getElementById('name').value;
      const value = document.getElementById('value').value;
  
      try {
        const response = await fetch('http://localhost:3002/items', {
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
      } catch (error) {
        console.error('Error adding item:', error);
        alert('Error adding item');
      }
    });
  }

  async function loadItems() {
    try {
      const response = await fetch('http://localhost:3002/items');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const items = await response.json();
  
      const itemsDiv = document.getElementById('items');
      itemsDiv.innerHTML = '';
      items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.name}: ${item.value}`;
        itemsDiv.appendChild(itemDiv);
      });
    } catch (error) {
      console.error('Error loading items:', error);
    }
  }

  loadItems();

  const contactForm = document.querySelector('form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let nameInput = document.querySelector('input[type="text"]');
      let emailInput = document.querySelector('input[type="email"]');
      let messageInput = document.querySelector('textarea');
      let errorMessages = document.querySelectorAll('.error');

      errorMessages.forEach(error => error.remove());

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

      if (document.querySelectorAll('.error').length === 0) {
        const formData = {
          name: nameInput.value,
          email: emailInput.value,
          message: messageInput.value
        };

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
          alert('Form submitted successfully!');
          contactForm.reset();
        })
        .catch(error => {
          console.error('Error submitting form:', error);
        });
      }
    });
  }

  function showError(input, message) {
    let error = document.createElement('div');
    error.className = 'error';
    error.textContent = message;
    input.parentNode.appendChild(error);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});
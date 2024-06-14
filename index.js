const express = require('express');
const bodyParser = require('body-parser');
const { connectDB, Signup } = require('./mongodb'); // Import the MongoDB connection function and collection
// const Signup = require('./mongodb');
const path = require('path');

const app = express();
const port = 3002;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // Use this middleware to parse form data

// Connect to MongoDB
connectDB()
  
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      throw new Error('Please fill in all fields');
    }

    const newSignup = new Signup({ name, email, password });
    await newSignup.save();
    res.redirect('/signup'); // Redirect to the signup page after successful submission
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).send(`Error during signup: ${error.message}`);
  }
});

// app.post('/signup', async (req, res) => {
//   // Extract form data manually from req.body
//   const data = {
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password
//   };

//   try {
//     await collection.insertMany([data]);
//     res.redirect('/signup'); // Redirect to the signup page after successful submission
//   } catch (error) {
//     console.error('Error during signup:', error);
//     res.status(500).send('Error during signup');
//   }
// });
// app.get('/items', async (req, res) => {
//   try {
//     const items = await collection.find({}).toArray();
//     res.json(items);
//   } catch (error) {
//     console.error('Error fetching items:', error);
//     res.status(500).send('Error fetching items');
//   }
// });

// // Add a new item
// app.post('/items', async (req, res) => {
//   const data = {
//     name: req.body.name,
//     value: req.body.value
//   };

//   try {
//     await collection.insertMany([data]);
//     res.status(201).json({ message: 'Item added successfully' });
//   } catch (error) {
//     console.error('Error adding item:', error);
//     res.status(500).send('Error adding item');
//   }
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
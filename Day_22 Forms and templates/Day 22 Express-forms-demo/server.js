// In this file we will implemnt following features:
// 1. Setup an Express server
// 2. Create a simple GET endpoint
// Middleware is used for parsing JSON request bodies
// 3. Error handling for unknown routes
// DB setup  ie mongoose for MongoDB connection
// serving Static HTMl form 
// Post route to handle form submission, validate input and save to DB
// Displaying message on successful submission, validation errors etc


// // 1. Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const validation = require('express-validator');

const app = express();

const PORT = process.env.PORT || 3000;


// // 2. Body parser middleware
// Middleware for parsing JSON request bodies
// objective of this code is to setup body-parser middleware 
// which can parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// // 3. Connect MongoDB
// Connect to MongoDB using Mongoose here Mongoose is used as an ODM (Object Data Modeling) library for MongoDB and Node.js
// prequisite is to setup mongoose connection to MongoDB database ie Atlas and compass 
mongoose.connect('mongodb://localhost:27017/formDB')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

    // Define a Mongoose schema and model for form submissions
    // With the help of schema model we will push form data to the database ie ORM : Object relation mapping will take place 
const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Form = mongoose.model('Form', formSchema);


// // 4. Serve static HTML from public folder
// Serve static HTML form :  so that user can access the form via browser
app.use(express.static(path.join(__dirname, 'public')));    

// public folder will contain the HTML form

// GET endpoint 
app.get('/api', (req, res) => {
    res.send('Hello, this is the GET endpoint!');
});


// // 5. Load Routes
// POST route to handle form submission, validate input and save to DB
app.post('/submit-form', 
    // Validation middleware for form inputs before saving to DB   
    [
        validation.body('name').notEmpty().withMessage('Name is required'),
        validation.body('email').isEmail().withMessage('Valid email is required'),
        validation.body('message').notEmpty().withMessage('Message is required')
    ],
    async (req, res) => {   
        const errors = validation.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, message } = req.body;
        const newForm = new Form({ name, email, message });
// performing save operation to the database with error handling
        try {
            await newForm.save();
            res.status(201).json({ message: 'Form submitted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to submit form' });
        }
    }
);      


// get success page 
app.get('/success', (req, res) => {
    res.send('Form submitted successfully!');
});


// // 6. 404 route for unknown paths
// Error handling for unknown routes
app.use((req, res, next) => {
    res.status(404).send('Sorry, we could not find that route!');
});


// // 7. Start server
// Start the Express server on specified PORT
app.listen(PORT, () => {
    console.log("Server is running on port ${PORT}");
});


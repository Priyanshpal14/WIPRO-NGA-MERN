// This file serves as the main entry point for the application where we will configure template rendering and set up routes.
// Below are the steps to achieve this:
//Step 1: Import necessary modules
//Step 2: Set up the Express application
//Step 3: Configure the template engine
//Step 4: Define routes to render templates
//Step 5: Start the server
const express = require('express');
const app = express();
const homeRoutes = require('./routes/HomeRoute');

// Import path
const path = require('path');

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', './views');
// Step 4: Define routes to render templates


app.use("/", homeRoutes);

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
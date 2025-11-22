// here we are only concerned with server.js basics reisponsibilities like setting up the server, middleware, and connecting routes
const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');    // Import student routes
const app = express(); //creating express app
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Use student routes
app.use('/api', studentRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// This file sets up the Express server, applies middleware, and connects the student routes to the application.
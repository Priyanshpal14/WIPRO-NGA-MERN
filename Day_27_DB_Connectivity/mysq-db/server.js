// in server.js we will set up the Express server and use the routes defined in routes.js
//Step 1: Import the necessary modules
//Step 2: Set up the Express application
//Step 3: Use the routes defined in routes.js
//Step 4: Start the server and listen on a specified port
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

require("./db");


// Import routes
const routes = require('./routes'); // Make sure file name is routes.js

// Use routes
app.use('/api', routes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

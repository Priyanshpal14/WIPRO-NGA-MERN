// This file is server.js where we fill set up a basic Express server to handle HTTP requests.
//Following steps canbe implemented to set up a basic Express server with socket.io integration
//Step1: Import necessary modules
//Step2: Initialize Express app
//Step3: Set up socket.io server
        //Creating a new instance of the socket.io server with CORS settings
        //Connection event listener to handle new client connections
        //Message event listener to handle incoming messages and broadcast them to all connected clients
        //Basic route to test the server
//Step4: Define middleware and routes
//Step5: Start the server
// Step 1: Import modules
const express = require('express');
const app = express();
const http = require('http').createServer(app);

// Correct way to import socket.io
const { Server } = require("socket.io");

// Attach socket.io to server
const io = new Server(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Test route
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Socket.io connection
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("chat message", (msg) => {
        io.emit("chat message", {
            id: socket.id,
            text: msg
        });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});


// Start server
http.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

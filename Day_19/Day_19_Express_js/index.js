// Here we can create a express js based webserver for demonstratins webserver

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Express.js!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
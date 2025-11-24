// here app.js  will contain only express app initialization code
const express = require('express');
const app = express();

// simple routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});
module.exports = app;
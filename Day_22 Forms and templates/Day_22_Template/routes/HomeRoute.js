// Step 4: Define routes to render templates
const express = require('express');

const router = express.Router();



router.get('/', (req, res) => {
    
    res.render('home', { name: 'vishwas', year: new Date().getFullYear() });

});

module.exports = router;
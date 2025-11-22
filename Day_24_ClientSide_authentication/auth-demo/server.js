// Here we will implement Login API  that returns JWT token upon successful authentication
// Step 1: basics express Server setup 
// Step 2: Create a dummy user ( Hardcoded Username and password )
// Step 3: Create a login route that accepts username and password
// Step 4: Validate the credentials
// Step 5: If valid, generate JWT token and return it in response
// Step 6: If invalid, return an error message

const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
// Below secret key will be used to sign the JWT token ie to create the token version of the user data
// Password is Login@123 then after implementing JWT it will be converted to some random string
// 'sdfjsdfjlsdjflsjdfljsdfljsdlfjsdlfjsdlfjsdlfjsdlfjsdlfjsdlfjsdlfj'
const SECRET_KEY = 'your_secret_key';

app.use(bodyParser.json());

// Step 2: Create a dummy user ( Hardcoded Username and password )
const dummyUser = {
    username: 'testuser',
    password: 'Login@123'
};

// Step 3: Create a login route that accepts username and password
app.post('/login', (req, res) => {
    const { username, password } = req.body;        
    // Step 4: Validate the credentials
    if (username === dummyUser.username && password === dummyUser.password) {
        // Step 5: If valid, generate JWT token and return it in response   
        const token = jwt.sign({ username: dummyUser.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        // Step 6: If invalid, return an error message
        res.status(401).json({ message: 'Invalid credentials' });
    }       
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 

// To test the API use Postman or curl to send a POST request to http://localhost:3000/login
// with JSON body: { "username": "testuser", "password": "Login@123" }  
// You should receive a JWT token in response if the credentials are correct.   

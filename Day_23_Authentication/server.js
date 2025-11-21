// In this file we will create a server using express framework along with routes and passport based authentication

const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // for local username-password authentication
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: false }));// to parse form data

// Session setup
app.use(session({   
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Dummy user data for demonstration in the form of an array
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];  
// Cinfigure passport local strategy
passport.use(new LocalStrategy(
    function(username, password, done) {    
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            return done(null, user);    
        } else {
            return done(null, false, { message: 'Incorrect username or password.' });
        }   
    }
));

//serialize user into the session as it is required for persistent login sessions
passport.serializeUser(function(user, done) {
    done(null, user.id);
}); 

//deserialize user from the session
passport.deserializeUser(function(id, done) {
    const user = users.find(u => u.id === id);
    done(null, user);
});

// Routes 
// route for home page
app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><a href="/login">Login</a>');
});
// route for login page
app.get('/login', (req, res) => {
    res.send(`  <h1>Login Page</h1>
        <form method="post" action="/login">
            <div>   
                <label>Username:</label>
                <input type="text" name="username"/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password"/>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    `);
});



// route for handling login POST request
app.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    }
);


// route for logout
app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
}); 


// start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



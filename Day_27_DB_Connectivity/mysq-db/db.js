// db.js
const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // your MySQL username
  password: "root@123", // your MySQL password
  database: "demodb",// your database name
});
// Database connection
db.connect((err) => {
  if (err) {
    console.log(" MySQL connection failed:", err.message);
  } else {
    console.log(" Connected to MySQL Database!");
  }
});
module.exports = db;

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/mydatabase', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });  
// const db = mongoose.connection;
// // Handle connection events
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//     console.log('Connected to MongoDB database successfully');
// });
// module.exports = db;
// Export the connection for use in other parts of the application
// mongoose consot of following methods
// mongoose.connect() - Establishes a connection to the MongoDB database.
// mongoose.model() - Defines a model (schema) for a collection in the database.
// mongoose.disconnect() - Closes the connection to the MongoDB database.
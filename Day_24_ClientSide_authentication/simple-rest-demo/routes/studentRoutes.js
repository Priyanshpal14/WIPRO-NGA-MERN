// in routes.js we will defines all the routes for our application ie URLs
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');  
// Define routes and link them to controller functions
router.get('/students', studentController.getAllStudents);
router.get('/students/:id', studentController.getStudentById);
router.post('/students', studentController.createStudent);
router.put('/students/:id', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);
module.exports = router;

// this file exlusively handles routing and delegates the actual logic to the controller functions defined in studentController.js
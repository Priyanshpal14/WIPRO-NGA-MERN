// SkillTrack Backend API - Student Management System
// Express.js RESTful API with validation middleware

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// In-memory database (replace with actual database in production)
let students = [
  {
    id: 1,
    name: "Anany Saraf",
    course: "Full Stack Development",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"]
  },
  {
    id: 2,
    name: "Vaishnavi Bajpai",
    course: "Data Science",
    skills: ["Python", "Machine Learning", "SQL", "Pandas"]
  },
  {
    id: 3,
    name: "Abhishek Raghuwanshi",
    course: "Backend Development",
    skills: ["Java", "Spring Boot", "MySQL", "REST API"]
  }
];

let nextId = 4; // Counter for auto-generating IDs

// Validation Middleware for POST request
const validateStudentData = (req, res, next) => {
  const { name, skills, course } = req.body;
  
  // Check if all required fields are present
  if (!name || !skills || !course) {
    return res.status(400).json({
      message: "Validation failed",
      errors: {
        name: !name ? "Name is required" : undefined,
        skills: !skills ? "Skills are required" : undefined,
        course: !course ? "Course is required" : undefined
      }
    });
  }
  
  // Validate skills is an array
  if (!Array.isArray(skills) || skills.length === 0) {
    return res.status(400).json({
      message: "Skills must be a non-empty array"
    });
  }
  
  // Validate name and course are strings
  if (typeof name !== 'string' || typeof course !== 'string') {
    return res.status(400).json({
      message: "Name and course must be strings"
    });
  }
  
  next();
};

// US-01: GET /students - Fetch all students
app.get('/students', (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
});

// US-02: GET /students/:id - View student details by ID
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  // Validate if ID is a number
  if (isNaN(id)) {
    return res.status(400).json({
      message: "Invalid ID format"
    });
  }
  
  const student = students.find(s => s.id === id);
  
  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }
  
  res.status(200).json({
    success: true,
    data: student
  });
});

// US-03: POST /students - Add a new student
app.post('/students', validateStudentData, (req, res) => {
  const { name, skills, course } = req.body;
  
  // Auto-generate ID
  const newStudent = {
    id: nextId++,
    name: name.trim(),
    course: course.trim(),
    skills: skills.map(skill => skill.trim())
  };
  
  students.push(newStudent);
  
  res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: newStudent
  });
});

// US-04: PUT /students/:id - Update student details
app.put('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  // Validate if ID is a number
  if (isNaN(id)) {
    return res.status(400).json({
      message: "Invalid ID format"
    });
  }
  
  const studentIndex = students.findIndex(s => s.id === id);
  
  if (studentIndex === -1) {
    return res.status(404).json({
      message: "Student not found"
    });
  }
  
  const { name, skills, course } = req.body;
  
  // Validate skills if provided
  if (skills && (!Array.isArray(skills) || skills.length === 0)) {
    return res.status(400).json({
      message: "Skills must be a non-empty array"
    });
  }
  
  // Update only provided fields
  if (name) students[studentIndex].name = name.trim();
  if (course) students[studentIndex].course = course.trim();
  if (skills) students[studentIndex].skills = skills.map(skill => skill.trim());
  
  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: students[studentIndex]
  });
});

// US-05: DELETE /students/:id - Delete a student
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  // Validate if ID is a number
  if (isNaN(id)) {
    return res.status(400).json({
      message: "Invalid ID format"
    });
  }
  
  const studentIndex = students.findIndex(s => s.id === id);
  
  if (studentIndex === -1) {
    return res.status(404).json({
      message: "Student not found"
    });
  }
  
  const deletedStudent = students[studentIndex];
  students.splice(studentIndex, 1);
  
  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    data: deletedStudent
  });
});

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal server error",
    error: err.message
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 SkillTrack Backend API running on http://localhost:${PORT}`);
  console.log(`📚 Total students: ${students.length}`);
});

// Export for testing
module.exports = app;
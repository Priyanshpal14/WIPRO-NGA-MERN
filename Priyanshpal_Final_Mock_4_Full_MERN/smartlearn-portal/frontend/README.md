SmartLearn Course Enrollment Portal

MERN Stack application for course management and enrollment.

Project Setup

Prerequisites
- Node.js installed
- MongoDB installed and running
- MongoDB Compass 

Backend Setup

cd backend
npm install
```

Create `.env` file in backend folder:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/smartlearn
```

Start backend:
```bash
npm run dev
```

Backend runs on: http://localhost:5000

Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on: http://localhost:3000

API Endpoints

Course Management
POST /api/courses** - Create new course
```json
  {
    "courseId": "MERN101",
    "title": "MERN Stack Complete",
    "category": "Web Development",
    "price": 999
  }
```

GET /api/courses** - Get all courses

Enrollment
POST /api/enroll** - Enroll in course
```json
  {
    "userId": "user123",
    "courseId": "MERN101"
  }
```

Testing

Run Backend Tests
```bash
cd backend
npm test
```


Backend

Course CRUD API with validation  
Enrollment API with duplicate prevention  
Error handling middleware  
MongoDB integration  
Automated tests (Mocha/Chai/SuperTest)  

Frontend

Course list display  
Enrollment functionality  
Loading & error states  
Success/error messages  
Enrolled courses tracking  

Database Schema

Course Model
courseId: String (unique, required)
title: String (required)
category: String (required)
price: Number (min: 0, required)
createdAt: Date (default: now)

Enrollment Model

userId: String (required)
courseId: String (required)
enrolledOn: Date (default: now)

Technologies Used

Backend**: Node.js, Express.js, MongoDB, Mongoose
Frontend**: React, Axios
Testing**: Mocha, Chai, SuperTest
Validation**: express-validator

FitTrack – Simple Fitness Training Portal

This project shows fitness programs and allows a user to enroll in them.
Duplicate enrollments are not allowed.

Tech Used

Frontend: React.js

Backend: Node.js + Express

Database: MongoDB

Testing: Mocha, Chai, SuperTest

How to Run
1. Start MongoDB
mongod

2. Start Backend
cd backend
npm install
npm run dev

3. Start Frontend
cd frontend
npm install
npm start

Open in browser:
http://localhost:3000

Add Sample Programs (Postman)

POST →
http://localhost:5000/api/programs

Body (JSON):

{
  "programId": "FTP001",
  "name": "Beginner Full Body Workout",
  "category": "Strength Training",
  "level": "Beginner",
  "price": 1999
}

Main API Endpoints

Get all programs:
GET /api/programs

Add program:
POST /api/programs

Enroll in program:
POST /api/enroll

Testing:

Run backend tests:

cd backend
npm test

Notes

userId is fixed as USR101
One user can join a program only once
Prices are in rupees

Screenshots output is in respective folder 

Made by: Priyansh Pal
Date: 1 Dec 2025
Course - WIPRO NGA MERN COHERT 1
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { body, validationResult } = require('express-validator');

const courseValidation = [
  body('courseId').notEmpty().withMessage('courseId is required'),
  body('title').notEmpty().withMessage('title is required'),
  body('category').notEmpty().withMessage('category is required'),
  body('price').isNumeric().withMessage('price must be a number')
    .isFloat({ min: 0 }).withMessage('price must be 0 or greater')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      message: errors.array()[0].msg 
    });
  }
  next();
};

router.post('/', courseValidation, validate, async (req, res, next) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({ 
      success: true, 
      data: course, 
      message: 'Course created' 
    });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.json({ 
      success: true, 
      data: courses, 
      message: 'Courses fetched' 
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
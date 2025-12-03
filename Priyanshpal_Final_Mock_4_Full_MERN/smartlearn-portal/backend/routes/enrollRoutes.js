const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const Course = require('../models/course');
const { body, validationResult } = require('express-validator');

const enrollValidation = [
  body('userId').notEmpty().withMessage('userId is required'),
  body('courseId').notEmpty().withMessage('courseId is required')
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

router.post('/', enrollValidation, validate, async (req, res, next) => {
  try {
    const { userId, courseId } = req.body;

    const courseExists = await Course.findOne({ courseId });
    if (!courseExists) {
      return res.status(404).json({ 
        success: false, 
        message: 'Course not found' 
      });
    }

    const existing = await Enrollment.findOne({ userId, courseId });
    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: 'Already enrolled' 
      });
    }

    const enrollment = new Enrollment({ userId, courseId });
    await enrollment.save();

    res.status(201).json({ 
      success: true, 
      data: enrollment, 
      message: 'Enrolled successfully' 
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
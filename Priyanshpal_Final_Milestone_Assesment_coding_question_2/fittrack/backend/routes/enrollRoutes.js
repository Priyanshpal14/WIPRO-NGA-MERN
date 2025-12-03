const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Enrollment = require('../models/Enrollment');
const Program = require('../models/Program');

router.post('/enroll', [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('programId').notEmpty().withMessage('Program ID is required')
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      data: null
    });
  }

  try {
    const userId = req.body.userId;
    const programId = req.body.programId;

    // check if program exists
    const programExists = await Program.findOne({ programId: programId });
    if (!programExists) {
      return res.status(404).json({
        success: false,
        message: 'Program not found',
        data: null
      });
    }

    // check if already enrolled
    const alreadyEnrolled = await Enrollment.findOne({ 
      userId: userId, 
      programId: programId 
    });
    
    if (alreadyEnrolled) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled',
        data: null
      });
    }

    // create new enrollment
    const newEnrollment = new Enrollment({ 
      userId: userId, 
      programId: programId 
    });
    await newEnrollment.save();

    res.status(201).json({
      success: true,
      message: 'Enrollment successful',
      data: newEnrollment
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Program = require('../models/Program');

// add program
router.post('/programs', [
  body('programId').notEmpty().withMessage('Program ID is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('level').isIn(['Beginner', 'Intermediate', 'Advanced']).withMessage('Invalid level'),
  body('price').isNumeric().withMessage('Price must be a number').custom(value => {
    if (value >= 0) {
      return true;
    }
    throw new Error('Price must be >= 0');
  })
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
    const newProgram = new Program(req.body);
    await newProgram.save();
    res.status(201).json({
      success: true,
      message: 'Program added successfully',
      data: newProgram
    });
  } catch (error) {
    next(error);
  }
});

// get all programs
router.get('/programs', async (req, res, next) => {
  try {
    const allPrograms = await Program.find();
    res.status(200).json({
      success: true,
      message: 'Programs fetched successfully',
      data: allPrograms
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
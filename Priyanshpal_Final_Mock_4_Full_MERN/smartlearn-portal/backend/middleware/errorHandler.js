module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      success: false, 
      message: err.message 
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({ 
      success: false, 
      message: 'Duplicate entry' 
    });
  }

  res.status(500).json({ 
    success: false, 
    message: 'Server error' 
  });
};
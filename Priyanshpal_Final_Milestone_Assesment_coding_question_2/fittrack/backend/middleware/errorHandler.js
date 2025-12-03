module.exports = (err, req, res, next) => {
  console.log(err);
  
  if (err.name === 'ValidationError') {
    res.status(400).json({
      success: false,
      message: err.message,
      data: null
    });
  } else if (err.code === 11000) {
    res.status(400).json({
      success: false,
      message: 'Duplicate entry',
      data: null
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Server error',
      data: null
    });
  }
};
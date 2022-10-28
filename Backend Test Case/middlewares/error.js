const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(err.stack.red);
  }

  res.status(err.statusCode || 500).json({
    status: 'fail',
    message: err.message || 'Server Error',
  });
};

export default errorHandler;

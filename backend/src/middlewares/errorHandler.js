exports.notFound = (req, res, next) => {
  const err = new Error(`Not Found - ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
};

exports.errorHandler = (err, req, res, next) => {
  // default status
  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    message: err.message || "Server Error",
  };

  // include stack in non-production
  if (process.env.NODE_ENV !== "production") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

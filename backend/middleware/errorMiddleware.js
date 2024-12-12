export const errorMiddleware = (err, req, res, next) => {
    let error = { ...err };
  
    error.message = err.message || 'Server Error';
    const statusCode = err.statusCode || 500; 
  
    // Handling Mongoose Validation Error
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map((value) => value.message).join(', ');
      error = new Error(message);
      error.statusCode = 400;
    }
   
    // Handle role-based authorization error (403)
    if (statusCode === 403) {
      error.message = `You are not authorized to access this resource. ${err.message || ''}`;
    }

    // Handling Mongoose duplicate key errors
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
      error = new Error(message);
      error.statusCode = 400;
    }
  
    // Wrong Mongoose Object ID Error
    if (err.name === 'CastError') {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new Error(message);
      error.statusCode = 404;
    }
  
    // JWT Errors
    if (err.name === 'JsonWebTokenError') {
      const message = 'JSON Web Token is invalid. Try again.';
      error = new Error(message);
      error.statusCode = 401;
    }
  
    if (err.name === 'TokenExpiredError') {
      const message = 'JSON Web Token has expired. Try again.';
      error = new Error(message);
      error.statusCode = 401;
    }
  
    res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  };
  